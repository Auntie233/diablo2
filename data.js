// Diablo 2 Resurrected - Complete Character Data
// Based on D2R v2.8 and classic D2 LoD 1.14d

const D2DATA = {
  classes: {
    amazon: {
      name: '亚马逊',
      nameEn: 'Amazon',
      icon: '🏹',
      description: '来自斯科斯岛的女战士，精通弓箭与标枪，兼具近战与远程能力。',
      baseStats: { str: 20, dex: 25, vit: 20, ene: 15 },
      baseLife: 50, lifePerLevel: 2, lifePerVit: 3,
      baseMana: 15, manaPerLevel: 1.5, manaPerEne: 1.5,
      baseStamina: 84, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#c8a84b',
      trees: [
        {
          name: '弓弩技能',
          nameEn: 'Bow & Crossbow',
          skills: [
            {
              id: 'magic_arrow', name: '魔法箭', req: 1, prereqs: [],
              desc: '射出一支不消耗箭矢的魔法箭矢，造成额外伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 5 + 3)} 魔法伤害`,
                mana: `${(1 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'fire_arrow', name: '火焰箭', req: 1, prereqs: [],
              desc: '射出一支燃烧的箭矢，造成火焰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 8 + 5)}-${Math.round(lv * 12 + 10)} 火焰伤害`,
                mana: `${(1.5 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'cold_arrow', name: '寒冰箭', req: 6, prereqs: ['magic_arrow'],
              desc: '射出冰冷的箭矢，造成寒冰伤害并减慢敌人速度。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 6 + 4)}-${Math.round(lv * 9 + 8)} 寒冰伤害`,
                slow: `减速 ${Math.min(50, 33 + lv * 2)}%`,
                mana: `${(2 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'multiple_shot', name: '多重射击', req: 6, prereqs: ['fire_arrow'],
              desc: '同时射出多支箭矢，扇形扩散攻击。',
              levels: (lv) => ({
                arrows: `${2 + Math.floor(lv / 3)} 支箭矢`,
                damage: `-50% 基础伤害`,
                mana: `${(3 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'exploding_arrow', name: '爆炸箭', req: 12, prereqs: ['fire_arrow', 'cold_arrow'],
              desc: '射出爆炸箭矢，命中后爆炸造成范围火焰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 15 + 20)}-${Math.round(lv * 20 + 40)} 火焰伤害`,
                radius: `${(1.6 + lv * 0.13).toFixed(1)} 码范围`,
                mana: `${(4 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'ice_arrow', name: '冰霜箭', req: 12, prereqs: ['cold_arrow'],
              desc: '射出可以冻结敌人的箭矢。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 10 + 8)}-${Math.round(lv * 15 + 15)} 寒冰伤害`,
                freeze: `冻结 ${(1 + lv * 0.2).toFixed(1)} 秒`,
                mana: `${(3 + lv * 0.15).toFixed(1)} 法力`
              })
            },
            {
              id: 'guided_arrow', name: '追踪箭', req: 18, prereqs: ['multiple_shot', 'cold_arrow'],
              desc: '自动追踪目标的箭矢，不会错过。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 8 + 10)}% 伤害加成`,
                mana: `${(5 + lv * 0.25).toFixed(1)} 法力`
              })
            },
            {
              id: 'strafe', name: '乱射', req: 24, prereqs: ['multiple_shot', 'guided_arrow'],
              desc: '快速射出多支箭矢攻击多个目标。',
              levels: (lv) => ({
                arrows: `${5 + Math.floor(lv / 4)} 支箭矢`,
                mana: `${(11 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            {
              id: 'immolation_arrow', name: '烈焰箭', req: 24, prereqs: ['exploding_arrow'],
              desc: '射出造成大量火焰伤害的箭矢，命中区域持续燃烧。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 60)} 火焰伤害`,
                burn: `每秒 ${Math.round(lv * 15 + 20)} 燃烧伤害`,
                duration: `${(4 + lv * 0.5).toFixed(1)} 秒`,
                mana: `${(9 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            {
              id: 'freezing_arrow', name: '冰冻箭', req: 30, prereqs: ['ice_arrow', 'strafe'],
              desc: '射出爆炸的冰冻箭矢，冻结范围内的敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 12 + 10)}-${Math.round(lv * 18 + 20)} 寒冰伤害`,
                freeze: `冻结 ${(2 + lv * 0.3).toFixed(1)} 秒`,
                radius: `${(2 + lv * 0.13).toFixed(1)} 码`,
                mana: `${(9 + lv * 0.5).toFixed(1)} 法力`
              })
            }
          ]
        },
        {
          name: '被动与魔法',
          nameEn: 'Passive & Magic',
          skills: [
            {
              id: 'inner_sight', name: '内视', req: 1, prereqs: [],
              desc: '降低附近敌人的防御值，使其更容易被击中。',
              levels: (lv) => ({
                defense: `-${Math.round(lv * 75 + 50)} 敌人防御`,
                radius: `${(5 + lv * 0.66).toFixed(1)} 码`,
                duration: `${(12 + lv * 4).toFixed(0)} 秒`,
                mana: `5 法力`
              })
            },
            {
              id: 'critical_strike', name: '暴击', req: 1, prereqs: [],
              desc: '被动技能：有几率造成双倍伤害。',
              levels: (lv) => ({
                chance: `${Math.min(80, Math.round(14 + lv * 6))}% 暴击概率`
              })
            },
            {
              id: 'dodge', name: '闪避', req: 6, prereqs: ['inner_sight'],
              desc: '被动技能：站立时有几率闪避近战攻击。',
              levels: (lv) => ({
                chance: `${Math.min(50, Math.round(18 + lv * 4))}% 闪避概率`
              })
            },
            {
              id: 'slow_missiles', name: '减速飞弹', req: 6, prereqs: ['inner_sight'],
              desc: '减慢附近敌人远程攻击的速度。',
              levels: (lv) => ({
                slow: `减速 ${Math.min(70, 33 + lv * 4)}%`,
                radius: `${(5 + lv * 0.66).toFixed(1)} 码`,
                duration: `${(12 + lv * 4).toFixed(0)} 秒`,
                mana: `5 法力`
              })
            },
            {
              id: 'avoid', name: '规避', req: 12, prereqs: ['dodge'],
              desc: '被动技能：移动时有几率闪避远程攻击。',
              levels: (lv) => ({
                chance: `${Math.min(50, Math.round(18 + lv * 4))}% 规避概率`
              })
            },
            {
              id: 'penetrate', name: '穿透', req: 18, prereqs: ['critical_strike', 'avoid'],
              desc: '被动技能：提高攻击评级。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 60 + 70)}% 攻击评级`
              })
            },
            {
              id: 'decoy', name: '诱饵', req: 24, prereqs: ['slow_missiles', 'avoid'],
              desc: '召唤一个亚马逊分身吸引敌人注意。',
              levels: (lv) => ({
                life: `${Math.round(lv * 100 + 200)} 生命值`,
                duration: ``
              })
            },
            {
              id: 'evade', name: '躲避', req: 24, prereqs: ['dodge', 'avoid'],
              desc: '被动技能：任何情况下都有几率闪避攻击。',
              levels: (lv) => ({
                chance: `${Math.min(40, Math.round(14 + lv * 3))}% 躲避概率`
              })
            },
            {
              id: 'valkyrie', name: '武神女', req: 30, prereqs: ['decoy', 'penetrate'],
              desc: '召唤强力的武神女战士协助战斗。',
              levels: (lv) => ({
                life: `${Math.round(lv * 400 + 800)} 生命值`,
                damage: `+${Math.round(lv * 20 + 50)}% 伤害`,
                mana: `35 法力`
              })
            },
            {
              id: 'pierce', name: '穿刺', req: 30, prereqs: ['penetrate', 'evade'],
              desc: '被动技能：箭矢和标枪有几率穿透敌人。',
              levels: (lv) => ({
                chance: `${Math.min(80, Math.round(15 + lv * 5))}% 穿透概率`
              })
            }
          ]
        },
        {
          name: '标枪与长矛',
          nameEn: 'Javelin & Spear',
          skills: [
            {
              id: 'jab', name: '戳刺', req: 1, prereqs: [],
              desc: '快速连续刺击，但每次攻击伤害略有降低。',
              levels: (lv) => ({
                attacks: `${2 + Math.floor(lv / 5)} 次攻击`,
                damage: `-${Math.max(5, 25 - lv * 2)}% 每次伤害`,
                mana: `${(2 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'power_strike', name: '强力一击', req: 6, prereqs: ['jab'],
              desc: '强力攻击，附加闪电伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 10 + 5)}-${Math.round(lv * 15 + 10)} 闪电伤害`,
                mana: `${(2 + lv * 0.15).toFixed(1)} 法力`
              })
            },
            {
              id: 'poison_javelin', name: '毒素标枪', req: 6, prereqs: ['jab'],
              desc: '投掷毒素标枪，留下毒云。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 25 + 30)} 毒素伤害/秒`,
                duration: ``
              })
            },
            {
              id: 'impale', name: '穿刺攻击', req: 12, prereqs: ['power_strike'],
              desc: '极为强力的单次刺击，忽视部分防御。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 30 + 100)}% 伤害`,
                ar: `-${Math.max(10, 50 - lv * 3)}% 攻击评级`,
                mana: `${(5 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'lightning_bolt', name: '雷霆闪电', req: 12, prereqs: ['power_strike', 'poison_javelin'],
              desc: '将标枪变为闪电射出。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 60)} 闪电伤害`,
                mana: `${(5 + lv * 0.25).toFixed(1)} 法力`
              })
            },
            {
              id: 'charged_strike', name: '充能突刺', req: 18, prereqs: ['impale', 'lightning_bolt'],
              desc: '攻击时释放多道闪电。',
              levels: (lv) => ({
                bolts: `${3 + Math.floor(lv / 4)} 道闪电`,
                damage: `${Math.round(lv * 12 + 8)}-${Math.round(lv * 18 + 15)} 每道`,
                mana: `${(5 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'plague_javelin', name: '瘟疫标枪', req: 18, prereqs: ['poison_javelin'],
              desc: '投掷散布毒云的标枪。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 40 + 50)} 毒素伤害/秒`,
                radius: `${(2 + lv * 0.2).toFixed(1)} 码`,
                mana: `${(9 + lv * 0.4).toFixed(1)} 法力`
              })
            },
            {
              id: 'fend', name: '连环刺', req: 24, prereqs: ['impale', 'charged_strike'],
              desc: '快速连续攻击多个相邻目标。',
              levels: (lv) => ({
                targets: `最多 ${4 + Math.floor(lv / 5)} 个目标`,
                mana: `${(9 + lv * 0.4).toFixed(1)} 法力`
              })
            },
            {
              id: 'lightning_strike', name: '闪电连击', req: 30, prereqs: ['charged_strike', 'fend'],
              desc: '攻击时产生连锁闪电攻击多个敌人。',
              levels: (lv) => ({
                targets: `${3 + Math.floor(lv / 3)} 个目标`,
                damage: `${Math.round(lv * 25 + 30)}-${Math.round(lv * 40 + 60)} 闪电伤害`,
                mana: `${(11 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            {
              id: 'lightning_fury', name: '雷霆狂怒', req: 30, prereqs: ['plague_javelin', 'lightning_strike'],
              desc: '投掷标枪，命中后释放多道闪电。',
              levels: (lv) => ({
                bolts: `${3 + Math.floor(lv / 2)} 道闪电`,
                damage: `${Math.round(lv * 20 + 20)}-${Math.round(lv * 35 + 45)} 每道`,
                mana: `${(11 + lv * 0.5).toFixed(1)} 法力`
              })
            }
          ]
        }
      ]
    },

    necromancer: {
      name: '死灵法师',
      nameEn: 'Necromancer',
      icon: '💀',
      description: '来自克里文部落的黑暗术士，操控死亡与腐化之力，善于召唤亡灵大军。',
      baseStats: { str: 15, dex: 25, vit: 15, ene: 25 },
      baseLife: 45, lifePerLevel: 1.5, lifePerVit: 2,
      baseMana: 25, manaPerLevel: 2, manaPerEne: 2,
      baseStamina: 79, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#7a9e52',
      trees: [
        {
          name: '召唤技能',
          nameEn: 'Summoning Spells',
          skills: [
            {
              id: 'skeleton_mastery', name: '骷髅精通', req: 1, prereqs: [],
              desc: '提升召唤骷髅和骷髅法师的生命和伤害。',
              levels: (lv) => ({
                life: `+${Math.round(lv * 20 + 20)}% 骷髅生命`,
                damage: `+${Math.round(lv * 15 + 15)}% 骷髅伤害`
              })
            },
            {
              id: 'raise_skeleton', name: '召唤骷髅', req: 1, prereqs: [],
              desc: '从尸体中召唤骷髅战士。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv * 0.5)} 个骷髅`,
                damage: `${Math.round(lv * 5 + 5)}-${Math.round(lv * 8 + 10)} 伤害`,
                mana: `13 法力`
              })
            },
            {
              id: 'clay_golem', name: '泥土魔像', req: 6, prereqs: ['raise_skeleton'],
              desc: '召唤一个减慢敌人速度的泥土魔像。',
              levels: (lv) => ({
                life: `${Math.round(lv * 60 + 100)} 生命`,
                damage: `${Math.round(lv * 10 + 12)}-${Math.round(lv * 15 + 20)} 伤害`,
                slow: `减速 ${Math.min(50, 10 + lv * 3)}%`,
                mana: `25 法力`
              })
            },
            {
              id: 'raise_skeletal_mage', name: '召唤骷髅法师', req: 12, prereqs: ['skeleton_mastery', 'raise_skeleton'],
              desc: '召唤骷髅魔法师，攻击类型随机（火/冰/毒/闪）。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv * 0.4)} 个`,
                damage: `${Math.round(lv * 8 + 10)}-${Math.round(lv * 12 + 18)} 伤害`,
                mana: `20 法力`
              })
            },
            {
              id: 'blood_golem', name: '血液魔像', req: 12, prereqs: ['clay_golem'],
              desc: '召唤血液魔像，与法师共享生命。',
              levels: (lv) => ({
                life: `${Math.round(lv * 80 + 180)} 生命`,
                lifeLink: `攻击吸收 ${Math.min(45, 5 + lv * 3)}% 生命`
              })
            },
            {
              id: 'summon_resist', name: '召唤抗性', req: 12, prereqs: ['raise_skeleton'],
              desc: '提升所有召唤物的元素抗性。',
              levels: (lv) => ({
                resist: `+${Math.min(75, lv * 8 + 20)}% 所有抗性`
              })
            },
            {
              id: 'iron_golem', name: '铁铁魔像', req: 18, prereqs: ['blood_golem'],
              desc: '从金属物品创造铁铁魔像，继承物品属性。',
              levels: (lv) => ({
                life: `${Math.round(lv * 100 + 300)} 生命`,
                thorns: `反伤 ${Math.round(lv * 10 + 10)}% 伤害`
              })
            },
            {
              id: 'fire_golem', name: '火焰魔像', req: 24, prereqs: ['iron_golem'],
              desc: '召唤强力的火焰魔像，免疫火焰。',
              levels: (lv) => ({
                life: `${Math.round(lv * 120 + 400)} 生命`,
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 火焰伤害`,
                aura: `吸收火焰并治疗`
              })
            },
            {
              id: 'revive', name: '复活', req: 24, prereqs: ['raise_skeletal_mage', 'iron_golem'],
              desc: '复活一个怪物尸体作为临时盟友。',
              levels: (lv) => ({
                max: `最多 ${1 + lv} 个复活体`,
                duration: `180 秒`,
                mana: `45 法力`
              })
            }
          ]
        },
        {
          name: '毒素与骨术',
          nameEn: 'Poison & Bone',
          skills: [
            {
              id: 'teeth', name: '利齿', req: 1, prereqs: [],
              desc: '射出多颗飞旋骨刺，穿刺敌人。',
              levels: (lv) => ({
                teeth: `${1 + Math.floor(lv * 0.7)} 颗骨刺`,
                damage: `${Math.round(lv * 3 + 3)}-${Math.round(lv * 5 + 5)} 魔法伤害`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'bone_armor', name: '骨甲', req: 1, prereqs: [],
              desc: '创造骨骼护甲，吸收一定量的物理伤害。',
              levels: (lv) => ({
                absorb: `吸收 ${Math.round(lv * 15 + 30)} 点物理伤害`,
                mana: `11 法力`
              })
            },
            {
              id: 'poison_dagger', name: '毒刃', req: 6, prereqs: ['teeth'],
              desc: '用毒素涂抹匕首进行攻击。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 30 + 40)} 毒素伤害（持续2秒）`,
                mana: `3 法力`
              })
            },
            {
              id: 'corpse_explosion', name: '爆裂尸体', req: 6, prereqs: ['bone_armor'],
              desc: '引爆尸体，对周围敌人造成大量伤害。',
              levels: (lv) => ({
                damage: `尸体 ${Math.min(100, 60 + lv * 5)}% 生命值为范围伤害`,
                radius: `${(1.3 + lv * 0.13).toFixed(1)} 码`,
                mana: `${(15 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            {
              id: 'bone_wall', name: '骨墙', req: 12, prereqs: ['bone_armor'],
              desc: '召唤骨骼墙作为障碍。',
              levels: (lv) => ({
                life: `${Math.round(lv * 50 + 100)} 骨墙生命`,
                segments: `${2 + Math.floor(lv / 4)} 段`,
                mana: `25 法力`
              })
            },
            {
              id: 'poison_explosion', name: '毒素爆炸', req: 12, prereqs: ['poison_dagger', 'corpse_explosion'],
              desc: '引爆尸体释放毒云。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 50 + 80)} 毒素伤害/秒`,
                duration: ``
              })
            },
            {
              id: 'bone_spear', name: '骨刺', req: 18, prereqs: ['teeth', 'bone_wall'],
              desc: '射出穿透多个敌人的骨刺。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 40)}-${Math.round(lv * 30 + 60)} 魔法伤害`,
                mana: `${(9 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            {
              id: 'bone_prison', name: '骨囚', req: 18, prereqs: ['bone_wall'],
              desc: '用骨墙困住目标。',
              levels: (lv) => ({
                life: `${Math.round(lv * 100 + 200)} 骨囚生命`,
                mana: `25 法力`
              })
            },
            {
              id: 'poison_nova', name: '毒素新星', req: 24, prereqs: ['poison_explosion'],
              desc: '向四周释放毒素波，影响所有附近敌人。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 80 + 150)} 毒素伤害（持续2秒）`,
                radius: `整屏范围`,
                mana: `18 法力`
              })
            },
            {
              id: 'bone_spirit', name: '骨灵', req: 30, prereqs: ['bone_spear', 'bone_prison'],
              desc: '召唤追踪目标的骨灵，造成高额魔法伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 40 + 100)}-${Math.round(lv * 60 + 150)} 魔法伤害`,
                mana: `${(22 + lv).toFixed(0)} 法力`
              })
            }
          ]
        },
        {
          name: '诅咒',
          nameEn: 'Curses',
          skills: [
            {
              id: 'amplify_damage', name: '放大伤害', req: 1, prereqs: [],
              desc: '诅咒目标，使其受到的物理伤害增加100%。',
              levels: (lv) => ({
                damage: `+100% 物理伤害受到量`,
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'dim_vision', name: '暗视', req: 6, prereqs: ['amplify_damage'],
              desc: '使敌人视野减小，降低其移动和攻击范围。',
              levels: (lv) => ({
                radius: `${(2 + lv * 0.33).toFixed(1)} 码诅咒范围`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `13 法力`
              })
            },
            {
              id: 'weaken', name: '削弱', req: 6, prereqs: ['amplify_damage'],
              desc: '降低敌人的伤害输出。',
              levels: (lv) => ({
                damage: `-${Math.min(70, 33 + lv * 3)}% 敌人伤害`,
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'iron_maiden', name: '铁处女', req: 12, prereqs: ['dim_vision'],
              desc: '诅咒目标，使其受到自身攻击伤害的反伤。',
              levels: (lv) => ({
                reflect: `反伤 ${Math.min(200, 100 + lv * 15)}% 近战伤害`,
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'terror', name: '恐惧', req: 12, prereqs: ['weaken'],
              desc: '使敌人逃跑。',
              levels: (lv) => ({
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(5 + lv).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'confuse', name: '迷惑', req: 18, prereqs: ['dim_vision', 'terror'],
              desc: '使敌人随机攻击周围的东西，包括其他敌人。',
              levels: (lv) => ({
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `13 法力`
              })
            },
            {
              id: 'life_tap', name: '生命吸取', req: 18, prereqs: ['iron_maiden', 'terror'],
              desc: '诅咒目标，使攻击者恢复造成伤害50%的生命。',
              levels: (lv) => ({
                leech: `${Math.min(100, 50 + lv * 5)}% 吸血比例`,
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(5 + lv * 2).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'attract', name: '吸引', req: 24, prereqs: ['confuse'],
              desc: '诅咒单个目标，使其他敌人攻击它。',
              levels: (lv) => ({
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `17 法力`
              })
            },
            {
              id: 'decrepify', name: '腐朽', req: 24, prereqs: ['life_tap', 'attract'],
              desc: '减慢敌人速度，降低其抗性和伤害。',
              levels: (lv) => ({
                slow: `减速 ${Math.min(75, 33 + lv * 3)}%`,
                physRes: `-${Math.min(50, 10 + lv * 3)}% 物理抗性`,
                damage: `-${Math.min(50, 33 + lv * 2)}% 伤害`,
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(4 + lv).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'lower_resist', name: '降低抗性', req: 30, prereqs: ['decrepify'],
              desc: '大幅降低敌人的元素抗性。',
              levels: (lv) => ({
                resist: `-${Math.min(70, 35 + lv * 4)}% 所有元素抗性`,
                radius: `${(2 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(5 + lv * 2).toFixed(0)} 秒`,
                mana: `22 法力`
              })
            }
          ]
        }
      ]
    },

    barbarian: {
      name: '野蛮人',
      nameEn: 'Barbarian',
      icon: '⚔️',
      description: '来自荒原的野蛮战士，力大无穷，精通各种近战武器，可同时双持武器。',
      baseStats: { str: 30, dex: 20, vit: 25, ene: 10 },
      baseLife: 55, lifePerLevel: 2, lifePerVit: 4,
      baseMana: 10, manaPerLevel: 1, manaPerEne: 1,
      baseStamina: 92, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#c04040',
      trees: [
        {
          name: '战吼技能',
          nameEn: 'Warcries',
          skills: [
            {
              id: 'howl', name: '嚎叫', req: 1, prereqs: [],
              desc: '发出可怕的嚎叫使附近的怪物逃跑。',
              levels: (lv) => ({
                radius: `${(4 + lv * 0.66).toFixed(1)} 码`,
                duration: `${(5 + lv * 2).toFixed(0)} 秒`,
                mana: `4 法力`
              })
            },
            {
              id: 'find_potion', name: '寻找药水', req: 1, prereqs: [],
              desc: '从尸体中搜寻药水。',
              levels: (lv) => ({
                chance: `${Math.min(75, 25 + lv * 5)}% 找到药水`,
                mana: `2 法力`
              })
            },
            {
              id: 'taunt', name: '嘲讽', req: 6, prereqs: ['howl'],
              desc: '激怒单个目标使其主动靠近并降低其伤害。',
              levels: (lv) => ({
                damage: `-${Math.min(75, 15 + lv * 5)}% 目标伤害`,
                attackRate: `-${Math.min(50, 10 + lv * 3)}% 目标攻速`,
                mana: `3 法力`
              })
            },
            {
              id: 'shout', name: '喊叫', req: 6, prereqs: ['howl'],
              desc: '提升自己和队友的防御值。',
              levels: (lv) => ({
                defense: `+${Math.round(lv * 50 + 100)}% 防御`,
                radius: `整屏`,
                duration: `${(12 + lv * 2.4).toFixed(0)} 秒`,
                mana: `9 法力`
              })
            },
            {
              id: 'find_item', name: '寻找物品', req: 12, prereqs: ['find_potion', 'taunt'],
              desc: '从尸体中搜寻额外的物品。',
              levels: (lv) => ({
                chance: `${Math.min(50, 14 + lv * 3)}% 找到物品`,
                mana: `7 法力`
              })
            },
            {
              id: 'battle_cry', name: '战斗吼叫', req: 18, prereqs: ['taunt', 'shout'],
              desc: '降低附近敌人的防御和伤害。',
              levels: (lv) => ({
                defense: `-${Math.min(100, 25 + lv * 5)}% 敌人防御`,
                damage: `-${Math.min(50, 10 + lv * 3)}% 敌人伤害`,
                radius: `${(3.3 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'battle_orders', name: '战斗命令', req: 24, prereqs: ['shout', 'battle_cry'],
              desc: '提升自己和队友的生命、法力和耐力上限。',
              levels: (lv) => ({
                life: `+${Math.min(100, 45 + lv * 3)}% 最大生命`,
                mana: `+${Math.min(100, 45 + lv * 3)}% 最大法力`,
                radius: `整屏`,
                duration: `${(12 + lv * 2.4).toFixed(0)} 秒`,
                manaCost: `11 法力`
              })
            },
            {
              id: 'grim_ward', name: '恐惧旗帜', req: 24, prereqs: ['find_item'],
              desc: '在尸体上插旗，使附近敌人逃跑。',
              levels: (lv) => ({
                radius: `${(3.3 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(8 + lv * 2).toFixed(0)} 秒`,
                mana: `4 法力`
              })
            },
            {
              id: 'war_cry', name: '战吼', req: 30, prereqs: ['battle_cry'],
              desc: '释放强力战吼，对附近敌人造成魔法伤害并使其眩晕。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 5)}-${Math.round(lv * 8 + 8)} 魔法伤害`,
                radius: `${(3.3 + lv * 0.33).toFixed(1)} 码`,
                stun: `眩晕 ${(1 + lv * 0.2).toFixed(1)} 秒`,
                mana: `5 法力`
              })
            },
            {
              id: 'battle_command', name: '战斗指挥', req: 30, prereqs: ['battle_orders'],
              desc: '为自己和队友的技能等级+1。',
              levels: (lv) => ({
                skills: `+1 全技能等级`,
                bonus: `+${Math.round(lv * 5)}% 其他战吼持续时间`,
                duration: `${(12 + lv * 2.4).toFixed(0)} 秒`,
                mana: `16 法力`
              })
            }
          ]
        },
        {
          name: '战斗精通',
          nameEn: 'Combat Masteries',
          skills: [
            {
              id: 'sword_mastery', name: '剑术精通', req: 1, prereqs: [],
              desc: '提升使用剑的攻击评级、伤害和暴击率。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 剑攻击评级`,
                damage: `+${Math.round(lv * 15 + 28)}% 剑伤害`,
                critChance: `+${Math.min(50, lv * 3)}% 暴击`
              })
            },
            {
              id: 'axe_mastery', name: '斧头精通', req: 1, prereqs: [],
              desc: '提升使用斧头的攻击评级、伤害和暴击率。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 斧攻击评级`,
                damage: `+${Math.round(lv * 15 + 28)}% 斧伤害`,
                critChance: `+${Math.min(50, lv * 3)}% 暴击`
              })
            },
            {
              id: 'mace_mastery', name: '钉锤精通', req: 1, prereqs: [],
              desc: '提升使用钉锤的攻击评级、伤害和暴击率。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 锤攻击评级`,
                damage: `+${Math.round(lv * 15 + 28)}% 锤伤害`,
                critChance: `+${Math.min(50, lv * 3)}% 暴击`
              })
            },
            {
              id: 'pole_arm_mastery', name: '长柄武器精通', req: 6, prereqs: ['axe_mastery'],
              desc: '提升使用长柄武器的攻击评级、伤害和暴击率。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 长柄武器攻击评级`,
                damage: `+${Math.round(lv * 15 + 28)}% 长柄武器伤害`,
                critChance: `+${Math.min(50, lv * 3)}% 暴击`
              })
            },
            {
              id: 'throwing_mastery', name: '投掷精通', req: 6, prereqs: ['axe_mastery'],
              desc: '提升投掷武器的攻击评级、伤害和数量。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 投掷攻击评级`,
                damage: `+${Math.round(lv * 12 + 20)}% 投掷伤害`,
                quantity: `+${Math.round(lv * 15 + 20)}% 投掷武器数量`
              })
            },
            {
              id: 'spear_mastery', name: '长矛精通', req: 6, prereqs: ['pole_arm_mastery'],
              desc: '提升使用长矛的攻击评级、伤害和暴击率。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 长矛攻击评级`,
                damage: `+${Math.round(lv * 15 + 28)}% 长矛伤害`,
                critChance: `+${Math.min(50, lv * 3)}% 暴击`
              })
            },
            {
              id: 'increased_stamina', name: '增加耐力', req: 1, prereqs: [],
              desc: '增加耐力上限和耐力恢复速度。',
              levels: (lv) => ({
                stamina: `+${Math.round(lv * 15 + 30)}% 耐力`,
                recovery: `+${Math.round(lv * 10 + 10)}% 耐力恢复`
              })
            },
            {
              id: 'iron_skin', name: '钢铁之皮', req: 6, prereqs: ['increased_stamina'],
              desc: '增加防御值。',
              levels: (lv) => ({
                defense: `+${Math.round(lv * 15 + 30)}% 防御`
              })
            },
            {
              id: 'increased_speed', name: '增加速度', req: 12, prereqs: ['increased_stamina', 'iron_skin'],
              desc: '增加移动和攻击速度。',
              levels: (lv) => ({
                moveSpeed: `+${Math.round(lv * 3 + 13)}% 移动速度`,
                walkRun: `跑步消耗耐力减少`
              })
            },
            {
              id: 'natural_resistance', name: '自然抗性', req: 24, prereqs: ['increased_speed'],
              desc: '提升所有元素抗性。',
              levels: (lv) => ({
                resist: `+${Math.min(40, lv * 2 + 8)}% 所有抗性`
              })
            }
          ]
        },
        {
          name: '战斗技能',
          nameEn: 'Combat Skills',
          skills: [
            {
              id: 'bash', name: '猛击', req: 1, prereqs: [],
              desc: '强力一击，造成额外伤害并击退目标。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 60)}% 伤害`,
                arBonus: `+${Math.round(lv * 25 + 25)}% 攻击评级`,
                knockback: `击退`,
                mana: `${(2 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'leap', name: '跳跃', req: 6, prereqs: ['bash'],
              desc: '向目标位置跳跃，击退附近敌人。',
              levels: (lv) => ({
                radius: `${(1.3 + lv * 0.13).toFixed(1)} 码击退范围`,
                mana: `${(2 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'double_swing', name: '双重挥击', req: 6, prereqs: ['bash'],
              desc: '双持武器时同时挥击两次。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 10 + 20)}% 伤害`,
                mana: `0（如双持则减少法力消耗）`
              })
            },
            {
              id: 'stun', name: '眩晕', req: 12, prereqs: ['bash', 'double_swing'],
              desc: '攻击使目标短暂眩晕。',
              levels: (lv) => ({
                duration: `眩晕 ${(0.4 + lv * 0.2).toFixed(1)} 秒`,
                damage: `+${Math.round(lv * 15 + 60)}% 伤害`,
                mana: `${(3 + lv * 0.15).toFixed(1)} 法力`
              })
            },
            {
              id: 'double_throw', name: '双重投掷', req: 12, prereqs: ['double_swing'],
              desc: '同时投掷双手中的武器。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 10 + 25)}% 伤害`,
                mana: `2 法力`
              })
            },
            {
              id: 'leap_attack', name: '跳跃攻击', req: 18, prereqs: ['leap', 'stun'],
              desc: '跳向目标并造成伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 25 + 100)}% 伤害`,
                radius: `${(2 + lv * 0.2).toFixed(1)} 码`,
                mana: `${(9 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'concentrate', name: '集中攻击', req: 18, prereqs: ['bash', 'stun'],
              desc: '强力单次攻击，不可被中断，提高防御和伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 30 + 100)}% 伤害`,
                defense: `+${Math.round(lv * 50 + 100)}% 防御（施法时）`,
                mana: `${(3 + lv * 0.15).toFixed(1)} 法力`
              })
            },
            {
              id: 'frenzy', name: '狂热', req: 24, prereqs: ['double_swing', 'double_throw'],
              desc: '双持攻击，每次命中增加攻速和移速，最多叠加12层。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 15 + 60)}% 伤害`,
                speed: `每层 +${Math.round(lv * 1 + 5)}% 攻速/移速，最多12层`,
                mana: `3 法力`
              })
            },
            {
              id: 'whirlwind', name: '旋风斩', req: 30, prereqs: ['concentrate', 'frenzy'],
              desc: '旋转移动并攻击路径上的所有敌人。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 10 + 50)}% 伤害`,
                mana: `25 法力`
              })
            },
            {
              id: 'berserk', name: '狂暴', req: 30, prereqs: ['concentrate'],
              desc: '进入狂暴状态，攻击造成额外魔法伤害但降低防御。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 100)}% 魔法伤害`,
                defense: `-100% 防御`,
                mana: `4 法力`
              })
            }
          ]
        }
      ]
    },

    sorceress: {
      name: '女巫',
      nameEn: 'Sorceress',
      icon: '🔮',
      description: '精通元素魔法的强大法师，可操控火焰、寒冰和闪电三系元素力量。',
      baseStats: { str: 10, dex: 25, vit: 10, ene: 35 },
      baseLife: 40, lifePerLevel: 1, lifePerVit: 2,
      baseMana: 35, manaPerLevel: 2, manaPerEne: 2,
      baseStamina: 74, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#9b59b6',
      trees: [
        {
          name: '火系魔法',
          nameEn: 'Fire Spells',
          skills: [
            {
              id: 'fire_bolt', name: '火焰弹', req: 1, prereqs: [],
              desc: '射出一颗火焰弹，造成火焰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 6 + 8)}-${Math.round(lv * 9 + 14)} 火焰伤害`,
                mana: `${(2 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'warmth', name: '暖意', req: 1, prereqs: [],
              desc: '被动技能：加快法力恢复速度。',
              levels: (lv) => ({
                manaRegen: `+${Math.round(lv * 24 + 24)}% 法力恢复速度`
              })
            },
            {
              id: 'inferno', name: '地狱之火', req: 6, prereqs: ['fire_bolt'],
              desc: '喷射火焰流，持续对前方造成火焰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 10 + 20)}-${Math.round(lv * 15 + 35)} 火焰伤害/秒`,
                mana: `每秒 ${(2 + lv * 0.15).toFixed(1)} 法力`
              })
            },
            {
              id: 'fire_ball', name: '火焰球', req: 12, prereqs: ['fire_bolt', 'inferno'],
              desc: '射出火焰球，命中后爆炸造成范围伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 15 + 30)}-${Math.round(lv * 22 + 50)} 火焰伤害`,
                radius: `${(1.3 + lv * 0.13).toFixed(1)} 码`,
                mana: `${(5 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'fire_wall', name: '火焰墙', req: 18, prereqs: ['fire_ball'],
              desc: '召唤一面火焰墙，阻挡并灼烧穿越的敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 40 + 50)}-${Math.round(lv * 60 + 90)} 火焰伤害/秒`,
                duration: `${(4 + lv * 0.4).toFixed(1)} 秒`,
                mana: `18 法力`
              })
            },
            {
              id: 'enchant', name: '火焰附魔', req: 18, prereqs: ['fire_bolt', 'warmth'],
              desc: '为目标的攻击附加火焰伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 40)} 火焰伤害到攻击`,
                ar: `+${Math.round(lv * 100 + 200)}% 攻击评级`,
                duration: `600 秒`,
                mana: `25 法力`
              })
            },
            {
              id: 'meteor', name: '陨石', req: 24, prereqs: ['fire_ball', 'fire_wall'],
              desc: '从天而降的巨大陨石，造成大量火焰伤害并留下火焰区域。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 80 + 200)}-${Math.round(lv * 120 + 320)} 火焰伤害`,
                dot: `每秒 ${Math.round(lv * 30 + 60)} 灼伤`,
                radius: `${(2 + lv * 0.13).toFixed(1)} 码`,
                mana: `18 法力`
              })
            },
            {
              id: 'fire_mastery', name: '火焰精通', req: 30, prereqs: ['enchant', 'meteor'],
              desc: '被动技能：提升所有火系技能的伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 6 + 6)}% 火焰技能伤害`
              })
            },
            {
              id: 'hydra', name: '九头蛇', req: 30, prereqs: ['meteor'],
              desc: '召唤可以自动射击的三头火龙。',
              levels: (lv) => ({
                heads: `3 头九头蛇`,
                damage: `${Math.round(lv * 12 + 25)}-${Math.round(lv * 18 + 40)} 火焰伤害/发`,
                duration: `10 秒`,
                mana: `20 法力`
              })
            }
          ]
        },
        {
          name: '冰系魔法',
          nameEn: 'Cold Spells',
          skills: [
            {
              id: 'ice_bolt', name: '冰霜弹', req: 1, prereqs: [],
              desc: '射出冰霜弹，造成寒冰伤害并减速目标。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 6)}-${Math.round(lv * 7 + 10)} 寒冰伤害`,
                slow: `减速 ${Math.min(50, 20 + lv * 2)}%`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'frozen_armor', name: '冰冻护甲', req: 1, prereqs: [],
              desc: '冰冻护甲提供防御加成，并冻结近战攻击者。',
              levels: (lv) => ({
                defense: `+${Math.round(lv * 15 + 20)}% 防御`,
                duration: `${(18 + lv * 6).toFixed(0)} 秒`,
                mana: `7 法力`
              })
            },
            {
              id: 'frost_nova', name: '寒霜新星', req: 6, prereqs: ['ice_bolt'],
              desc: '释放寒霜波，冻结周围敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 8 + 8)}-${Math.round(lv * 12 + 15)} 寒冰伤害`,
                freeze: `冻结 ${(0.5 + lv * 0.2).toFixed(1)} 秒`,
                radius: `整屏范围`,
                mana: `9 法力`
              })
            },
            {
              id: 'ice_blast', name: '冰霜爆炸', req: 6, prereqs: ['ice_bolt', 'frozen_armor'],
              desc: '射出强力冰霜弹，造成大量寒冰伤害并冻结敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 12 + 15)}-${Math.round(lv * 18 + 25)} 寒冰伤害`,
                freeze: `冻结 ${(0.8 + lv * 0.25).toFixed(1)} 秒`,
                mana: `${(6 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'shiver_armor', name: '寒甲', req: 12, prereqs: ['frozen_armor', 'frost_nova'],
              desc: '冻结攻击者并提供更强防御。',
              levels: (lv) => ({
                defense: `+${Math.round(lv * 20 + 30)}% 防御`,
                damage: `${Math.round(lv * 5 + 10)}-${Math.round(lv * 8 + 18)} 寒冰伤害给攻击者`,
                duration: `${(18 + lv * 6).toFixed(0)} 秒`,
                mana: `13 法力`
              })
            },
            {
              id: 'glacial_spike', name: '冰川突刺', req: 18, prereqs: ['ice_blast', 'shiver_armor'],
              desc: '射出冰川突刺，在敌人之间爆炸并冻结。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 25 + 40)}-${Math.round(lv * 40 + 70)} 寒冰伤害`,
                freeze: `冻结 ${(1.2 + lv * 0.3).toFixed(1)} 秒`,
                mana: `10 法力`
              })
            },
            {
              id: 'blizzard', name: '暴风雪', req: 24, prereqs: ['glacial_spike'],
              desc: '召唤大型暴风雪区域，持续对敌人造成寒冰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 40 + 80)}-${Math.round(lv * 60 + 130)} 寒冰伤害`,
                duration: `${(2.4 + lv * 0.4).toFixed(1)} 秒`,
                radius: `${(2.6 + lv * 0.13).toFixed(1)} 码`,
                mana: `18 法力`
              })
            },
            {
              id: 'cold_mastery', name: '寒冰精通', req: 30, prereqs: ['blizzard'],
              desc: '被动技能：降低敌人的寒冰抗性（穿透抗性）。',
              levels: (lv) => ({
                penetration: `-${Math.min(100, lv * 5 + 20)}% 敌人寒冰抗性`
              })
            },
            {
              id: 'frozen_orb', name: '冰冻法球', req: 30, prereqs: ['blizzard'],
              desc: '射出旋转的冰冻法球，向四周散射冰霜弹。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 40)}-${Math.round(lv * 30 + 65)} 寒冰伤害`,
                bolts: `射出大量冰霜弹`,
                mana: `25 法力`
              })
            }
          ]
        },
        {
          name: '闪电魔法',
          nameEn: 'Lightning Spells',
          skills: [
            {
              id: 'charged_bolt', name: '充电闪电', req: 1, prereqs: [],
              desc: '释放多道随机方向的小型闪电。',
              levels: (lv) => ({
                bolts: `${3 + Math.floor(lv * 0.4)} 道闪电`,
                damage: `${Math.round(lv * 2 + 1)}-${Math.round(lv * 3 + 3)} 闪电伤害/道`,
                mana: `${(2 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'static_field', name: '静电场', req: 6, prereqs: ['charged_bolt'],
              desc: '对附近所有敌人造成当前生命25%的伤害（无法致死）。',
              levels: (lv) => ({
                damage: `25% 敌人当前生命`,
                radius: `${(3.3 + lv * 0.66).toFixed(1)} 码`,
                mana: `9 法力`
              })
            },
            {
              id: 'telekinesis', name: '心灵感应', req: 6, prereqs: ['charged_bolt'],
              desc: '远程击退目标并造成少量魔法伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 5)}-${Math.round(lv * 8 + 8)} 魔法伤害`,
                mana: `3 法力`
              })
            },
            {
              id: 'nova', name: '新星', req: 12, prereqs: ['static_field'],
              desc: '向四周释放闪电新星攻击所有敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 15 + 15)}-${Math.round(lv * 25 + 25)} 闪电伤害`,
                radius: `整屏`,
                mana: `15 法力`
              })
            },
            {
              id: 'lightning', name: '闪电', req: 12, prereqs: ['charged_bolt', 'static_field'],
              desc: '释放强力闪电，造成巨额伤害。',
              levels: (lv) => ({
                damage: `1-${Math.round(lv * 80 + 100)} 闪电伤害`,
                mana: `${(6 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'chain_lightning', name: '连锁闪电', req: 18, prereqs: ['lightning', 'nova'],
              desc: '闪电在多个目标之间跳跃。',
              levels: (lv) => ({
                damage: `1-${Math.round(lv * 60 + 90)} 闪电伤害`,
                targets: `最多 ${5 + Math.floor(lv / 4)} 个目标`,
                mana: `${(9 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'teleport', name: '传送', req: 18, prereqs: ['telekinesis'],
              desc: '瞬间移动到目标位置。',
              levels: (lv) => ({
                mana: `${Math.max(1, 24 - lv)} 法力`
              })
            },
            {
              id: 'thunder_storm', name: '雷暴', req: 24, prereqs: ['chain_lightning'],
              desc: '周期性地对附近敌人释放闪电。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 90)} 闪电伤害`,
                interval: `每 ${(2.5 - lv * 0.1).toFixed(1)} 秒一次`,
                duration: `${(24 + lv * 2.4).toFixed(0)} 秒`,
                mana: `17 法力`
              })
            },
            {
              id: 'energy_shield', name: '能量护盾', req: 24, prereqs: ['telekinesis', 'nova'],
              desc: '将部分受到的伤害转化为法力消耗。',
              levels: (lv) => ({
                absorb: `${Math.min(95, 20 + lv * 5)}% 伤害转为法力消耗`,
                conversion: `每点伤害消耗 ${(2 - lv * 0.05).toFixed(2)} 法力`
              })
            },
            {
              id: 'lightning_mastery', name: '闪电精通', req: 30, prereqs: ['thunder_storm', 'energy_shield'],
              desc: '被动技能：提升所有闪电技能的伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 6 + 6)}% 闪电技能伤害`
              })
            }
          ]
        }
      ]
    },

    paladin: {
      name: '圣骑士',
      nameEn: 'Paladin',
      icon: '🛡️',
      description: '扎卡鲁教会的战士，以圣洁之光为武器，守护盟友抵御黑暗的侵袭。',
      baseStats: { str: 25, dex: 20, vit: 25, ene: 15 },
      baseLife: 55, lifePerLevel: 2, lifePerVit: 3,
      baseMana: 15, manaPerLevel: 1.5, manaPerEne: 1.5,
      baseStamina: 89, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#f0c040',
      trees: [
        {
          name: '战斗技能',
          nameEn: 'Combat Skills',
          skills: [
            {
              id: 'sacrifice', name: '牺牲', req: 1, prereqs: [],
              desc: '强力攻击，消耗自身生命换取额外伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 180)}% 武器伤害`,
                selfDamage: `造成伤害的 ${Math.min(12, 8 + lv)}% 作为自身伤害`,
                mana: `0 法力（消耗生命）`
              })
            },
            {
              id: 'smite', name: '锤击', req: 1, prereqs: [],
              desc: '用盾牌猛击目标，造成伤害并击晕目标，此技能必定命中。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 10)}-${Math.round(lv * 8 + 18)} 伤害`,
                stun: `眩晕 ${(0.4 + lv * 0.2).toFixed(1)} 秒`,
                mana: `3 法力`
              })
            },
            {
              id: 'holy_bolt', name: '圣洁闪光', req: 6, prereqs: ['sacrifice'],
              desc: '射出可以治疗队友或伤害亡灵怪物的圣光。',
              levels: (lv) => ({
                heal: `恢复 ${Math.round(lv * 12 + 15)}-${Math.round(lv * 18 + 25)} 生命`,
                undeadDamage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 对亡灵伤害`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'zeal', name: '热忱', req: 12, prereqs: ['sacrifice', 'smite'],
              desc: '快速连续攻击多个相邻敌人。',
              levels: (lv) => ({
                attacks: `${2 + Math.floor(lv / 5)} 次攻击`,
                arBonus: `+${Math.round(lv * 25 + 25)}% 攻击评级`,
                mana: `2 法力`
              })
            },
            {
              id: 'charge', name: '冲锋', req: 12, prereqs: ['smite'],
              desc: '向目标冲锋，造成大量伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 30 + 90)}% 伤害`,
                arBonus: `+${Math.round(lv * 50 + 50)}% 攻击评级`,
                mana: `9 法力`
              })
            },
            {
              id: 'vengeance', name: '复仇', req: 18, prereqs: ['holy_bolt', 'zeal'],
              desc: '攻击附加元素伤害（火焰、寒冰、闪电各占一部分）。',
              levels: (lv) => ({
                fire: `+${Math.round(lv * 10 + 10)}% 火焰伤害`,
                cold: `+${Math.round(lv * 10 + 10)}% 寒冰伤害`,
                light: `+${Math.round(lv * 10 + 10)}% 闪电伤害`,
                mana: `4 法力`
              })
            },
            {
              id: 'blessed_hammer', name: '神圣之锤', req: 18, prereqs: ['smite', 'zeal'],
              desc: '召唤旋转的神圣之锤，造成大量魔法伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 30 + 60)}-${Math.round(lv * 50 + 100)} 魔法伤害`,
                mana: `${(3 + lv * 0.15).toFixed(1)} 法力`
              })
            },
            {
              id: 'conversion', name: '转化', req: 24, prereqs: ['charge', 'vengeance'],
              desc: '将怪物转化为己方单位，持续一段时间。',
              levels: (lv) => ({
                duration: ``,
                chance: `依据等级计算成功率`,
                mana: `35 法力`
              })
            },
            {
              id: 'holy_shield', name: '神圣之盾', req: 24, prereqs: ['smite', 'blessed_hammer'],
              desc: '大幅提升格挡率和盾牌防御。',
              levels: (lv) => ({
                block: `+${Math.round(lv * 5 + 20)}% 格挡率`,
                defense: `+${Math.round(lv * 20 + 40)}% 盾牌防御`,
                smieDamage: `+${Math.round(lv * 20 + 70)}% 盾击伤害`,
                duration: `${(30 + lv * 6).toFixed(0)} 秒`,
                mana: `35 法力`
              })
            },
            {
              id: 'fist_of_heavens', name: '天堂之拳', req: 30, prereqs: ['holy_bolt', 'blessed_hammer', 'conversion'],
              desc: '召唤闪电击打目标，并向四周释放圣洁闪光。',
              levels: (lv) => ({
                lightDamage: `${Math.round(lv * 30 + 80)}-${Math.round(lv * 50 + 140)} 闪电伤害`,
                bolts: `${5 + lv} 道圣洁闪光`,
                mana: `25 法力`
              })
            }
          ]
        },
        {
          name: '攻击光环',
          nameEn: 'Offensive Auras',
          skills: [
            {
              id: 'might', name: '神力', req: 1, prereqs: [],
              desc: '光环：提升自己和队友的攻击伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 15 + 35)}% 伤害`
              })
            },
            {
              id: 'holy_fire', name: '圣火', req: 6, prereqs: ['might'],
              desc: '光环：对附近敌人造成持续火焰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 3 + 2)}-${Math.round(lv * 5 + 5)} 火焰伤害/2秒`,
                attackFire: `+${Math.round(lv * 10 + 10)} 火焰攻击伤害`
              })
            },
            {
              id: 'thorns', name: '荆棘', req: 6, prereqs: ['might'],
              desc: '光环：使攻击者受到反伤。',
              levels: (lv) => ({
                reflect: `返还 ${Math.round(lv * 100 + 100)}% 近战伤害`
              })
            },
            {
              id: 'blessed_aim', name: '神圣目标', req: 12, prereqs: ['might'],
              desc: '光环：提升自己和队友的攻击评级。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 75 + 75)}% 攻击评级`
              })
            },
            {
              id: 'concentration', name: '专注', req: 18, prereqs: ['blessed_aim'],
              desc: '光环：大幅提升自己和队友的伤害，并减少施法被中断。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 125)}% 伤害`,
                interrupt: `大幅减少中断几率`
              })
            },
            {
              id: 'holy_freeze', name: '圣冻', req: 18, prereqs: ['holy_fire', 'blessed_aim'],
              desc: '光环：减慢附近敌人速度并造成寒冰伤害。',
              levels: (lv) => ({
                slow: `减速 ${Math.min(75, 33 + lv * 2)}%`,
                coldDamage: `${Math.round(lv * 4 + 4)}-${Math.round(lv * 6 + 6)} 寒冰伤害/2秒`
              })
            },
            {
              id: 'fanaticism', name: '狂热', req: 24, prereqs: ['concentration'],
              desc: '光环：提升攻速、伤害和攻击评级。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 15 + 90)}% 伤害`,
                ar: `+${Math.round(lv * 15 + 90)}% 攻击评级`,
                attackSpeed: `+${Math.round(lv * 5 + 30)}% 攻击速度`
              })
            },
            {
              id: 'conviction', name: '确信', req: 24, prereqs: ['holy_freeze', 'holy_fire'],
              desc: '光环：降低附近敌人的元素抗性和防御。',
              levels: (lv) => ({
                defense: `-${Math.min(200, lv * 15 + 50)}% 敌人防御`,
                resist: `-${Math.min(100, lv * 5 + 20)}% 敌人元素抗性`
              })
            },
            {
              id: 'holy_shock', name: '圣电', req: 24, prereqs: ['holy_fire'],
              desc: '光环：对附近敌人造成持续闪电伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 8 + 5)}-${Math.round(lv * 15 + 10)} 闪电伤害/2秒`
              })
            },
            {
              id: 'sanctuary', name: '庇护所', req: 30, prereqs: ['conviction', 'holy_shock'],
              desc: '光环：击退亡灵怪物并降低其抗性。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 魔法伤害（对亡灵）`,
                resist: `-${Math.min(100, lv * 5 + 20)}% 亡灵抗性`
              })
            }
          ]
        },
        {
          name: '防御光环',
          nameEn: 'Defensive Auras',
          skills: [
            {
              id: 'prayer', name: '祈祷', req: 1, prereqs: [],
              desc: '光环：持续恢复自己和队友的生命。',
              levels: (lv) => ({
                regen: `每2秒恢复 ${Math.round(lv * 3 + 4)} 生命`
              })
            },
            {
              id: 'resist_fire', name: '火焰抗性', req: 1, prereqs: [],
              desc: '光环：提升自己和队友的火焰抗性。',
              levels: (lv) => ({
                resist: `+${Math.min(50, lv * 3 + 15)}% 火焰抗性`
              })
            },
            {
              id: 'defiance', name: '蔑视', req: 6, prereqs: ['prayer'],
              desc: '光环：大幅提升自己和队友的防御值。',
              levels: (lv) => ({
                defense: `+${Math.round(lv * 30 + 50)}% 防御`
              })
            },
            {
              id: 'resist_cold', name: '寒冰抗性', req: 6, prereqs: ['resist_fire'],
              desc: '光环：提升自己和队友的寒冰抗性。',
              levels: (lv) => ({
                resist: `+${Math.min(50, lv * 3 + 15)}% 寒冰抗性`
              })
            },
            {
              id: 'cleansing', name: '净化', req: 12, prereqs: ['prayer', 'resist_fire'],
              desc: '光环：减少中毒和诅咒持续时间。',
              levels: (lv) => ({
                duration: `-${Math.min(75, lv * 5 + 20)}% 中毒/诅咒持续时间`
              })
            },
            {
              id: 'resist_lightning', name: '闪电抗性', req: 12, prereqs: ['resist_cold'],
              desc: '光环：提升自己和队友的闪电抗性。',
              levels: (lv) => ({
                resist: `+${Math.min(50, lv * 3 + 15)}% 闪电抗性`
              })
            },
            {
              id: 'vigor', name: '活力', req: 18, prereqs: ['defiance', 'cleansing'],
              desc: '光环：提升移动速度、耐力恢复和最大耐力。',
              levels: (lv) => ({
                moveSpeed: `+${Math.round(lv * 3 + 15)}% 移动速度`,
                stamina: `+${Math.round(lv * 10 + 50)}% 耐力`,
                staminaRegen: `+${Math.round(lv * 5 + 25)}% 耐力恢复`
              })
            },
            {
              id: 'meditation', name: '冥想', req: 24, prereqs: ['cleansing', 'resist_lightning'],
              desc: '光环：大幅提升自己和队友的法力恢复速度。',
              levels: (lv) => ({
                manaRegen: `+${Math.round(lv * 30 + 60)}% 法力恢复`
              })
            },
            {
              id: 'redemption', name: '救赎', req: 24, prereqs: ['prayer', 'vigor'],
              desc: '光环：将尸体转化为生命和法力。',
              levels: (lv) => ({
                life: `从尸体恢复 ${Math.round(lv * 5 + 20)} 生命`,
                mana: `从尸体恢复 ${Math.round(lv * 5 + 20)} 法力`,
                chance: `每2秒 ${Math.min(95, lv * 5 + 25)}% 概率`
              })
            },
            {
              id: 'salvation', name: '救世', req: 30, prereqs: ['resist_fire', 'resist_cold', 'resist_lightning', 'meditation'],
              desc: '光环：提升所有元素抗性。',
              levels: (lv) => ({
                resist: `+${Math.min(50, lv * 3 + 15)}% 所有元素抗性`
              })
            }
          ]
        }
      ]
    },

    druid: {
      name: '德鲁伊',
      nameEn: 'Druid',
      icon: '🌿',
      description: '来自北方丛林的自然之子，可变形为野兽或召唤自然精灵，掌控元素之力。',
      baseStats: { str: 15, dex: 20, vit: 25, ene: 20 },
      baseLife: 55, lifePerLevel: 1.5, lifePerVit: 2,
      baseMana: 20, manaPerLevel: 2, manaPerEne: 2,
      baseStamina: 84, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#2ecc71',
      trees: [
        {
          name: '元素技能',
          nameEn: 'Elemental',
          skills: [
            {
              id: 'firestorm', name: '火焰风暴', req: 1, prereqs: [],
              desc: '向前喷射多道火焰流。',
              levels: (lv) => ({
                streams: `${2 + Math.floor(lv / 5)} 道火焰`,
                damage: `${Math.round(lv * 8 + 8)}-${Math.round(lv * 12 + 15)} 火焰伤害/秒`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'molten_boulder', name: '熔岩巨石', req: 6, prereqs: ['firestorm'],
              desc: '滚动的熔岩巨石碾过敌人，造成火焰伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 火焰伤害`,
                mana: `${(9 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'arctic_blast', name: '北极气息', req: 6, prereqs: [],
              desc: '呼出寒冰气息，减慢并伤害敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 8)}-${Math.round(lv * 8 + 15)} 寒冰伤害/秒`,
                slow: `减速 ${Math.min(75, 30 + lv * 3)}%`,
                mana: `每秒 3 法力`
              })
            },
            {
              id: 'fissure', name: '地裂', req: 12, prereqs: ['firestorm', 'molten_boulder'],
              desc: '在地面开裂出火焰地裂，持续伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 90)} 火焰伤害`,
                duration: `${(4 + lv * 0.4).toFixed(1)} 秒`,
                mana: `11 法力`
              })
            },
            {
              id: 'cyclone_armor', name: '飓风护甲', req: 12, prereqs: ['arctic_blast'],
              desc: '创造旋转的风护甲，吸收元素伤害。',
              levels: (lv) => ({
                absorb: `吸收 ${Math.round(lv * 35 + 60)} 元素伤害`,
                mana: `11 法力`
              })
            },
            {
              id: 'twister', name: '旋风', req: 18, prereqs: ['arctic_blast', 'cyclone_armor'],
              desc: '召唤旋风眩晕并伤害敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 8 + 8)}-${Math.round(lv * 12 + 15)} 魔法伤害`,
                stun: `眩晕 ${(0.5 + lv * 0.1).toFixed(1)} 秒`,
                mana: `${(7 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'volcano', name: '火山', req: 24, prereqs: ['fissure'],
              desc: '召唤火山爆发，向四周喷射岩浆。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 60 + 150)}-${Math.round(lv * 90 + 250)} 火焰伤害`,
                radius: `${(2 + lv * 0.13).toFixed(1)} 码`,
                mana: `25 法力`
              })
            },
            {
              id: 'tornado', name: '龙卷风', req: 24, prereqs: ['twister'],
              desc: '释放强力龙卷风，旋转移动并造成风系伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 90)} 风系伤害`,
                mana: `${(9 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'hurricane', name: '飓风', req: 30, prereqs: ['tornado', 'cyclone_armor'],
              desc: '召唤持续旋转的飓风，减慢并伤害附近所有敌人。',
              levels: (lv) => ({
                coldDamage: `${Math.round(lv * 8 + 10)}-${Math.round(lv * 12 + 18)} 寒冰伤害/秒`,
                slow: `减速 ${Math.min(75, 30 + lv * 3)}%`,
                duration: `${(8 + lv * 0.8).toFixed(1)} 秒`,
                mana: `35 法力`
              })
            },
            {
              id: 'armageddon', name: '天启', req: 30, prereqs: ['volcano', 'hurricane'],
              desc: '召唤天启，持续从天而降火焰陨石。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 40 + 80)}-${Math.round(lv * 60 + 130)} 火焰伤害/陨石`,
                duration: `${(8 + lv * 0.8).toFixed(1)} 秒`,
                mana: `35 法力`
              })
            }
          ]
        },
        {
          name: '变形技能',
          nameEn: 'Shape Shifting',
          skills: [
            {
              id: 'werewolf', name: '狼人形态', req: 1, prereqs: [],
              desc: '变形为狼人，获得攻速、攻击评级和生命加成。',
              levels: (lv) => ({
                life: `+${Math.round(lv * 5 + 25)}% 生命`,
                ar: `+${Math.round(lv * 10 + 50)}% 攻击评级`,
                attackSpeed: `+${Math.round(lv * 5 + 25)}% 攻击速度`,
                mana: `10 法力`
              })
            },
            {
              id: 'lycanthropy', name: '狼人长寿', req: 1, prereqs: [],
              desc: '提升狼人和熊人形态的生命和持续时间。',
              levels: (lv) => ({
                life: `+${Math.round(lv * 10 + 20)}% 变形形态生命`,
                duration: `+${Math.round(lv * 15 + 30)} 秒持续时间`
              })
            },
            {
              id: 'werebear', name: '熊人形态', req: 6, prereqs: ['werewolf'],
              desc: '变形为熊人，获得大量生命和防御。',
              levels: (lv) => ({
                life: `+${Math.round(lv * 15 + 50)}% 生命`,
                defense: `+${Math.round(lv * 25 + 100)}% 防御`,
                damage: `+${Math.round(lv * 10 + 30)}% 伤害`,
                mana: `10 法力`
              })
            },
            {
              id: 'maul', name: '扑击', req: 12, prereqs: ['werebear'],
              desc: '熊人独有技能：击退并眩晕目标的强力攻击。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 100)}% 伤害`,
                stun: `眩晕 ${(0.4 + lv * 0.2).toFixed(1)} 秒`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'feral_rage', name: '野性狂怒', req: 12, prereqs: ['werewolf', 'lycanthropy'],
              desc: '狼人独有：每次命中增加移速和生命偷取，最高叠加4层。',
              levels: (lv) => ({
                leech: `每层 +${Math.round(lv * 1 + 2)}% 生命偷取`,
                speed: `每层 +${Math.round(lv * 3 + 8)}% 移速`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'fire_claws', name: '火爪', req: 18, prereqs: ['feral_rage', 'maul'],
              desc: '为爪子攻击附加火焰伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 火焰伤害`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'hunger', name: '饥渴', req: 18, prereqs: ['maul'],
              desc: '熊人技能：攻击大量偷取生命和法力，但降低伤害。',
              levels: (lv) => ({
                leech: `偷取 ${Math.min(100, lv * 6 + 20)}% 为生命`,
                manaLeech: `偷取 ${Math.min(50, lv * 3 + 10)}% 为法力`,
                mana: `0 法力`
              })
            },
            {
              id: 'shock_wave', name: '冲击波', req: 24, prereqs: ['hunger'],
              desc: '熊人技能：释放冲击波眩晕附近敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 10 + 10)}-${Math.round(lv * 15 + 20)} 魔法伤害`,
                stun: `眩晕 ${(1 + lv * 0.2).toFixed(1)} 秒`,
                radius: `${(3 + lv * 0.2).toFixed(1)} 码`,
                mana: `${(5 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'rabies', name: '狂犬病', req: 24, prereqs: ['feral_rage', 'fire_claws'],
              desc: '狼人技能：感染目标，毒素在敌人之间传播。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 50 + 100)} 毒素伤害（持续5秒）`,
                spread: `传染给附近敌人`,
                mana: `5 法力`
              })
            },
            {
              id: 'fury', name: '狂怒', req: 30, prereqs: ['feral_rage', 'fire_claws', 'rabies'],
              desc: '狼人技能：快速连续攻击多次。',
              levels: (lv) => ({
                attacks: `${3 + Math.floor(lv / 4)} 次攻击`,
                damage: `+${Math.round(lv * 15 + 100)}% 伤害`,
                mana: `3 法力`
              })
            }
          ]
        },
        {
          name: '召唤技能',
          nameEn: 'Summoning',
          skills: [
            {
              id: 'raven', name: '乌鸦', req: 1, prereqs: [],
              desc: '召唤乌鸦攻击敌人并致盲目标。',
              levels: (lv) => ({
                ravens: `最多 ${1 + Math.floor(lv / 3)} 只乌鸦`,
                damage: `${Math.round(lv * 2 + 2)}-${Math.round(lv * 3 + 4)} 伤害`,
                blind: `致盲敌人`,
                mana: `3 法力`
              })
            },
            {
              id: 'poison_creeper', name: '毒素藤蔓', req: 1, prereqs: [],
              desc: '召唤会缠绕并毒化敌人的植物。',
              levels: (lv) => ({
                poison: `${Math.round(lv * 15 + 20)} 毒素伤害/秒`,
                life: `${Math.round(lv * 30 + 60)} 生命`
              })
            },
            {
              id: 'summon_spirit_wolf', name: '召唤精灵狼', req: 6, prereqs: ['raven'],
              desc: '召唤精灵狼群协助战斗。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv / 4)} 只`,
                damage: `${Math.round(lv * 10 + 15)}-${Math.round(lv * 15 + 25)} 伤害`,
                life: `${Math.round(lv * 40 + 80)} 生命`
              })
            },
            {
              id: 'carrion_vine', name: '腐烂藤蔓', req: 12, prereqs: ['poison_creeper'],
              desc: '召唤从尸体中吸取生命并治疗玩家的藤蔓。',
              levels: (lv) => ({
                heal: `治疗 ${Math.min(40, lv * 2 + 10)}% 生命（从尸体）`,
                life: `${Math.round(lv * 40 + 80)} 生命`
              })
            },
            {
              id: 'summon_dire_wolf', name: '召唤恶狼', req: 18, prereqs: ['summon_spirit_wolf'],
              desc: '召唤强大的恶狼，会吃掉尸体来增强自己。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv / 5)} 只`,
                damage: `${Math.round(lv * 25 + 40)}-${Math.round(lv * 40 + 65)} 伤害`,
                life: `${Math.round(lv * 100 + 200)} 生命`
              })
            },
            {
              id: 'solar_creeper', name: '阳光藤蔓', req: 18, prereqs: ['carrion_vine'],
              desc: '召唤从尸体中吸取能量恢复法力的藤蔓。',
              levels: (lv) => ({
                mana: `恢复 ${Math.min(40, lv * 2 + 10)}% 法力（从尸体）`,
                life: `${Math.round(lv * 40 + 80)} 生命`
              })
            },
            {
              id: 'oak_sage', name: '橡树圣者', req: 18, prereqs: ['raven'],
              desc: '召唤增加所有盟友生命上限的树灵。',
              levels: (lv) => ({
                life: `+${Math.round(lv * 10 + 30)}% 所有盟友生命`,
                sageLife: `${Math.round(lv * 60 + 120)} 生命`
              })
            },
            {
              id: 'summon_grizzly', name: '召唤灰熊', req: 30, prereqs: ['summon_dire_wolf'],
              desc: '召唤强大的灰熊，是最强力的德鲁伊召唤物。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 60 + 150)}-${Math.round(lv * 90 + 250)} 伤害`,
                life: `${Math.round(lv * 250 + 800)} 生命`,
                mana: `35 法力`
              })
            },
            {
              id: 'heart_of_wolverine', name: '狼獾之心', req: 24, prereqs: ['oak_sage'],
              desc: '召唤提升攻击评级和伤害的动物图腾。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 15 + 50)}% 攻击评级`,
                damage: `+${Math.round(lv * 10 + 30)}% 伤害`
              })
            },
            {
              id: 'spirit_of_barbs', name: '刺棘之灵', req: 30, prereqs: ['heart_of_wolverine'],
              desc: '召唤使攻击者受到反伤的图腾。',
              levels: (lv) => ({
                reflect: `返还 ${Math.round(lv * 50 + 150)}% 近战伤害`
              })
            }
          ]
        }
      ]
    },

    assassin: {
      name: '刺客',
      nameEn: 'Assassin',
      icon: '🗡️',
      description: '禅弓圣教的精英战士，精通徒手搏击与诡异的陷阱技艺，专门猎杀腐化的法师。',
      baseStats: { str: 20, dex: 20, vit: 20, ene: 25 },
      baseLife: 50, lifePerLevel: 2, lifePerVit: 3,
      baseMana: 25, manaPerLevel: 1.5, manaPerEne: 1.75,
      baseStamina: 95, staminaPerLevel: 1.25, staminaPerVit: 1.25,
      color: '#e74c3c',
      trees: [
        {
          name: '武术技能',
          nameEn: 'Martial Arts',
          skills: [
            {
              id: 'tiger_strike', name: '虎击', req: 1, prereqs: [],
              desc: '蓄力技能：积累电荷后，下次攻击造成大量额外伤害。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 50 + 100)}% 伤害（每层电荷）`,
                chargeEffect: `最多3层`,
                mana: `3 法力`
              })
            },
            {
              id: 'dragon_talon', name: '龙爪', req: 1, prereqs: [],
              desc: '快速踢击目标。',
              levels: (lv) => ({
                kicks: `${1 + Math.floor(lv / 4)} 次踢击`,
                damage: `踢击造成武器伤害的 ${Math.round(lv * 10 + 100)}%`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'fists_of_fire', name: '火拳', req: 6, prereqs: ['tiger_strike'],
              desc: '蓄力技能：积累电荷后，下次攻击释放火焰。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 8 + 10)}-${Math.round(lv * 12 + 18)} 火焰伤害（每层）`,
                mana: `3 法力`
              })
            },
            {
              id: 'dragon_claw', name: '龙爪双击', req: 6, prereqs: ['dragon_talon'],
              desc: '双持爪子时同时用两只手攻击。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 15 + 60)}% 伤害`,
                mana: `3 法力`
              })
            },
            {
              id: 'cobra_strike', name: '眼镜蛇击', req: 12, prereqs: ['fists_of_fire', 'dragon_claw'],
              desc: '蓄力技能：积累电荷后，下次攻击吸取生命和法力。',
              levels: (lv) => ({
                leech: `${Math.min(100, lv * 5 + 25)}% 生命和法力偷取（每层）`,
                mana: `3 法力`
              })
            },
            {
              id: 'claws_of_thunder', name: '雷爪', req: 12, prereqs: ['fists_of_fire'],
              desc: '蓄力技能：积累电荷后，下次攻击释放闪电。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 15 + 20)}-${Math.round(lv * 25 + 40)} 闪电伤害（每层）`,
                mana: `3 法力`
              })
            },
            {
              id: 'dragon_tail', name: '龙尾', req: 18, prereqs: ['dragon_talon', 'cobra_strike'],
              desc: '强力踢击，使爆炸电荷在周围爆发。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 20 + 100)}% 踢击伤害`,
                boom: `引爆火焰爆炸`,
                mana: `${(7 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'blade_of_ice', name: '冰刃', req: 18, prereqs: ['claws_of_thunder'],
              desc: '蓄力技能：积累电荷后，下次攻击冻结目标。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 寒冰伤害（每层）`,
                freeze: `冻结 ${(0.5 + lv * 0.2).toFixed(1)} 秒`,
                mana: `3 法力`
              })
            },
            {
              id: 'dragon_flight', name: '龙腾', req: 24, prereqs: ['dragon_tail'],
              desc: '瞬间移形到目标处并踢击，可以对技能免疫怪物有效。',
              levels: (lv) => ({
                damage: `踢击造成武器伤害的 ${Math.round(lv * 20 + 200)}%`,
                mana: `25 法力`
              })
            },
            {
              id: 'phoenix_strike', name: '不死鸟之击', req: 30, prereqs: ['cobra_strike', 'blade_of_ice', 'dragon_flight'],
              desc: '蓄力技能：积累电荷，每层分别为火焰、寒冰、闪电攻击。',
              levels: (lv) => ({
                fire: `层1: ${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 80)} 火焰伤害`,
                cold: `层2: ${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 80)} 寒冰伤害`,
                light: `层3: ${Math.round(lv * 50 + 80)}-${Math.round(lv * 80 + 130)} 闪电伤害`,
                mana: `3 法力`
              })
            }
          ]
        },
        {
          name: '影子修炼',
          nameEn: 'Shadow Disciplines',
          skills: [
            {
              id: 'claw_mastery', name: '爪子精通', req: 1, prereqs: [],
              desc: '提升使用爪子武器的攻击评级、伤害和暴击率。',
              levels: (lv) => ({
                ar: `+${Math.round(lv * 30 + 28)}% 爪子攻击评级`,
                damage: `+${Math.round(lv * 15 + 28)}% 爪子伤害`,
                critChance: `+${Math.min(50, lv * 3)}% 暴击`
              })
            },
            {
              id: 'psychic_hammer', name: '心灵之锤', req: 1, prereqs: [],
              desc: '使用心灵力量击退敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 5)}-${Math.round(lv * 8 + 8)} 魔法伤害`,
                knockback: `击退`,
                mana: `3 法力`
              })
            },
            {
              id: 'burst_of_speed', name: '爆发速度', req: 6, prereqs: ['claw_mastery'],
              desc: '大幅提升攻击速度和移动速度。',
              levels: (lv) => ({
                attackSpeed: `+${Math.round(lv * 5 + 30)}% 攻击速度`,
                moveSpeed: `+${Math.round(lv * 3 + 12)}% 移动速度`,
                duration: `${(12 + lv * 1.2).toFixed(0)} 秒`,
                mana: `15 法力`
              })
            },
            {
              id: 'cloak_of_shadows', name: '影子斗篷', req: 6, prereqs: ['psychic_hammer'],
              desc: '召唤暗影，致盲附近所有敌人。',
              levels: (lv) => ({
                radius: `${(3.3 + lv * 0.33).toFixed(1)} 码`,
                duration: `${(4 + lv * 2).toFixed(0)} 秒`,
                mana: `17 法力`
              })
            },
            {
              id: 'fade', name: '消逝', req: 12, prereqs: ['burst_of_speed', 'cloak_of_shadows'],
              desc: '降低受到的诅咒和元素伤害，同时提供较小的防御加成。',
              levels: (lv) => ({
                resist: `+${Math.round(lv * 5 + 15)}% 所有抗性`,
                curseDuration: `-${Math.min(95, lv * 5 + 25)}% 诅咒持续时间`,
                defense: `+${Math.round(lv * 15 + 60)}% 防御`,
                duration: `${(12 + lv * 2.4).toFixed(0)} 秒`,
                mana: `15 法力`
              })
            },
            {
              id: 'shadow_warrior', name: '影分身', req: 18, prereqs: ['cloak_of_shadows', 'fade'],
              desc: '召唤影子分身协助战斗，使用玩家的技能。',
              levels: (lv) => ({
                life: `${Math.round(lv * 50 + 100)} 生命`,
                damage: `+${Math.round(lv * 10 + 50)}% 伤害`,
                duration: `35 秒`,
                mana: `25 法力`
              })
            },
            {
              id: 'mind_blast', name: '心灵爆炸', req: 18, prereqs: ['cloak_of_shadows'],
              desc: '对目标区域释放心灵波，眩晕并可能使敌人为己方战斗。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 5 + 5)}-${Math.round(lv * 8 + 8)} 魔法伤害`,
                stun: `眩晕 ${(1 + lv * 0.2).toFixed(1)} 秒`,
                convert: `${Math.min(50, lv * 3 + 10)}% 转化几率`,
                mana: `11 法力`
              })
            },
            {
              id: 'venom', name: '毒素', req: 24, prereqs: ['fade', 'shadow_warrior'],
              desc: '为爪子攻击附加强力毒素伤害。',
              levels: (lv) => ({
                poison: `+${Math.round(lv * 50 + 100)} 毒素伤害（持续0.4秒）`,
                duration: `0.4 秒（不随等级增加）`,
                mana: `25 法力`
              })
            },
            {
              id: 'shadow_master', name: '影子大师', req: 30, prereqs: ['shadow_warrior', 'mind_blast'],
              desc: '召唤强大的影子分身，拥有自己的AI并使用各种技能。',
              levels: (lv) => ({
                life: `${Math.round(lv * 100 + 300)} 生命`,
                duration: `35 秒`,
                mana: `55 法力`
              })
            },
            {
              id: 'weapon_block', name: '武器格挡', req: 12, prereqs: ['claw_mastery'],
              desc: '双持爪子时有几率格挡近战和远程攻击。',
              levels: (lv) => ({
                block: `${Math.min(40, lv * 2 + 12)}% 格挡几率`
              })
            }
          ]
        },
        {
          name: '陷阱技能',
          nameEn: 'Traps',
          skills: [
            {
              id: 'fire_blast', name: '火焰爆炸', req: 1, prereqs: [],
              desc: '投掷火焰炸弹，命中后爆炸。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 10 + 15)}-${Math.round(lv * 15 + 25)} 火焰伤害`,
                radius: `${(1 + lv * 0.1).toFixed(1)} 码`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'shock_web', name: '电网', req: 6, prereqs: ['fire_blast'],
              desc: '放置一个释放多道充电闪电的陷阱。',
              levels: (lv) => ({
                bolts: `${2 + Math.floor(lv / 4)} 道闪电`,
                damage: `${Math.round(lv * 3 + 3)}-${Math.round(lv * 5 + 5)} 闪电伤害/道`,
                max: `最多 ${1 + Math.floor(lv / 5)} 个陷阱`,
                mana: `3 法力`
              })
            },
            {
              id: 'charged_bolt_sentry', name: '充电闪电哨兵', req: 12, prereqs: ['shock_web'],
              desc: '放置一个不断射出充电闪电的陷阱。',
              levels: (lv) => ({
                bolts: `${3 + Math.floor(lv / 4)} 道`,
                damage: `${Math.round(lv * 4 + 4)}-${Math.round(lv * 6 + 6)} 伤害/道`,
                max: `最多 ${1 + Math.floor(lv / 4)} 个`,
                mana: `10 法力`
              })
            },
            {
              id: 'wake_of_fire', name: '火焰哨兵', req: 12, prereqs: ['fire_blast'],
              desc: '放置一个持续向前发射火焰的陷阱。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 12 + 15)}-${Math.round(lv * 18 + 25)} 火焰伤害`,
                max: `最多 ${1 + Math.floor(lv / 4)} 个`,
                mana: `10 法力`
              })
            },
            {
              id: 'blade_sentinel', name: '刀刃哨兵', req: 18, prereqs: ['charged_bolt_sentry', 'wake_of_fire'],
              desc: '放置一个在敌人之间旋转的旋转刀刃。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 15 + 25)}-${Math.round(lv * 22 + 40)} 物理伤害`,
                max: `最多 ${1 + Math.floor(lv / 5)} 个`,
                mana: `9 法力`
              })
            },
            {
              id: 'lightning_sentry', name: '闪电哨兵', req: 24, prereqs: ['charged_bolt_sentry'],
              desc: '放置一个不断射出强力闪电的陷阱。',
              levels: (lv) => ({
                damage: `1-${Math.round(lv * 50 + 80)} 闪电伤害`,
                max: `最多 ${1 + Math.floor(lv / 4)} 个`,
                mana: `17 法力`
              })
            },
            {
              id: 'wake_of_inferno', name: '烈焰哨兵', req: 24, prereqs: ['wake_of_fire', 'blade_sentinel'],
              desc: '放置一个喷射烈焰的强力陷阱。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 80)} 火焰伤害/秒`,
                max: `最多 ${1 + Math.floor(lv / 4)} 个`,
                mana: `14 法力`
              })
            },
            {
              id: 'death_sentry', name: '死亡哨兵', req: 30, prereqs: ['lightning_sentry'],
              desc: '放置复合陷阱，会释放闪电并引爆尸体造成爆炸伤害。',
              levels: (lv) => ({
                lightDmg: `1-${Math.round(lv * 45 + 75)} 闪电伤害`,
                corpseExp: `引爆尸体造成范围伤害`,
                max: `最多 ${1 + Math.floor(lv / 4)} 个`,
                mana: `17 法力`
              })
            },
            {
              id: 'blade_shield', name: '刀刃护盾', req: 30, prereqs: ['blade_sentinel', 'wake_of_inferno'],
              desc: '在刺客周围产生旋转刀刃，自动攻击靠近的敌人。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 40)}-${Math.round(lv * 30 + 65)} 物理伤害`,
                duration: `${(12 + lv * 2.4).toFixed(0)} 秒`,
                mana: `35 法力`
              })
            }
          ]
        }
      ]
    },

    warlock: {
      name: '术士',
      nameEn: 'Warlock',
      icon: '📖',
      description: '暗黑学者，掌控混沌之火与神秘魔法，可召唤并束缚恶魔为己所用，武器悬浮于空中由念力驱动。(Reign of the Warlock DLC)',
      baseStats: { str: 15, dex: 20, vit: 25, ene: 20 },
      baseLife: 55, lifePerLevel: 2, lifePerVit: 3,
      baseMana: 20, manaPerLevel: 1.5, manaPerEne: 2,
      baseStamina: 86, staminaPerLevel: 1, staminaPerVit: 1,
      color: '#a855f7',
      trees: [
        {
          name: '混沌之术',
          nameEn: 'Arts of Chaos',
          // 6层: lv1(疫云弹/火焰环) lv6(疫云锁链/烈焰波) lv12(强化熵变/迟缓印记) lv18(怨恨印记/虚空裂隙) lv24(死亡印记) lv30(末日启示)
          skills: [
            // Tier 1 (lv 1)
            {
              id: 'miasma_bolt', name: '疫云弹', req: 1, prereqs: [],
              desc: '射出一道黑暗魔法弹，命中后爆炸成持续伤害的疫云（1-3初始魔法伤害+3-5/秒DOT）。前期主力输出技能。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 2 + 1)}-${Math.round(lv * 3 + 3)} 初始魔法伤害`,
                cloud: `疫云每秒 ${Math.round(lv * 4 + 3)} 魔法伤害`,
                duration: `${(2 + lv * 0.3).toFixed(1)} 秒`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            {
              id: 'ring_of_fire', name: '火焰环', req: 1, prereqs: [],
              desc: '向四周释放扩散的地狱火球，将敌人向外击退。距离越远伤害越高。',
              levels: (lv) => ({
                bolts: `${4 + Math.floor(lv / 4)} 颗火焰弹`,
                nearDmg: `${Math.round(lv * 3 + 5)} 近距火焰伤害`,
                farDmg: `${Math.round(lv * 12 + 25)} 远距火焰伤害`,
                mana: `${(5 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            // Tier 2 (lv 6)
            {
              id: 'miasma_chain', name: '疫云锁链', req: 6, prereqs: ['miasma_bolt'],
              desc: '在自身与目标之间/地面之间拉出疫云锁链，拖入怪物群造成范围DOT伤害。',
              levels: (lv) => ({
                dot: `每秒 ${Math.round(lv * 10 + 15)} 魔法伤害`,
                duration: `${(3 + lv * 0.3).toFixed(1)} 秒`,
                radius: `${(1.5 + lv * 0.1).toFixed(1)} 码疫云半径`,
                mana: `${(8 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'flame_wave', name: '烈焰波', req: 6, prereqs: ['ring_of_fire'],
              desc: '向前翻滚的火焰波浪，将沿途地面点燃。协同火焰环与末日启示提供协同加成。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 10 + 15)}-${Math.round(lv * 15 + 25)} 火焰伤害`,
                length: `${(3 + lv * 0.2).toFixed(1)} 码`,
                mana: `${(6 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            // Tier 3 (lv 12)
            {
              id: 'enhanced_entropy', name: '强化熵变', req: 12, prereqs: ['miasma_bolt', 'miasma_chain'],
              desc: '被动技能：增加所有疫云的半径和持续时间，使疫云弹和疫云锁链覆盖更大范围。',
              levels: (lv) => ({
                radius: `+${Math.round(lv * 8 + 12)}% 疫云范围`,
                duration: `+${Math.round(lv * 10 + 15)}% 疫云持续时间`
              })
            },
            {
              id: 'sigil_lethargy', name: '迟缓印记', req: 12, prereqs: ['ring_of_fire'],
              desc: '在地面刻下迟缓印记，踩中的敌人大幅减速并降低攻击速度，用于区域封锁。',
              levels: (lv) => ({
                slow: `减速 ${Math.min(80, 33 + lv * 3)}%`,
                attackSlow: `攻速降低 ${Math.min(60, 20 + lv * 2)}%`,
                duration: `${(5 + lv * 0.5).toFixed(1)} 秒`,
                mana: `${(10 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            // Tier 4 (lv 18)
            {
              id: 'sigil_rancor', name: '怨恨印记', req: 18, prereqs: ['sigil_lethargy'],
              desc: '印记使踩中的敌人陷入狂怒，有几率使其攻击友军，并提升其速度与伤害（但相互攻击）。',
              levels: (lv) => ({
                confuseChance: `${Math.min(60, 20 + lv * 3)}% 混乱几率`,
                speedBuff: `+${Math.round(lv * 5 + 15)}% 敌人速度（使其互攻）`,
                duration: `${(4 + lv * 0.4).toFixed(1)} 秒`,
                mana: `${(12 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'abyss', name: '虚空裂隙', req: 18, prereqs: ['miasma_chain'],
              desc: '撕裂现实，召唤虚空裂隙将敌人吸入中心后坍塌，造成魔法伤害。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 20 + 30)}-${Math.round(lv * 30 + 50)} 魔法伤害`,
                pull: `吸引半径 ${(2 + lv * 0.2).toFixed(1)} 码`,
                duration: `${(2.5 + lv * 0.25).toFixed(1)} 秒`,
                mana: `${(12 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            // Tier 5 (lv 24)
            {
              id: 'sigil_death', name: '死亡印记', req: 24, prereqs: ['sigil_rancor', 'abyss'],
              desc: '强力死亡印记，踩中的敌人受到大量伤害，且当敌人生命低于13%时直接引爆（造成其生命70-120%为AOE伤害）。',
              levels: (lv) => ({
                triggerDmg: `${Math.round(lv * 30 + 50)}-${Math.round(lv * 50 + 90)} 触发魔法伤害`,
                executeHP: `13% 以下生命触发爆炸`,
                blastDmg: `目标生命 70-120% 为范围伤害`,
                radius: `${(2 + lv * 0.15).toFixed(1)} 码`,
                mana: `${(14 + lv * 0.5).toFixed(1)} 法力`
              })
            },
            // Tier 6 (lv 30)
            {
              id: 'apocalypse', name: '末日启示', req: 30, prereqs: ['flame_wave', 'sigil_death'],
              desc: '在地面绘制五芒星，随即爆发为巨大地狱火焰，同时降低敌人火焰抗性。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 50 + 150)}-${Math.round(lv * 80 + 250)} 火焰伤害`,
                fireRes: `-${Math.min(40, lv * 2 + 10)}% 敌人火焰抗性`,
                radius: `${(2.5 + lv * 0.15).toFixed(1)} 码`,
                mana: `${(20 + lv * 0.5).toFixed(1)} 法力`
              })
            }
          ]
        },
        {
          name: '恶魔束缚',
          nameEn: 'Demonic Binding',
          // 6层: lv1(恶魔精通/山羊人) lv6(血誓/死亡标记) lv12(污染者/沸血爆炸) lv18(污染魔/束缚恶魔) lv24(吞噬强化) lv30(吞噬献祭)
          skills: [
            // Tier 1 (lv 1)
            {
              id: 'demon_mastery', name: '恶魔精通', req: 1, prereqs: [],
              desc: '被动技能：提升所有召唤/束缚恶魔的AR、速度和伤害各+25%/+10%/+10%，第10和第20级各额外+1恶魔上限。',
              levels: (lv) => ({
                ar: `+25% 恶魔攻击评级`,
                speed: `+${Math.round(lv * 5 + 5)}% 恶魔速度`,
                damage: `+${Math.round(lv * 5 + 5)}% 恶魔伤害`,
                extra: lv >= 20 ? `+2 恶魔数量上限` : lv >= 10 ? `+1 恶魔数量上限（10/20级各+1）` : `等级10/20各+1数量上限`
              })
            },
            {
              id: 'summon_goatman', name: '召唤山羊人', req: 1, prereqs: [],
              desc: '召唤山羊人恶魔作为近战坦克，高等级后习得狂热（Frenzy-like）技能。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv / 7)} 只`,
                life: `${Math.round(lv * 120 + 300)} 生命`,
                damage: `${Math.round(lv * 20 + 40)}-${Math.round(lv * 30 + 65)} 伤害`,
                mana: `25 法力`
              })
            },
            // Tier 2 (lv 6)
            {
              id: 'blood_oath', name: '血誓契约', req: 6, prereqs: ['demon_mastery', 'summon_goatman'],
              desc: '被动技能：恶魔生命+50%、全抗性+14%、物理减伤+2%，同时将5%术士受到的伤害转移给恶魔。与束缚恶魔配合提供伤害减免。',
              levels: (lv) => ({
                demonLife: `+${Math.round(lv * 5 + 45)}% 恶魔生命`,
                demonRes: `+14% 恶魔全抗性`,
                dr: `+${Math.round(lv * 0.5 + 1)}% 物理减伤`,
                redirect: `转移 ${Math.min(15, lv * 0.5 + 4)}% 受到伤害至恶魔`
              })
            },
            {
              id: 'death_mark', name: '死亡标记', req: 6, prereqs: ['summon_goatman'],
              desc: '将绑定的恶魔瞬间传送至目标敌人处并强制攻击，对绑定恶魔的束缚几率提供协同加成。',
              levels: (lv) => ({
                damageAmp: `目标受伤 +${Math.round(lv * 5 + 10)}%`,
                bindBonus: `+${lv}% 束缚恶魔成功率（协同）`,
                duration: `${(3 + lv * 0.3).toFixed(1)} 秒标记`,
                mana: `10 法力`
              })
            },
            // Tier 3 (lv 12)
            {
              id: 'summon_tainted', name: '召唤污染者', req: 12, prereqs: ['summon_goatman'],
              desc: '召唤远程恶魔，向敌人射出火焰弹，与沸血爆炸有30%/级协同加成。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv / 8)} 只`,
                life: `${Math.round(lv * 80 + 200)} 生命`,
                damage: `${Math.round(lv * 15 + 30)}-${Math.round(lv * 25 + 50)} 火焰伤害`,
                mana: `25 法力`
              })
            },
            {
              id: 'blood_boil', name: '沸血爆炸', req: 12, prereqs: ['death_mark'],
              desc: '消耗15%恶魔当前生命，将其血液引爆为范围伤害。恶魔不会死亡，是爆发输出核心技能。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 50 + 100)}-${Math.round(lv * 80 + 160)} 火焰/魔法伤害`,
                selfCost: `消耗恶魔 15% 当前生命`,
                radius: `${(2.5 + lv * 0.2).toFixed(1)} 码`,
                mana: `20 法力`
              })
            },
            // Tier 4 (lv 18)
            {
              id: 'summon_defiler', name: '召唤污染魔', req: 18, prereqs: ['summon_tainted'],
              desc: '召唤灵魂缚结恶魔，将26%受到的伤害转分担给主人，是防御型恶魔。',
              levels: (lv) => ({
                max: `最多 ${1 + Math.floor(lv / 10)} 只`,
                life: `${Math.round(lv * 100 + 280)} 生命`,
                shareRatio: `转移 ${Math.min(40, 20 + lv * 1.5)}% 主人受到的伤害`,
                mana: `35 法力`
              })
            },
            {
              id: 'bind_demon', name: '束缚恶魔', req: 18, prereqs: ['blood_boil'],
              desc: '对受伤的非Boss恶魔有10%基础概率完成束缚，使其永久为己战斗并保留原有属性与光环（如确信、狂热等）。',
              levels: (lv) => ({
                baseChance: `基础 ${Math.min(50, 10 + lv * 2)}% 束缚成功率`,
                bonus: `被束缚恶魔保留全部技能与光环`,
                damageBonus: `+${Math.round(lv * 5 + 10)}% 束缚恶魔伤害`,
                mana: `35 法力`
              })
            },
            // Tier 5 (lv 24)
            {
              id: 'engorge', name: '吞噬强化', req: 24, prereqs: ['bind_demon', 'summon_defiler'],
              desc: '命令绑定恶魔吞食附近尸体，每具尸体恢复恶魔30%生命，同时提升15%攻速和30%生命偷取（持续10秒）。',
              levels: (lv) => ({
                heal: `每具尸体恢复 ${Math.min(50, 28 + lv)}% 恶魔生命`,
                attackSpeed: `+${Math.round(lv * 0.5 + 12)}% 恶魔攻速（10秒）`,
                lifeSteal: `+${Math.round(lv * 1 + 28)}% 恶魔生命偷取（10秒）`,
                mana: `8 法力`
              })
            },
            // Tier 6 (lv 30)
            {
              id: 'consume', name: '吞噬献祭', req: 30, prereqs: ['engorge'],
              desc: '献祭己方恶魔，永久获得+5%最大生命和+15%移速，并根据类型获得独特增益：山羊人=物理伤害光环，污染者=火焰伤害光环，污染魔=魔法伤害光环。也可对超级精英施放以获得临时强力增益。',
              levels: (lv) => ({
                lifeBonus: `+${Math.round(lv * 0.5 + 4)}% 最大生命（永久叠加）`,
                speed: `+15% 移动速度（120秒）`,
                goatmanBuff: `山羊人 → 物理伤害+${Math.round(lv * 10 + 15)}%（120秒）`,
                taintedBuff: `污染者 → 火焰伤害+${Math.round(lv * 10 + 15)}%（120秒）`,
                defilerBuff: `污染魔 → 魔法伤害+${Math.round(lv * 10 + 15)}%（120秒）`,
                mana: `25 法力`
              })
            }
          ]
        },
        {
          name: '神秘武器',
          nameEn: 'Eldritch Weapons',
          // 6层: lv1(悬浮精通/裂空斩) lv6(厄咒·诅咒/厄咒·汲取) lv12(回响斩/厄咒·净化爆) lv18(刃影传送/神秘爆击) lv24(念力护盾) lv30(镜影刃)
          skills: [
            // Tier 1 (lv 1)
            {
              id: 'levitation_mastery', name: '悬浮精通', req: 1, prereqs: [],
              desc: '被动技能：武器悬浮态提供+25%伤害、+40%AR、+5%暴击，并降低双手武器装备需求，使术士可同时持双手武器和副手。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 5 + 20)}% 武器伤害`,
                ar: `+${Math.round(lv * 5 + 35)}% 攻击评级`,
                crit: `+5% 暴击率`,
                reqReduce: `-${Math.min(50, lv * 2 + 3)}% 双手武器属性需求`
              })
            },
            {
              id: 'cleave', name: '裂空斩', req: 1, prereqs: [],
              desc: '近战范围AOE攻击，高等级攻击弧度可扩展至360度，命中弧形范围内所有敌人。',
              levels: (lv) => ({
                damage: `+${Math.round(lv * 10 + 50)}% 武器伤害`,
                arc: `${Math.min(360, 90 + lv * 18)}° 攻击弧度`,
                mana: `${(3 + lv * 0.1).toFixed(1)} 法力`
              })
            },
            // Tier 2 (lv 6)
            {
              id: 'hex_bane', name: '厄咒·诅咒', req: 6, prereqs: ['cleave'],
              desc: '施加厄咒：为武器附加魔法伤害，并使目标攻击评级-25%、防御-30%，持续6秒。每次只能维持一个厄咒。',
              levels: (lv) => ({
                magicDmg: `+${Math.round(lv * 8 + 15)} 武器魔法伤害`,
                targetAR: `-25% 目标攻击评级`,
                targetDef: `-30% 目标防御`,
                duration: `${(4 + lv * 0.3).toFixed(1)} 秒`,
                mana: `${(4 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            {
              id: 'hex_siphon', name: '厄咒·汲取', req: 6, prereqs: ['levitation_mastery'],
              desc: '施加厄咒：降低目标伤害输出，每次击杀受到此厄咒的目标时恢复生命和法力。与吞噬强化有协同加成。',
              levels: (lv) => ({
                dmgReduce: `-${Math.min(50, lv * 2 + 10)}% 目标伤害`,
                onKillLife: `击杀时恢复 ${Math.round(lv * 1 + 1)} 生命`,
                onKillMana: `击杀时恢复 ${Math.round(lv * 1 + 1)} 法力`,
                duration: `${(4 + lv * 0.3).toFixed(1)} 秒`,
                mana: `${(4 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            // Tier 3 (lv 12)
            {
              id: 'echoing_strike', name: '回响斩', req: 12, prereqs: ['cleave', 'hex_bane'],
              desc: '投掷武器回响，飞出和返回各穿透并造成75%武器伤害。镜影刃和刃影传送提供协同加成。',
              levels: (lv) => ({
                damage: `75% 武器伤害（来回各一次）`,
                magicDmg: `+${Math.round(lv * 15 + 30)}-${Math.round(lv * 25 + 50)} 额外魔法伤害`,
                synergy: `镜影刃每级+5%伤害，刃影传送每级+5%伤害`,
                mana: `${(8 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            {
              id: 'hex_purge', name: '厄咒·净化爆', req: 12, prereqs: ['hex_bane', 'hex_siphon'],
              desc: '施加厄咒：目标被命中时有69%概率爆炸（厄咒消失后不再触发），爆炸对神秘爆击有50%/级协同加成。',
              levels: (lv) => ({
                explodeChance: `69% 命中触发爆炸`,
                damage: `${Math.round(lv * 12 + 20)}-${Math.round(lv * 20 + 35)} 爆炸伤害`,
                radius: `${(1.3 + lv * 0.1).toFixed(1)} 码`,
                blastSynergy: `+50%/级神秘爆击魔法伤害（协同）`,
                mana: `${(6 + lv * 0.2).toFixed(1)} 法力`
              })
            },
            // Tier 4 (lv 18)
            {
              id: 'blade_warp', name: '刃影传送', req: 18, prereqs: ['echoing_strike', 'hex_siphon'],
              desc: '投掷星界武器并瞬间传送到落点，可穿越可通行的墙壁和门道。对回响斩提供+5%/级协同加成。',
              levels: (lv) => ({
                range: `最远 ${(6 + lv * 0.4).toFixed(0)} 码`,
                passThrough: `可穿越门道与可通行墙壁`,
                synergy: `+5%/级 回响斩伤害（协同）`,
                mana: `${Math.max(4, 18 - lv)} 法力`
              })
            },
            {
              id: 'eldritch_blast', name: '神秘爆击', req: 18, prereqs: ['echoing_strike', 'hex_purge'],
              desc: '对受厄咒目标释放魔法爆击，同时刷新厄咒持续时间并吸取5%伤害为生命和法力。',
              levels: (lv) => ({
                damage: `${Math.round(lv * 25 + 50)}-${Math.round(lv * 40 + 90)} 魔法伤害`,
                refreshHex: `刷新厄咒持续时间`,
                steal: `吸取造成伤害的 5% 为生命和法力`,
                hexDuration: `+2秒/级 厄咒持续时间（协同至神秘爆击）`,
                mana: `${(10 + lv * 0.3).toFixed(1)} 法力`
              })
            },
            // Tier 5 (lv 24)
            {
              id: 'psychic_ward', name: '念力护盾', req: 24, prereqs: ['blade_warp'],
              desc: '激活念力护盾，吸收受到的伤害（裂空斩和悬浮精通每级提供+15吸收量协同），并对近战攻击者施加眩晕。',
              levels: (lv) => ({
                absorb: `吸收 ${Math.round(lv * 40 + 80)} 伤害`,
                synergy: `裂空斩+悬浮精通每级各+15吸收量`,
                stun: `眩晕近战攻击者 ${(0.4 + lv * 0.1).toFixed(1)} 秒`,
                duration: `${(10 + lv * 2).toFixed(0)} 秒`,
                mana: `18 法力`
              })
            },
            // Tier 6 (lv 30)
            {
              id: 'mirrored_blades', name: '镜影刃', req: 30, prereqs: ['blade_warp', 'eldritch_blast'],
              desc: '复制多把武器同时攻击目标，每把造成60%武器伤害，对Boss和Uber极为有效。对裂空斩和回响斩提供+10%/级协同。',
              levels: (lv) => ({
                blades: `${3 + Math.floor(lv / 4)} 把镜影刃`,
                damage: `60% 武器伤害（每把）`,
                synergy: `+10%/级 裂空斩伤害，+5%/级 回响斩伤害（协同）`,
                mana: `${(18 + lv * 0.5).toFixed(1)} 法力`
              })
            }
          ]
        }
      ]
    }
  }
};
