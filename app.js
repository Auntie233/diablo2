// ===== 暗黑破坏神2 角色模拟器 =====

const App = (() => {
  const ATTR_TRIM_ORDER = ['ene', 'vit', 'dex', 'str']; // 降级时按此顺序退还属性点

  let state = {
    currentClass: null,
    level: 1,
    addedAttr: { str: 0, dex: 0, vit: 0, ene: 0 },
    skillPoints: {},
    activeTree: 0,
    modalSkillId: null,
    modalPreviewLevel: 1,
  };

  // ===================== 初始化 =====================
  function init() {
    renderClassSelect();
    bindGlobalEvents();
    generateParticles();
  }

  function generateParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:absolute;
        width:${Math.random()*3+1}px; height:${Math.random()*3+1}px;
        background:rgba(200,168,75,${Math.random()*0.12+0.03});
        border-radius:50%;
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        animation:particleFloat ${Math.random()*20+15}s ease-in-out infinite;
        animation-delay:-${Math.random()*20}s;
      `;
      container.appendChild(dot);
    }
    const s = document.createElement('style');
    s.textContent = `@keyframes particleFloat{
      0%,100%{transform:translateY(0) translateX(0);opacity:0.3}
      25%{transform:translateY(-30px) translateX(10px);opacity:0.8}
      75%{transform:translateY(15px) translateX(-10px);opacity:0.5}
    }`;
    document.head.appendChild(s);
  }

  // ===================== 角色选择 =====================
  function renderClassSelect() {
    const grid = document.getElementById('classGrid');
    grid.innerHTML = '';
    Object.entries(D2DATA.classes).forEach(([key, cls]) => {
      const card = document.createElement('div');
      card.className = 'class-card';
      card.innerHTML = `
        <div class="class-card-glow" style="background:linear-gradient(to right,transparent,${cls.color},transparent)"></div>
        <span class="class-icon">${cls.icon}</span>
        <div class="class-name" style="color:${cls.color}">${cls.name}</div>
        <div class="class-name-en">${cls.nameEn}</div>
        <div class="class-desc">${cls.description}</div>
        <div class="class-base-stats">
          <div class="base-stat-tag">力量 <span>${cls.baseStats.str}</span></div>
          <div class="base-stat-tag">敏捷 <span>${cls.baseStats.dex}</span></div>
          <div class="base-stat-tag">体力 <span>${cls.baseStats.vit}</span></div>
          <div class="base-stat-tag">能量 <span>${cls.baseStats.ene}</span></div>
        </div>
      `;
      card.addEventListener('click', () => selectClass(key));
      grid.appendChild(card);
    });
  }

  function selectClass(classKey) {
    state.currentClass = classKey;
    state.level = 1;
    state.addedAttr = { str: 0, dex: 0, vit: 0, ene: 0 };
    state.skillPoints = {};
    state.activeTree = 0;

    document.getElementById('charLevel').value = 1;
    document.getElementById('class-select-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');

    const cls = D2DATA.classes[classKey];
    document.getElementById('headerIcon').textContent = cls.icon;
    document.getElementById('headerClassName').textContent = cls.name;

    renderSkillTabs();
    renderSkillTree();
    updateAll();
  }

  // ===================== 事件绑定 =====================
  function bindGlobalEvents() {
    document.getElementById('btnBack').addEventListener('click', () => {
      closeModal();
      document.getElementById('main-screen').classList.remove('active');
      document.getElementById('class-select-screen').classList.add('active');
    });

    document.getElementById('btnReset').addEventListener('click', resetAll);

    // 等级 +/-
    document.getElementById('lvlUp').addEventListener('click', () => changeLevel(1));
    document.getElementById('lvlDown').addEventListener('click', () => changeLevel(-1));

    // 等级输入框：input 实时响应，blur 时做边界修正
    const lvlInput = document.getElementById('charLevel');
    lvlInput.addEventListener('input', () => {
      const v = parseInt(lvlInput.value);
      if (!isNaN(v) && v >= 1 && v <= 99) setLevel(v);
    });
    lvlInput.addEventListener('blur', () => {
      let v = parseInt(lvlInput.value) || 1;
      v = Math.max(1, Math.min(99, v));
      lvlInput.value = v;
      setLevel(v);
    });

    // 属性点 +/- (事件委托)
    document.querySelector('.attr-section').addEventListener('click', (e) => {
      const btn = e.target.closest('.attr-btn');
      if (!btn) return;
      const attr = btn.dataset.attr;
      if (btn.classList.contains('plus')) addAttr(attr);
      else if (btn.classList.contains('minus')) removeAttr(attr);
    });

    // 弹窗事件
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('skillModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.getElementById('modalLvPlus').addEventListener('click', () => {
      if (state.modalPreviewLevel < 20) { state.modalPreviewLevel++; renderModal(); }
    });
    document.getElementById('modalLvMinus').addEventListener('click', () => {
      if (state.modalPreviewLevel > 1) { state.modalPreviewLevel--; renderModal(); }
    });
    document.getElementById('modalAddPoint').addEventListener('click', () => {
      if (!state.modalSkillId) return;
      if (addSkillPoint(state.modalSkillId)) {
        state.modalPreviewLevel = getSkillLevel(state.modalSkillId);
        renderModal();
        renderSkillTree();
        updateAll();
      }
    });
    document.getElementById('modalRemovePoint').addEventListener('click', () => {
      if (!state.modalSkillId) return;
      if (removeSkillPoint(state.modalSkillId)) {
        state.modalPreviewLevel = Math.max(1, getSkillLevel(state.modalSkillId));
        renderModal();
        renderSkillTree();
        updateAll();
      }
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  // ===================== 等级控制 =====================
  function changeLevel(delta) {
    setLevel(state.level + delta);
    document.getElementById('charLevel').value = state.level;
  }

  function setLevel(newLevel) {
    newLevel = Math.max(1, Math.min(99, newLevel));
    const oldLevel = state.level;
    state.level = newLevel;

    if (newLevel < oldLevel) {
      // 降级时修剪多余的属性点和技能点
      validateAttrPoints();
      validateSkillPoints();
    }

    updateAll();
    if (state.modalSkillId) renderModal();
    renderSkillTree(); // 技能解锁状态可能变化
  }

  // ===================== 点数验证 =====================
  function getTotalAttrPoints()     { return (state.level - 1) * 5; }
  function getUsedAttrPoints()      { return ATTR_TRIM_ORDER.reduce((s, a) => s + state.addedAttr[a], 0); }
  function getRemainingAttrPoints() { return getTotalAttrPoints() - getUsedAttrPoints(); }

  function getTotalSkillPoints()     { return state.level - 1; }
  function getUsedSkillPoints()      { return Object.values(state.skillPoints).reduce((a, b) => a + b, 0); }
  function getRemainingSkillPoints() { return getTotalSkillPoints() - getUsedSkillPoints(); }

  // 降级后退还多余属性点（按 ene→vit→dex→str 顺序退还）
  function validateAttrPoints() {
    let excess = -getRemainingAttrPoints(); // 正数表示超出了多少
    for (const attr of ATTR_TRIM_ORDER) {
      if (excess <= 0) break;
      const trim = Math.min(state.addedAttr[attr], excess);
      state.addedAttr[attr] -= trim;
      excess -= trim;
    }
  }

  // 降级后退还多余技能点（从最后加的开始退还）
  function validateSkillPoints() {
    if (!state.currentClass) return;
    while (getUsedSkillPoints() > getTotalSkillPoints()) {
      const entries = Object.entries(state.skillPoints);
      if (!entries.length) break;
      const [lastId] = entries[entries.length - 1];
      state.skillPoints[lastId]--;
      if (state.skillPoints[lastId] <= 0) delete state.skillPoints[lastId];
    }
  }

  // ===================== 属性操作 =====================
  function addAttr(attr) {
    if (getRemainingAttrPoints() <= 0) return;
    state.addedAttr[attr]++;
    updateAll();
  }

  function removeAttr(attr) {
    if (state.addedAttr[attr] <= 0) return;
    state.addedAttr[attr]--;
    updateAll();
  }

  // ===================== 技能操作 =====================
  function getSkillLevel(id) { return state.skillPoints[id] || 0; }

  function canAddSkill(id) {
    const cls = D2DATA.classes[state.currentClass];
    const skill = findSkill(cls, id);
    if (!skill) return false;
    if (getSkillLevel(id) >= 20) return false;
    if (getRemainingSkillPoints() <= 0) return false;
    if (state.level < skill.req) return false;
    return skill.prereqs.every(p => getSkillLevel(p) >= 1);
  }

  function canRemoveSkill(id) {
    if (getSkillLevel(id) <= 0) return false;
    const cls = D2DATA.classes[state.currentClass];
    // 不能移除被其他已加点技能依赖的技能
    for (const tree of cls.trees)
      for (const skill of tree.skills)
        if (skill.prereqs.includes(id) && getSkillLevel(skill.id) > 0)
          return false;
    return true;
  }

  // 返回 true 表示操作成功
  function addSkillPoint(id) {
    if (!canAddSkill(id)) return false;
    state.skillPoints[id] = (state.skillPoints[id] || 0) + 1;
    return true;
  }

  function removeSkillPoint(id) {
    if (!canRemoveSkill(id)) return false;
    state.skillPoints[id]--;
    if (state.skillPoints[id] === 0) delete state.skillPoints[id];
    return true;
  }

  function findSkill(cls, id) {
    for (const tree of cls.trees)
      for (const skill of tree.skills)
        if (skill.id === id) return skill;
    return null;
  }

  // ===================== 重置 =====================
  function resetAll() {
    state.addedAttr = { str: 0, dex: 0, vit: 0, ene: 0 };
    state.skillPoints = {};
    state.level = 1;
    document.getElementById('charLevel').value = 1;
    closeModal();
    renderSkillTree();
    updateAll();
  }

  // ===================== 技能树渲染 =====================
  function renderSkillTabs() {
    const cls = D2DATA.classes[state.currentClass];
    const tabs = document.getElementById('treeTabs');
    tabs.innerHTML = '';
    cls.trees.forEach((tree, i) => {
      const tab = document.createElement('button');
      tab.className = 'tree-tab' + (i === state.activeTree ? ' active' : '');
      tab.textContent = tree.name;
      tab.addEventListener('click', () => {
        state.activeTree = i;
        tabs.querySelectorAll('.tree-tab').forEach((t, j) => t.classList.toggle('active', j === i));
        renderSkillTree();
      });
      tabs.appendChild(tab);
    });
  }

  function renderSkillTree() {
    if (!state.currentClass) return;
    const cls = D2DATA.classes[state.currentClass];
    const tree = cls.trees[state.activeTree];
    const container = document.getElementById('skillTreeContainer');
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'skill-tree';

    tree.skills.forEach(skill => {
      const lv = getSkillLevel(skill.id);
      const levelOk = state.level >= skill.req;
      const prereqOk = skill.prereqs.every(p => getSkillLevel(p) >= 1);
      const locked = !levelOk || !prereqOk;
      const canAdd = canAddSkill(skill.id);
      const canRemove = canRemoveSkill(skill.id);

      const card = document.createElement('div');
      card.className = [
        'skill-card',
        lv > 0 ? 'has-points' : '',
        lv >= 20 ? 'maxed' : '',
        locked ? 'locked' : '',
      ].filter(Boolean).join(' ');
      card.style.setProperty('--class-color', cls.color);

      // 卡片预览：显示当前等级效果（最多2条）
      const effects = lv > 0 ? skill.levels(lv) : null;
      const previewLines = effects
        ? Object.entries(effects).slice(0, 2)
            .map(([k, v]) => `<span class="preview-key">${getEffectLabel(k)}: </span><span class="preview-val">${v}</span>`)
            .join('<br>')
        : `<span style="opacity:.6;font-size:10px">${skill.desc.slice(0, 55)}${skill.desc.length > 55 ? '…' : ''}</span>`;

      // 前置显示
      const prereqHtml = skill.prereqs.length
        ? skill.prereqs.map(p => {
            const ps = findSkill(cls, p);
            const met = getSkillLevel(p) >= 1;
            return `<span style="color:${met ? 'var(--green-light)' : 'var(--red-light)'}">${ps ? ps.name : p}</span>`;
          }).join(' ')
        : '';

      card.innerHTML = `
        <div class="skill-card-top">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-level-badge">${lv > 0 ? lv : ''}</span>
        </div>
        <div class="skill-req ${levelOk ? '' : 'unmet'}">
          <span>Lv.${skill.req}</span>
          ${prereqHtml ? `<span class="prereq-sep">·</span>${prereqHtml}` : ''}
        </div>
        <div class="skill-preview">${previewLines}</div>
        <div class="skill-card-btns">
          <button class="skill-add-btn" data-id="${skill.id}" ${canAdd ? '' : 'disabled'} title="加1点">+</button>
          <button class="skill-remove-btn" data-id="${skill.id}" ${canRemove ? '' : 'disabled'} title="减1点">−</button>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.skill-card-btns')) openModal(skill.id);
      });
      card.querySelector('.skill-add-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (addSkillPoint(skill.id)) { renderSkillTree(); updateAll(); }
      });
      card.querySelector('.skill-remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (removeSkillPoint(skill.id)) { renderSkillTree(); updateAll(); }
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  const EFFECT_LABELS = {
    damage:'伤害', mana:'法力消耗', manaCost:'法力消耗', slow:'减速', freeze:'冻结',
    duration:'持续时间', radius:'范围', arrows:'箭矢数', bolts:'闪电数', heal:'治疗量',
    life:'生命', defense:'防御', ar:'攻击评级', chance:'概率', poison:'毒素伤害',
    attacks:'攻击次数', targets:'目标数', leech:'吸血', resist:'抗性', reflect:'反伤',
    speed:'速度', regen:'恢复速度', kicks:'踢击数', attackSpeed:'攻速', moveSpeed:'移速',
    fire:'火焰伤害', cold:'寒冰伤害', light:'闪电伤害', burn:'燃烧伤害', streams:'火焰流',
    stun:'眩晕时间', max:'最大数量', conversion:'转化', selfDamage:'自损', lifeSteal:'生命偷取',
    manaSteal:'法力偷取', manaRegen:'法力恢复', lifeLink:'生命链接', triggerDmg:'触发伤害',
    deathBlast:'死亡爆炸', fireDmg:'火焰增益', magicDmg:'魔法增益', lightDmg:'闪电伤害',
    sageLife:'精灵生命', range:'传送距离', minDmg:'近距伤害', maxDmg:'远距伤害',
    goatmanBuff:'山羊人增益', taintedBuff:'污染者增益', defilerBuff:'污染魔增益',
    shareRatio:'伤害分担', dr:'伤害减免', lifeBonus:'生命上限', reqReduce:'需求降低',
    targetAR:'目标攻击评级', targetDef:'目标防御', damageAmp:'目标受伤增幅', respawn:'重生时间',
    lightSent:'闪电伤害', corpseExp:'尸体爆炸', cloudDmg:'疫云伤害', pullRadius:'吸引范围',
    extra:'额外效果', bonus:'加成', segments:'段数', absorb:'吸收量', cloud:'疫云效果',
    smieDamage:'盾击伤害', undeadDamage:'亡灵伤害', wereformLife:'变形生命',
    leaps:'跳跃', netDmg:'网伤害', boltsPerSentry:'每陷阱闪电', poison2:'毒素',
    length:'波浪长度', interval:'间隔', lightDamage:'闪电伤害', blades:'镜影刃数',
    lightBonus:'闪电增益', coldDamage:'寒冰伤害', wereformDef:'变形防御',
    wereformDmg:'变形伤害', spread:'传播', arBonus:'攻击评级加成', penertation:'穿透',
    penetration:'穿透', maxBound:'束缚上限', bolt:'闪电', attackFire:'攻击火焰',
    coldDmg:'寒冰伤害', pull:'吸引', defilerBuff2:'污染魔增益',
  };
  function getEffectLabel(k) { return EFFECT_LABELS[k] || k; }

  // ===================== 弹窗 =====================
  function openModal(skillId) {
    const cls = D2DATA.classes[state.currentClass];
    const skill = findSkill(cls, skillId);
    if (!skill) return;
    state.modalSkillId = skillId;
    const actual = getSkillLevel(skillId);
    state.modalPreviewLevel = actual > 0 ? actual : 1;
    document.getElementById('skillModal').style.display = 'flex';
    renderModal();
  }

  function closeModal() {
    document.getElementById('skillModal').style.display = 'none';
    state.modalSkillId = null;
  }

  function renderModal() {
    const skillId = state.modalSkillId;
    if (!skillId) return;
    const cls = D2DATA.classes[state.currentClass];
    const skill = findSkill(cls, skillId);
    if (!skill) return;

    const currentLv = getSkillLevel(skillId);
    const previewLv = state.modalPreviewLevel;
    const canAdd = canAddSkill(skillId);
    const canRemove = canRemoveSkill(skillId);

    document.getElementById('modalSkillName').textContent = skill.name;
    document.getElementById('modalClassBadge').textContent = `${cls.name} · ${cls.trees.find(t => t.skills.find(s => s.id === skillId))?.name || ''}`;
    document.getElementById('modalDesc').textContent = skill.desc;
    document.getElementById('modalLvNum').textContent = previewLv;

    // 当前实际等级标注
    const lvLabel = currentLv > 0
      ? `当前等级 <strong style="color:var(--gold)">${currentLv}</strong>`
      : `<span style="color:var(--text-dim)">尚未加点</span>`;
    document.getElementById('modalLvNum').insertAdjacentHTML
    // 已通过 textContent 更新，不需要额外操作

    // 效果面板 - 显示预览等级
    const effectsEl = document.getElementById('modalEffects');
    const effects = skill.levels(previewLv);
    if (effects && Object.keys(effects).length) {
      effectsEl.innerHTML = Object.entries(effects).map(([k, v]) => {
        if (v === undefined || v === null || v === '') return '';
        return `<div class="effect-row">
          <span class="effect-key">${getEffectLabel(k)}</span>
          <span class="effect-val">${v}</span>
        </div>`;
      }).filter(Boolean).join('') || '<div class="effect-empty">暂无效果数据</div>';
    } else {
      effectsEl.innerHTML = '<div class="effect-empty">暂无效果数据</div>';
    }

    // 前置技能
    const prereqEl = document.getElementById('modalPrereq');
    if (skill.prereqs.length > 0) {
      prereqEl.innerHTML = `<span class="prereq-label">前置技能：</span>` +
        skill.prereqs.map(p => {
          const ps = findSkill(cls, p);
          const met = getSkillLevel(p) >= 1;
          return `<span class="prereq-item ${met ? 'met' : 'unmet'}">${ps ? ps.name : p} ${met ? '✓' : '✗'}</span>`;
        }).join('');
    } else {
      prereqEl.innerHTML = `<span style="color:var(--green-light);font-size:11px">✓ 无前置要求</span>`;
    }

    // 等级要求
    const lvReqMet = state.level >= skill.req;
    prereqEl.innerHTML += ` &nbsp; <span style="color:${lvReqMet ? 'var(--green-light)' : 'var(--red-light)'}; font-size:11px">
      ${lvReqMet ? '✓' : '✗'} 需要角色等级 ${skill.req}（当前 ${state.level}）</span>`;

    // 预览切换按钮
    document.getElementById('modalLvMinus').disabled = previewLv <= 1;
    document.getElementById('modalLvPlus').disabled = previewLv >= 20;

    // 加减点按钮
    const addBtn = document.getElementById('modalAddPoint');
    const removeBtn = document.getElementById('modalRemovePoint');

    addBtn.disabled = !canAdd;
    if (currentLv >= 20) {
      addBtn.textContent = '✓ 已达最高等级 (20)';
    } else if (!lvReqMet) {
      addBtn.textContent = `✗ 需要角色等级 ${skill.req}`;
    } else if (skill.prereqs.some(p => getSkillLevel(p) < 1)) {
      addBtn.textContent = '✗ 前置技能未解锁';
    } else if (getRemainingSkillPoints() <= 0) {
      addBtn.textContent = '✗ 没有剩余技能点';
    } else {
      addBtn.textContent = `▲ 加一点  ${currentLv} → ${currentLv + 1} 级`;
    }

    removeBtn.disabled = !canRemove;
    if (currentLv <= 0) {
      removeBtn.textContent = '— 尚未加点';
    } else if (!canRemove) {
      removeBtn.textContent = '✗ 被其他技能依赖，无法移除';
    } else {
      removeBtn.textContent = `▼ 减一点  ${currentLv} → ${currentLv - 1} 级`;
    }

    // 弹窗头部显示实际等级标记
    const lvNumEl = document.getElementById('modalLvNum');
    lvNumEl.textContent = previewLv;
    // 如果预览等级 == 实际等级，高亮金色；否则灰色表示纯预览
    lvNumEl.style.color = previewLv === currentLv ? 'var(--gold)' : 'var(--text-dim)';

    // max 标记
    document.querySelector('.modal-lv-max').textContent = `/ 20  ${currentLv > 0 ? `（实际 ${currentLv} 级）` : '（未加点）'}`;
  }

  // ===================== 全局状态更新 =====================
  function updateAll() {
    if (!state.currentClass) return;
    const cls = D2DATA.classes[state.currentClass];
    const lv = state.level;

    // 总属性（基础 + 手动加点，注意不包含等级自动增长——D2中等级提升只给属性点，不直接增加属性）
    const total = {
      str: cls.baseStats.str + state.addedAttr.str,
      dex: cls.baseStats.dex + state.addedAttr.dex,
      vit: cls.baseStats.vit + state.addedAttr.vit,
      ene: cls.baseStats.ene + state.addedAttr.ene,
    };

    document.getElementById('strValue').textContent = total.str;
    document.getElementById('dexValue').textContent = total.dex;
    document.getElementById('vitValue').textContent = total.vit;
    document.getElementById('eneValue').textContent = total.ene;

    const maxStat = 300;
    document.getElementById('strBar').style.width = Math.min(100, (total.str / maxStat) * 100) + '%';
    document.getElementById('dexBar').style.width = Math.min(100, (total.dex / maxStat) * 100) + '%';
    document.getElementById('vitBar').style.width = Math.min(100, (total.vit / maxStat) * 100) + '%';
    document.getElementById('eneBar').style.width = Math.min(100, (total.ene / maxStat) * 100) + '%';

    // 派生属性
    const life    = Math.round(cls.baseLife    + (lv-1) * cls.lifePerLevel    + total.vit * cls.lifePerVit);
    const mana    = Math.round(cls.baseMana    + (lv-1) * cls.manaPerLevel    + total.ene * cls.manaPerEne);
    const stamina = Math.round(cls.baseStamina + (lv-1) * cls.staminaPerLevel + total.vit * cls.staminaPerVit);
    const defense = Math.round(total.dex * 0.25);

    document.getElementById('lifeValue').textContent    = life;
    document.getElementById('manaValue').textContent    = mana;
    document.getElementById('staminaValue').textContent = stamina;
    document.getElementById('defenseValue').textContent = defense;

    document.getElementById('formulaVitLife').textContent = `+${cls.lifePerVit} 生命 / +${cls.staminaPerVit} 耐力`;
    document.getElementById('formulaEneMana').textContent = `+${cls.manaPerEne} 法力`;

    // 属性点
    const attrRemain = getRemainingAttrPoints();
    document.getElementById('attrPointsDisplay').textContent = attrRemain;
    document.getElementById('headerAttrPoints').textContent  = attrRemain;

    // 技能点
    const skillRemain = getRemainingSkillPoints();
    const skillUsed   = getUsedSkillPoints();
    document.getElementById('skillPointsDisplay').textContent = skillRemain;
    document.getElementById('skillPtsRemain').textContent     = skillRemain;
    document.getElementById('headerSkillPoints').textContent  = skillRemain;
    document.getElementById('usedSkillPoints').textContent    = skillUsed;
    document.getElementById('headerLevel').textContent        = lv;

    // 等级按钮边界禁用
    document.getElementById('lvlDown').disabled = (lv <= 1);
    document.getElementById('lvlUp').disabled   = (lv >= 99);

    // 属性 +/- 按钮：精确控制每个按钮
    ['str', 'dex', 'vit', 'ene'].forEach(attr => {
      const plus  = document.querySelector(`.attr-btn.plus[data-attr="${attr}"]`);
      const minus = document.querySelector(`.attr-btn.minus[data-attr="${attr}"]`);
      if (plus)  plus.disabled  = (attrRemain <= 0);
      if (minus) minus.disabled = (state.addedAttr[attr] <= 0);
    });

    // 剩余点数高亮：0时变红
    const attrDisplay = document.getElementById('attrPointsDisplay');
    attrDisplay.style.color = attrRemain === 0 ? 'var(--text-dim)' : 'var(--gold)';
    const skillDisplay = document.getElementById('skillPointsDisplay');
    skillDisplay.style.color = skillRemain === 0 ? 'var(--text-dim)' : 'var(--blue-light)';
    const hAttr = document.getElementById('headerAttrPoints');
    hAttr.style.color = attrRemain === 0 ? 'var(--text-dim)' : 'var(--gold)';
    const hSkill = document.getElementById('headerSkillPoints');
    hSkill.style.color = skillRemain === 0 ? 'var(--text-dim)' : 'var(--blue-light)';

    // 弹窗若开着同步更新
    if (state.modalSkillId) renderModal();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
