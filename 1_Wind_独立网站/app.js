/**
 * Olu (前端核心控制器)
 * 纯静态极速单页架构，零外部依赖，毫秒级秒开
 * 依据《考研英语作文模板》高分体系与大纲评分规范精编
 */

(function () {
  'use strict';

  // 1. Data Store
  const ASSEMBLY_SLOT_DEFAULTS = {
    partA: {
      // Mother Template 1: Event Letter (精准标定为 100 词黄金区间)
      salutation: 'Professor Smith',
      emotion: 'delight',
      reason: 'inform you of our upcoming event',
      action: 'invite',
      matter: 'the International Innovation Contest',
      time_loc: 'is scheduled from 9:00 a.m. to 4:00 p.m. next Saturday in the Student Activity Center',
      aim: 'aimed at encouraging campus innovation',
      process: 'it features keynote speeches, project exhibitions, and workshops',
      harvest: 'participants will not only broaden their horizons, but also enhance practical skills',
      closing_wish: 'We sincerely anticipate your attendance with your team.',
      closing_reply: 'Looking forward to receiving your favorable reply.',

      // Mother Template 2: Non-Event Letter
      ne_salutation: 'President',
      ne_purpose: 'put forward some constructive suggestions regarding campus library services',
      ne_problem: 'the noticeable shortage of individual study cubicles and the occasional disturbance caused by phone calls',
      ne_solution: 'expanding designated silent study zones and deploying a smart seat reservation system',
      ne_closing: 'I sincerely hope that these practical suggestions will be taken into favorable consideration.',

      // Mother Template 3: Official Notice (官方告示交互词槽)
      not_date: 'May 15',
      not_target: 'all students and campus members',
      not_event: 'the upcoming cultural festival',
      not_time_loc: 'is scheduled from 9:00 a.m. to 4:00 p.m. next Saturday in the Student Activity Center',
      not_activity: 'feature interactive workshops, traditional exhibitions, and hands-on demonstrations',
      not_requirement: 'arrive punctually and observe the relevant campus regulations',
      not_closing: 'All students are warmly encouraged to take part in this meaningful event. Should you have any questions, please feel free to contact the Students\' Union.',
      not_sign: 'The Students\' Union'
    },
    partB: {
      pic_action: "groups of graduates are standing at life's crossroads, hesitating among multiple choices",
      pic_topic: "rational decision-making and self-exploration in modern youth development",
      chart_type: "bar",
      chart_topic: "the primary leisure activities and social engagement among elderly citizens in a community",
      chart_lead: "watching television and daily physical exercise",
      chart_data: "90.8% and 68.3% respectively",
      chart_secondary: "35%",
      b_topic_pos: "cultural heritage and innovative spirit",
      b_topic_neg: "excessive addiction to short-video entertainment and virtual socializing",
      b_dial_topic: "the rapid proliferation of generative artificial intelligence in academic study",
      b_dial_pos: "drastically enhances intellectual productivity and empowers scientific inquiry",
      b_dial_risk: "stifles independent critical thinking and fosters excessive cognitive laziness",
      b_para3_target: "addressing this critical issue",
      b_para3_student: "foster a sensible mindset and take active initiative",
      b_para3_gov: "provide favorable guidance and supportive policies"
    }
  };

  const ASSEMBLY_SLOT_LABELS = {
    // Part A Event Letter
    salutation: '称呼规范',
    emotion: '情感态度',
    reason: '前置事由',
    action: '正文动词',
    matter: '活动/事项',
    time_loc: '时间与地点',
    aim: '宗旨与目的',
    process: '流程与环节',
    harvest: '收获与意义',
    closing_wish: '期望祝愿句',
    closing_reply: '期待回复句',

    // Part A Non-Event Letter
    ne_salutation: '收件人称呼',
    ne_purpose: '写作事由意图',
    ne_problem: '核心痛点问题',
    ne_solution: '建设性对策',
    ne_closing: '期望采纳结语',

    // Part A Official Notice
    not_date: '通知日期',
    not_target: '通知对象',
    not_event: '通知事项/活动',
    not_time_loc: '时间与地点',
    not_activity: '核心环节内容',
    not_requirement: '要求与纪律',
    not_closing: '尾段倡议与答疑',
    not_sign: '发布集体署名',

    // Part B Para 1 Picture / Chart
    pic_action: '图画主旨动作',
    pic_topic: '寓意升华议题',
    chart_type: '图表类型',
    chart_topic: '图表调研主题',
    chart_lead: '首位领跑项目',
    chart_data: '极值占比数据',
    chart_secondary: '中位/次位界限',

    // Part B Para 2 Tracks
    b_topic_pos: '正向品质/现象',
    b_topic_neg: '负向沉迷/弊端',
    b_dial_topic: '辩证核心议题',
    b_dial_pos: '积极赋能成效',
    b_dial_risk: '潜在隐患风险',

    // Part B Para 3 Conclusion
    b_para3_target: '收官应对焦点',
    b_para3_student: '青年学子作为',
    b_para3_gov: '主管部门引导'
  };

  const ASSEMBLY_SLOT_OPTIONS = {
    partA: {
      salutation: [
        { text: 'Professor Smith', cn: '教授/外教尊称' },
        { text: 'David', cn: '熟人朋友直呼名' },
        { text: 'International Students', cn: '留学生群体集体称呼' },
        { text: 'Sir or Madam', cn: '未知负责人/公函' },
        { text: 'All Faculty and Students', cn: '全体师生告示/公告' }
      ],
      emotion: [
        { text: 'delight', cn: '由衷高兴/喜悦' },
        { text: 'excitement', cn: '兴奋/期待' },
        { text: 'heartfelt gratitude', cn: '诚挚感激' },
        { text: 'deep regret', cn: '深表歉意/遗憾' },
        { text: 'sincere appreciation', cn: '真诚赞赏' }
      ],
      reason: [
        { text: 'inform you of our upcoming event', cn: '告知即将举办的活动（最简高分）' },
        { text: 'inform you about our upcoming contest', cn: '告知即将举办的竞赛' },
        { text: 'hear from you regarding the cultural event', cn: '收到关于文化活动的来信' },
        { text: 'share details of our approaching project with you', cn: '分享即将开展的项目细节' },
        { text: 'offer you some constructive advice', cn: '提出建设性改进建议' }
      ],
      action: [
        { text: 'invite', cn: '诚挚邀请' },
        { text: 'recommend', cn: '极力推荐' },
        { text: 'clarify details for', cn: '解答/阐明细节' },
        { text: 'express appreciation to', cn: '表达感激' },
        { text: 'introduce the arrangements to', cn: '介绍相关安排' }
      ],
      matter: [
        { text: 'the International Innovation Contest', cn: '国际创新大赛' },
        { text: 'the Campus Food and Cultural Festival', cn: '校园国际美食文化节' },
        { text: 'the Research Assistant Program', cn: '助研招募项目' },
        { text: 'the Intangible Cultural Heritage Workshop', cn: '非遗文化工作坊' },
        { text: 'the Volunteer Teaching Campaign', cn: '支教志愿服务行动' }
      ],
      time_loc: [
        { text: 'is scheduled from 9:00 a.m. to 4:00 p.m. next Saturday in the Student Activity Center', cn: '定于下周六上午9点至下午4点在学生活动中心举行（精炼规范）' },
        { text: 'will take place in the University Lecture Hall from 2:00 p.m. to 5:00 p.m. this Friday', cn: '将于本周五下午2点至5点在大学报告厅举行（讲座/赛事）' },
        { text: 'is slated to kick off next Monday on our campus central square', cn: '定于下周一在校园中央广场盛大启幕（户外展演/文化节）' },
        { text: 'runs from October 15th to 20th in the City Exhibition Hall', cn: '于10月15日至20日在市展览中心持续举行（多日展览）' }
      ],
      aim: [
        { text: 'aimed at encouraging campus innovation', cn: '旨在激发校园创新活力（5词精炼）' },
        { text: 'serving as an inspiring platform to encourage campus innovation', cn: '作为激发校园创新活力的激励平台' },
        { text: 'aiming to enrich students’ extracurricular life and promote cultural exchange', cn: '旨在丰富学生课外生活并促进多元文化交流' },
        { text: 'with the primary objective of enhancing academic collaboration and practical skills', cn: '以促进学术合作与提升实践动手技能为首要目标' }
      ],
      process: [
        { text: 'it features keynote speeches, project exhibitions, and workshops', cn: '涵盖主旨发言、成果展演与实操工作坊（9词精炼）' },
        { text: 'the event will feature keynote presentations, hands-on demonstrations, and interactive discussions', cn: '活动涵盖主旨演讲、现场实操展示与互动研讨' },
        { text: 'it includes preliminary rounds, a collaborative project showcase, and an expert Q&A session', cn: '包括初选预赛、协作项目成果展与专家答疑环节' },
        { text: 'attendees will enjoy traditional performances, culinary exhibitions, and interactive games', cn: '与会者将体验传统展演、特色美食展示与互动游戏' }
      ],
      harvest: [
        { text: 'participants will not only broaden their horizons, but also enhance practical skills', cn: '不仅能开阔视野，更能锻炼实践技能（13词高分倒装句）' },
        { text: 'not only do participants reap a valuable chance to broaden their horizons, but they will also enhance practical skills in addressing real-world issues', cn: '不仅能极大地开阔视野，更能显著提升应对现实问题的实践技能（拓展详尽版）' },
        { text: 'attendees are bound to gain profound insights into cutting-edge developments and expand their academic networks', cn: '参与者必将深刻洞悉前沿动态并极大地拓展学术人脉圈' },
        { text: 'this invaluable practice will substantially sharpen your communication skills and team-building capability', cn: '这一难得的实践锻炼将大幅锤炼沟通表达与团队协作能力' }
      ],
      closing_wish: [
        { text: 'We sincerely anticipate your attendance with your team.', cn: '我们诚挚期待您携团队莅临现场。（9词精炼）' },
        { text: 'On behalf of the organizing committee, we sincerely anticipate your attendance with your team.', cn: '谨代表组委会，诚挚期待您携团队莅临现场（邀请信官方礼貌）' },
        { text: 'I firmly believe this grand gathering will bring you both inspiration and delightful experiences.', cn: '我坚信本次盛会必将带给您充沛灵感与愉悦体验（推荐/通知）' },
        { text: 'I sincerely hope that these practical suggestions will prove helpful and be taken into consideration.', cn: '诚挚希望上述务实建议能有所裨益并获得采纳考量（建议信）' }
      ],
      closing_reply: [
        { text: 'Looking forward to receiving your favorable reply.', cn: '期待收到您的积极答复。（7词精炼万能句）' },
        { text: 'Looking forward to receiving your favorable reply at your earliest convenience.', cn: '期待在您方便的最早时间收到积极答复（最稳经典长句）' },
        { text: 'Looking forward to meeting you in person on that special occasion.', cn: '期盼在这一特殊盛会中与您线下相聚（活动/邀请）' },
        { text: 'Should you require further information, please feel free to let me know.', cn: '如需进一步信息，请随时与我联系（商务/咨询/答复）' }
      ],
      ne_salutation: [
        { text: 'President', cn: '校长/院长' },
        { text: 'Store Manager', cn: '商户店长/客服主管' },
        { text: 'Professor Johnson', cn: '指导导师/授课教师' },
        { text: 'Editor', cn: '报社/期刊主编' },
        { text: 'Human Resources Director', cn: '人力资源总监/招聘主管' }
      ],
      ne_purpose: [
        { text: 'put forward some constructive suggestions regarding campus library services', cn: '就图书馆服务提出建设性改进建议（建议信）' },
        { text: 'express my deep dissatisfaction with the subpar quality of the newly purchased device', cn: '就近期购买商品的严重质量问题予以投诉（投诉信）' },
        { text: 'tender my formal resignation from the position of project coordinator', cn: '正式提出辞去项目协调员职务之申请（辞职信）' },
        { text: 'express my profound apologies for missing the scheduled academic conference', cn: '就未能如期出席预定学术会议深致歉意（道歉信）' },
        { text: 'inquire about the detailed requirements and application deadlines for the exchange program', cn: '咨询交流生项目的具体选拔要求与申请截止日期（询问信）' }
      ],
      ne_problem: [
        { text: 'the noticeable shortage of individual study cubicles and the occasional disturbance caused by phone calls', cn: '独立自习隔间紧缺以及偶尔发生的电话干扰声' },
        { text: 'the recurrent system crashes and unresponsive customer service support', cn: '系统频繁崩溃与售后客服长期无人应答' },
        { text: 'the heavy overlapping between my current duties and approaching postgraduate research', cn: '当前工作职责与即将开展的读研深造日程产生严重冲突' },
        { text: 'a sudden health emergency that prevented me from arriving on schedule', cn: '突发身体急性不适导致未能按既定日程抵达' },
        { text: 'the ambiguity surrounding qualification criteria and accommodation arrangements', cn: '申请资质门槛与海外住宿配套安排缺乏清晰明示' }
      ],
      ne_solution: [
        { text: 'expanding designated silent study zones and deploying a smart seat reservation system', cn: '扩建静音自习专区并上线智能座位预约系统' },
        { text: 'arranging an immediate product replacement alongside a formal inspection report', cn: '立即予以换货并出具正式质检核查报告' },
        { text: 'initiating a thorough handover procedure to assist my successor during the transition', cn: '启动周详的交接工作以协助继任同事平稳过渡' },
        { text: 'rescheduling our one-on-one discussion at your earliest convenience', cn: '在您方便的最早时间重新预约一对一交流' },
        { text: 'publishing an updated official FAQ brochure on the departmental website', cn: '在院系官方网站发布更新版常见问题答疑指引' }
      ],
      ne_closing: [
        { text: 'I sincerely hope that these practical suggestions will be taken into favorable consideration.', cn: '诚挚希望上述务实建议能获得贵方的积极采纳考量。' },
        { text: 'I would be grateful if this urgent matter could be resolved without unnecessary delay.', cn: '如能尽快妥善处理该紧急事宜，本人将不胜感激。' },
        { text: 'Once again, please accept my heartfelt gratitude for your enduring guidance and mentorship.', cn: '再次衷心感谢您一直以来的悉心教导与倾心关怀。' },
        { text: 'Once again, please accept my sincere apology for any inconvenience caused.', cn: '再次就由此给您带来的诸多不便致以深切歉意。' },
        { text: 'Your timely guidance and clarification on these inquiries would be highly appreciated.', cn: '若能蒙贵方尽早对上述询问给予解惑答复，本人将深表谢意。' }
      ],
      not_date: [
        { text: 'May 15', cn: '5月15日（春夏考试通用）' },
        { text: 'October 18', cn: '10月18日（秋冬活动通用）' },
        { text: 'June 5', cn: '6月5日（世界环境日/毕业季）' },
        { text: 'September 20', cn: '9月20日（开学迎新季）' }
      ],
      not_target: [
        { text: 'all students and campus members', cn: '全体师生及校园成员（官方通用）' },
        { text: 'all undergraduate and postgraduate students', cn: '全体本科生及研究生（学业活动）' },
        { text: 'international students and exchange scholars', cn: '留学生与国际交流学者（涉外活动）' },
        { text: 'all prospective volunteer candidates', cn: '所有有志申请的志愿者人选（招募通知）' }
      ],
      not_event: [
        { text: 'the upcoming cultural festival', cn: '即将举办的校园文化节' },
        { text: 'the approaching English singing contest', cn: '即将举行的英语歌唱大赛' },
        { text: 'the volunteer teaching campaign in rural schools', cn: '乡村学校支教志愿公益服务活动' },
        { text: 'the annual campus innovation and career fair', cn: '年度校园创新创业与招聘博览会' },
        { text: 'the international academic lecture series', cn: '高端国际前沿学术系列讲座' }
      ],
      not_time_loc: [
        { text: 'is scheduled from 9:00 a.m. to 4:00 p.m. next Saturday in the Student Activity Center', cn: '定于下周六上午9点至下午4点在学生活动中心举行' },
        { text: 'will take place in the main lecture hall from 2:00 p.m. to 5:00 p.m. this Friday', cn: '将于本周五下午2点至5点在主学术报告厅举行' },
        { text: 'will be held in the campus library auditorium on May 20', cn: '定于5月20日在校园图书馆大礼堂举办' }
      ],
      not_activity: [
        { text: 'feature interactive workshops, traditional exhibitions, and hands-on demonstrations', cn: '涵盖互动工作坊、传统展演及实操展示' },
        { text: 'include preliminary auditions, collaborative sessions, and the award ceremony', cn: '包括初选选拔、团队协作展示及颁奖典礼' },
        { text: 'consist of keynote presentations, project displays, and a Q&A panel', cn: '由专家主旨报告、项目成果展及现场答疑组成' }
      ],
      not_requirement: [
        { text: 'arrive punctually and observe the relevant campus regulations', cn: '准时到达并严格遵守相关校园秩序与规范' },
        { text: 'submit their completed application forms to the office before the deadline', cn: '在截止日期前将填妥的申请表递交至指定办公室' },
        { text: 'wear formal attire and follow the instructions of the organizers', cn: '着正装出席并严格遵守现场组织工作人员的统一引导' }
      ],
      not_closing: [
        { text: 'All students are warmly encouraged to take part in this meaningful event. Should you have any questions, please feel free to contact the Students\' Union.', cn: '热忱鼓励全体同学参加！如有疑问请随时联系学生会。（号召+答疑经典组合）' },
        { text: 'Your active participation and cooperation with the above arrangements will be highly appreciated.', cn: '期待大家的积极参与，对上述安排的通力配合我们将不胜感激。（礼貌致谢）' },
        { text: 'We sincerely hope that this event will offer all participants a rewarding and memorable experience.', cn: '真诚希望本次活动能为全体参与者带来充实而难忘的宝贵体验。（温情期许）' }
      ],
      not_sign: [
        { text: 'The Students\' Union', cn: '校学生会（最常见考题身份）' },
        { text: 'The Organizing Committee', cn: '活动组织委员会（官方规范）' },
        { text: 'The Graduate School', cn: '研究生院' },
        { text: 'The Volunteer Association', cn: '青年志愿者协会' },
        { text: 'The Department of English', cn: '英语系 / 外国语学院' }
      ]
    },
    partB: {
      pic_action: [
        { text: "groups of graduates are standing at life's crossroads, hesitating among multiple choices", cn: "毕业生站在人生十字路口，在多种选择前犹豫不决" },
        { text: "a lively traditional dragon boat race is being held enthusiastically in a village", cn: "乡村正热火朝天地举行一场生机勃勃的传统龙舟赛" },
        { text: "one student regards non-major lectures as useless, whereas his companion values the broad horizon", cn: "一名学生认为跨专业讲座无用，同伴却看重开阔视野" },
        { text: "two travelers face the same half-empty bottle with diametrically opposed mindsets", cn: "两位旅人面对同一半瓶水，展现出截然相反的心态" },
        { text: "a pair of disabled runners support each other across the marathon finish line", cn: "两位残障运动员在马拉松赛道上携手相互搀扶冲向终点" },
        { text: "diners at a family gathering are all buried in handheld smartphone screens", cn: "聚餐桌上的家庭成员全部埋头紧盯手机屏幕，彼此毫无交流" }
      ],
      pic_topic: [
        { text: "rational decision-making and self-exploration in modern youth development", cn: "现代青年成长中的理性抉择与自我探索" },
        { text: "the renewed vitality and cultural inheritance of traditional heritage in contemporary life", cn: "传统文化在当代生活中的崭新活力与传承" },
        { text: "the indispensable value of interdisciplinary competence and open-mindedness", cn: "跨学科综合素养与开放胸怀的不可或缺价值" },
        { text: "an optimistic mindset and unwavering resilience in the face of life adversity", cn: "面对生活逆境时的乐观心态与坚定韧性" },
        { text: "genuine interpersonal warmth and intentional digital detox in the smartphone era", cn: "智能手机时代的真实人际温情与自觉数字断联" },
        { text: "mutual collaboration and unity of purpose in overcoming arduous challenges", cn: "面对艰难险阻时彼此携手互助与团结协作的精神" }
      ],
      chart_type: [
        { text: "bar", cn: "柱状图 (bar chart)" },
        { text: "pie", cn: "饼状图 (pie chart)" },
        { text: "line", cn: "折线图 (line chart)" },
        { text: "data table", cn: "数据表格 (data table)" }
      ],
      chart_topic: [
        { text: "the primary leisure activities and social engagement among elderly citizens in a community", cn: "社区老年人主要休闲活动与社会参与调查" },
        { text: "the rapid growth and popularity of electric vehicle ownership in major cities", cn: "各大城市电动汽车拥有量的迅猛增长与普及" },
        { text: "the distribution of undergraduate graduates' career choices over the past five years", cn: "过去五年本科毕业生去向选择分布" },
        { text: "the steady improvement in Chinese residents' health literacy levels", cn: "我国居民健康素养水平的稳步提升" },
        { text: "the structural changes in household cultural and recreational spending", cn: "居民家庭文化休闲娱乐消费结构变迁" },
        { text: "the survey on university students' innovative entrepreneurial endeavors", cn: "高校大学生创新创业参与现状与发展倾向调查" }
      ],
      chart_lead: [
        { text: "watching television and daily physical exercise", cn: "看电视与日常体育锻炼（老年人休闲活动）" },
        { text: "direct employment and domestic postgraduate study", cn: "直接就业与国内考研升学（毕业生去向）" },
        { text: "commercial pure electric vehicles and hybrid passenger cars", cn: "商用纯电动汽车与混动乘用车（新能源汽车增长）" },
        { text: "regular scientific physical exercise and balanced dietary habits", cn: "规律科学健身与均衡饮食习惯（健康素养）" },
        { text: "digital entertainment and cultural tourism consumption", cn: "数字文娱与文化旅游消费（家庭消费）" },
        { text: "campus technology competitions and scientific incubator projects", cn: "校园科技竞赛与科研孵化项目（大学生双创）" }
      ],
      chart_data: [
        { text: "90.8% and 68.3% respectively", cn: "分别达到 90.8% 和 68.3%（高位并列领先）" },
        { text: "the lion's share of 58.2%", cn: "58.2% 的绝对主导绝大多数份额" },
        { text: "a combined total of over 75%", cn: "合计超过 75% 的庞大比例" },
        { text: "an impressive peak of 82.5%", cn: "高达 82.5% 的亮眼峰值数据" },
        { text: "a remarkable surge from 15% to nearly 48%", cn: "从 15% 到近 48% 的显著飙升跨度" }
      ],
      chart_secondary: [
        { text: "35%", cn: "35%（中位界限，其余项目均低于此）" },
        { text: "20%", cn: "20%（中低位分水岭界限）" },
        { text: "15%", cn: "15%（低位界限，长尾项目零星分布）" },
        { text: "10%", cn: "10%（长尾分项均不足一成）" },
        { text: "5%", cn: "5%（其余各项仅占极微弱比例）" }
      ],
      b_topic_pos: [
        { text: "cultural heritage and innovative spirit", cn: "文化传承与创新精神" },
        { text: "self-discipline and persistent dedication", cn: "自律专注与坚持不懈" },
        { text: "technological literacy and scientific inquiry", cn: "科技素养与科学探索精神" },
        { text: "empathy and harmonious mutual assistance", cn: "同理心与和谐互助" },
        { text: "interdisciplinary exploration and open-mindedness", cn: "跨学科探索与开阔胸怀" },
        { text: "green environmental consciousness and sustainable habits", cn: "绿色生态环保意识与可持续发展理念" }
      ],
      b_topic_neg: [
        { text: "excessive addiction to short-video entertainment and virtual socializing", cn: "过度沉迷短视频娱乐与虚拟社交" },
        { text: "chronic procrastination and impulsive consumerism", cn: "长期学业拖延与冲动消费主义" },
        { text: "blind conformity and neglect of physical fitness", cn: "盲目跟风随大流与忽视身体锻炼" },
        { text: "academic dishonesty and over-reliance on automated tools", cn: "学术投机不端与过度依赖自动化工具" },
        { text: "emotional estrangement caused by handheld screen fixation", cn: "手机低头族导致的情感疏离与沟通隔阂" }
      ],
      b_dial_topic: [
        { text: "the rapid proliferation of generative artificial intelligence in academic study", cn: "生成式人工智能在学术学习中的迅猛普及" },
        { text: "the ubiquity of algorithmic recommendations and social media platforms", cn: "算法推荐与社交媒体平台的无孔不入" },
        { text: "the intense pursuit of competitive academic credentials and certifications", cn: "对各类竞争性考级考证资格的狂热追逐" },
        { text: "the widespread adoption of digital remote learning and telecommuting", cn: "远程数字化教学与居家办公的广泛应用" },
        { text: "the booming expansion of the internet influencer economy", cn: "网红带货与网红经济的爆炸式扩张" }
      ],
      b_dial_pos: [
        { text: "drastically enhances intellectual productivity and empowers scientific inquiry", cn: "极大地提升了知识生产效率并为科学探究深度赋能" },
        { text: "provides tailored personalized learning resources and opens unprecedented convenience", cn: "提供了量身定制的个性化学习资源并带来前所未有的便利" },
        { text: "spurs transformative industrial innovation and creates countless new opportunities", cn: "催生了变革性的产业创新并创造出无数新兴机遇" },
        { text: "broadens public cognitive horizons and breaks traditional information boundaries", cn: "拓宽了大众的认知视野并打破了传统的信息壁垒" },
        { text: "promotes flexible work-life integration and optimizes resource allocation", cn: "促进了弹性灵活的工作生活融合并优化了资源调配" }
      ],
      b_dial_risk: [
        { text: "stifles independent critical thinking and fosters excessive cognitive laziness", cn: "扼杀了独立批判性思维，助长了极度的认知惰性" },
        { text: "leads to alarming information cocoons and erodes depth of concentration", cn: "容易导致令人担忧的信息茧房并严重侵蚀深度专注力" },
        { text: "triggers profound ethical uncertainties and worsens academic dishonesty", cn: "引发深层次的伦理不确定性并加剧学术不端风险" },
        { text: "widens the digital divide and undermines genuine interpersonal communication", cn: "拉大了数字鸿沟并损害了真实有温度的人际交流" },
        { text: "exacerbates mental anxiety and induces commercial manipulation", cn: "加剧心理焦虑迷茫并容易诱发商业资本操控" }
      ],
      b_para3_target: [
        { text: "addressing this critical issue", cn: "应对这一关键议题/深层问题" },
        { text: "promoting this positive phenomenon", cn: "发扬与推广这一积极向上的社会风气" },
        { text: "mitigating the potential hazards", cn: "有效规避并遏制潜在的不良隐患" },
        { text: "harnessing the power of this emerging trend", cn: "充分驾驭这一时代新趋势的赋能红利" },
        { text: "fostering a sound balance between progress and humanity", cn: "在时代科技进步与人文温度之间构筑健康平衡" }
      ],
      b_para3_student: [
        { text: "foster a sensible mindset and take active initiative", cn: "树立理性认知心态并采取积极主动作为" },
        { text: "cultivate self-discipline and balance virtual life with real practice", cn: "强化自律意识并在虚拟与现实之间保持健康平衡" },
        { text: "embrace open-mindedness and enhance comprehensive literacy", cn: "以开放胸襟拥抱时代并全面提升跨学科综合素养" },
        { text: "cherish cultural roots and practice lifelong learning", cn: "扎根优秀文化底蕴并躬身践行终身学习" },
        { text: "resist blind conformity and pursue authentic personal aspirations", cn: "坚决抵制盲目跟风并坚定追随内心真实理想目标" }
      ],
      b_para3_gov: [
        { text: "provide favorable guidance and supportive policies", cn: "提供科学正向引导并出台有力支持政策" },
        { text: "strengthen oversight and establish sound regulatory mechanisms", cn: "强化行业监管力度并建立健全制度规范机制" },
        { text: "organize educational campaigns and cultivate a healthy social environment", cn: "深入开展主题宣传教育并营造健康的社会生态氛围" },
        { text: "invest in infrastructure and expand equitable public resources", cn: "加大基础设施投入并提供普惠公平的公共优质资源" },
        { text: "encourage technological innovation while safeguarding ethical standards", cn: "鼓励科技大胆创新的同时严守伦理道德与学术底线" }
      ]
    }
  };

  const DYNAMIC_CHART_EXEMPLARS = [
    {
      badge: '稳步平稳上升',
      badgeClass: 'exemplar-badge-up',
      en: 'Between 2015 and 2024, the proportion of online learners underwent a steady increase from 25% to 58%, indicating the growing popularity of digital education.',
      cn: '在2015至2024年间，在线学习者的比例经历了一轮从25%至58%的稳步增长，彰显出数字教育日益深入人心。',
      analysis: '【五元拆解】：时间区间 (Between 2015 and 2024) ＋ 指标对象 (the proportion of online learners) ＋ 趋势动词 (underwent a steady increase) ＋ 数值变化 (from 25% to 58%) ＋ 分词意义 (indicating...)'
    },
    {
      badge: '爆发性显著飙升',
      badgeClass: 'exemplar-badge-surge',
      en: 'Over the past five years, electric vehicle market share registered a remarkable surge from 12% to nearly 45%, reflecting a greener shift in consumer mindset.',
      cn: '在过去五年间，电动汽车的市场份额录得了一轮从12%至近45%的显著激增，折射出消费者观念向绿色环保的深刻转变。',
      analysis: '【五元拆解】：时间区间 (Over the past five years) ＋ 指标对象 (EV market share) ＋ 趋势动词 (registered a remarkable surge) ＋ 数值变化 (from 12% to 45%) ＋ 分词意义 (reflecting...)'
    },
    {
      badge: '温和持续回落',
      badgeClass: 'exemplar-badge-down',
      en: 'During the surveyed period, traditional retail sales witnessed a moderate decline of 14%, demonstrating the profound impact of e-commerce on physical commerce.',
      cn: '在调研期间，传统零售销售额见证了14%的温和下滑，充分印证了电子商务对实体商业带来的深远冲击。',
      analysis: '【五元拆解】：时间区间 (During the surveyed period) ＋ 指标对象 (traditional retail sales) ＋ 趋势动词 (witnessed a moderate decline) ＋ 数值变化 (of 14%) ＋ 分词意义 (demonstrating...)'
    },
    {
      badge: '触底反弹企稳',
      badgeClass: 'exemplar-badge-rebound',
      en: 'After hitting an all-time low in 2020, public cultural spending experienced a robust rebound to 36%, showcasing renewed community vitality.',
      cn: '在2020年触及历史低点后，公共文化消费迎来了一轮强劲反弹并升至36%，展现出社区文化生活生机勃勃的全新活力。',
      analysis: '【五元拆解】：分词时间状语 (After hitting an all-time low) ＋ 指标对象 (spending) ＋ 趋势动词 (experienced a robust rebound) ＋ 数值变化 (to 36%) ＋ 分词意义 (showcasing...)'
    },
    {
      badge: '稳占绝大多数 (首位霸榜)',
      badgeClass: 'exemplar-badge-lead',
      en: "Direct employment consistently maintained its dominant momentum, accounting for the lion's share of 68%, outnumbering other choices by a large margin.",
      cn: '直接就业始终保持着绝对主导的势头，占据了68%的绝大份额，以压倒性优势领先于其他毕业去向选择。',
      analysis: "【五元拆解】：指标对象 (Direct employment) ＋ 趋势动词 (maintained dominant momentum) ＋ 极值占比 (accounting for the lion's share of 68%) ＋ 分词对比 (outnumbering other choices...)"
    }
  ];

  const STATIC_CLUSTERING_DATA = [
    {
      step: '句 1：全景引出',
      code: 'A glance at the chart reveals a pronounced divergence in [调查主题/核心指标].',
      tip: '一目了然点出数据之间存在“明显分化/多元格局”，绝不高谈阔论或流水账报菜名。'
    },
    {
      step: '句 2：极值高位聚类',
      code: 'In particular, [项目A] and [项目B] firmly occupy the top two positions, accounting for [X%] and [Y%] respectively, far outpacing the others.',
      tip: '将前两名关键数据合并表述，使用 respectively 精准对应，句末用分词短语体现领先优势。'
    },
    {
      step: '句 3：低位合并对比',
      code: 'By contrast, the remaining categories remain clustered at a relatively low tier, none of which exceeds [低位界限Z%].',
      tip: '【绝招】：用“none of which exceeds Z%”将3-4个琐碎低位数据一网打尽，考官极度赞赏这种信息整合提炼能力！'
    },
    {
      step: '句 4：承上启下提炼启迪',
      code: 'Succinct as the data is, it conveys significant enlightenments regarding [深层社会现象/核心议题].',
      tip: '让步倒装句，承接数据进入第二段深度原因与社会意义剖析。'
    }
  ];

  const LOGIC_CONNECTORS_DATA = [
    {
      id: 'cause',
      name: '因果推导',
      en: 'Cause & Effect',
      desc: '阐述根本原因、推导必然结果、由点及面',
      chips: [
        { word: 'Consequently,', cn: '因此/结果（句首引出结论）' },
        { word: 'Accordingly,', cn: '相应地/遵照这一趋势' },
        { word: 'Owing to the fact that...', cn: '由于...这一客观事实' },
        { word: 'primarily stems from...', cn: '主要源自于...' },
        { word: 'inevitably results in...', cn: '不可避免地导致...' },
        { word: 'For this reason,', cn: '正因如此' }
      ]
    },
    {
      id: 'contrast',
      name: '转折让步',
      en: 'Contrast & Concession',
      desc: '图画寓意转折、观点正反让步、突破表象',
      chips: [
        { word: 'Nevertheless,', cn: '然而/尽管如此（极正式转折）' },
        { word: 'Nonetheless,', cn: '虽然如此（学术议论文首选）' },
        { word: 'Plain as the drawing may appear,', cn: '图画看似质朴，实则...' },
        { word: 'Succinct as the data is,', cn: '数据虽简短，却...' },
        { word: 'Conversely,', cn: '相反地（引出相反境况）' },
        { word: 'On the contrary,', cn: '恰恰相反' }
      ]
    },
    {
      id: 'progress',
      name: '递进补充',
      en: 'Progression & Addition',
      desc: '分论点层层递进、逻辑深度加码',
      chips: [
        { word: 'Furthermore,', cn: '此外/进而（论证深入一层）' },
        { word: 'Moreover,', cn: '再者/加之（补充关键论据）' },
        { word: 'What is more,', cn: '更有甚者/更值得关注的是' },
        { word: 'Not only... but also...', cn: '不仅...而且...（经典递进句）' },
        { word: 'In addition,', cn: '另外（平列补充）' }
      ]
    },
    {
      id: 'compare',
      name: '比较对比',
      en: 'Comparison & Distinction',
      desc: '图表极值反差、两种态度/群体鲜明对照',
      chips: [
        { word: 'In sharp contrast,', cn: '形成鲜明对比（强力反差）' },
        { word: 'By comparison,', cn: '相比之下' },
        { word: 'far outpaces...', cn: '远超/大幅领先于...' },
        { word: 'stand in diametrical opposition to...', cn: '与...截然相反/背道而驰' },
        { word: 'Compared with...', cn: '与...相比' }
      ]
    },
    {
      id: 'purpose',
      name: '目的条件',
      en: 'Purpose & Condition',
      desc: '收官建议段措施推导、达成愿景之路径',
      chips: [
        { word: 'With the aim of...', cn: '旨在/以...为目的' },
        { word: 'In an effort to...', cn: '为了努力实现...' },
        { word: 'Only when... can we...', cn: '唯有当...我们才能...（经典倒装）' },
        { word: 'Provided that...', cn: '只要/在...的前提下' },
        { word: 'So as to...', cn: '以便/从而能够...' }
      ]
    },
    {
      id: 'summary',
      name: '总结收官',
      en: 'Summary & Conclusion',
      desc: '三段首句定调、概括全文核心主旨',
      chips: [
        { word: 'In a nutshell,', cn: '简而言之/总而言之（生动地道）' },
        { word: 'To sum up,', cn: '综上所述' },
        { word: 'All things considered,', cn: '全面权衡考量' },
        { word: 'It is safe to conclude that...', cn: '完全可以得出结论...' },
        { word: 'In conclusion,', cn: '总而言之' }
      ]
    },
    {
      id: 'emphasis',
      name: '强调突出',
      en: 'Emphasis & Focus',
      desc: '强化论点不容置疑性、点明核心重点',
      chips: [
        { word: 'Undeniably,', cn: '不可否认地（极强说服力）' },
        { word: 'It is indisputable that...', cn: '无可争辩的是...' },
        { word: 'Beyond all doubt,', cn: '毫无疑问' },
        { word: 'In particular,', cn: '尤为值得指出的是' },
        { word: 'What matters most is that...', cn: '最至关重要的是...' }
      ]
    },
    {
      id: 'example',
      name: '举例印证',
      en: 'Exemplification',
      desc: '以典型案例印证论据、告别单调空洞',
      chips: [
        { word: 'A case in point is...', cn: '一个极佳的例证是...' },
        { word: 'To illustrate,', cn: '为阐明这一点，' },
        { word: 'As evidence of this,', cn: '作为对此的明证，' },
        { word: 'Notably,', cn: '值得特别注意的是，' }
      ]
    }
  ];

  const VERB_BANK_DATA = {
    positive: [
      { verb: 'fuel', cn: '激发/点燃动力', colloc: 'fuels their passion to conquer challenges', eg: 'Self-discipline fuels young people’s passion to conquer unexpected challenges.' },
      { verb: 'boost', cn: '促进/大幅提升', colloc: 'boosts students’ academic confidence', eg: 'Interdisciplinary learning boosts students’ intellectual adaptability.' },
      { verb: 'bolster', cn: '强化/有力支撑', colloc: 'bolsters social and cultural vitality', eg: 'Cultural heritage bolsters national cohesion and creative vitality.' },
      { verb: 'power', cn: '驱动向前发展', colloc: 'powers modern societal transformation', eg: 'Technological literacy powers the continuous progress of human civilization.' },
      { verb: 'drive', cn: '拉动/推动变革', colloc: 'drives lifelong personal growth', eg: 'Intrinsic curiosity drives individuals to explore unexplored realms.' },
      { verb: 'accelerate', cn: '加速推进进程', colloc: 'accelerates comprehensive career development', eg: 'Practical experience accelerates students’ professional competence.' },
      { verb: 'facilitate', cn: '为...提供便利', colloc: 'facilitates cross-cultural understanding', eg: 'This meaningful event facilitates genuine mutual understanding.' },
      { verb: 'catalyze', cn: '充当催化剂', colloc: 'catalyzes profound educational breakthroughs', eg: 'Innovative ideas catalyze positive breakthroughs across industries.' },
      { verb: 'pave the way for', cn: '为...铺平坦途', colloc: 'paves the way for sustainable success', eg: 'Diligent practice paves the way for lasting academic triumph.' },
      { verb: 'empower', cn: '赋予能力/赋能', colloc: 'empowers individuals to navigate uncertainties', eg: 'Solid professional skills empower youth to seize emerging opportunities.' },
      { verb: 'unlock', cn: '释放/开启潜能', colloc: 'unlocks tremendous creative potential', eg: 'A collaborative mindset unlocks boundless creative potential.' }
    ],
    negative: [
      { verb: 'cast a cloud over', cn: '使...蒙上阴影', colloc: 'casts a cloud over physical well-being', eg: 'Excessive smartphone addiction casts a heavy cloud over youngsters’ mental health.' },
      { verb: 'take a toll on', cn: '造成严重损耗损害', colloc: 'takes a severe toll on mutual interpersonal trust', eg: 'Virtual detachment takes a devastating toll on real-world family intimacy.' },
      { verb: 'deliver a blow to', cn: '给予沉重打击', colloc: 'delivers a blow to young people’s productivity', eg: 'Chronic procrastination delivers a heavy blow to academic excellence.' },
      { verb: 'be detrimental to', cn: '对...极为有害', colloc: 'is detrimental to balanced character building', eg: 'Short-sighted consumerism is detrimental to students’ long-term growth.' },
      { verb: 'impede', cn: '阻碍/妨碍步伐', colloc: 'impedes people from pursuing higher aspirations', eg: 'Self-doubt impedes graduates from seizing precious opportunities.' },
      { verb: 'hinder', cn: '妨碍健康发展', colloc: 'hinders the cultivation of independent thinking', eg: 'Blind conformity hinders the development of true originality.' },
      { verb: 'erode', cn: '侵蚀/蚕食品质', colloc: 'erodes young people’s patience and perseverance', eg: 'Instant gratification gradually erodes students’ depth of concentration.' },
      { verb: 'get in the way of', cn: '阻挡...的前进道路', colloc: 'gets in the way of achieving genuine excellence', eg: 'Passive habits get in the way of holistic personal development.' },
      { verb: 'serve as a barrier to', cn: '成为不可逾越的壁垒', colloc: 'serves as a barrier to empathetic communication', eg: 'Indifference serves as a barrier to harmonious community life.' },
      { verb: 'stifle', cn: '扼杀/压制创造力', colloc: 'stifles natural curiosity and innovation', eg: 'Rigid testing methods stifle teenagers’ artistic imagination.' },
      { verb: 'undermine', cn: '削弱/动摇根基', colloc: 'undermines the foundation of mutual trust', eg: 'Spreading rumors online undermines public social stability.' }
    ],
    charts: [
      { verb: 'soar to', cn: '激增/暴涨至极值', colloc: 'soared to a historic peak of 78%', eg: 'Electric vehicle ownership soared to a record peak of 78% in 2024.' },
      { verb: 'surge dramatically', cn: '急剧激增', colloc: 'surged dramatically over the past decade', eg: 'Urban per capita expenditure surged dramatically during the observed period.' },
      { verb: 'climb steadily', cn: '稳步平稳攀升', colloc: 'climbed steadily from 15% to 42%', eg: 'Public health literacy climbed steadily from 15% to 42%.' },
      { verb: 'plunge to', cn: '断崖式下跌至', colloc: 'plunged to an all-time low of 9%', eg: 'The unemployment proportion plunged to an encouraging all-time low.' },
      { verb: 'slump significantly', cn: '大幅萎缩衰退', colloc: 'slumped significantly amid industrial shifts', eg: 'Traditional newspaper circulation slumped significantly in recent years.' },
      { verb: 'level off at', cn: '在高位企稳盘整', colloc: 'leveled off at approximately 55%', eg: 'The market share leveled off at around 55% after rapid expansion.' },
      { verb: 'culminate at', cn: '达到最高顶点', colloc: 'culminated at a dominant 89.5%', eg: 'Participation in cultural activities culminated at nearly 90%.' },
      { verb: 'account for', cn: '占据...比例份额', colloc: 'accounted for the lion’s share of 68%', eg: 'Direct employment accounted for the lion’s share of graduate outcomes.' },
      { verb: 'hover around', cn: '在...附近徘徊', colloc: 'hovered around 25% for three consecutive years', eg: 'Overseas study applications hovered around 12% across five years.' },
      { verb: 'register a sharp rise', cn: '录得显著增长', colloc: 'registered a sharp rise of over 30%', eg: 'Online consumer satisfaction registered a sharp rise over the survey period.' },
      { verb: 'witness a moderate decline', cn: '见证温和下降', colloc: 'witnessed a moderate decline of 4.5%', eg: 'Rural labor export witnessed a moderate decline as local economies thrived.' },
      { verb: 'outnumber', cn: '在数量上超过', colloc: 'far outnumbered traditional alternatives', eg: 'Smart appliance users far outnumbered conventional household owners.' }
    ]
  };

  const EVALUATION_PHRASES_DATA = {
    positive: [
      { en: "hold ... in good stead", cn: "使...处于极其有利的地位 (PDF点名首推)", eg: "Cultivating interdisciplinary competence will undoubtedly hold graduates in good stead in the competitive job market." },
      { en: "pave the way for ...", cn: "为...的长期繁荣铺平坦途", eg: "Persistent dedication paves the way for sustainable academic and career breakthroughs." },
      { en: "serve as a stepping stone for ...", cn: "作为通向卓越成功的坚实垫脚石", eg: "Campus volunteer services serve as an invaluable stepping stone for real-world socialization." },
      { en: "be instrumental in ...", cn: "在...过程中发挥举足轻重的作用", eg: "A rational mindset is instrumental in overcoming cognitive setbacks." },
      { en: "deserve to be placed at a premium", cn: "理应受到全社会的高度重视与推崇", eg: "Fostering psychological resilience deserves to be placed at a premium in modern education." },
      { en: "deserve to be held in high regard", cn: "应当享有全社会的崇高敬意", eg: "Traditional craftsman spirit deserves to be held in high regard across generations." }
    ],
    negative: [
      { en: "serve as a stumbling block for ...", cn: "成为前进道路上的绊脚石/阻碍", eg: "Short-sighted instant gratification serves as a stumbling block for lifelong personal growth." },
      { en: "exert negative effects on ...", cn: "对...施加不可忽视的严重负面效应", eg: "Unregulated algorithmic feeds exert noticeable negative effects on teenagers' critical thinking." },
      { en: "be detrimental to ...", cn: "对...造成不可逆的严重危害", eg: "Excessive smartphone fixation is decidedly detrimental to balanced physical and mental well-being." },
      { en: "take a heavy toll on ...", cn: "造成严重损耗损害与沉重代价", eg: "Chronic academic procrastination takes a heavy toll on students' creative productivity." },
      { en: "deliver a blow to ...", cn: "给...带来极其沉重的打击", eg: "Blind commercialization delivers a severe blow to the integrity of cultural heritage." },
      { en: "cast a heavy cloud over ...", cn: "使...蒙上浓重的不安阴影", eg: "Uncertainties about employment cast a gloomy cloud over youngsters' career aspirations." }
    ]
  };

  const UMBRELLA_CONCEPTS_DATA = [
    {
      topic: "1. 亲情温情与人际交往",
      en: "Family Bonds & Interpersonal Warmth",
      words: "filial piety (孝顺/敬老), emotional warmth, face-to-face interaction, mutual empathy, bridge emotional distance",
      years: "通吃真题：2005 养老足球赛、2014 相携相伴、2015 聚餐低头族、2023 传统龙舟赛"
    },
    {
      topic: "2. 数字科技与时代双刃剑",
      en: "Digital Technology & Algorithmic Impact",
      words: "intentional digital detox (自觉数字断联), technological empowerment, information cocoons, cognitive laziness",
      years: "通吃真题：2009 网络的远与近、2015 手机时代的聚会、大纲样题生成式 AI 与短视频"
    },
    {
      topic: "3. 个人成长与自律坚持",
      en: "Personal Growth & Perseverance",
      words: "resist temptation (抵制诱惑), psychological resilience, down-to-earth execution, lifelong self-discipline",
      years: "通吃真题：2003 温室花朵、2012 半瓶水心态、2018 选课与水课、2019 爬山坚持、2020 拖延症"
    },
    {
      topic: "4. 文化自信与时代传承",
      en: "Cultural Heritage & Contemporary Vitality",
      words: "cultural confidence (文化自信), intangible heritage, renewed vitality, national cohesion, cross-cultural appreciation",
      years: "通吃真题：2010 文化火锅、2017 戏曲国粹进校园、2023 端午非遗赛龙舟"
    }
  ];

  const CHART_MILITARY_RULES = [
    {
      rule: "军规一：坚决杜绝流水账报菜名！",
      detail: "图表 3 项及以上数据切忌逐句机械翻译，必须归纳为‘明显分化 (pronounced divergence)’或‘双雄霸榜’！"
    },
    {
      rule: "军规二：首位领跑极值 + 长尾一句低位打包！",
      detail: "前两名用 occupy the lion’s share / rank first，其余长尾弱项直接用‘none of which exceeds X%’一网打尽，考官极度赏识！"
    },
    {
      rule: "军规三：数据后必须带分词升华！",
      detail: "句末必须跟分词状语（indicating / reflecting / highlighting / underscoring），由表层数据跃升为深层社会启迪！"
    }
  ];

  const GRA_SENTENCE_PATTERNS = [
    {
      type: "1. 否定句与否定倒装 (Negative Inversion)",
      eg: "On no account (Under no circumstances) can we ignore the immense value of knowledge.",
      cn: "我们绝不能忽视知识的巨大价值。（考场极强定调）",
      bonus: "Instead of indulging in PC games, children should be taught how to benefit from useful information."
    },
    {
      type: "2. 非限制性定语从句 (Non-defining Relative)",
      eg: "Practical courses can be applied to reality, which is of vital importance to their future career.",
      cn: "实用性课程能应用于实际，这对他们未来的职业发展至关重要。",
      bonus: "Part-time jobs develop interpersonal skills, which puts graduates in a favorable position."
    },
    {
      type: "3. 让步倒装句 (Concession & Inversion)",
      eg: "Reasonable as the opinion sounds, it cannot bear much deep analysis.",
      cn: "虽然这个观点听起来颇有道理，但经不起深入推敲。（大作文辩证必杀技）",
      bonus: "Plain as the picture may appear, it points beyond the surface scene."
    },
    {
      type: "4. It 引导学术评价句 (Formal It-Clauses)",
      eg: "It is conceivable that maintaining psychological resilience does immense good to our lifelong development.",
      cn: "可想而知，保持心理韧性对我们的终身发展大有裨益。",
      bonus: "It is hard to imagine what our modern life would look like without digital empowerment."
    },
    {
      type: "5. 假设虚拟条件句 (Conditional Hypotheses)",
      eg: "Without down-to-earth execution, we could hardly turn ambitious blueprints into tangible realities.",
      cn: "若缺乏脚踏实地的执行力，我们很难将宏伟蓝图变为现实。",
      bonus: "If we neglect intangible cultural roots, we will inevitably forfeit national cohesion."
    },
    {
      type: "6. 经典倒装句 (Partial Inversion with Only/Not only)",
      eg: "Only when concerted efforts are made from all quarters can we foster a promising future.",
      cn: "唯有全社会各方共同努力，我们才能构筑充满希望的未来。（第三段经典收官）",
      bonus: "Not only does studying in school serve academic purposes, but it also equips youth with social competence."
    },
    {
      type: "7. 强调句 (It is ... that ...)",
      eg: "It is for the benefit of sustainable growth that youngsters ought to resist instant gratification.",
      cn: "正是为了长远可持续成长，年轻一代才应当抵制即时享乐的诱惑。",
      bonus: "It is through embracing challenges that individuals unlock their full potential."
    },
    {
      type: "8. 精准比较句 (Comparative Structures)",
      eg: "Studies show that creative efficiency is twice as high for self-disciplined students as for procrastinators.",
      cn: "研究表明，自律学生的创新效率是拖延者的整整两倍。（图表/观点印证）",
      bonus: "Modern professionals enjoy less tranquil leisure time than they did previously."
    },
    {
      type: "9. 学术插入语 (Academic Parenthesis)",
      eg: "Cultural heritage, most important of all, anchors our spiritual identity in this fast-paced era.",
      cn: "文化遗产，最重要的是，在这个快节奏的时代锚定了我们的精神坐标。",
      bonus: "Providing practical support, in the long run, has proved to be a viable prescription."
    },
    {
      type: "10. 原因归因句 (Causation & Attribution)",
      eg: "Such an undesirable tendency primarily stems from a lack of self-discipline alongside virtual distraction.",
      cn: "这种不良倾向主要源于自律匮乏以及虚拟世界的诱惑干扰。（二段首句归因）",
      bonus: "We should attribute modern breakthroughs to interdisciplinary collaboration."
    }
  ];

  const PRESCRIPTION_MEASURES_DATA = [
    {
      title: "积极情况 1：总结 + 强调通往幸福与高度重视",
      type: "positive",
      en: "In a nutshell, I am firmly of the opinion that cultivating this virtue holds the key to personal happiness and thus deserves to be placed at a premium. Once the significance of this issue is fully recognized, the next step is to work out and implement a down-to-earth strategy. It is also incumbent on the departments concerned to introduce feasible measures to further promote it. Only by doing so can we lead a more fulfilling life.",
      cn: "简而言之，我坚定地认为，培养这种美德是通往个人幸福的关键，理应受到高度重视。一旦充分认识到这一问题的重要性，接下来就应制定并落实切实可行的策略。有关部门也有责任出台可行措施进一步推动其发展。只有这样，我们才能过上更加充实的生活。"
    },
    {
      title: "积极情况 2：政府出台策略 + 个人尽其所能推进",
      type: "positive",
      en: "To improve the current state of affairs, it should be high on the agenda of the departments concerned to formulate practical strategies and call for concerted efforts. As for individuals, we would be well advised to adjust our attitudes towards this practice and do our part in furthering it.",
      cn: "为了改善现状，有关部门应优先制定切实可行的策略，并呼吁社会各方共同努力。对于个人而言，我们也应调整对此的态度，并尽自己的一份力量推动其发展。"
    },
    {
      title: "积极情况 3：网络宣传与公众观念良性转变",
      type: "positive",
      en: "To improve the current state of affairs, we can launch online campaigns aimed at encouraging a shift in people's attitudes towards this meaningful trend and raising public awareness of its significance.",
      cn: "为了改善当前状况，我们可以开展网络宣传活动，推动人们转变对这一积极趋势的态度，并提高公众对其重要性的认识。"
    },
    {
      title: "积极情况 4：至关重要意义 + 转化为个人实际行动",
      type: "positive",
      en: "As far as I am concerned, this fine tradition is of paramount significance and deserves to be held in high regard. As individuals, we should constantly remind ourselves to stay sensible and translate such awareness into concrete action.",
      cn: "在我看来，这一优良传统具有至关重要的意义，理应受到高度重视。作为个人，我们应时刻提醒自己保持理性，并将这种意识转化为实际行动。"
    },
    {
      title: "消极情况 5：负面现象定性判断与有效遏制",
      type: "negative",
      en: "I am firmly of the opinion that such an undesirable phenomenon is detrimental to our long-term well-being and should therefore be effectively curbed without delay.",
      cn: "我坚定地认为，这种不良现象对我们的长远福祉极为有害，因此应当立即得到有效遏制。"
    },
    {
      title: "消极情况 6：政府政策管控 + 个人调整防范",
      type: "negative",
      en: "To stamp out this problem, it should be high on the agenda of the departments concerned to formulate practical strategies and call for concerted efforts. As for individuals, we would be well advised to adjust our daily habits and do our part in preventing it.",
      cn: "为了彻底杜绝这一问题，有关部门应优先制定切实可行的策略，并呼吁社会各方共同努力。对于个人而言，我们也应调整日常习惯，并尽自己的一份力量加以防范。"
    },
    {
      title: "消极情况 7：利用互联网传播建议与减少负面行为",
      type: "negative",
      en: "Fortunately, by harnessing the power of the Internet, we can spread practical advice and raise public awareness, thereby discouraging people from indulging in reckless distractions.",
      cn: "幸运的是，通过利用互联网的力量，我们可以传播实用建议、提高公众意识，从而减少人们沉迷于盲目放纵的不良行为。"
    },
    {
      title: "消极情况 8：有关部门未雨绸缪出台防范机制",
      type: "negative",
      en: "It is also incumbent on the departments concerned to introduce feasible regulatory measures and remedy the problem before serious consequences arise.",
      cn: "有关部门也有责任出台切实可行的监管措施，并在严重后果出现之前及时解决这一问题。"
    }
  ];

  const NOVEL_ELEMENTS_DATA = [
    {
      label: "⏰ 积木 1：时间介词与节点短语",
      desc: "注意考场介词搭配：定于具体日期用 on，时刻用 at，区间用 during / over",
      chips: [
        { en: "is scheduled on May 12", cn: "定于5月12日举办" },
        { en: "will be held at 9 a.m. this Friday", cn: "将于本周五上午9点举行" },
        { en: "during the coming summer vacation", cn: "在即将到来的暑假期间" },
        { en: "at the beginning of the new semester", cn: "在新学期开学伊始" },
        { en: "by the end of this month", cn: "在本月底之前（截止）" },
        { en: "at the appointed time and venue", cn: "在约定的时间与地点" }
      ]
    },
    {
      label: "📍 积木 2：地点场景专有短语",
      desc: "涵盖校园活动、会议及社区公共场所",
      chips: [
        { en: "in the school auditorium", cn: "在学校大礼堂" },
        { en: "in the main lecture hall", cn: "在主阶梯学术报告厅" },
        { en: "at the Student Activity Center", cn: "在学生活动中心" },
        { en: "in the exhibition hall on the 2nd floor", cn: "在二楼展览大厅" },
        { en: "at the Community Service Center", cn: "在社区志愿服务中心" },
        { en: "in front of the campus library", cn: "在校园图书馆门前广场" }
      ]
    },
    {
      label: "👤 积木 3：人员身份与称谓名词",
      desc: "精选用词体现高阶语域，告别千篇一律的 students",
      chips: [
        { en: "undergraduate and postgraduate students", cn: "本科生与研究生" },
        { en: "distinguished guests and scholars", cn: "德高望重的嘉宾与学者" },
        { en: "prospective applicants / qualified candidates", cn: "有志申请者 / 合格候选人" },
        { en: "dedicated volunteers and organizers", cn: "富有奉献精神的志愿者与组织者" },
        { en: "international exchange students", cn: "国际留学生与交换生" },
        { en: "local community residents", cn: "当地社区居民" }
      ]
    },
    {
      label: "✨ 积木 4：资质与特征形容词",
      desc: "用于推荐信、招募信、申请信修饰人选特质",
      chips: [
        { en: "competent and experienced", cn: "能胜任且经验丰富的" },
        { en: "dedicated and conscientious", cn: "全身心投入且一丝不苟的" },
        { en: "self-disciplined and motivated", cn: "高度自律且积极主动的" },
        { en: "cooperative and approachable", cn: "具备团队合作精神且平易近人的" },
        { en: "adaptable and insightful", cn: "适应力强且富有敏锐洞察力的" },
        { en: "responsible and reliable", cn: "有责任心且值得托付信赖的" }
      ]
    },
    {
      label: "🎯 积木 5：起因与活动背景引导词",
      desc: "用于首段末或二段首交代写作由头",
      chips: [
        { en: "Against the background of...", cn: "在...的大背景之下" },
        { en: "In light of / In view of...", cn: "鉴于/考虑到..." },
        { en: "Given the growing importance of...", cn: "鉴于...日益凸显的重要性" },
        { en: "With the aim of enriching campus culture", cn: "旨在丰富校园文化生活" },
        { en: "In an effort to promote mutual understanding", cn: "为了努力增进彼此理解" },
        { en: "In response to the enthusiastic call for...", cn: "为积极响应...的热烈号召" }
      ]
    },
    {
      label: "🚀 积木 6：活动过程推进与文体收益短语",
      desc: "用于中段展开活动安排与预期收益",
      chips: [
        { en: "in an orderly and lively manner", cn: "井然有序且热烈地进行" },
        { en: "followed by an interactive workshop", cn: "随后展开互动式研讨工作坊" },
        { en: "with the joint efforts of all participants", cn: "在全体参与者的通力合作下" },
        { en: "add great value and prestige to the event", cn: "为活动增添重要价值与光彩" },
        { en: "enrich students' horizons and practical skills", cn: "极大拓宽学生视野并锻炼实践技能" },
        { en: "serve as an invaluable bridge for cultural exchange", cn: "成为文化交流互鉴的宝贵桥梁" }
      ]
    }
  ];

  const LETTER_CLOSING_MATRIX = [
    { type: "1. 邀请信 (通用)", s1: "On behalf of the organizing committee, we sincerely anticipate your attendance at this event.", s2: "Looking forward to receiving your favorable reply at your earliest convenience." },
    { type: "2. 邀请嘉宾信", s1: "On behalf of the contest committee, we sincerely anticipate your attendance and valuable guidance.", s2: "Looking forward to receiving your confirmation at your earliest convenience." },
    { type: "3. 邀请团队信", s1: "On behalf of the organizing committee, we sincerely anticipate your attendance with your talented team.", s2: "Looking forward to receiving your early reply." },
    { type: "4. 建议信 (校园生活)", s1: "I sincerely hope that these suggestions will help improve students' campus experience.", s2: "Looking forward to seeing a better campus environment in the near future." },
    { type: "5. 建议信 (学习规划)", s1: "I sincerely hope that these suggestions will be helpful to your study and future preparation.", s2: "Looking forward to hearing about your progress." },
    { type: "6. 感谢信 (导师指导)", s1: "Once again, I would like to express my sincere gratitude for your patient guidance.", s2: "Looking forward to learning more from you in the future." },
    { type: "7. 感谢信 (朋友帮助)", s1: "Once again, I truly appreciate your timely help and warm support.", s2: "Looking forward to having an opportunity to repay your kindness." },
    { type: "8. 道歉信", s1: "Once again, I sincerely apologize for the inconvenience I have caused and hope you can accept my apology.", s2: "Looking forward to your kind understanding." },
    { type: "9. 投诉信", s1: "I sincerely hope that this matter can be dealt with properly and without further delay.", s2: "Looking forward to receiving a satisfactory solution as soon as possible." },
    { type: "10. 求职与申请信", s1: "I sincerely hope that my qualifications and enthusiasm will make me a suitable candidate for this position.", s2: "Looking forward to receiving the opportunity for an interview." },
    { type: "11. 推荐信", s1: "I sincerely believe that he/she is fully qualified for this opportunity and will perform well if accepted.", s2: "Looking forward to your favorable consideration of my recommendation." },
    { type: "12. 咨询与求助信", s1: "I sincerely hope that you could furnish me with more detailed information and practical guidance.", s2: "Looking forward to receiving your helpful advice at your earliest convenience." },
    { type: "13. 祝贺信", s1: "Once again, please accept my warmest congratulations on your remarkable achievement.", s2: "Looking forward to hearing more encouraging news from you in the future." },
    { type: "14. 慰问信", s1: "I sincerely hope that you will recover soon and return to normal life with confidence.", s2: "Looking forward to hearing about your full recovery soon." },
    { type: "15. 志愿者招募信", s1: "We sincerely hope that more responsible and enthusiastic students will join us in this meaningful cause.", s2: "Looking forward to receiving your application." },
    { type: "16. 辞职信与拒绝信", s1: "I sincerely hope that my resignation will not cause too much inconvenience to your arrangements.", s2: "Looking forward to your kind understanding and approval." },
    { type: "17. 文化交流信", s1: "We sincerely hope that this activity will serve as an enduring bridge for mutual understanding and cultural exchange.", s2: "Looking forward to your active participation and support." },
    { type: "18. 环保/读书公益信", s1: "We sincerely hope that this event will raise public awareness and foster lasting healthy habits.", s2: "Looking forward to your enthusiastic involvement." }
  ];

  const NOTICE_CLOSINGS_DATA = [
    { en: "Your attention and cooperation are sincerely appreciated.", cn: "感谢大家的关注与配合。（官方百搭首选）" },
    { en: "We sincerely appreciate your understanding and support.", cn: "我们真诚感谢大家的理解与支持。（涉及调整/变动时必用）" },
    { en: "Your cooperation with the above arrangements will be highly appreciated.", cn: "如能通力配合上述安排，我们将不胜感激。（礼貌致谢）" },
    { en: "All participants are expected to follow the above arrangements accordingly.", cn: "所有参与者应按上述安排认真执行。（纪律规章）" },
    { en: "Please make sure to arrive on time and observe the relevant campus requirements.", cn: "请务必准时到达，并遵守相关考勤管理要求。（时间与秩序）" },
    { en: "We look forward to your active participation.", cn: "期待大家的积极参与。（热情动员）" },
    { en: "All students are warmly encouraged to take part in this meaningful event.", cn: "热忱鼓励全体同学积极参加本次有意义的活动。（官方号召）" },
    { en: "Should you have any questions, please feel free to contact the Students' Union.", cn: "如有任何疑问，请随时联系学生会。（咨询答疑渠道）" },
    { en: "We sincerely hope that this event will bring you a rewarding and memorable experience.", cn: "我们真诚希望本次活动能给大家带来充实而难忘的体验。（温情期许）" },
    { en: "We believe that your participation will add great value to this event.", cn: "我们深信大家的参与将为本次活动增添重要光彩。（嘉宾/重磅招募）" },
    { en: "We look forward to seeing you enjoy the event and benefit from it.", cn: "我们期待看到大家享受本次活动并从中受益。（讲座/培训）" },
    { en: "May this event serve as a meaningful opportunity for learning, communication and personal growth.", cn: "愿本次活动成为大家学习、交流与个人成长的宝贵契机。（升华收官）" }
  ];

  const SEMI_DYNAMIC_DATA = {
    approaches: [
      {
        title: "横向静态对比视角 (按不同群体/年龄层切入)",
        code: "Older people are noticeably more likely to study out of personal interest than their younger peers.",
        tip: "横向切片对比不同年龄群体的选择差异，直接体现群体偏好对比。"
      },
      {
        title: "纵向动态演变视角 (随年龄增长/时间演进切入)",
        code: "With age, the proportion of individuals who prioritize healthcare and reading climbs steadily.",
        tip: "运用 'With age, ... increases / declines' 将静态数据写出灵动动态感。"
      }
    ],
    ageFormats: [
      { rule: "People aged + 年龄段", eg: "People aged under 24 / aged between 30 and 39 / aged over 50" },
      { rule: "In + 年龄层名词", eg: "People in their twenties / in their fifties / in middle age" },
      { rule: "Age group 组合", eg: "The under-24 age group accounts for a prominent 45%" },
      { rule: "复合形容词", eg: "Under-24-year-old youngsters outnumber older participants" }
    ],
    prepositions: [
      { prep: "by 接变动幅度", eg: "The percentage declined by 10% over the observed decade.", tip: "强调增减净差额幅度" },
      { prep: "at / to 接具体落点", eg: "The figure peaked at 89.5% / surged to an impressive 72%.", tip: "at 接极值点，to 接最终数值" },
      { prep: "with 作伴随与补充", eg: "...accounting for 58%, with the remainder hovering below 10%.", tip: "主句之后跟 with 独立主格，语言极其高级" }
    ],
    multipliers: [
      { type: "动词翻倍", en: "double (翻倍), triple (翻三倍), quadruple (翻四倍)", eg: "Smartphone sales tripled between 2018 and 2024." },
      { type: "形容词/副词倍数", en: "twofold, threefold, fourfold", eg: "The market registered a threefold expansion." },
      { type: "倍数固定句型", en: "... times as ... as ...", eg: "Expenditure was twice as high for Category A as for Category B." }
    ],
    degreeAdverbs: {
      slight: "slightly, modestly, moderately, marginally (幅度轻微/温和)",
      dramatic: "considerably, remarkably, noticeably, substantially, significantly, dramatically, exponentially (幅度显著/剧烈/成倍增长)"
    }
  };

  // Application State
  const state = {
    activeTab: 'partA',
    activeSlotChoices: {
      partA: {},
      partB: {}
    },
    theme: localStorage.getItem('essay_assembly_theme') || 'light'
  };

  // DOM Elements
  const el = {
    main: document.getElementById('main-container'),
    navTabs: document.querySelectorAll('.nav-tab'),
    toast: document.getElementById('toast'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    printBtn: document.getElementById('print-btn')
  };

  // Utility Functions
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Sanitize user input for slot values (strip potential script tags / event handlers)
  function sanitizeInput(str) {
    if (!str) return '';
    return String(str)
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript\s*:/gi, '')
      .trim();
  }

  function countWords(str) {
    if (!str) return 0;
    const clean = str.replace(/[—–\-]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, '');
    const tokens = clean.trim().split(/\s+/);
    return tokens.filter(t => t.length > 0).length;
  }

  function formatWordChip(count, min = 90, max = 115) {
    if (count >= min && count <= max) {
      return `<span class="word-count-chip is-golden" style="color:var(--green); border-color:var(--green); font-weight:750;">实测 ${count} 词 · 黄金区间 (${min}–${max}词最佳)</span>`;
    } else if (count > max) {
      return `<span class="word-count-chip is-warning" style="color:var(--gold); border-color:var(--gold); font-weight:750;">实测 ${count} 词 · 篇幅偏长 (答题卡建议 ≤${max}词)</span>`;
    } else {
      return `<span class="word-count-chip" style="color:var(--muted); font-weight:750;">实测 ${count} 词 (建议充实至 ${min}词以上)</span>`;
    }
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!el.toast) return;
    el.toast.textContent = msg;
    el.toast.removeAttribute('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.setAttribute('hidden', '');
    }, 2400);
  }

  function getSlotVal(tab, slotKey) {
    if (state.activeSlotChoices[tab] && state.activeSlotChoices[tab][slotKey]) {
      return state.activeSlotChoices[tab][slotKey];
    }
    return (ASSEMBLY_SLOT_DEFAULTS[tab] && ASSEMBLY_SLOT_DEFAULTS[tab][slotKey]) || '';
  }

  function setSlotVal(tab, slotKey, newVal) {
    if (!state.activeSlotChoices[tab]) state.activeSlotChoices[tab] = {};
    state.activeSlotChoices[tab][slotKey] = newVal;
  }

  // Theme Handling
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    if (el.themeToggleBtn) {
      el.themeToggleBtn.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('essay_assembly_theme', state.theme);
        showToast(state.theme === 'dark' ? 'Olu: 已开启深色夜间模式 🌙' : 'Olu: 已恢复浅色清新模式 ☀️');
      });
    }
    if (el.printBtn) {
      el.printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // Tab Switching
  function switchTab(tab) {
    state.activeTab = tab;
    el.navTabs.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.tab === tab);
    });
    renderContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderContent() {
    if (!el.main) return;
    const tab = state.activeTab;
    if (tab === 'partA') {
      el.main.innerHTML = renderPartAHTML();
    } else if (tab === 'partB') {
      el.main.innerHTML = renderPartBHTML();
    } else if (tab === 'charts') {
      el.main.innerHTML = renderChartsHTML();
    } else if (tab === 'toolkit') {
      el.main.innerHTML = renderToolkitHTML();
    }
    bindInteractiveEvents();
  }

  // -------------------------------------------------------------
  // TAB 1: Part A Render
  // -------------------------------------------------------------
  function renderPartAHTML() {
    const s_sal = getSlotVal('partA', 'salutation');
    const s_emo = getSlotVal('partA', 'emotion');
    const s_rea = getSlotVal('partA', 'reason');
    const s_act = getSlotVal('partA', 'action');
    const s_mat = getSlotVal('partA', 'matter');
    const s_tim = getSlotVal('partA', 'time_loc');
    const s_aim = getSlotVal('partA', 'aim');
    const s_pro = getSlotVal('partA', 'process');
    const s_har = getSlotVal('partA', 'harvest');
    const s_wi  = getSlotVal('partA', 'closing_wish');
    const s_re  = getSlotVal('partA', 'closing_reply');

    const s_nesal = getSlotVal('partA', 'ne_salutation');
    const s_nepur = getSlotVal('partA', 'ne_purpose');
    const s_nepro = getSlotVal('partA', 'ne_problem');
    const s_nesol = getSlotVal('partA', 'ne_solution');
    const s_neclo = getSlotVal('partA', 'ne_closing');

    const s_not_date = getSlotVal('partA', 'not_date');
    const s_not_target = getSlotVal('partA', 'not_target');
    const s_not_event = getSlotVal('partA', 'not_event');
    const s_not_time_loc = getSlotVal('partA', 'not_time_loc');
    const s_not_activity = getSlotVal('partA', 'not_activity');
    const s_not_requirement = getSlotVal('partA', 'not_requirement');
    const s_not_closing = getSlotVal('partA', 'not_closing');
    const s_not_sign = getSlotVal('partA', 'not_sign');

    const fullLetterText = `Dear ${s_sal},\n\nWords fail to express my ${s_emo} to ${s_rea}. It is my great honor to ${s_act} you to ${s_mat}. Below are the details.\n\nTo begin with, the event ${s_tim}. In addition, ${s_aim}, ${s_pro}. Furthermore, ${s_har}.\n\n${s_wi} ${s_re}\n\nYours sincerely,\nLi Ming`;

    const fullNonEventText = `Dear ${s_nesal},\n\nI am writing this letter to ${s_nepur}. Below are my main observations and constructive recommendations.\n\nTo begin with, what deserves immediate attention is ${s_nepro}. Furthermore, in an effort to improve the current situation, I would like to propose ${s_nesol}, which will undoubtedly produce positive and lasting effects.\n\n${s_neclo} Looking forward to receiving your favorable reply at your earliest convenience.\n\nYours sincerely,\nLi Ming`;

    const fullNoticeText = `NOTICE\n${s_not_date}\n\nTo ensure that ${s_not_target} are fully informed of ${s_not_event}, this notice is issued to provide essential information regarding it. And the detailed arrangements are as follows.\n\nTo begin with, the activity ${s_not_time_loc}. In addition, it will ${s_not_activity}. Furthermore, all participants are expected to ${s_not_requirement}.\n\n${s_not_closing}\n\n${s_not_sign}`;

    const letterCount = countWords(fullLetterText);
    const nonEventCount = countWords(fullNonEventText);
    const noticeCount = countWords(fullNoticeText);

    return `
      <div class="principle-banner">
        💡 <strong>Olu · Part A 极简破局法则：</strong>考研小作文 90% 为【事件类】（活动/竞赛/展览/招募/答复），10% 为【非事件类】（建议/投诉/道歉/辞职）。<strong>首尾固定，中段用“小说六要素”或“痛点＋对策”按题干抓词拼装</strong>，实测 100–110 词，稳拿 9 分！下方高亮黄底词槽均<strong>支持点击秒选候选词或自由手填题干词</strong>。
      </div>

      <!-- Mother Template 1: Event-Driven -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">💌 核心母版一：事件类万能书信 (通吃 90% 活动/竞赛/邀请/答复考题 · 标准 100 词版)</span>
          <div class="header-tools">
            ${formatWordChip(letterCount, 90, 115)}
            <button type="button" class="btn-pill btn-pill-primary copy-btn" data-text="${escapeHTML(fullLetterText)}">📋 一键复制完整范文</button>
            <button type="button" class="btn-pill reset-btn" data-tab="partA">🔄 还原默认</button>
          </div>
        </div>
        <div class="template-card-body">
          <div class="essay-paper">Dear <span class="interactive-slot" data-slot="salutation" data-tab="partA">${escapeHTML(s_sal)}</span>,

Words fail to express my <span class="interactive-slot" data-slot="emotion" data-tab="partA">${escapeHTML(s_emo)}</span> to <span class="interactive-slot" data-slot="reason" data-tab="partA">${escapeHTML(s_rea)}</span>. It is my great honor to <span class="interactive-slot" data-slot="action" data-tab="partA">${escapeHTML(s_act)}</span> you to <span class="interactive-slot" data-slot="matter" data-tab="partA">${escapeHTML(s_mat)}</span>. Below are the details.

To begin with, the event <span class="interactive-slot" data-slot="time_loc" data-tab="partA">${escapeHTML(s_tim)}</span>. In addition, <span class="interactive-slot" data-slot="aim" data-tab="partA">${escapeHTML(s_aim)}</span>, <span class="interactive-slot" data-slot="process" data-tab="partA">${escapeHTML(s_pro)}</span>. Furthermore, <span class="interactive-slot" data-slot="harvest" data-tab="partA">${escapeHTML(s_har)}</span>.

<span class="interactive-slot" data-slot="closing_wish" data-tab="partA">${escapeHTML(s_wi)}</span> <span class="interactive-slot" data-slot="closing_reply" data-tab="partA">${escapeHTML(s_re)}</span>

Yours sincerely,
Li Ming</div>
          <div style="font-size:12px; color:var(--muted); margin-top:8px;">💡 提示：点击任意黄色胶囊唤起候选词推荐，支持在弹窗输入框直接打字手填题干词！</div>
        </div>
      </div>

      <!-- Mother Template 2: Non-Event-Driven -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">💡 核心母版二：非事件类万能书信 (针对建议/投诉/道歉/辞职/咨询)</span>
          <div class="header-tools">
            ${formatWordChip(nonEventCount, 90, 115)}
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(fullNonEventText)}">📋 一键复制非事件范文</button>
            <button type="button" class="btn-pill reset-btn" data-tab="partA">🔄 还原默认</button>
          </div>
        </div>
        <div class="template-card-body">
          <div class="essay-paper">Dear <span class="interactive-slot" data-slot="ne_salutation" data-tab="partA">${escapeHTML(s_nesal)}</span>,

I am writing this letter to <span class="interactive-slot" data-slot="ne_purpose" data-tab="partA">${escapeHTML(s_nepur)}</span>. Below are my main observations and constructive recommendations.

To begin with, what deserves immediate attention is <span class="interactive-slot" data-slot="ne_problem" data-tab="partA">${escapeHTML(s_nepro)}</span>. Furthermore, in an effort to improve the current situation, I would like to propose <span class="interactive-slot" data-slot="ne_solution" data-tab="partA">${escapeHTML(s_nesol)}</span>, which will undoubtedly produce positive and lasting effects.

<span class="interactive-slot" data-slot="ne_closing" data-tab="partA">${escapeHTML(s_neclo)}</span> Looking forward to receiving your favorable reply at your earliest convenience.

Yours sincerely,
Li Ming</div>
        </div>
      </div>

      <!-- Mother Template 3: Official Notice (Interactive Assembly) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">📢 核心母版三：官方告示与通知母版 (NOTICE · 考场全交互装配版)</span>
          <div class="header-tools">
            ${formatWordChip(noticeCount, 95, 120)}
            <button type="button" class="btn-pill btn-pill-primary copy-btn" data-text="${escapeHTML(fullNoticeText)}">📋 一键复制官方通知</button>
            <button type="button" class="btn-pill reset-btn" data-tab="partA">🔄 还原默认</button>
          </div>
        </div>
        <div class="template-card-body">
          <div class="essay-paper notice-paper">
            <div class="notice-title">NOTICE</div>
            <div class="notice-date"><span class="interactive-slot" data-slot="not_date" data-tab="partA">${escapeHTML(s_not_date)}</span></div>
            <p>To ensure that <span class="interactive-slot" data-slot="not_target" data-tab="partA">${escapeHTML(s_not_target)}</span> are fully informed of <span class="interactive-slot" data-slot="not_event" data-tab="partA">${escapeHTML(s_not_event)}</span>, this notice is issued to provide essential information regarding it. And the detailed arrangements are as follows.</p>
            <p style="margin-top:10px;">To begin with, the activity <span class="interactive-slot" data-slot="not_time_loc" data-tab="partA">${escapeHTML(s_not_time_loc)}</span>. In addition, it will <span class="interactive-slot" data-slot="not_activity" data-tab="partA">${escapeHTML(s_not_activity)}</span>. Furthermore, all participants are expected to <span class="interactive-slot" data-slot="not_requirement" data-tab="partA">${escapeHTML(s_not_requirement)}</span>.</p>
            <p style="margin-top:10px;"><span class="interactive-slot" data-slot="not_closing" data-tab="partA">${escapeHTML(s_not_closing)}</span></p>
            <div class="notice-sign"><span class="interactive-slot" data-slot="not_sign" data-tab="partA">${escapeHTML(s_not_sign)}</span></div>
          </div>
          <div style="font-size:12px; color:var(--muted); margin-top:8px;">💡 提示：NOTICE 无需任何 Dear 称呼，标题严格居中，日期靠右；点击黄色高亮胶囊即可秒选或手填题干专有词！</div>
        </div>
      </div>

      <!-- Section: Notice 3 Military Rules (PDF p. 48-49) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">📌 官方告示 (NOTICE) 考场三大必杀军规与避坑指南 (PDF 第 48–49 页精研)</span>
        </div>
        <div class="template-card-body">
          <div class="military-rules-list">
            <div class="military-rule-card">
              <strong>军规一：绝对禁止 Dear 称呼，首行正中大写 NOTICE，日期靠右！</strong>
              <div style="font-size:12.5px; color:var(--muted); margin-top:4px;">
                告示是面向广大公众的公开通知，写 Dear XXX 直接按格式扣 2 分！第一行必须大写居中写 NOTICE（字距微放宽），下一行靠右书写日期（如 May 15）。
              </div>
            </div>
            <div class="military-rule-card">
              <strong>军规二：中段以“事件本体安排”为主，切忌写大段主观抒情！</strong>
              <div style="font-size:12.5px; color:var(--muted); margin-top:4px;">
                通知的本质是信息传达，考官重在考察时间、地点、流程环节与纪律要求。中段直接列出本体安排，不必像书信那样写过多个人私交客套。
              </div>
            </div>
            <div class="military-rule-card">
              <strong>军规三：右下角署名必须为组织/集体，严禁写个人真实姓名！</strong>
              <div style="font-size:12.5px; color:var(--muted); margin-top:4px;">
                通知必须由集体官方发布（如 The Students' Union、The Organizing Committee、The Graduate School），落款绝对不能出现 "Yours sincerely, Li Ming"！
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Novel 6-Elements Brick Box (PDF p. 40-44) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🧱 中段“小说六要素”考场极速积木箱 (PDF 第 40–44 页全套考场词汇库)</span>
        </div>
        <div class="template-card-body">
          <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">写作时根据题干要点，像搭积木一样抓取对应词块填充到中段，点击任意卡片一秒复制：</div>
          <div class="blocks-grid">
            ${NOVEL_ELEMENTS_DATA.map(sec => `
              <div class="block-card">
                <div class="block-label">${escapeHTML(sec.label)}</div>
                <div style="font-size:11.5px; color:var(--muted); margin-bottom:6px;">${escapeHTML(sec.desc)}</div>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  ${sec.chips.map(ch => `
                    <div class="connector-chip copy-chip" data-text="${escapeHTML(ch.en)}" title="${escapeHTML(ch.cn)} (点击复制)" style="text-align:left; font-size:12.5px;">
                      <strong>${escapeHTML(ch.en)}</strong>
                      <span style="font-size:11px; opacity:0.75; display:block;">${escapeHTML(ch.cn)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section: 18-Letter Closing Matrix (PDF p. 45-47) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">⚡ 尾段 18 种书信文体精准双句速查矩阵 (PDF 第 45–47 页精研 · 句1期望 + 句2期待回复)</span>
        </div>
        <div class="matrix-scroll-cue">👉 左右滑动表格查看完整双句中英对照</div>
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th style="width:16%">文体类型</th>
                <th style="width:44%">第一句：诚挚期望 / 感谢 / 致歉</th>
                <th style="width:32%">第二句：期待回复 / 期待行动</th>
                <th style="width:8%">操作</th>
              </tr>
            </thead>
            <tbody>
              ${LETTER_CLOSING_MATRIX.map(row => `
                <tr>
                  <td><strong>${escapeHTML(row.type)}</strong></td>
                  <td>${escapeHTML(row.s1)}</td>
                  <td>${escapeHTML(row.s2)}</td>
                  <td><button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(row.s1 + ' ' + row.s2)}" style="padding:2px 6px; font-size:11px;">📋 复制</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section: Notice Closings Bank (PDF p. 48-49) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">📢 官方告示与通知 (Notice) 考场专属结尾 12 大黄金终结句全集 (PDF 第 48–49 页原版补齐)</span>
        </div>
        <div class="template-card-body">
          <div class="verb-bank-grid">
            ${NOTICE_CLOSINGS_DATA.map(nc => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(nc.en)}">
                <div class="verb-word"><span>${escapeHTML(nc.en)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-cn">${escapeHTML(nc.cn)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // TAB 2: Part B Render
  // -------------------------------------------------------------
  function renderPartBHTML() {
    const s_pica = getSlotVal('partB', 'pic_action');
    const s_pict = getSlotVal('partB', 'pic_topic');
    const s_ctyp = getSlotVal('partB', 'chart_type');
    const s_ctop = getSlotVal('partB', 'chart_topic');
    const s_clea = getSlotVal('partB', 'chart_lead');
    const s_cdat = getSlotVal('partB', 'chart_data');
    const s_csec = getSlotVal('partB', 'chart_secondary');
    const s_bpos = getSlotVal('partB', 'b_topic_pos');
    const s_bneg = getSlotVal('partB', 'b_topic_neg');
    const s_bdtop = getSlotVal('partB', 'b_dial_topic');
    const s_bdpos = getSlotVal('partB', 'b_dial_pos');
    const s_bdris = getSlotVal('partB', 'b_dial_risk');

    const picPara1Text = `The cartoon presents an intriguing and thought-provoking scene: ${s_pica}. The succinct caption beneath aptly distills the essence of this picture. Plain as the drawing may appear, it points beyond the surface scene and serves as a broader reflection of ${s_pict}.`;

    const chartPara1Text = `The ${s_ctyp} chart clearly illustrates a revealing survey on ${s_ctop}. Overall, ${s_clea} ranks first, accounting for ${s_cdat}, which highlights the growing significance of this phenomenon. While other categories remain relatively modest in comparison, none of which exceeds ${s_csec}. Succinct as the data is, it conveys significant enlightenments regarding this issue.`;

    const posPara2Text = `Serving as an indispensable catalyst for personal growth and social progress, ${s_bpos} enables individuals to adapt to the rapidly evolving era. On the one hand, it not only broadens people's cognitive horizons, but also fuels their passion to conquer unexpected challenges. On the other hand, the prevalence of this practice creates a supportive atmosphere, empowering our community to maintain sustainable vitality. Consequently, only through embracing ${s_bpos} can we unlock our full potential in the face of fierce competition.`;

    const negPara2Text = `Such an undesirable phenomenon primarily stems from a lack of self-discipline alongside the hectic pace of modern life. To begin with, excessive indulgence in ${s_bneg} delivers a heavy blow to people's mental well-being and daily productivity. Furthermore, if left unchecked, this tendency will inevitably erode mutual trust and impair harmonious interpersonal relations. Without timely intervention, both individuals and the community will pay a heavy price for such neglect.`;

    const dialPara2Text = `While ${s_bdtop} ${s_bdpos}, its lurking perils cannot be overlooked. On the one hand, it paves the way for unprecedented efficiency and convenience in modern society. On the other hand, reckless reliance on it ${s_bdris}. Therefore, only by maintaining a dialectical balance between rational empowerment and self-discipline can we navigate this era of transformation prudently.`;

    const s_p3tar = getSlotVal('partB', 'b_para3_target');
    const s_p3stu = getSlotVal('partB', 'b_para3_student');
    const s_p3gov = getSlotVal('partB', 'b_para3_gov');

    const para3Text = `In a nutshell, ${s_p3tar} depends not merely on individual awareness but also on collective endeavors. As college students, we should ${s_p3stu}; meanwhile, relevant authorities are expected to ${s_p3gov}. Only when joint efforts are made from all quarters can we foster a promising future where harmony and progress prevail.`;

    const fullPicEssay = `${picPara1Text}\n\n${posPara2Text}\n\n${para3Text}`;
    const fullChartEssay = `${chartPara1Text}\n\n${posPara2Text}\n\n${para3Text}`;
    const totalPicWords = countWords(fullPicEssay);
    const totalChartWords = countWords(fullChartEssay);

    return `
      <div class="principle-banner">
        💡 <strong>Olu · Part B 极简破局法则：</strong>大作文无论是英一图画还是英二图表，阅卷统一遵循<strong>“三段 10 句制”（170–190 词）</strong>。首段 3–4 句快速描述（40词），二段 4 句深度论证（85词），三段 3 句建议展望（45词）。<strong>三大论证轨道通吃所有命题，搭配“无灵主语”直击阅卷高分点！</strong>
      </div>

      <!-- Quick Full Essay Assemble Bar -->
      <div class="template-card" style="border: 2px solid var(--accent); background: var(--accent-light);">
        <div class="template-card-body" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding:16px 20px;">
          <div>
            <div style="font-weight:800; font-size:15.5px; color:var(--accent);">⚡ 一键装配整篇考场大作文</div>
            <div style="font-size:12.5px; color:var(--ink-light);">根据下方自定义选词，即时合成完整三段式大作文：图画作文实测 ${totalPicWords} 词 / 图表作文实测 ${totalChartWords} 词</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn-pill btn-pill-primary copy-btn" data-text="${escapeHTML(fullPicEssay)}">📋 复制图画完整大作文</button>
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(fullChartEssay)}">📋 复制图表完整大作文</button>
            <button type="button" class="btn-pill reset-btn" data-tab="partB">🔄 还原默认</button>
          </div>
        </div>
      </div>

      <!-- Section 1: Para 1 Description -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">📊 第一段：图画 / 图表引入与描述母版 (3–4句 · 40–45词)</span>
        </div>
        <div class="template-card-body">
          <div class="template-subhead" style="color:var(--accent);">
            <span>【形式 A-1：英一经典文字说明漫画首段 (PDF 第 10 页)】</span>
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(picPara1Text)}">📋 复制图画首段</button>
          </div>
          <div class="essay-paper">The cartoon presents an intriguing and thought-provoking scene: <span class="interactive-slot" data-slot="pic_action" data-tab="partB">${escapeHTML(s_pica)}</span>. The succinct caption beneath aptly distills the essence of this picture. Plain as the drawing may appear, it points beyond the surface scene and serves as a broader reflection of <span class="interactive-slot" data-slot="pic_topic" data-tab="partB">${escapeHTML(s_pict)}</span>.</div>

          <div class="template-subhead" style="color:var(--accent); margin-top:20px;">
            <span>【形式 A-2：纯图画 / 话题类无字漫画首段 (PDF 第 11 页)】</span>
            <button type="button" class="btn-pill copy-btn" data-text="The cartoon presents an encouraging scene. Plain as the picture may appear, it points beyond the surface scene and serves as a broader reflection of ${escapeHTML(s_pict)}.">📋 复制无字纯图首段</button>
          </div>
          <div class="essay-paper">The cartoon presents an encouraging scene: <span class="interactive-slot" data-slot="pic_action" data-tab="partB">${escapeHTML(s_pica)}</span>. Plain as the picture may appear, it points beyond the surface scene and serves as a broader reflection of <span class="interactive-slot" data-slot="pic_topic" data-tab="partB">${escapeHTML(s_pict)}</span>.</div>

          <div class="template-subhead" style="color:var(--accent); margin-top:20px;">
            <span>【形式 B：英二 / 英一新题型图表作文首段 (4句 · 45词)】</span>
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(chartPara1Text)}">📋 复制图表首段</button>
          </div>
          <div class="essay-paper">The <span class="interactive-slot" data-slot="chart_type" data-tab="partB">${escapeHTML(s_ctyp)}</span> chart clearly illustrates a revealing survey on <span class="interactive-slot" data-slot="chart_topic" data-tab="partB">${escapeHTML(s_ctop)}</span>. Overall, <span class="interactive-slot" data-slot="chart_lead" data-tab="partB">${escapeHTML(s_clea)}</span> ranks first, accounting for <span class="interactive-slot" data-slot="chart_data" data-tab="partB">${escapeHTML(s_cdat)}</span>, which highlights the growing significance of this phenomenon. While other categories remain relatively modest in comparison, none of which exceeds <span class="interactive-slot" data-slot="chart_secondary" data-tab="partB">${escapeHTML(s_csec)}</span>. Succinct as the data is, it conveys significant enlightenments regarding this issue.</div>
        </div>
      </div>

      <!-- Non-human Subject Academic Box -->
      <div class="principle-banner" style="border-left-color:var(--purple); background:var(--surface);">
        🌟 <strong>考场阅卷高分密码 ——“无灵主语”与动词描述性 (PDF 第 28–29 页精髓)：</strong><br>
        普通考生通篇 <em>"We should do..." / "I think..." / "It makes people happy"</em>，语言干瘪且偏口语化。高分秘籍在于<strong>用抽象概念、品质或客观事物充当主语</strong>，搭配学术强动词：<br>
        • <em>"Self-discipline fuels their passion to conquer challenges."</em>（自律点燃了他们战胜挑战的热情）<br>
        • <em>"Cultural heritage bolsters national cohesion."</em>（文化遗产强化了民族凝聚力）<br>
        • <em>"Excessive indulgence in short videos delivers a heavy blow to productivity."</em>（沉迷短视频严重打击生产力）
      </div>

      <!-- Section 2: Para 2 Argumentation Tracks -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">⚖️ 第二段：三大论证轨道母版 (4句 · 85词)</span>
        </div>
        <div class="template-card-body">
          <div class="template-subhead" style="color:#059669;">
            <span>【轨道 A：正向催化轨（积极/成长/文化/科技/坚持类）】</span>
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(posPara2Text)}">📋 复制正向论证段</button>
          </div>
          <div class="essay-paper">Serving as an indispensable catalyst for personal growth and social progress, <span class="interactive-slot" data-slot="b_topic_pos" data-tab="partB">${escapeHTML(s_bpos)}</span> enables individuals to adapt to the rapidly evolving era. On the one hand, it not only broadens people's cognitive horizons, but also <strong>fuels</strong> their passion to conquer unexpected challenges. On the other hand, the prevalence of this practice creates a supportive atmosphere, empowering our community to maintain sustainable vitality. Consequently, only through embracing <span class="interactive-slot" data-slot="b_topic_pos" data-tab="partB">${escapeHTML(s_bpos)}</span> can we unlock our full potential in the face of fierce competition.</div>

          <div class="template-subhead" style="color:#dc2626; margin-top:20px;">
            <span>【轨道 B：负向隐患轨（危机/不良现象/社会问题/沉迷类）】</span>
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(negPara2Text)}">📋 复制负向论证段</button>
          </div>
          <div class="essay-paper">Such an undesirable phenomenon primarily stems from a lack of self-discipline alongside the hectic pace of modern life. To begin with, excessive indulgence in <span class="interactive-slot" data-slot="b_topic_neg" data-tab="partB">${escapeHTML(s_bneg)}</span> <strong>delivers a heavy blow to</strong> people's mental well-being and daily productivity. Furthermore, if left unchecked, this tendency will inevitably <strong>erode</strong> mutual trust and impair harmonious interpersonal relations. Without timely intervention, both individuals and the community will pay a heavy price for such neglect.</div>

          <div class="template-subhead" style="color:#7c3aed; margin-top:20px;">
            <span>【轨道 C：辩证反思轨（双刃剑/科技与人文/机遇与挑战并存）】</span>
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(dialPara2Text)}">📋 复制辩证论证段</button>
          </div>
          <div class="essay-paper">While <span class="interactive-slot" data-slot="b_dial_topic" data-tab="partB">${escapeHTML(s_bdtop)}</span> <span class="interactive-slot" data-slot="b_dial_pos" data-tab="partB">${escapeHTML(s_bdpos)}</span>, its lurking perils cannot be overlooked. On the one hand, it paves the way for unprecedented efficiency and convenience in modern society. On the other hand, reckless reliance on it <span class="interactive-slot" data-slot="b_dial_risk" data-tab="partB">${escapeHTML(s_bdris)}</span>. Therefore, only by maintaining a dialectical balance between rational empowerment and self-discipline can we navigate this era of transformation prudently.</div>
        </div>
      </div>

      <!-- Section 3: Para 3 Conclusion -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🎯 第三段：收官措施与宏大展望万能母版 (3句 · 45词)</span>
          <div class="header-tools">
            <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(para3Text)}">📋 复制收官段</button>
          </div>
        </div>
        <div class="template-card-body">
          <div class="essay-paper">In a nutshell, <span class="interactive-slot" data-slot="b_para3_target" data-tab="partB">${escapeHTML(s_p3tar)}</span> depends not merely on individual awareness but also on collective endeavors. As college students, we should <span class="interactive-slot" data-slot="b_para3_student" data-tab="partB">${escapeHTML(s_p3stu)}</span>; meanwhile, relevant authorities are expected to <span class="interactive-slot" data-slot="b_para3_gov" data-tab="partB">${escapeHTML(s_p3gov)}</span>. Only when joint efforts are made from all quarters can we foster a promising future where harmony and progress prevail.</div>
        </div>
      </div>

      <!-- Section 4: 8 Official Prescription Measure Sentences (PDF p. 35-37) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🏥 8 大官方分类措施功能句库 (PDF 第 35–37 页官方处方句 · 点击卡片秒复制现成尾段)</span>
        </div>
        <div class="template-card-body">
          <div style="font-weight:750; font-size:14px; margin-bottom:8px; color:#059669;">🌟 积极现象推动与发扬 (4 大高分尾段)：</div>
          <div class="blocks-grid">
            ${PRESCRIPTION_MEASURES_DATA.filter(m => m.type === 'positive').map(m => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(m.en)}">
                <div class="verb-word" style="font-size:13.5px; color:#059669;"><span>${escapeHTML(m.title)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-example">"${escapeHTML(m.en)}"</div>
                <div class="verb-cn" style="margin-top:4px;">${escapeHTML(m.cn)}</div>
              </div>
            `).join('')}
          </div>

          <div style="font-weight:750; font-size:14px; margin:22px 0 8px; color:#dc2626;">⚠️ 消极不良现象治理与遏制 (4 大高分尾段)：</div>
          <div class="blocks-grid">
            ${PRESCRIPTION_MEASURES_DATA.filter(m => m.type === 'negative').map(m => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(m.en)}">
                <div class="verb-word" style="font-size:13.5px; color:#dc2626;"><span>${escapeHTML(m.title)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-example">"${escapeHTML(m.en)}"</div>
                <div class="verb-cn" style="margin-top:4px;">${escapeHTML(m.cn)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section 5: Umbrella Topics from PDF p. 30 -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🌟 考场核心母题“上位概念”速查清单 (PDF 第 30 页核心战法：只记上位大词，通吃所有真题)</span>
        </div>
        <div class="template-card-body">
          <div style="font-size:13px; color:var(--muted); margin-bottom:10px;">泛泛而谈容易跑题，太具体很难押中！优先掌握“上位方向大词”，主题内通用无敌：</div>
          <div class="umbrella-topics-grid">
            ${UMBRELLA_CONCEPTS_DATA.map(item => `
              <div class="umbrella-topic-card">
                <div class="umbrella-topic-header">${escapeHTML(item.topic)} <small style="font-weight:normal; opacity:0.8;">(${escapeHTML(item.en)})</small></div>
                <div class="umbrella-topic-words">🔑 ${escapeHTML(item.words)}</div>
                <div class="umbrella-topic-years">${escapeHTML(item.years)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section 6: 10 GRA Sentence Patterns (PDF p. 31-34) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🏆 考研高分十种学术句式速查卡 (PDF 第 31–34 页 · 提高语法丰富度 GRA 专用)</span>
        </div>
        <div class="template-card-body">
          <div class="blocks-grid">
            ${GRA_SENTENCE_PATTERNS.map(p => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(p.eg)}">
                <div class="verb-word" style="font-size:13.5px; color:var(--accent);"><span>${escapeHTML(p.type)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-example">"${escapeHTML(p.eg)}"</div>
                <div class="verb-cn">${escapeHTML(p.cn)}</div>
                <div style="font-size:11.5px; color:var(--muted); margin-top:2px;">✨ 拓展：${escapeHTML(p.bonus)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // TAB 3: Charts Guide Render
  // -------------------------------------------------------------
  function renderChartsHTML() {
    const staticTemplateText = `A glance at the chart reveals a pronounced divergence in graduate career choices. In particular, direct employment and domestic postgraduate study firmly occupy the top two positions, accounting for 58.2% and 24.5% respectively, far outpacing the others. By contrast, the remaining categories remain clustered at a relatively low tier, none of which exceeds 10%. Succinct as the data is, it conveys significant enlightenments regarding the pragmatic mindset of contemporary young talents.`;

    return `
      <div class="principle-banner">
        💡 <strong>Olu · 图表写作核心破局原则：</strong>考场图表写作最忌讳“流水账报菜名”！阅卷考官看重的是<strong>“极值提炼、趋势聚类与深层启迪”</strong>。运用动态图【五元万能公式】与静态图【聚类对比冲突法】，15 分钟内极速输出流畅地道的考场高分段！
      </div>

      <!-- Section 1: Chart Military Rules from PDF p. 22-26 -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🛡️ 考场图表避坑防流水账三大军规（阅卷人视角 · PDF 第 22–26 页核心点拨）</span>
        </div>
        <div class="template-card-body">
          <div class="military-rules-list">
            ${CHART_MILITARY_RULES.map(r => `
              <div class="military-rule-card">
                <strong>${escapeHTML(r.rule)}</strong>
                <p style="margin-top:2px; font-size:13px; color:var(--ink);">${escapeHTML(r.detail)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section 2: The 5-Element Dynamic Formula -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🚀 动态图五元万能公式 (时间推移 · 趋势变化全吃)</span>
        </div>
        <div class="template-card-body">
          <div style="font-weight:750; font-size:13.5px; margin-bottom:8px; color:var(--ink)">【公式装配流程】：</div>
          <div class="formula-scroll-cue">👉 左右滑动查看完整 5 元装配链</div>
          <div class="formula-flow-wrap">
            <div class="formula-step-chip">
              <span class="formula-step-num">Step 1</span>
              <span class="formula-step-name">逻辑衔接词</span>
              <span class="formula-step-tip">Overall / Notably</span>
            </div>
            <span class="formula-flow-arrow">+</span>
            <div class="formula-step-chip">
              <span class="formula-step-num">Step 2</span>
              <span class="formula-step-name">时间区间</span>
              <span class="formula-step-tip">Between... / Over...</span>
            </div>
            <span class="formula-flow-arrow">+</span>
            <div class="formula-step-chip">
              <span class="formula-step-num">Step 3</span>
              <span class="formula-step-name">指标对象</span>
              <span class="formula-step-tip">the proportion of...</span>
            </div>
            <span class="formula-flow-arrow">+</span>
            <div class="formula-step-chip">
              <span class="formula-step-num">Step 4</span>
              <span class="formula-step-name">趋势强动词</span>
              <span class="formula-step-tip">underwent / surged</span>
            </div>
            <span class="formula-flow-arrow">+</span>
            <div class="formula-step-chip">
              <span class="formula-step-num">Step 5</span>
              <span class="formula-step-name">数值变化</span>
              <span class="formula-step-tip">from A% to B%</span>
            </div>
            <span class="formula-flow-arrow">+</span>
            <div class="formula-step-chip">
              <span class="formula-step-num">Bonus</span>
              <span class="formula-step-name">分词升华</span>
              <span class="formula-step-tip">indicating / reflecting</span>
            </div>
          </div>

          <div style="font-weight:750; font-size:13.5px; margin:16px 0 8px; color:var(--ink)">【5 大高频趋势考场实战例句库 (点击右侧一键复制)】：</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${DYNAMIC_CHART_EXEMPLARS.map(ex => `
              <div style="background:var(--surface); border:1px solid var(--line); border-radius:10px; padding:12px 16px;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                  <span style="font-weight:750; font-size:12.5px; color:var(--accent);">${escapeHTML(ex.badge)}</span>
                  <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(ex.en)}">📋 复制英文</button>
                </div>
                <div style="font-family:var(--font-en); font-size:14.5px; margin-bottom:4px;">"${escapeHTML(ex.en)}"</div>
                <div style="font-size:13px; color:var(--muted); margin-bottom:4px;">${escapeHTML(ex.cn)}</div>
                <div style="font-size:11.5px; color:var(--accent); font-weight:600;">${escapeHTML(ex.analysis)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section 3: Static Clustering Contrast Method -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">⚖️ 静态图聚类对比冲突法 (针对饼图/多柱图 · 极值高位聚类 + 低位合并对比)</span>
          <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(staticTemplateText)}">📋 复制静态聚类母版</button>
        </div>
        <div class="template-card-body">
          <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">面对静态饼图或多项分类（4–6 项）时，切忌逐一翻译！运用“极值聚类 + 低位打包”四步法：</div>
          
          <div class="blocks-grid">
            ${STATIC_CLUSTERING_DATA.map(st => `
              <div class="block-card">
                <div class="block-label">${escapeHTML(st.step)}</div>
                <div class="block-snippet" style="background:var(--paper); padding:6px 8px; border-radius:6px; border:1px solid var(--line);">${escapeHTML(st.code)}</div>
                <div style="font-size:11.5px; color:var(--muted); margin-top:2px;">💡 ${escapeHTML(st.tip)}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top:20px;">
            <div style="font-weight:750; font-size:13.5px; margin-bottom:6px; color:var(--ink)">【考场完整范文组装演示 (实测 78 词)】：</div>
            <div class="essay-paper">${escapeHTML(staticTemplateText)}</div>
          </div>
        </div>
      </div>

      <!-- Section 4: Semi-Dynamic Charts & Measurement Rules (PDF p. 22-25) -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">📐 半动态图处理秘籍与数据度量介词规范 (PDF 第 22–25 页)</span>
        </div>
        <div class="template-card-body">
          <div style="font-weight:750; font-size:13.5px; margin-bottom:8px; color:var(--accent);">【半动态图两大突破视角】：</div>
          <div class="blocks-grid">
            ${SEMI_DYNAMIC_DATA.approaches.map(ap => `
              <div class="block-card">
                <div class="block-label">${escapeHTML(ap.title)}</div>
                <div class="block-snippet">${escapeHTML(ap.code)}</div>
                <div style="font-size:11.5px; color:var(--muted); margin-top:2px;">💡 ${escapeHTML(ap.tip)}</div>
              </div>
            `).join('')}
          </div>

          <div style="font-weight:750; font-size:13.5px; margin:20px 0 8px; color:var(--accent);">【年龄段地道英译四套方案】：</div>
          <div class="blocks-grid">
            ${SEMI_DYNAMIC_DATA.ageFormats.map(af => `
              <div class="block-card">
                <div class="block-label">${escapeHTML(af.rule)}</div>
                <div class="block-snippet"><code>${escapeHTML(af.eg)}</code></div>
              </div>
            `).join('')}
          </div>

          <div style="font-weight:750; font-size:13.5px; margin:20px 0 8px; color:var(--accent);">【数据介词精准搭配与倍数规范】：</div>
          <div class="blocks-grid">
            ${SEMI_DYNAMIC_DATA.prepositions.map(pr => `
              <div class="block-card">
                <div class="block-label">${escapeHTML(pr.prep)}</div>
                <div class="block-snippet">"${escapeHTML(pr.eg)}"</div>
                <div style="font-size:11.5px; color:var(--muted); margin-top:2px;">💡 ${escapeHTML(pr.tip)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // TAB 4: Toolkit (Connectors & Verbs & PDF Evaluation Phrases)
  // -------------------------------------------------------------
  function renderToolkitHTML() {
    return `
      <div class="principle-banner">
        💡 <strong>Olu · 连贯性与学术语域提分库：</strong>大纲评分第一档明确要求“文字连贯、句式有变化、词汇使用准确且得体”。下方收录<strong> 8 大考场黄金逻辑关系连接词</strong>、<strong> 34 个必考学术强动词</strong>以及<strong> PDF 第 34–35 页精研的“利弊与影响”高级表达</strong>。点击任意胶囊或卡片即可<strong>秒复制到剪贴板</strong>！
      </div>

      <!-- Module 0: Evaluation Phrases from PDF p. 34-35 -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🏅 考研官方阅卷高分“利弊与影响”黄金短语库（根据 PDF 第 34–35 页精研）</span>
        </div>
        <div class="template-card-body">
          <div style="font-weight:750; font-size:14px; margin-bottom:8px; color:#059669;">🌟 “有利 / 促进”高阶表达（点击卡片秒复制）</div>
          <div class="verb-bank-grid">
            ${EVALUATION_PHRASES_DATA.positive.map(v => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(v.en + ' (' + v.cn + '): ' + v.eg)}">
                <div class="verb-word"><span>${escapeHTML(v.en)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-cn">${escapeHTML(v.cn)}</div>
                <div class="verb-example">"${escapeHTML(v.eg)}"</div>
              </div>
            `).join('')}
          </div>

          <div style="font-weight:750; font-size:14px; margin:22px 0 8px; color:#dc2626;">⚠️ “有害 / 阻碍”高阶表达（点击卡片秒复制）</div>
          <div class="verb-bank-grid">
            ${EVALUATION_PHRASES_DATA.negative.map(v => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(v.en + ' (' + v.cn + '): ' + v.eg)}">
                <div class="verb-word"><span>${escapeHTML(v.en)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-cn">${escapeHTML(v.cn)}</div>
                <div class="verb-example">"${escapeHTML(v.eg)}"</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Module 1: 8-Dimensional Logic Transitions Matrix -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">🌐 8 大考场黄金逻辑关系连接词全景矩阵 (点击任意胶囊秒复制)</span>
        </div>
        <div class="template-card-body">
          <div class="connector-matrix-grid">
            ${LOGIC_CONNECTORS_DATA.map(cat => `
              <div class="connector-card">
                <div class="connector-card-header">${escapeHTML(cat.name)} <small style="font-weight:normal; opacity:0.8;">(${escapeHTML(cat.en)})</small></div>
                <div class="connector-type-desc">${escapeHTML(cat.desc)}</div>
                <div class="connector-chips-wrap">
                  ${cat.chips.map(ch => `
                    <button type="button" class="connector-chip copy-chip" data-text="${escapeHTML(ch.word)}" title="${escapeHTML(ch.cn)} (点击复制)">
                      ${escapeHTML(ch.word)}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Module 2: 34 Academic High-Frequency Verbs -->
      <div class="template-card">
        <div class="template-card-header">
          <span class="template-card-title">📚 34 个考场学术强动词速查库 (点击任意卡片一键复制动词短语及高分整句)</span>
        </div>
        <div class="template-card-body">
          <div style="font-weight:750; font-size:14px; margin-bottom:8px; color:#059669;">🌟 1. 积极促进与赋能类 (11 个高阶强动词)</div>
          <div class="verb-bank-grid">
            ${VERB_BANK_DATA.positive.map(v => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(v.verb + ' (' + v.cn + '): ' + v.eg)}">
                <div class="verb-word"><span>${escapeHTML(v.verb)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-cn">${escapeHTML(v.cn)}</div>
                <div class="verb-example">"${escapeHTML(v.eg)}"</div>
              </div>
            `).join('')}
          </div>

          <div style="font-weight:750; font-size:14px; margin:24px 0 8px; color:#dc2626;">⚠️ 2. 消极阻碍与危害类 (11 个高阶强动词)</div>
          <div class="verb-bank-grid">
            ${VERB_BANK_DATA.negative.map(v => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(v.verb + ' (' + v.cn + '): ' + v.eg)}">
                <div class="verb-word"><span>${escapeHTML(v.verb)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-cn">${escapeHTML(v.cn)}</div>
                <div class="verb-example">"${escapeHTML(v.eg)}"</div>
              </div>
            `).join('')}
          </div>

          <div style="font-weight:750; font-size:14px; margin:24px 0 8px; color:#c26a2b;">📈 3. 图表趋势与数据幅度类 (12 个高阶强动词)</div>
          <div class="verb-bank-grid">
            ${VERB_BANK_DATA.charts.map(v => `
              <div class="verb-item-card copy-verb" data-text="${escapeHTML(v.verb + ' (' + v.cn + '): ' + v.eg)}">
                <div class="verb-word"><span>${escapeHTML(v.verb)}</span><span class="verb-copy-hint">点击复制</span></div>
                <div class="verb-cn">${escapeHTML(v.cn)}</div>
                <div class="verb-example">"${escapeHTML(v.eg)}"</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Interactive Events Binding (Popover, Copy, Reset)
  // -------------------------------------------------------------
  function bindInteractiveEvents() {
    if (!el.main) return;

    // 1. Slot Pill Clicks
    el.main.querySelectorAll('.interactive-slot').forEach(slotEl => {
      slotEl.addEventListener('click', (e) => {
        e.stopPropagation();
        // Dismiss any existing popovers and backdrops
        document.querySelectorAll('.slot-dropdown-popover').forEach(p => p.remove());
        document.querySelectorAll('.popover-backdrop').forEach(b => b.remove());

        const isMobile = window.innerWidth <= 680;
        const tab = slotEl.dataset.tab;
        const slotKey = slotEl.dataset.slot;
        const currentVal = getSlotVal(tab, slotKey);
        const opts = (ASSEMBLY_SLOT_OPTIONS[tab] && ASSEMBLY_SLOT_OPTIONS[tab][slotKey]) || [];
        const slotTitle = ASSEMBLY_SLOT_LABELS[slotKey] || slotKey;

        const popover = document.createElement('div');
        popover.className = 'slot-dropdown-popover';
        popover.innerHTML = `
          <div class="popover-header">
            <span>${isMobile ? '请选择替换词槽：' : '⚡ Olu 词槽装配：'}<strong>${escapeHTML(slotTitle)}</strong></span>
            <button type="button" class="popover-close-btn" aria-label="关闭选择">✕</button>
          </div>
          <div class="popover-custom-row">
            <input type="text" class="popover-custom-input" placeholder="✍️ 题干抓词 / 自由手填..." value="${escapeHTML(currentVal)}">
            <button type="button" class="popover-custom-btn">填入</button>
          </div>
          ${opts.length ? `
          <div class="popover-section-label">📋 考场高频候选推荐（点击即换）：</div>
          <div class="popover-options-list">
            ${opts.map((opt) => `
              <button type="button" class="slot-option-btn ${opt.text === currentVal ? 'is-selected' : ''}" data-slot="${slotKey}" data-tab="${tab}" data-text="${escapeHTML(opt.text)}">
                <span>${escapeHTML(opt.text)}</span>
                <small>${escapeHTML(opt.cn)}</small>
              </button>
            `).join('')}
          </div>` : ''}
        `;

        // Helper: close and clean up popover + backdrop
        function dismissPopover() {
          popover.remove();
          document.querySelectorAll('.popover-backdrop').forEach(b => b.remove());
          document.body.style.overflow = '';
        }

        if (isMobile) {
          // ─── Mobile: mount to body as bottom action sheet ───
          // Add dark backdrop overlay
          const backdrop = document.createElement('div');
          backdrop.className = 'popover-backdrop';
          backdrop.addEventListener('click', (ev) => {
            ev.stopPropagation();
            dismissPopover();
          });
          document.body.appendChild(backdrop);
          document.body.appendChild(popover);
          // Prevent body scroll while action sheet is open
          document.body.style.overflow = 'hidden';
        } else {
          // ─── Desktop: mount inside slot element ───
          slotEl.appendChild(popover);
          const rect = slotEl.getBoundingClientRect();
          if (rect.left + 420 > window.innerWidth) {
            popover.style.left = 'auto';
            popover.style.right = '0';
          }
        }

        popover.addEventListener('click', (ev) => ev.stopPropagation());

        const closeBtn = popover.querySelector('.popover-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            dismissPopover();
          });
        }

        const customInput = popover.querySelector('.popover-custom-input');
        const customBtn = popover.querySelector('.popover-custom-btn');
        if (customBtn && customInput) {
          const applyCustom = () => {
            const val = sanitizeInput(customInput.value.trim());
            if (val) {
              setSlotVal(tab, slotKey, val);
              dismissPopover();
              showToast(`Olu: 已装配自定义词槽 [${slotTitle}]`);
              renderContent();
            }
          };
          customBtn.addEventListener('click', applyCustom);
          customInput.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') applyCustom();
          });
          setTimeout(() => customInput.focus(), isMobile ? 300 : 50);
        }

        popover.querySelectorAll('.slot-option-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const newText = btn.dataset.text;
            setSlotVal(tab, slotKey, newText);
            dismissPopover();
            showToast(`Olu: 已装配 [${slotTitle}]`);
            renderContent();
          });
        });
      });
    });

    // 2. Global Copy Buttons
    el.main.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.text;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          showToast('🍃 Olu: 已复制到剪贴板！');
        }).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast('🍃 Olu: 已复制到剪贴板！');
        });
      });
    });

    // 3. Verb Card Copy & Chip Copy
    el.main.querySelectorAll('.copy-verb, .copy-chip').forEach(card => {
      card.addEventListener('click', () => {
        const text = card.dataset.text;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          showToast(`🍃 Olu: 已复制 "${text.slice(0, 32)}..."`);
        }).catch(() => {
          showToast('🍃 Olu: 复制成功！');
        });
      });
    });

    // 4. Reset Assembly
    el.main.querySelectorAll('.reset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (state.activeSlotChoices[tab]) {
          state.activeSlotChoices[tab] = {};
        }
        showToast('Olu: 已恢复官方推荐默认词槽！');
        renderContent();
      });
    });
  }

  // Document Click to dismiss popovers
  document.addEventListener('click', () => {
    document.querySelectorAll('.slot-dropdown-popover').forEach(p => p.remove());
    document.querySelectorAll('.popover-backdrop').forEach(b => b.remove());
    document.body.style.overflow = '';
  });

  // Tab Listeners
  el.navTabs.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      switchTab(tabBtn.dataset.tab);
    });
  });

  // ─── Back to Top Button ───
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTopBtn.removeAttribute('hidden');
      } else {
        backToTopBtn.setAttribute('hidden', '');
      }
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      // Custom smooth scroll with cubic easing (reference site style)
      const startY = window.scrollY;
      const duration = Math.min(560, Math.max(260, startY * 0.35));
      const startTime = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY * (1 - ease(progress)));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ─── Staggered Card Entrance Animations ───
  function animateCards() {
    const cards = el.main.querySelectorAll('.template-card, .principle-banner');
    cards.forEach((card, idx) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      card.style.transition = 'none';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transition = `opacity 0.4s ease ${Math.min(idx * 0.06, 0.5)}s, transform 0.4s ease ${Math.min(idx * 0.06, 0.5)}s`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // Override renderContent to include entrance animation
  const _origRenderContent = renderContent;
  renderContent = function() {
    _origRenderContent();
    animateCards();
  };

  // ─── Keyboard Navigation for Tabs ───
  const navInner = document.querySelector('.nav-inner');
  if (navInner) {
    navInner.addEventListener('keydown', (e) => {
    const tabs = Array.from(el.navTabs);
    const currentIdx = tabs.indexOf(document.activeElement);
    if (currentIdx < 0) return;

    let nextIdx = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (currentIdx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = tabs.length - 1;
    }

    if (nextIdx >= 0) {
      e.preventDefault();
      tabs[nextIdx].focus();
      tabs[nextIdx].click();
    }
  });
}

  // ─── Prevent Right-Click on Content (Mild Protection) ───
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.essay-paper, .template-card-body')) {
      e.preventDefault();
    }
  });

  // Initialization
  initTheme();
  renderContent();
})();

