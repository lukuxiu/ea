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

  // Exam Scoring & Rubric Data (from PDF p. 1-8, 28-30, 48-49)
  const EXAM_RUBRIC_DATA = [
    {
      tier: "第一档 (高分段)",
      rangeA: "9–10 分",
      rangeB: "17–20 分 (英一) / 13–15 分 (英二)",
      tagClass: "rubric-tag-t1",
      task: "完全切题，所有写作要点全部回应，无遗漏",
      cc: "衔接极其自然，逻辑推进层层递进，段落衔接清晰地道",
      lr: "词汇使用得体准确，动词描述性强，多用无灵主语与高阶学术搭配",
      gra: "句式多样（倒装、定从、非谓语、强调句），极少或无语法拼写错误"
    },
    {
      tier: "第二档 (良好段)",
      rangeA: "7–8 分",
      rangeB: "13–16 分 (英一) / 10–12 分 (英二)",
      tagClass: "rubric-tag-t2",
      task: "基本切题，主要要点均有回应，部分细节有小偏差",
      cc: "逻辑较清晰，使用了常见逻辑连接词，结构完整",
      lr: "词汇基本满足要求，有少量中级词汇，偶尔有搭配小不当",
      gra: "句式有一定变化，存在少量次要语法或拼写错误，但不影响理解"
    },
    {
      tier: "第三档 (及格段)",
      rangeA: "5–6 分",
      rangeB: "9–12 分 (英一) / 7–9 分 (英二)",
      tagClass: "rubric-tag-t3",
      task: "部分切题，遗漏重要要点，或有泛泛而谈倾向",
      cc: "结构松散，衔接词生搬硬套，段落说理逻辑不严密",
      lr: "词汇单一匮乏，重复使用初中简单词（good, make, think）",
      gra: "简单句占主导，语法错误较多（时态主谓不一致），勉强达意"
    },
    {
      tier: "第四档以下 (扣分危险区)",
      rangeA: "0–4 分",
      rangeB: "0–8 分 (英一) / 0–6 分 (英二)",
      tagClass: "rubric-tag-t4",
      task: "严重跑题，字数不足（小作文<70，大作文<130），或模板痕迹太重",
      cc: "条理混乱，前后矛盾，不知所云",
      lr: "大面积词不达意，拼写错误严重",
      gra: "语法破损，大量病句，甚至出现中式逐字生造句"
    }
  ];

  const EXAM_PRESOLVE_TOPICS = [
    {
      title: "母题 1：个人成长、求学深造与人生态度",
      years: "真题覆盖：2003温室花朵 / 2006追星 / 2012撒半杯水 / 2013毕业生去向 / 2017有书与读书 / 2018水课与好课 / 2019坚持与放弃 / 2020拖延与执行力 / 2022专业与通识",
      keywords: "<strong>核心上位词：</strong>self-discipline (自律), perseverance (坚持), pragmatism (务实), critical thinking (批判性思维), resist distractions / temptation (抵制诱惑), long-term vision (长远视野), comprehensive competence (综合素养)。<br><strong>破局逻辑：</strong>无论遇到拖延、追星还是选课，统统归结为“自律战胜惰性、长远规划战胜短期诱惑”。"
    },
    {
      title: "母题 2：网络科技、数字生活与时代双刃剑",
      years: "真题覆盖：2009网络远近 / 2015低头族聚会 / 2024劳动与科技实践 / 2026养老陪伴机器人",
      keywords: "<strong>核心上位词：</strong>technological empowerment (科技赋能), double-edged sword (双刃剑), excessive indulgence (过度沉溺), virtual isolation (虚拟隔阂), alienation (异化), human-centered innovation (以人为本的创新)。<br><strong>破局逻辑：</strong>正向肯定科技带来 convenience & efficiency；反向警惕 reckless reliance (盲目依赖) 与 erode genuine companionship (侵蚀陪伴)。"
    },
    {
      title: "母题 3：亲情伦理、尊老爱幼与传统美德",
      years: "真题覆盖：2005足球养老赛 / 2014母女相携看风景 / 2021善意与自省 / 2023乡村龙舟赛 / 2026陪伴机器人",
      keywords: "<strong>核心上位词：</strong>filial piety (孝顺/孝道), mutual companionship (相互陪伴), emotional resonance (情感共鸣), cultural heritage (文化传承), spiritual nourishment (精神滋养), renew vitality (重焕生机)。<br><strong>破局逻辑：</strong>把具体敬老或文化活动升华到“精神反哺、铸牢亲情纽带与延续文化根脉”。"
    },
    {
      title: "母题 4：社会治理、公共福祉与协同推进",
      years: "真题覆盖：2008酸雨环保 / 2010手机普及 / 2011轿车文明 / 2023居民健康素养 / 2024就业与劳动观念",
      keywords: "<strong>核心上位词：</strong>joint / concerted efforts (协同合力), high on the agenda (置于优先议程), sustainable development (可持续发展), public awareness (公众意识), down-to-earth strategy (切实可行策略)。<br><strong>破局逻辑：</strong>第三段措施必走“政府有关部门出台法规 + 公众/个人转变观念践行”双轨推进制！"
    }
  ];

  const EXAM_FATAL_MISTAKES = [
    {
      title: "雷区一：小作文 NOTICE 误写 Dear 称呼或 Yours sincerely 落款",
      penalty: "直接扣 2–3 分 (格式一票否决)",
      wrong: "Dear All, / Dear Students, ... Yours sincerely, Li Ming",
      right: "首行大写居中 NOTICE，次行靠右写日期 May 15；正文后靠右写官方署名 The Students' Union。"
    },
    {
      title: "雷区二：书信称呼与标点格式错乱",
      penalty: "扣 1–2 分 (规范分扣减)",
      wrong: "Dear Professor Smith (漏逗号) / Dear Sir, 却落款 Yours sincerely (称呼未知需配 faithfully)",
      right: "Dear Professor Smith, 配 Yours sincerely, / Dear Sir or Madam, 配 Yours faithfully, （称呼后必须有英文逗号！）"
    },
    {
      title: "雷区三：图画/图表大作文第一段时态混乱",
      penalty: "扣 2 分 (语法与语境一致性)",
      wrong: "The cartoon depicted a scene where people were looking... (大作文首段不能全用过去时)",
      right: "描绘漫画/图表自身统一用一般现在时：The cartoon presents... / A student is standing... / The chart shows... 仅在图表中出现具体历史年份时，数值变化用过去时（climbed, dropped）。"
    },
    {
      title: "雷区四：图表作文报菜名式流水账，无极值与分词升华",
      penalty: "扣 3–5 分 (阅卷人最厌烦)",
      wrong: "Category A is 20%, B is 30%, C is 15%, D is 25%, and E is 10%.",
      right: "分类聚类：Top 2 极值领跑（...accounting for 58% and 25% respectively, far outpacing the others）+ 长尾低位一句打包（While the remaining categories remain clustered at a low tier, none of which exceeds 10%）。"
    },
    {
      title: "雷区五：大作文第二段无灵主语缺失，通篇“I think / We should”",
      penalty: "扣 2–4 分 (死锁在及格档)",
      wrong: "I think computers are good. We can use them to study and we can also play games.",
      right: "无灵主语+强动词：Excessive indulgence in cyberspace delivers a severe blow to students' academic efficiency, eroding their capacity for sustained concentration."
    }
  ];

  // Full Exam Essay Showcase Data (from PDF p. 61-74)
  const EXAM_SHOWCASE_DATA = [
    {
      id: "essay-2020-en1-b",
      type: "partB",
      exam: "en1",
      year: "2020",
      title: "2020年 英语一 Part B 图画真题：工作习惯与执行力 (Habits & Procrastination)",
      scoreTag: "大纲一档 18–19分",
      prompt: "Directions: Write an essay of 160-200 words based on the picture below. (图一女员工'习惯尽早完成'，图二男员工'拖到最后一刻'，下方文字：习惯)",
      content: `The two images illustrate two distinctly different approaches to work. In the first image, a woman is diligently engaged at her desk, accompanied by the speech bubble stating, "I can only feel at ease when I finish early." In stark contrast, the man in the second image is lounging comfortably, declaring, "I don't start work until the last minute." The common theme highlighted below these illustrations is "habits."

At a fundamental level, productive habits significantly boost efficiency. Individuals who act promptly can manage their time more effectively and approach tasks in organized stages. Conversely, habitual procrastinators often find themselves rushing through their work, leading to subpar results. Moreover, acting without unnecessary delay fosters self-discipline, as repeated actions allow individuals to resist distractions and laziness. Even more importantly, the cumulative impact of these habits cannot be overstated. A single responsible decision may seem insignificant, yet a series of such choices cultivates competence, reliability, and confidence—qualities essential for achieving long-term success.

In conclusion, true and meaningful success rarely stems from sporadic bursts of enthusiasm; it is built through consistent, disciplined actions over time. Therefore, it is crucial to plan ahead, act decisively, and ensure that important tasks do not escalate to last-minute urgencies. Only by making constructive behaviors a part of our routine can our intentions translate into significant progress, and our potential into enduring accomplishments.`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="这两幅图描绘了两种截然不同的工作方式。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The two images illustrate two distinctly different approaches to work.</span></span> <span class="essay-sentence" data-cn="在第一幅图中，一位女性正在办公桌前勤奋工作，旁边的气泡文字写道：“我习惯早做完心里踏实。”"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In the first image, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">a woman is diligently engaged at her desk, accompanied by the speech bubble stating, "I can only feel at ease when I finish early."</span></span> <span class="essay-sentence" data-cn="形成鲜明对比的是，第二幅图中的男性惬意地斜靠着，宣称：“不到最后我不做。”"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In stark contrast, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the man in the second image is lounging comfortably, declaring, "I don't start work until the last minute."</span></span> <span class="essay-sentence" data-cn="这两幅插图下方共同突出的主题是“习惯”。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The common theme highlighted below these illustrations is </span><span class="tpl-slot" title="高分题眼填充/核心亮点">"habits."</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="从根本层面来看，高产的习惯能显著提升效率。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">At a fundamental level, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">productive habits significantly boost efficiency.</span></span> <span class="essay-sentence" data-cn="行动果断的人能够更有效地管理时间，并按部就班地分阶段推进任务。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Individuals who </span><span class="tpl-slot" title="高分题眼填充/核心亮点">act promptly can manage their time more effectively and approach tasks in organized stages.</span></span> <span class="essay-sentence" data-cn="相反，习惯性拖延者往往发现自己不得不在赶工中仓促应付，导致产出差强人意。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Conversely, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">habitual procrastinators often find themselves rushing through their work, leading to subpar results.</span></span> <span class="essay-sentence" data-cn="此外，毫不拖延地采取行动能培养自律精神，因为重复的行为使人们能够抵御诱惑与惰性。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Moreover, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">acting without unnecessary delay fosters self-discipline, as repeated actions allow individuals to resist distractions and laziness.</span></span> <span class="essay-sentence" data-cn="更为重要的是，这些习惯的累积效应不容小觑。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Even more importantly, the cumulative impact of these habits cannot be overstated.</span></span> <span class="essay-sentence" data-cn="一个负责任的决定看似微不足道，但一系列这样的抉择将逐步铸就能力、可靠性与自信心——而这些正是取得长远成功的立身之本。"><span class="tpl-slot" title="高分题眼填充/核心亮点">A single responsible decision may seem insignificant, yet a series of such choices cultivates competence, reliability, and confidence—qualities essential for achieving long-term success.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="总而言之，真正且有价值的成功极少源于偶发的狂热激情，而是随着时间的推移，通过持之以恒、高度自律的行动构筑而成。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In conclusion, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">true and meaningful success rarely stems from sporadic bursts of enthusiasm; it is built through consistent, disciplined actions over time.</span></span> <span class="essay-sentence" data-cn="因此，至关重要的是提前规划、果断行动，并确保关键任务不会演变成最后一刻的紧急危机。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Therefore, it is crucial to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">plan ahead, act decisively, and ensure that important tasks do not escalate to last-minute urgencies.</span></span> <span class="essay-sentence" data-cn="唯有将建设性的行为融入日常生活，我们的初衷才能转化为实质性的进步，潜能也才能蜕变为持久的成就。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Only by </span><span class="tpl-slot" title="高分题眼填充/核心亮点">making constructive behaviors a part of our routine</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> can </span><span class="tpl-slot" title="高分题眼填充/核心亮点">our intentions translate into significant progress, and our potential into enduring accomplishments.</span></span> </p>`,
      templateMapping: "【母版一：对比双图首段】In the first image... In stark contrast, the man in the second image... + 【母版二：正向自律轨】At a fundamental level, productive habits boost efficiency... resist distractions + 【母版三：展望收官】In conclusion... Only by making... can...",
      chineseTranslation: `这两幅图描绘了两种截然不同的工作方式。在第一幅图中，一位女性正在办公桌前勤奋工作，旁边的气泡文字写道：“我习惯早做完心里踏实。”形成鲜明对比的是，第二幅图中的男性惬意地斜靠着，宣称：“不到最后我不做。”这两幅插图下方共同突出的主题是“习惯”。

从根本层面来看，高产的习惯能显著提升效率。行动果断的人能够更有效地管理时间，并按部就班地分阶段推进任务。相反，习惯性拖延者往往发现自己不得不在赶工中仓促应付，导致产出差强人意。此外，毫不拖延地采取行动能培养自律精神，因为重复的行为使人们能够抵御诱惑与惰性。更为重要的是，这些习惯的累积效应不容小觑。一个负责任的决定看似微不足道，但一系列这样的抉择将逐步铸就能力、可靠性与自信心——而这些正是取得长远成功的立身之本。

总而言之，真正且有价值的成功极少源于偶发的狂热激情，而是随着时间的推移，通过持之以恒、高度自律的行动构筑而成。因此，至关重要的是提前规划、果断行动，并确保关键任务不会演变成最后一刻的紧急危机。唯有将建设性的行为融入日常生活，我们的初衷才能转化为实质性的进步，潜能也才能蜕变为持久的成就。`,
      chineseTranslation: `这两幅图描绘了两种截然不同的工作方式。在第一幅图中，一位女性正在办公桌前勤奋工作，旁边的气泡文字写道：“我习惯早做完心里踏实。”形成鲜明对比的是，第二幅图中的男性惬意地斜靠着，宣称：“不到最后我不做。”这两幅插图下方共同突出的主题是“习惯”。

从根本层面来看，高产的习惯能显著提升效率。行动果断的人能够更有效地管理时间，并按部就班地分阶段推进任务。相反，习惯性拖延者往往发现自己不得不在赶工中仓促应付，导致产出差强人意。此外，毫不拖延地采取行动能培养自律精神，因为重复的行为使人们能够抵御诱惑与惰性。更为重要的是，这些习惯的累积效应不容小觑。一个负责任的决定看似微不足道，但一系列这样的抉择将逐步铸就能力、可靠性与自信心——而这些正是取得长远成功的立身之本。

总而言之，真正且有价值的成功极少源于偶发的狂热激情，而是随着时间的推移，通过持之以恒、高度自律的行动构筑而成。因此，至关重要的是提前规划、果断行动，并确保关键任务不会演变成最后一刻的紧急危机。唯有将建设性的行为融入日常生活，我们的初衷才能转化为实质性的进步，潜能也才能蜕变为持久的成就。`,
      rubricFeedback: "【TA 任务完成】完全抓住'习惯与拖延'核心矛盾；【CC 连贯性】Conversely, Moreover, Even more importantly 层层递进；【LR 词汇】使用 subpar results, sporadic bursts, cultivate competence 等学术强动词；【GRA 语法】尾句使用 Only by 倒装句，语法丰富度极高。"
    },
    {
      id: "essay-2026-en2-b",
      type: "partB",
      exam: "en2",
      year: "2026",
      title: "2026年 英语二 Part B 图表大作文：儿童户外活动益处调查",
      scoreTag: "大纲一档 14–15分",
      prompt: "Directions: Write an essay based on the bar chart showing people's views on children's outdoor activities. (满足好奇心54%，提升观察力54%，强身健体37%，亲子互动33%)",
      content: `The bar chart illustrates a survey on people's views about children's outdoor activities. As shown, the two most frequently mentioned benefits are satisfying children's curiosity and improving observation, each accounting for about 54 percent. By comparison, strengthening the body takes up about 37 percent, while enhancing parent-child interaction is chosen by roughly one third of respondents.

These figures suggest that outdoor activities are valued not merely as exercise, but as a form of real-world education. In parks, fields or communities, children can touch natural objects, notice changes in weather and plants, and raise questions that rarely arise in classrooms. Such experience connects knowledge with life and builds a habit of careful observation. Meanwhile, the lower percentages for fitness and family interaction do not mean they are unimportant; rather, many parents may still underestimate the emotional value of outdoor companionship.

In my view, families and schools should provide children with safer and more regular outdoor opportunities. Only when children step out of screens and textbooks can they become healthier, more curious and more perceptive.`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="该柱状图展示了一项关于大众对儿童户外活动益处看法的调研。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The bar chart illustrates a survey on </span><span class="tpl-slot" title="高分题眼填充/核心亮点">people's views about children's outdoor activities.</span></span> <span class="essay-sentence" data-cn="如图所示，被提及频率最高的两项益处是“满足儿童的好奇心”和“提升观察力”，各自占比约 54%。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">As shown, the two most frequently mentioned benefits are </span><span class="tpl-slot" title="高分题眼填充/核心亮点">satisfying children's curiosity and improving observation,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> each accounting for </span><span class="tpl-slot" title="高分题眼填充/核心亮点">about 54 percent.</span></span> <span class="essay-sentence" data-cn="相比之下，“强身健体”占比约 37%，而“增进亲子互动”则被约三分之一的受访者选中。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">By comparison, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">strengthening the body takes up about 37 percent,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> while </span><span class="tpl-slot" title="高分题眼填充/核心亮点">enhancing parent-child interaction is chosen by roughly one third of respondents.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="这些数据表明，户外活动的价值已不仅仅被视为体育锻炼，更被看作一种真实的现世教育。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">These figures suggest that </span><span class="tpl-slot" title="高分题眼填充/核心亮点">outdoor activities are valued not merely as exercise, but as a form of real-world education.</span></span> <span class="essay-sentence" data-cn="在公园、田野或社区中，孩子们可以亲手触摸自然物体，感知气候与植被的变化，并提出在课堂上鲜少萌生的问题。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In </span><span class="tpl-slot" title="高分题眼填充/核心亮点">parks, fields or communities,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> children can </span><span class="tpl-slot" title="高分题眼填充/核心亮点">touch natural objects, notice changes in weather and plants, and raise questions that rarely arise in classrooms.</span></span> <span class="essay-sentence" data-cn="这种体验将书本知识与现实生活紧密相连，并培养出细致观察的习惯。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Such experience connects </span><span class="tpl-slot" title="高分题眼填充/核心亮点">knowledge with life and builds a habit of careful observation.</span></span> <span class="essay-sentence" data-cn="同时，强身健体与家庭互动相对偏低的比例并不意味着它们无足轻重，反倒说明许多家长可能仍低估了户外陪伴的情感价值。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Meanwhile, the lower percentages for fitness and family interaction do not mean they are unimportant; rather, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">many parents may still underestimate the emotional value of outdoor companionship.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="在我看来，家庭和学校应当为孩子们提供更多安全且常态化的户外实践机会。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In my view, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">families and schools should provide children with safer and more regular outdoor opportunities.</span></span> <span class="essay-sentence" data-cn="唯有当孩子们走出电子屏幕与课本束缚时，他们才能变得更加健康、更具好奇心且更富敏锐洞察力。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Only when </span><span class="tpl-slot" title="高分题眼填充/核心亮点">children step out of screens and textbooks</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> can they </span><span class="tpl-slot" title="高分题眼填充/核心亮点">become healthier, more curious and more perceptive.</span></span> </p>`,
      templateMapping: "【动态/静态图表母版首段】The bar chart illustrates... Top 2 极值领跑（accounting for about 54% each）+ 中段【启迪阐释轨】These figures suggest that... + 尾段【双主体倡议】In my view, families and schools should... Only when...",
      chineseTranslation: `该柱状图展示了一项关于大众对儿童户外活动益处看法的调研。如图所示，被提及频率最高的两项益处是“满足儿童的好奇心”和“提升观察力”，各自占比约 54%。相比之下，“强身健体”占比约 37%，而“增进亲子互动”则被约三分之一的受访者选中。

这些数据表明，户外活动的价值已不仅仅被视为体育锻炼，更被看作一种真实的现世教育。在公园、田野或社区中，孩子们可以亲手触摸自然物体，感知气候与植被的变化，并提出在课堂上鲜少萌生的问题。这种体验将书本知识与现实生活紧密相连，并培养出细致观察的习惯。同时，强身健体与家庭互动相对偏低的比例并不意味着它们无足轻重，反倒说明许多家长可能仍低估了户外陪伴的情感价值。

在我看来，家庭和学校应当为孩子们提供更多安全且常态化的户外实践机会。唯有当孩子们走出电子屏幕与课本束缚时，他们才能变得更加健康、更具好奇心且更富敏锐洞察力。`,
      chineseTranslation: `该柱状图展示了一项关于大众对儿童户外活动益处看法的调研。如图所示，被提及频率最高的两项益处是“满足儿童的好奇心”和“提升观察力”，各自占比约 54%。相比之下，“强身健体”占比约 37%，而“增进亲子互动”则被约三分之一的受访者选中。

这些数据表明，户外活动的价值已不仅仅被视为体育锻炼，更被看作一种真实的现世教育。在公园、田野或社区中，孩子们可以亲手触摸自然物体，感知气候与植被的变化，并提出在课堂上鲜少萌生的问题。这种体验将书本知识与现实生活紧密相连，并培养出细致观察的习惯。同时，强身健体与家庭互动相对偏低的比例并不意味着它们无足轻重，反倒说明许多家长可能仍低估了户外陪伴的情感价值。

在我看来，家庭和学校应当为孩子们提供更多安全且常态化的户外实践机会。唯有当孩子们走出电子屏幕与课本束缚时，他们才能变得更加健康、更具好奇心且更富敏锐洞察力。`,
      rubricFeedback: "【TA 任务完成】数据提炼规范，未报菜名；【CC 连贯性】not merely... but as...，Meanwhile, rather 逻辑紧密；【LR 词汇】real-world education, emotional value of companionship；【GRA 句式】尾句使用 Only when 倒装句收官。"
    },
    {
      id: "essay-2026-en1-chart-b",
      type: "partB",
      exam: "en1",
      year: "2026",
      title: "2026年 英语一 Part B 图表大作文：老龄化背景下养老陪伴机器人调研 (仅英一)",
      scoreTag: "大纲一档 18–19分 (仅英语一)",
      prompt: "Directions: Write an essay based on two charts: 饼图（72.1%接受度，27.9%拒绝）与柱图（安全顾虑46.3%，价格25%，便利性10%）。",
      content: `Against the backdrop of population aging and rapid technological advancement, elderly-care robots have become a topic of growing public concern. Two charts present consumers' acceptance of such robots and their primary concerns. The pie chart shows that 72.1% of respondents express at least partial acceptance, if not complete acceptance, whereas the remaining 27.9% convey outright rejection. According to the bar chart, safety is regarded as a dominant concern, accounting for 46.3%, followed by price and convenience, which share a notable proportion of approximately 25% and roughly 10% respectively.

The statistics suggest the ambivalence of consumers. On the one hand, thanks to technological advances, robots cross the threshold into ordinary households and assist with daily care. Besides, the shortage of caregiving resources in an aging society has made robotic assistance a practical supplement to human care. On the other hand, obstacles remain before widespread acceptance can be achieved. Not only does elderly-care robotics still have several limitations per se, but people's instinctive distrust of unfamiliar technologies continues to undermine confidence in robotic care.

To generalise, as every coin has two sides, acceptance is growing, but skepticism persists. Therefore, companies should improve both user experience and affordability through sustained technological innovation. Only when robots are reliable, accessible and human-centered can a promising future unfold for the elderly-care robotics sector.`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="在人口老龄化与科技飞速发展的宏观背景下，养老陪伴机器人已成为日益受到公众关注的热点议题。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Against the backdrop of </span><span class="tpl-slot" title="高分题眼填充/核心亮点">population aging and rapid technological advancement,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> </span><span class="tpl-slot" title="高分题眼填充/核心亮点">elderly-care robots</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> have become a topic of growing public concern.</span></span> <span class="essay-sentence" data-cn="两幅图表分别呈现了消费者对该类机器人的接受程度及其核心顾虑。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Two charts present </span><span class="tpl-slot" title="高分题眼填充/核心亮点">consumers' acceptance of such robots and their primary concerns.</span></span> <span class="essay-sentence" data-cn="饼图显示，72.1% 的受访者表示至少部分接受（乃至完全接受），而剩余 27.9% 则表示明确拒绝。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The pie chart shows that </span><span class="tpl-slot" title="高分题眼填充/核心亮点">72.1% of respondents express at least partial acceptance, if not complete acceptance,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> whereas the remaining </span><span class="tpl-slot" title="高分题眼填充/核心亮点">27.9% convey outright rejection.</span></span> <span class="essay-sentence" data-cn="根据柱状图，安全性被视为主导顾虑，占比达 46.3%，其次是价格与便利性，分别占到约 25% 和约 10% 的可观比例。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">According to the bar chart, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">safety is regarded as a dominant concern, accounting for 46.3%, followed by price and convenience, which share a notable proportion of approximately 25% and roughly 10% respectively.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="这些统计数据折射出消费者的矛盾复杂心理。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The statistics suggest </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the ambivalence of consumers.</span></span> <span class="essay-sentence" data-cn="一方面，得益于技术进步，机器人得以跨入寻常百姓家并协助日常照料。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">On the one hand, thanks to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">technological advances, robots cross the threshold into ordinary households and assist with daily care.</span></span> <span class="essay-sentence" data-cn="此外，老龄化社会中照护资源的匮乏，使得机器人辅助成为了人工照料切实可行的有力补充。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Besides, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the shortage of caregiving resources in an aging society has made robotic assistance a practical supplement to human care.</span></span> <span class="essay-sentence" data-cn="另一方面，在实现广泛普及之前依然存在诸多阻碍。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">On the other hand, obstacles remain before widespread acceptance can be achieved.</span></span> <span class="essay-sentence" data-cn="不仅养老机器人技术本身仍存在若干局限，而且人们对未知陌生技术的本能不信任感，也在持续削弱对机器照料的信心。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Not only does </span><span class="tpl-slot" title="高分题眼填充/核心亮点">elderly-care robotics still have several limitations per se,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> but </span><span class="tpl-slot" title="高分题眼填充/核心亮点">people's instinctive distrust of unfamiliar technologies continues to undermine confidence in robotic care.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="概括而言，正如一枚硬币皆有两面，公众的接纳度在不断上升，但疑虑与观望亦然并存。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">To generalise, as every coin has two sides, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">acceptance is growing, but skepticism persists.</span></span> <span class="essay-sentence" data-cn="因此，企业应通过持续的技术创新，同步提升用户体验与价格亲民度。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Therefore, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">companies should improve both user experience and affordability through sustained technological innovation.</span></span> <span class="essay-sentence" data-cn="唯有当机器人真正做到安全可靠、经济普惠且以人为本时，养老机器人产业才能迎来光明璀璨的发展前景。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Only when </span><span class="tpl-slot" title="高分题眼填充/核心亮点">robots are reliable, accessible and human-centered</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> can </span><span class="tpl-slot" title="高分题眼填充/核心亮点">a promising future unfold for the elderly-care robotics sector.</span></span> </p>`,
      templateMapping: "【双图表首段母版】Against the backdrop of... Two charts present... + 【二段辩证反思轨】suggest the ambivalence... On the one hand... On the other hand... Not only does... but... + 【三段企业对策】To generalise... Only when... can...",
      chineseTranslation: `在人口老龄化与科技飞速发展的宏观背景下，养老陪伴机器人已成为日益受到公众关注的热点议题。两幅图表分别呈现了消费者对该类机器人的接受程度及其核心顾虑。饼图显示，72.1% 的受访者表示至少部分接受（乃至完全接受），而剩余 27.9% 则表示明确拒绝。根据柱状图，安全性被视为主导顾虑，占比达 46.3%，其次是价格与便利性，分别占到约 25% 和约 10% 的可观比例。

这些统计数据折射出消费者的矛盾复杂心理。一方面，得益于技术进步，机器人得以跨入寻常百姓家并协助日常照料。此外，老龄化社会中照护资源的匮乏，使得机器人辅助成为了人工照料切实可行的有力补充。另一方面，在实现广泛普及之前依然存在诸多阻碍。不仅养老机器人技术本身仍存在若干局限，而且人们对未知陌生技术的本能不信任感，也在持续削弱对机器照料的信心。

概括而言，正如一枚硬币皆有两面，公众的接纳度在不断上升，但疑虑与观望亦然并存。因此，企业应通过持续的技术创新，同步提升用户体验与价格亲民度。唯有当机器人真正做到安全可靠、经济普惠且以人为本时，养老机器人产业才能迎来光明璀璨的发展前景。`,
      chineseTranslation: `在人口老龄化与科技飞速发展的宏观背景下，养老陪伴机器人已成为日益受到公众关注的热点议题。两幅图表分别呈现了消费者对该类机器人的接受程度及其核心顾虑。饼图显示，72.1% 的受访者表示至少部分接受（乃至完全接受），而剩余 27.9% 则表示明确拒绝。根据柱状图，安全性被视为主导顾虑，占比达 46.3%，其次是价格与便利性，分别占到约 25% 和约 10% 的可观比例。

这些统计数据折射出消费者的矛盾复杂心理。一方面，得益于技术进步，机器人得以跨入寻常百姓家并协助日常照料。此外，老龄化社会中照护资源的匮乏，使得机器人辅助成为了人工照料切实可行的有力补充。另一方面，在实现广泛普及之前依然存在诸多阻碍。不仅养老机器人技术本身仍存在若干局限，而且人们对未知陌生技术的本能不信任感，也在持续削弱对机器照料的信心。

概括而言，正如一枚硬币皆有两面，公众的接纳度在不断上升，但疑虑与观望亦然并存。因此，企业应通过持续的技术创新，同步提升用户体验与价格亲民度。唯有当机器人真正做到安全可靠、经济普惠且以人为本时，养老机器人产业才能迎来光明璀璨的发展前景。`,
      rubricFeedback: "【TA 任务完成】完美融合两张图表，提炼消费者矛盾心理（ambivalence）；【CC 连贯性】On the one hand / On the other hand 对仗工整；【LR 词汇】cross the threshold, practical supplement, human-centered；【GRA 句式】二段 Not only 倒装，三段 Only when 倒装。"
    },
    {
      id: "essay-2024-en2-b",
      type: "partB",
      exam: "en2",
      year: "2024",
      title: "2024年 英语二 Part B 图表大作文：大学劳动实践课收获调查",
      scoreTag: "大纲一档 14分",
      prompt: "Directions: Write an essay based on the bar chart on students' primary benefits from a labor-practice class (知识与技能>84%，趣味性54.5%，合作技能<33%).",
      content: `The bar chart presents a survey regarding students' primary benefits derived from a labor-practice class at a university. The data reveals that the two most frequently cited advantages are the acquisition of relevant knowledge and the enhancement of practical skills, accounting for 84.5% and 91.3% of responses, respectively. In contrast, the enjoyment factor represents a mere 54.5%. Additionally, the improvement of cooperation skills is acknowledged by less than one-third of the respondents.

These statistics indicate that while the labor-practice class meets its fundamental objectives, it falls short in helping students grasp the deeper significance of labor practices. On one hand, it is evident that students acquire substantial knowledge and actively participate in practical exercises. On the other hand, it is unfortunate that many tend to complete tasks individually, often leaving with a negative mindset. This suggests that the class does not foster teamwork or allow students to experience the joy associated with labor.

In my opinion, it is challenging to deem this class a successful one. Even if it is regarded as effective, it does not stand out from similar courses. The university should prioritize enhancing its core mission—immersing students in the spirit of labor and cultivating teamwork skills.`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="该柱状图展示了一项关于某大学学生在劳动实践课中主要收获的调查。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The bar chart presents a survey regarding </span><span class="tpl-slot" title="高分题眼填充/核心亮点">students' primary benefits derived from a labor-practice class at a university.</span></span> <span class="essay-sentence" data-cn="数据显示，被提及最多的两项益处是“获取相关知识”与“提升实践技能”，在回复中分别占到 84.5% 和 91.3%。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The data reveals that the two most frequently cited advantages are </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the acquisition of relevant knowledge and the enhancement of practical skills, accounting for 84.5% and 91.3% of responses, respectively.</span></span> <span class="essay-sentence" data-cn="相比之下，“趣味性/享受乐趣”仅占 54.5%。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In contrast, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the enjoyment factor represents a mere 54.5%.</span></span> <span class="essay-sentence" data-cn="此外，“协作技能的提升”得到认可的比例不足三分之一。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Additionally, </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the improvement of cooperation skills is acknowledged by less than one-third of the respondents.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="这些数据表明，尽管该劳动实践课达成了基础教学目标，但在引导学生领会劳动实践的深层内涵方面仍有欠缺。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">These statistics indicate that while </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the labor-practice class meets its fundamental objectives,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> it falls short in </span><span class="tpl-slot" title="高分题眼填充/核心亮点">helping students grasp the deeper significance of labor practices.</span></span> <span class="essay-sentence" data-cn="一方面，显而易见的是学生们确实掌握了大量知识并积极参与了实操训练。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">On one hand, it is evident that </span><span class="tpl-slot" title="高分题眼填充/核心亮点">students acquire substantial knowledge and actively participate in practical exercises.</span></span> <span class="essay-sentence" data-cn="但另一方面，令人遗憾的是许多人倾向于各自单打独斗完成任务，往往带着消极被动的心态结课。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">On the other hand, it is unfortunate that </span><span class="tpl-slot" title="高分题眼填充/核心亮点">many tend to complete tasks individually, often leaving with a negative mindset.</span></span> <span class="essay-sentence" data-cn="这说明该课程未能充分培养团队合作精神，也未能让学生切身体会到劳动所带来的喜悦。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">This suggests that </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the class does not foster teamwork or allow students to experience the joy associated with labor.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="在我看来，很难将这门课定性为一门完全成功的课程。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">In my opinion, it is challenging to deem this class a successful one.</span></span> <span class="essay-sentence" data-cn="即使被认为有一定成效，它在同类课程中也并不突出。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Even if it is regarded as effective, it does not stand out from similar courses.</span></span> <span class="essay-sentence" data-cn="大学应当优先强化其核心育人使命——让学生真正沉浸于劳动精神之中，并深层次塑造团队协作技能。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The university should prioritize enhancing its core mission—</span><span class="tpl-slot" title="高分题眼填充/核心亮点">immersing students in the spirit of labor and cultivating teamwork skills.</span></span> </p>`,
      templateMapping: "【图表极值对比首段】The bar chart presents... The data reveals that the two most frequently cited advantages are... In contrast... + 【二段深层反思】falls short in... On one hand... On the other hand... + 【三段学校改进对策】The university should prioritize enhancing its core mission...",
      chineseTranslation: `该柱状图展示了一项关于某大学学生在劳动实践课中主要收获的调查。数据显示，被提及最多的两项益处是“获取相关知识”与“提升实践技能”，在回复中分别占到 84.5% 和 91.3%。相比之下，“趣味性/享受乐趣”仅占 54.5%。此外，“协作技能的提升”得到认可的比例不足三分之一。

这些数据表明，尽管该劳动实践课达成了基础教学目标，但在引导学生领会劳动实践的深层内涵方面仍有欠缺。一方面，显而易见的是学生们确实掌握了大量知识并积极参与了实操训练；但另一方面，令人遗憾的是许多人倾向于各自单打独斗完成任务，往往带着消极被动的心态结课。这说明该课程未能充分培养团队合作精神，也未能让学生切身体会到劳动所带来的喜悦。

在我看来，很难将这门课定性为一门完全成功的课程。即使被认为有一定成效，它在同类课程中也并不突出。大学应当优先强化其核心育人使命——让学生真正沉浸于劳动精神之中，并深层次塑造团队协作技能。`,
      chineseTranslation: `该柱状图展示了一项关于某大学学生在劳动实践课中主要收获的调查。数据显示，被提及最多的两项益处是“获取相关知识”与“提升实践技能”，在回复中分别占到 84.5% 和 91.3%。相比之下，“趣味性/享受乐趣”仅占 54.5%。此外，“协作技能的提升”得到认可的比例不足三分之一。

这些数据表明，尽管该劳动实践课达成了基础教学目标，但在引导学生领会劳动实践的深层内涵方面仍有欠缺。一方面，显而易见的是学生们确实掌握了大量知识并积极参与了实操训练；但另一方面，令人遗憾的是许多人倾向于各自单打独斗完成任务，往往带着消极被动的心态结课。这说明该课程未能充分培养团队合作精神，也未能让学生切身体会到劳动所带来的喜悦。

在我看来，很难将这门课定性为一门完全成功的课程。即使被认为有一定成效，它在同类课程中也并不突出。大学应当优先强化其核心育人使命——让学生真正沉浸于劳动精神之中，并深层次塑造团队协作技能。`,
      rubricFeedback: "【TA 任务完成】不仅描述了比例，而且指出'形式达标但欠缺团队合作与劳动精神'；【CC 连贯性】while... On one hand... On the other hand...；【LR 词汇】acquisition of knowledge, falls short in, immerse students in；【GRA 句式】破折号同位语解释，Even if 让步句。"
    },
    {
      id: "essay-2025-en2-b",
      type: "partB",
      exam: "en2",
      year: "2025",
      title: "2025年 英语二 Part B 图表大作文：社区老年人休闲活动调查 (扇贝实测14分)",
      scoreTag: "大纲一档 14分 (权威实测)",
      prompt: "Directions: Write an essay based on the bar chart on the primary leisure activities of the elderly (看电视90.8%，散步68.3%，园艺/读书/下棋均<35%).",
      content: `The bar chart illustrates the primary leisure activities of the elderly in a community. The participation rate highlights the prevalence of watching TV and walking, accounting for 90.8% and 68.3% respectively. While other activities, involving gardening, reading and playing chess, are overshadowed in comparison, none of which exceeds 35%. Succinct as it is, the chart conveys abundant enlightenments, and below are my perspectives.

For one thing, what first comes into view, without any doubt, is the remarkable diversity of leisure. Stemming from the immense progress in living conditions, the elderly enjoy increasing opportunities to cultivate their hobbies and entertain themselves. For another, there still remain potential concerns indicated in the chart. The disproportionate preference for hobbies requiring less cognitive effort serves as an implication that humanistic care for the elderly may fall behind. As a prescription, it is imperative for both the government and the community to prioritize spiritual care over material support.

Every little endeavor counts to enhance the quality of life for elderly citizens. As college students, we bear the responsibility to accompany our grandparents, and take more participation in volunteer work. With joint efforts, we will create an environment where seniors feel motivated and valued.`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="该柱状图展示了某社区老年人的主要闲暇活动。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The bar chart illustrates </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the primary leisure activities of the elderly in a community.</span></span> <span class="essay-sentence" data-cn="参与率凸显了“看电视”与“散步”的普遍性，分别高达 90.8% 和 68.3%。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The participation rate highlights the prevalence of </span><span class="tpl-slot" title="高分题眼填充/核心亮点">watching TV and walking, accounting for 90.8% and 68.3% respectively.</span></span> <span class="essay-sentence" data-cn="相比之下，园艺、阅读和下棋等其他活动则显得相形见绌，且无一比例超过 35%。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">While other activities, involving </span><span class="tpl-slot" title="高分题眼填充/核心亮点">gardening, reading and playing chess,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> are overshadowed in comparison, none of which exceeds </span><span class="tpl-slot" title="高分题眼填充/核心亮点">35%.</span></span> <span class="essay-sentence" data-cn="图表虽简练，却蕴含着丰富的启迪，以下是我的观点。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Succinct as it is, the chart conveys abundant enlightenments, and below are my perspectives.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="首先，毫无疑问，映入眼帘的第一点是休闲方式的显著多样化。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">For one thing, what first comes into view, without any doubt, is </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the remarkable diversity of leisure.</span></span> <span class="essay-sentence" data-cn="得益于生活条件的巨大改善，老年人拥有越来越多的机会来培养兴趣爱好、自娱自乐。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Stemming from </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the immense progress in living conditions, the elderly enjoy increasing opportunities to cultivate their hobbies and entertain themselves.</span></span> <span class="essay-sentence" data-cn="然而另一方面，图表中也折射出潜在的隐忧。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">For another, there still remain potential concerns indicated in the chart.</span></span> <span class="essay-sentence" data-cn="老年人过度偏好低认知精力的活动，这暗示着对老年群体的精神人文关怀可能尚显滞后。"><span class="tpl-slot" title="高分题眼填充/核心亮点">The disproportionate preference for hobbies requiring less cognitive effort</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> serves as an implication that </span><span class="tpl-slot" title="高分题眼填充/核心亮点">humanistic care for the elderly may fall behind.</span></span> <span class="essay-sentence" data-cn="作为应对良策，政府与社区必须将精神层面的关爱置于单纯物质支持之上。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">As a prescription, it is imperative for both the government and the community to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">prioritize spiritual care over material support.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="为老年公民提升生活品质，每一份微小的努力都不可或缺。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Every little endeavor counts to enhance the quality of life for </span><span class="tpl-slot" title="高分题眼填充/核心亮点">elderly citizens.</span></span> <span class="essay-sentence" data-cn="作为当代大学生，我们有责任多陪伴祖父母，并积极投身敬老志愿服务。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">As college students, we bear the responsibility to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">accompany our grandparents, and take more participation in volunteer work.</span></span> <span class="essay-sentence" data-cn="凝聚各方合力，我们定能营造一个让长辈倍感鼓舞且深感自身价值的温暖环境。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">With joint efforts, we will create an environment where </span><span class="tpl-slot" title="高分题眼填充/核心亮点">seniors feel motivated and valued.</span></span> </p>`,
      templateMapping: "【静态图表标准母版】The bar chart illustrates... Top 2（accounting for... respectively）+ 长尾打包（none of which exceeds 35%）+ 让步过渡（Succinct as it is...）+ 【二段双维度论证】For one thing... Stemming from... For another... disproportionate preference... + 【三段官方措施+青年行动】Every little endeavor counts... With joint efforts...",
      chineseTranslation: `该柱状图展示了某社区老年人的主要闲暇活动。参与率凸显了“看电视”与“散步”的普遍性，分别高达 90.8% 和 68.3%。相比之下，园艺、阅读和下棋等其他活动则显得相形见绌，且无一比例超过 35%。图表虽简练，却蕴含着丰富的启迪，以下是我的观点。

首先，毫无疑问，映入眼帘的第一点是休闲方式的显著多样化。得益于生活条件的巨大改善，老年人拥有越来越多的机会来培养兴趣爱好、自娱自乐。然而另一方面，图表中也折射出潜在的隐忧。老年人过度偏好低认知精力的活动，这暗示着对老年群体的精神人文关怀可能尚显滞后。作为应对良策，政府与社区必须将精神层面的关爱置于单纯物质支持之上。

为老年公民提升生活品质，每一份微小的努力都不可或缺。作为当代大学生，我们有责任多陪伴祖父母，并积极投身敬老志愿服务。凝聚各方合力，我们定能营造一个让长辈倍感鼓舞且深感自身价值的温暖环境。`,
      chineseTranslation: `该柱状图展示了某社区老年人的主要闲暇活动。参与率凸显了“看电视”与“散步”的普遍性，分别高达 90.8% 和 68.3%。相比之下，园艺、阅读和下棋等其他活动则显得相形见绌，且无一比例超过 35%。图表虽简练，却蕴含着丰富的启迪，以下是我的观点。

首先，毫无疑问，映入眼帘的第一点是休闲方式的显著多样化。得益于生活条件的巨大改善，老年人拥有越来越多的机会来培养兴趣爱好、自娱自乐。然而另一方面，图表中也折射出潜在的隐忧。老年人过度偏好低认知精力的活动，这暗示着对老年群体的精神人文关怀可能尚显滞后。作为应对良策，政府与社区必须将精神层面的关爱置于单纯物质支持之上。

为老年公民提升生活品质，每一份微小的努力都不可或缺。作为当代大学生，我们有责任多陪伴祖父母，并积极投身敬老志愿服务。凝聚各方合力，我们定能营造一个让长辈倍感鼓舞且深感自身价值的温暖环境。`,
      rubricFeedback: "【TA 任务完成】准确归纳两项低认知精力活动；【CC 连贯性】Succinct as it is 让步过渡极佳；【LR 词汇】overshadowed in comparison, disproportionate preference, humanistic care；【GRA 句式】非限制定从 none of which exceeds, 分词短语 Stemming from 前置。"
    },
    {
      id: "essay-2022-en1-a",
      type: "partA",
      exam: "en1",
      year: "2022",
      title: "2022年 英语一 Part A 应用文：邀请英国高校教授组队参加国际创新大赛 (扇贝实测9分)",
      scoreTag: "大纲一档 9分 (权威实测)",
      prompt: "Directions: Write an email to a professor at a British university, inviting him/her to organize a team for the international innovation contest to be held at your university. (约100词，署名Li Ming)",
      content: `Dear professor,

words fail to express my excitement to inform you about our approaching innovation contest. It is our honor to invite you to participate in the contest with your team. Below are the details.

The contest, revolving around the theme of inspiring students' creativity, will be held at my university next month. Serving as a high-level platform to encourage campus innovation, it has attracted extraordinary teams from all over the world to sign up. And through engaging in this game, not only do competitors reap a chance to be immersed in the atmosphere of collaboration and competition, but they will also enhance their practical skills in addressing real-world issues. So, given your extensive experience in contests of this kind, it occurs to us first to offer you an invitation.

On behalf of the contest committee, we sincerely anticipate your attendance with your talented team. Looking forward to receiving your early reply.

Yours sincerely,
Li Ming.`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="尊敬的教授："><span class="tpl-skel" title="母版固定骨架/逻辑框架">Dear professor,</span></span> <span class="essay-sentence" data-cn="欣闻我校即将举办创新大赛，我怀着无比激动的心情向您致信。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">words fail to express my </span><span class="tpl-slot" title="高分题眼填充/核心亮点">excitement</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> to inform you about </span><span class="tpl-slot" title="高分题眼填充/核心亮点">our approaching innovation contest.</span></span> <span class="essay-sentence" data-cn="我们万分荣幸地邀请您与您的团队参赛。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">It is our honor to invite you to participate in </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the contest with your team.</span></span> <span class="essay-sentence" data-cn="具体细节如下："><span class="tpl-skel" title="母版固定骨架/逻辑框架">Below are the details.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="本次大赛围绕“激发学生创造力”为主题，将于下个月在我校举行。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The contest, revolving around the theme of </span><span class="tpl-slot" title="高分题眼填充/核心亮点">inspiring students' creativity,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> will be held at </span><span class="tpl-slot" title="高分题眼填充/核心亮点">my university next month.</span></span> <span class="essay-sentence" data-cn="作为鼓励校园创新的高水平竞技平台，它已吸引了来自全球各地的优秀队伍报名。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Serving as a high-level platform to encourage campus innovation, it has attracted extraordinary teams from all over the world to sign up.</span></span> <span class="essay-sentence" data-cn="通过参与此次竞赛，参赛者不仅有机会沉浸在协作与竞争交融的学术氛围中，更能大幅提高解决现实复杂问题的实践能力。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">And through engaging in this game, not only do competitors reap a chance to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">be immersed in the atmosphere of collaboration and competition,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> but they will also </span><span class="tpl-slot" title="高分题眼填充/核心亮点">enhance their practical skills in addressing real-world issues.</span></span> <span class="essay-sentence" data-cn="鉴于您在同类赛事中拥有极其丰富的指导经验，我们首先想到的便是向您发出诚挚邀请。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">So, given your extensive experience in contests of this kind, it occurs to us first to offer you an invitation.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="我谨代表大赛组委会，衷心期盼您与您的精英团队莅临参赛。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">On behalf of the contest committee, we sincerely anticipate </span><span class="tpl-slot" title="高分题眼填充/核心亮点">your attendance with your talented team.</span></span> <span class="essay-sentence" data-cn="期盼能早日收到您的回复。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Looking forward to receiving your early reply.</span></span> <span class="essay-sentence" data-cn="您真诚的，李明。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Yours sincerely,<br>Li Ming.</span></span> </p>`,
      templateMapping: "【母版一：事件类万能书信】Dear professor + words fail to express my excitement to inform you about... It is our honor to invite you to... + 【小说六要素中段】主题 (revolving around) + 地点时间 + 收益 (not only do competitors... but also...) + 资质夸夸 (given your extensive experience...) + 【尾段邀请双句】On behalf of the contest committee, we sincerely anticipate... Looking forward to...",
      chineseTranslation: `尊敬的教授：

欣闻我校即将举办创新大赛，我怀着无比激动的心情向您致信。我们万分荣幸地邀请您与您的团队参赛。具体细节如下：

本次大赛围绕“激发学生创造力”为主题，将于下个月在我校举行。作为鼓励校园创新的高水平竞技平台，它已吸引了来自全球各地的优秀队伍报名。通过参与此次竞赛，参赛者不仅有机会沉浸在协作与竞争交融的学术氛围中，更能大幅提高解决现实复杂问题的实践能力。鉴于您在同类赛事中拥有极其丰富的指导经验，我们首先想到的便是向您发出诚挚邀请。

我谨代表大赛组委会，衷心期盼您与您的精英团队莅临参赛。期盼能早日收到您的回复。

您真诚的，
李明。`,
      chineseTranslation: `尊敬的教授：

欣闻我校即将举办创新大赛，我怀着无比激动的心情向您致信。我们万分荣幸地邀请您与您的团队参赛。具体细节如下：

本次大赛围绕“激发学生创造力”为主题，将于下个月在我校举行。作为鼓励校园创新的高水平竞技平台，它已吸引了来自全球各地的优秀队伍报名。通过参与此次竞赛，参赛者不仅有机会沉浸在协作与竞争交融的学术氛围中，更能大幅提高解决现实复杂问题的实践能力。鉴于您在同类赛事中拥有极其丰富的指导经验，我们首先想到的便是向您发出诚挚邀请。

我谨代表大赛组委会，衷心期盼您与您的精英团队莅临参赛。期盼能早日收到您的回复。

您真诚的，
李明。`,
      rubricFeedback: "【TA 任务完成】包含所有规定要点（参赛邀请、组队要求、赛事细节）；【CC 连贯性】从赛事背景到邀请原因过渡自然流畅；【LR 词汇】revolving around, immersed in collaboration, extensive experience；【GRA 句式】not only do 倒装句使用极度娴熟。"
    },
    {
      id: "essay-2025-en2-a",
      type: "partA",
      exam: "en2",
      year: "2025",
      title: "2025年 英语二 Part A 应用文：策划传统短剧并邀请好友加入",
      scoreTag: "大纲一档 9分",
      prompt: "Directions: Write an email to your friend John, telling him about a short play based on Journey to the West and inviting him to join as an actor. (约100词，署名Li Ming)",
      content: `Dear John,

Words fail to express my excitement when I decide to tell you about a short play we are planning.

Based on the classic Chinese novel Journey to the West, it tells the exciting story of the Monkey King and his companions on their journey to obtain Buddhist scriptures. The play is not only entertaining but also helps people appreciate traditional Chinese culture.

Given your strong interest in acting and Chinese culture, it occurs to me first to ask if you are willing to join us. We would be more than delighted if you could play one of the main roles. And I believe your talent will make the performance even more successful.

Looking forward to receiving your reply at your earliest convenience.

Yours,
Li Ming`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="亲爱的约翰："><span class="tpl-skel" title="母版固定骨架/逻辑框架">Dear John,</span></span> <span class="essay-sentence" data-cn="一想到要告诉你我们正在策划的一部短剧，我便按捺不住内心的兴奋。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Words fail to express my </span><span class="tpl-slot" title="高分题眼填充/核心亮点">excitement</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> when I decide to tell you about </span><span class="tpl-slot" title="高分题眼填充/核心亮点">a short play we are planning.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="该短剧改编自中国古典名著《西游记》，讲述了美猴王及其同伴西天取经的精彩故事。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Based on </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the classic Chinese novel Journey to the West, it tells the exciting story of the Monkey King and his companions on their journey to obtain Buddhist scriptures.</span></span> <span class="essay-sentence" data-cn="这部短剧不仅极具趣味性与观赏性，更有助于人们领略中国传统文化的深厚魅力。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The play is not only </span><span class="tpl-slot" title="高分题眼填充/核心亮点">entertaining</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> but also helps people </span><span class="tpl-slot" title="高分题眼填充/核心亮点">appreciate traditional Chinese culture.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="鉴于你对戏剧表演和中国文化一直怀有浓厚兴趣，我首先便想询问你是否愿意加入我们。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Given your strong interest in </span><span class="tpl-slot" title="高分题眼填充/核心亮点">acting and Chinese culture,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> it occurs to me first to ask if you are willing to join us.</span></span> <span class="essay-sentence" data-cn="如果你能出演其中一个主要角色，我们将无比欣喜。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">We would be more than delighted if you could </span><span class="tpl-slot" title="高分题眼填充/核心亮点">play one of the main roles.</span></span> <span class="essay-sentence" data-cn="我相信你的才华定能让本次演出更加出彩。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">And I believe your talent will make the performance even more successful.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="期待能在你方便时尽早收到你的回复。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Looking forward to receiving your reply at your earliest convenience.</span></span> <span class="essay-sentence" data-cn="你的朋友，李明"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Yours,<br>Li Ming</span></span> </p>`,
      templateMapping: "【母版一：事件类书信】Dear John + Words fail to express my excitement... + 【六要素中段】起因背景（Based on...）+ 收益价值（not only entertaining but also...）+ 资质邀请（Given your strong interest... it occurs to me first to...）+ 【尾段期待】Looking forward to receiving your reply...",
      chineseTranslation: `亲爱的约翰：

一想到要告诉你我们正在策划的一部短剧，我便按捺不住内心的兴奋。

该短剧改编自中国古典名著《西游记》，讲述了美猴王及其同伴西天取经的精彩故事。这部短剧不仅极具趣味性与观赏性，更有助于人们领略中国传统文化的深厚魅力。

鉴于你对戏剧表演和中国文化一直怀有浓厚兴趣，我首先便想询问你是否愿意加入我们。如果你能出演其中一个主要角色，我们将无比欣喜。我相信你的才华定能让本次演出更加出彩。

期待能在你方便时尽早收到你的回复。

你的朋友，
李明`,
      chineseTranslation: `亲爱的约翰：

一想到要告诉你我们正在策划的一部短剧，我便按捺不住内心的兴奋。

该短剧改编自中国古典名著《西游记》，讲述了美猴王及其同伴西天取经的精彩故事。这部短剧不仅极具趣味性与观赏性，更有助于人们领略中国传统文化的深厚魅力。

鉴于你对戏剧表演和中国文化一直怀有浓厚兴趣，我首先便想询问你是否愿意加入我们。如果你能出演其中一个主要角色，我们将无比欣喜。我相信你的才华定能让本次演出更加出彩。

期待能在你方便时尽早收到你的回复。

你的朋友，
李明`,
      rubricFeedback: "【TA 任务完成】要点紧扣短剧背景与角色邀请；【CC 连贯性】行文亲切得体，符合朋友间日常通信风格；【LR 词汇】Buddhist scriptures, appreciate traditional culture；【GRA 句式】Given 分词前置，虚拟条件句 if you could play。"
    },
    {
      id: "essay-2025-en1-a",
      type: "partA",
      exam: "en1",
      year: "2025",
      title: "2025年 英语一 Part A 应用文：回复外国友人 Paul 询问手工艺展示并请求协助",
      scoreTag: "大纲一档 9分",
      prompt: "Directions: Read the email from Paul inquiring about the upcoming craft demonstration and reply, describing the activities and asking for his help with seat arrangements.",
      content: `Dear Paul,

Words failed to express my delight when I received your email. I am so glad that you are interested in the coming craft-making demonstration. Below are the details.

The young craftsmen will show several innovative works, including paper-cutting combined with modern design, handmade bamboo lamps, and small clay figures inspired by campus life. Serving as a bridge between tradition and creativity, the event will help students appreciate Chinese craftsmanship in a fresh way. As for the preparation work, given that there will be many foreign students participating in this event, could you please help us arrange the seats and guide foreign students to the venue?

Your assistance will surely make the activity smoother. Looking forward to seeing you on campus.

Yours sincerely,
Li Ming`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="亲爱的保罗："><span class="tpl-skel" title="母版固定骨架/逻辑框架">Dear Paul,</span></span> <span class="essay-sentence" data-cn="收到你的来信，我由衷感到欣喜。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Words failed to express my </span><span class="tpl-slot" title="高分题眼填充/核心亮点">delight</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> when I received your email.</span></span> <span class="essay-sentence" data-cn="得知你对即将举办的手工艺制作展示活动感兴趣，我感到非常高兴。活动细节如下："><span class="tpl-skel" title="母版固定骨架/逻辑框架">I am so glad that you are interested in </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the coming craft-making demonstration.</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> Below are the details.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="青年手工艺人们将展示多项创新作品，包括融合了现代设计的剪纸艺术、手工竹编灯具以及灵感源自校园生活的黏土泥塑小雕像。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">The young craftsmen will show several innovative works, including </span><span class="tpl-slot" title="高分题眼填充/核心亮点">paper-cutting combined with modern design, handmade bamboo lamps, and small clay figures inspired by campus life.</span></span> <span class="essay-sentence" data-cn="作为连接传统民俗与现代创意的桥梁，该活动将帮助学生们以崭新的视角领略中国传统匠人精神。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Serving as a bridge between tradition and creativity, the event will help students </span><span class="tpl-slot" title="高分题眼填充/核心亮点">appreciate Chinese craftsmanship in a fresh way.</span></span> <span class="essay-sentence" data-cn="关于筹备工作，鉴于届时将有许多留学生到场参与，你能否协助我们布置座位并引导留学生前往活动场地？"><span class="tpl-skel" title="母版固定骨架/逻辑框架">As for the preparation work, given that there will be many foreign students participating in this event, could you please help us </span><span class="tpl-slot" title="高分题眼填充/核心亮点">arrange the seats and guide foreign students to the venue?</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="你的鼎力相助定能让整个活动运行得更为顺畅。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Your assistance will surely make the activity smoother.</span></span> <span class="essay-sentence" data-cn="期待在校园里与你相见。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Looking forward to seeing you on campus.</span></span> <span class="essay-sentence" data-cn="您真诚的，李明"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Yours sincerely,<br>Li Ming</span></span> </p>`,
      templateMapping: "【母版一：事件回复类】Dear Paul + Words failed to express my delight... + 【中段具体安排与求助】展示项目（including paper-cutting...）+ 意义（Serving as a bridge...）+ 求助抓词（As for the preparation work, could you please help us...）+ 【尾段致谢致敬】Your assistance will surely make... Looking forward to...",
      chineseTranslation: `亲爱的保罗：

收到你的来信，我由衷感到欣喜。得知你对即将举办的手工艺制作展示活动感兴趣，我感到非常高兴。活动细节如下：

青年手工艺人们将展示多项创新作品，包括融合了现代设计的剪纸艺术、手工竹编灯具以及灵感源自校园生活的黏土泥塑小雕像。作为连接传统民俗与现代创意的桥梁，该活动将帮助学生们以崭新的视角领略中国传统匠人精神。关于筹备工作，鉴于届时将有许多留学生到场参与，你能否协助我们布置座位并引导留学生前往活动场地？

你的鼎力相助定能让整个活动运行得更为顺畅。期待在校园里与你相见。

您真诚的，
李明`,
      chineseTranslation: `亲爱的保罗：

收到你的来信，我由衷感到欣喜。得知你对即将举办的手工艺制作展示活动感兴趣，我感到非常高兴。活动细节如下：

青年手工艺人们将展示多项创新作品，包括融合了现代设计的剪纸艺术、手工竹编灯具以及灵感源自校园生活的黏土泥塑小雕像。作为连接传统民俗与现代创意的桥梁，该活动将帮助学生们以崭新的视角领略中国传统匠人精神。关于筹备工作，鉴于届时将有许多留学生到场参与，你能否协助我们布置座位并引导留学生前往活动场地？

你的鼎力相助定能让整个活动运行得更为顺畅。期待在校园里与你相见。

您真诚的，
李明`,
      rubricFeedback: "【TA 任务完成】既回应了手工艺活动详情，又交代了布置座位和引导留学生的求助要点；【CC 连贯性】衔接自如，情真意切；【LR 词汇】craftsmanship in a fresh way, guide foreign students to the venue；【GRA 句式】including 介词短语，Serving as 分词短语作状语。"
    },
    {
      id: "essay-2022-en2-a",
      type: "partA",
      exam: "en2",
      year: "2022",
      title: "2022年 英语二 Part A 应用文：选择推荐信 (展览选择与理由阐述)",
      scoreTag: "大纲一档 9分",
      prompt: "Directions: Given the choice between an art exhibition and a robot show, write an email to David recommending one and stating your reasons.",
      content: `Dear David,

Given the choice between the art exhibition and the robot show, I would recommend the latter. Since you have always been fascinated by technological innovation, the robot show is more likely to match your interests and offer you a genuinely engaging experience.

More importantly, the event will probably feature intelligent machines, interactive demonstrations, and recent advances in robotics. Rather than merely observing exhibits from a distance, you may have the opportunity to operate some devices and communicate with specialists. Such first-hand exposure can not only broaden your knowledge but also inspire fresh ideas for your future studies.

I hope you will enjoy the show and find the visit worthwhile.

Yours sincerely,
Li Ming`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="亲爱的大卫："><span class="tpl-skel" title="母版固定骨架/逻辑框架">Dear David,</span></span> <span class="essay-sentence" data-cn="若要在艺术展和机器人展之间作出抉择，我更推荐后者。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Given the choice between </span><span class="tpl-slot" title="高分题眼填充/核心亮点">the art exhibition and the robot show,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> I would recommend the latter.</span></span> <span class="essay-sentence" data-cn="鉴于你一直对前沿技术创新深感兴趣，机器人展显然更契合你的志趣，并能为你提供一次真正引人入胜的参访体验。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Since you have always been fascinated by </span><span class="tpl-slot" title="高分题眼填充/核心亮点">technological innovation,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> the robot show is more likely to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">match your interests and offer you a genuinely engaging experience.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="更重要的是，该展会很可能会展出前沿智能机器、互动演示以及机器人学领域的最新研究突破。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">More importantly, the event will probably feature </span><span class="tpl-slot" title="高分题眼填充/核心亮点">intelligent machines, interactive demonstrations, and recent advances in robotics.</span></span> <span class="essay-sentence" data-cn="你将不再只是远远地隔空观望展品，而是有机会亲手操作部分智能设备并与行业专家深入交流。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Rather than merely observing exhibits from a distance, you may have the opportunity to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">operate some devices and communicate with specialists.</span></span> <span class="essay-sentence" data-cn="这种第一手的切身体验不仅能拓宽你的知识面，还能为你的未来学业启发崭新灵感。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Such first-hand exposure can not only </span><span class="tpl-slot" title="高分题眼填充/核心亮点">broaden your knowledge</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> but also </span><span class="tpl-slot" title="高分题眼填充/核心亮点">inspire fresh ideas for your future studies.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="希望你会喜欢这次展览，并感到不虚此行。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">I hope you will enjoy the show and find the visit worthwhile.</span></span> <span class="essay-sentence" data-cn="您真诚的，李明"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Yours sincerely,<br>Li Ming</span></span> </p>`,
      templateMapping: "【母版二：非事件类建议信】Given the choice between... I would recommend the latter + 【理由阐述二段】Since you have always been fascinated... More importantly... Rather than merely observing... + 【收益升华】Such first-hand exposure can not only... but also... + 【结尾寄语】I hope you will enjoy...",
      chineseTranslation: `亲爱的大卫：

若要在艺术展和机器人展之间作出抉择，我更推荐后者。鉴于你一直对前沿技术创新深感兴趣，机器人展显然更契合你的志趣，并能为你提供一次真正引人入胜的参访体验。

更重要的是，该展会很可能会展出前沿智能机器、互动演示以及机器人学领域的最新研究突破。你将不再只是远远地隔空观望展品，而是有机会亲手操作部分智能设备并与行业专家深入交流。这种第一手的切身体验不仅能拓宽你的知识面，还能为你的未来学业启发崭新灵感。

希望你会喜欢这次展览，并感到不虚此行。

您真诚的，
李明`,
      chineseTranslation: `亲爱的大卫：

若要在艺术展和机器人展之间作出抉择，我更推荐后者。鉴于你一直对前沿技术创新深感兴趣，机器人展显然更契合你的志趣，并能为你提供一次真正引人入胜的参访体验。

更重要的是，该展会很可能会展出前沿智能机器、互动演示以及机器人学领域的最新研究突破。你将不再只是远远地隔空观望展品，而是有机会亲手操作部分智能设备并与行业专家深入交流。这种第一手的切身体验不仅能拓宽你的知识面，还能为你的未来学业启发崭新灵感。

希望你会喜欢这次展览，并感到不虚此行。

您真诚的，
李明`,
      rubricFeedback: "【TA 任务完成】非事件类典型满分卷，不写空洞流程，专注说服理由；【CC 连贯性】More importantly, Rather than 形成强对比；【LR 词汇】technological innovation, interactive demonstrations, first-hand exposure；【GRA 句式】Rather than doing 结构，not only... but also... 复合句。"
    },
    {
      id: "essay-2005-en1-resign-a",
      type: "partA",
      exam: "en1",
      year: "2005",
      title: "2005年 英语一 Part A 应用文：辞职信并说明理由与致歉 (经典经典非事件书信)",
      scoreTag: "大纲一档 10分 (官方满分示范)",
      prompt: "Directions: Two months ago you got a job as an editor for Design & Fashions. Decide to quit. Write a letter to Mr. Wang stating reasons and making an apology. (不少于100词)",
      content: `Dear Mr. Wang,

I am writing to inform you of my decision to resign from my position as an editor for Designs & Fashions. I am sincerely grateful for the opportunity you have offered me during the past two months and for your patient guidance.

However, after careful consideration, I find that the job is not quite consistent with my academic background or long-term career plan. My real interest lies in computer technology, while the present work requires much more knowledge of fashion than I expected. Therefore, I believe leaving the position now is a responsible choice.

Please accept my sincere apology for any inconvenience caused by my resignation. I will do my best to finish the handover work before I leave.

Yours sincerely,
Li Ming`,
      highlightedHTML: `<p class="essay-para"><span class="essay-sentence" data-cn="尊敬的王总："><span class="tpl-skel" title="母版固定骨架/逻辑框架">Dear Mr. Wang,</span></span> <span class="essay-sentence" data-cn="我致信告知您，我已决定辞去在《设计与时尚》杂志社担任的编辑一职。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">I am writing to inform you of my decision to resign from my position as </span><span class="tpl-slot" title="高分题眼填充/核心亮点">an editor for Designs & Fashions.</span></span> <span class="essay-sentence" data-cn="我由衷感谢您在过去两个月里为我提供的宝贵工作机会以及对我的耐心指导。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">I am sincerely grateful for the opportunity you have offered me during the past two months and for your patient guidance.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="然而，经过深思熟虑，我发现该岗位与我的专业学术背景及长远职业发展规划并不完全契合。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">However, after careful consideration, I find that the job is not quite consistent with </span><span class="tpl-slot" title="高分题眼填充/核心亮点">my academic background or long-term career plan.</span></span> <span class="essay-sentence" data-cn="我真正的志趣在于计算机科技领域，而目前的工作对时尚行业知识的要求远超我的预期。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">My real interest lies in </span><span class="tpl-slot" title="高分题眼填充/核心亮点">computer technology,</span><span class="tpl-skel" title="母版固定骨架/逻辑框架"> while the present work requires </span><span class="tpl-slot" title="高分题眼填充/核心亮点">much more knowledge of fashion than I expected.</span></span> <span class="essay-sentence" data-cn="因此，我认为此时提出离职是一个对自己和对杂志社都更为负责的抉择。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Therefore, I believe leaving the position now is a responsible choice.</span></span> </p><p class="essay-para"><span class="essay-sentence" data-cn="对于因我的辞职而给您和单位带来的任何不便，请接受我最诚挚的歉意。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Please accept my sincere apology for any inconvenience caused by my resignation.</span></span> <span class="essay-sentence" data-cn="离职之前，我定会全力以赴做好各项交接工作。"><span class="tpl-skel" title="母版固定骨架/逻辑框架">I will do my best to </span><span class="tpl-slot" title="高分题眼填充/核心亮点">finish the handover work before I leave.</span></span> <span class="essay-sentence" data-cn="您真诚的，李明"><span class="tpl-skel" title="母版固定骨架/逻辑框架">Yours sincerely,<br>Li Ming</span></span> </p>`,
      templateMapping: "【母版二：非事件类辞职/致歉】Dear Mr. Wang + I am writing to inform you of my decision to resign... I am sincerely grateful for... + 【中段客观理由】However, after careful consideration, I find that... is not quite consistent with... My real interest lies in... while... Therefore, I believe... + 【尾段致歉与交接保证】Please accept my sincere apology... I will do my best to finish the handover work...",
      chineseTranslation: `尊敬的王总：

我致信告知您，我已决定辞去在《设计与时尚》杂志社担任的编辑一职。我由衷感谢您在过去两个月里为我提供的宝贵工作机会以及对我的耐心指导。

然而，经过深思熟虑，我发现该岗位与我的专业学术背景及长远职业发展规划并不完全契合。我真正的志趣在于计算机科技领域，而目前的工作对时尚行业知识的要求远超我的预期。因此，我认为此时提出离职是一个对自己和对杂志社都更为负责的抉择。

对于因我的辞职而给您和单位带来的任何不便，请接受我最诚挚的歉意。离职之前，我定会全力以赴做好各项交接工作。

您真诚的，
李明`,
      chineseTranslation: `尊敬的王总：

我致信告知您，我已决定辞去在《设计与时尚》杂志社担任的编辑一职。我由衷感谢您在过去两个月里为我提供的宝贵工作机会以及对我的耐心指导。

然而，经过深思熟虑，我发现该岗位与我的专业学术背景及长远职业发展规划并不完全契合。我真正的志趣在于计算机科技领域，而目前的工作对时尚行业知识的要求远超我的预期。因此，我认为此时提出离职是一个对自己和对杂志社都更为负责的抉择。

对于因我的辞职而给您和单位带来的任何不便，请接受我最诚挚的歉意。离职之前，我定会全力以赴做好各项交接工作。

您真诚的，
李明`,
      rubricFeedback: "【TA 任务完成】辞职、理由、致歉三要素毫无遗漏，分寸感极强；【CC 连贯性】However, Therefore 逻辑清晰；【LR 词汇】consistent with academic background, finish the handover work；【GRA 句式】现在完成时、比较级、过去分词 caused by 伴随修饰。"
    }
  ];



  // Application State
  const state = {
    activeTab: 'partA',
    activeSlotChoices: {
      partA: {},
      partB: {}
    },
    showcaseFilter: 'all',
    showcaseHighlightMode: true,
    showcaseShowTranslation: false,
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
        showToast(state.theme === 'dark' ? '已开启深色夜间模式 🌙' : '已恢复浅色清新模式 ☀️');
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
    } else if (tab === 'examTips') {
      el.main.innerHTML = renderExamTipsHTML();
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
        💡 <strong>英语作文 · Part A 极简破局法则：</strong>考研小作文 90% 为【事件类】（活动/竞赛/展览/招募/答复），10% 为【非事件类】（建议/投诉/道歉/辞职）。<strong>首尾固定，中段用“小说六要素”或“痛点＋对策”按题干抓词拼装</strong>，实测 100–110 词，稳拿 9 分！下方高亮黄底词槽均<strong>支持点击秒选候选词或自由手填题干词</strong>。
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
        💡 <strong>英语作文 · Part B 极简破局法则：</strong>大作文无论是英一图画还是英二图表，阅卷统一遵循<strong>“三段 10 句制”（170–190 词）</strong>。首段 3–4 句快速描述（40词），二段 4 句深度论证（85词），三段 3 句建议展望（45词）。<strong>三大论证轨道通吃所有命题，搭配“无灵主语”直击阅卷高分点！</strong>
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
        💡 <strong>英语作文 · 图表写作核心破局原则：</strong>考场图表写作最忌讳“流水账报菜名”！阅卷考官看重的是<strong>“极值提炼、趋势聚类与深层启迪”</strong>。运用动态图【五元万能公式】与静态图【聚类对比冲突法】，15 分钟内极速输出流畅地道的考场高分段！
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
        💡 <strong>英语作文 · 连贯性与学术语域提分库：</strong>大纲评分第一档明确要求“文字连贯、句式有变化、词汇使用准确且得体”。下方收录<strong> 8 大考场黄金逻辑关系连接词</strong>、<strong> 34 个必考学术强动词</strong>以及<strong> PDF 第 34–35 页精研的“利弊与影响”高级表达</strong>。点击任意胶囊或卡片即可<strong>秒复制到剪贴板</strong>！
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
  // TAB 5: Full Exam Essay Showcase & Master Template Analysis (PDF p. 61-74)
  // -------------------------------------------------------------
  function renderExamTipsHTML() {
    const currentFilter = state.showcaseFilter || 'all';
    const filteredList = EXAM_SHOWCASE_DATA.filter(item => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'en1') return item.exam === 'en1';
      if (currentFilter === 'en2') return item.exam === 'en2';
      if (currentFilter === 'partA') return item.type === 'partA';
      if (currentFilter === 'partB') return item.type === 'partB';
      return true;
    });

    return `
      <div class="principle-banner">
        📖 <strong>全真真题范文与母版精解仓：</strong>精选历年考研英语<strong>一/二大作文与小作文经典真题范文</strong>（涵盖 2026 最新真题、2025、2024、2022 及官方满分卷）。每篇均严格标清<strong>试卷类型、考题年份、文体分类、题目要求、母版架构映射与大纲评分维度点评</strong>，直观呈现如何将前述母版与词槽无缝落实到真题考场！
      </div>

      <!-- Control Row: Filter + Highlight Mode Toggle + Legend -->
      <div class="showcase-control-row">
        <div class="showcase-filter-bar">
          <span style="font-weight:750; font-size:12.5px; color:var(--ink);">🔍 快捷筛选：</span>
          <button type="button" class="filter-btn ${currentFilter === 'all' ? 'is-active' : ''}" data-filter="all">全部真题 (${EXAM_SHOWCASE_DATA.length})</button>
          <button type="button" class="filter-btn ${currentFilter === 'en1' ? 'is-active' : ''}" data-filter="en1">英语一</button>
          <button type="button" class="filter-btn ${currentFilter === 'en2' ? 'is-active' : ''}" data-filter="en2">英语二</button>
          <button type="button" class="filter-btn ${currentFilter === 'partA' ? 'is-active' : ''}" data-filter="partA">Part A 小作文</button>
          <button type="button" class="filter-btn ${currentFilter === 'partB' ? 'is-active' : ''}" data-filter="partB">Part B 大作文</button>
        </div>
        <div class="showcase-legend-bar">
          <div class="legend-item" title="橙底带下划线为固定母版骨架句及逻辑承接框架">
            <span class="legend-sample legend-sample-skel">母版固定骨架 (框架衔接)</span>
          </div>
          <div class="legend-item" title="金黄高亮为针对具体真题的高分题眼填充与学术词槽">
            <span class="legend-sample legend-sample-slot">高分题眼填充 (亮点词槽)</span>
          </div>
          <button type="button" class="highlight-toggle-btn ${state.showcaseHighlightMode ? 'is-active' : ''}" id="toggle-highlight-mode">
            ${state.showcaseHighlightMode ? '🎨 高亮拆解模式 (开启中)' : '📄 纯净排版模式'}
          </button>
          <button type="button" class="highlight-toggle-btn ${state.showcaseShowTranslation ? 'is-active' : ''}" id="toggle-translation-mode">
            🇨🇳 ${state.showcaseShowTranslation ? '收起全部中文对照' : '对照中文释义'}
          </button>
        </div>
      </div>

      <!-- Essays List -->
      <div class="showcase-list">
        ${filteredList.map(essay => {
          const wordCount = countWords(essay.content);
          return `
            <div class="essay-showcase-card">
              <div class="essay-showcase-header">
                <div>
                  <div style="font-weight:800; font-size:15px; color:var(--ink); margin-bottom:4px;">${escapeHTML(essay.title)}</div>
                  <div class="essay-meta-tags">
                    <span class="meta-tag ${essay.exam === 'en1' ? 'tag-en1' : 'tag-en2'}">${essay.exam === 'en1' ? '英语一' : '英语二'}</span>
                    <span class="meta-tag ${essay.type === 'partA' ? 'tag-partA' : 'tag-partB'}">${essay.type === 'partA' ? 'Part A 小作文' : 'Part B 大作文'}</span>
                    <span class="meta-tag tag-score">🏆 ${escapeHTML(essay.scoreTag)}</span>
                    <span class="word-chip-pill word-chip-gold">实测 ${wordCount} 词</span>
                  </div>
                </div>
                <button type="button" class="btn-pill copy-btn" data-text="${escapeHTML(essay.content)}">📋 复制整篇范文</button>
              </div>
              <div class="essay-showcase-body">
                <!-- Prompt -->
                <div class="essay-prompt-box">
                  <strong>📝 考题指令 (Prompt)：</strong>${escapeHTML(essay.prompt)}
                </div>

                <!-- Essay Content (Supports Click-to-Translate Sentence & Highlight Toggle) -->
                <div class="essay-content-box">
                  <div class="sentence-interactive-hint">
                    <span class="sentence-interactive-hint-text">💡 <strong>点句互译：</strong>点击正文中任意英文句子，即可就地查看该句中文翻译 (手机阅读免翻滚)</span>
                  </div>
                  <div class="essay-text-body ${state.showcaseHighlightMode ? '' : 'hide-highlights'}">
                    ${essay.highlightedHTML}
                  </div>
                </div>

                <!-- Bilingual Chinese Translation Collapsible Accordion -->
                ${essay.chineseTranslation ? `
                <details class="essay-cn-details" ${state.showcaseShowTranslation ? 'open' : ''}>
                  <summary class="essay-cn-summary">
                    <span style="display:flex; align-items:center; gap:6px;">
                      <span>🇨🇳</span>
                      <strong>中英文对照 · 全文参考译文</strong>
                    </span>
                    <span class="cn-toggle-hint">点击展开/收起译文 ▾</span>
                  </summary>
                  <div class="essay-cn-content">
                    ${escapeHTML(essay.chineseTranslation).replace(/\n\n/g, '<br><br>')}
                  </div>
                </details>
                ` : ''}

                <!-- Template Analysis & Breakdown -->
                <div class="essay-breakdown-box">
                  <div class="breakdown-row">
                    <span class="breakdown-label">🧩 母版与词槽装配精析：</span>
                    <span>${escapeHTML(essay.templateMapping)}</span>
                  </div>
                  <div class="breakdown-rubric">
                    <strong>⚖️ 大纲评分要求批注与考官指导：</strong><br>
                    ${escapeHTML(essay.rubricFeedback)}
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Section: 4-Tier Rubric Table from PDF p. 5-6 -->
      <div class="template-card" style="margin-top:20px;">
        <div class="template-card-header">
          <span class="template-card-title">🎯 官方大纲 4 大档次评分标准对照表 (PDF 第 5–6 页权威评分细则)</span>
        </div>
        <div class="template-card-body">
          <div style="overflow-x:auto; -webkit-overflow-scrolling:touch;">
            <table class="exam-rubric-table" style="min-width:680px;">
              <thead>
                <tr>
                  <th style="width:110px;">档次</th>
                  <th style="width:130px;">分值区间</th>
                  <th style="width:150px;">任务完成 (TA)</th>
                  <th style="width:150px;">连贯逻辑 (CC)</th>
                  <th style="width:160px;">词汇得体 (LR)</th>
                  <th>语法句式 (GRA)</th>
                </tr>
              </thead>
              <tbody>
                ${EXAM_RUBRIC_DATA.map(r => `
                  <tr>
                    <td><span class="rubric-tag ${r.tagClass}">${escapeHTML(r.tier)}</span></td>
                    <td><strong style="color:var(--ink);">${escapeHTML(r.rangeA)}</strong><br><small style="color:var(--muted);">${escapeHTML(r.rangeB)}</small></td>
                    <td>${escapeHTML(r.task)}</td>
                    <td>${escapeHTML(r.cc)}</td>
                    <td>${escapeHTML(r.lr)}</td>
                    <td>${escapeHTML(r.gra)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
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
            <span>${isMobile ? '请选择替换词槽：' : '⚡ 词槽装配：'}<strong>${escapeHTML(slotTitle)}</strong></span>
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
              showToast(`已装配自定义词槽 [${slotTitle}]`);
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
            showToast(`已装配 [${slotTitle}]`);
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
          showToast('已复制到剪贴板！');
        }).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast('已复制到剪贴板！');
        });
      });
    });

    // 3. Verb Card Copy & Chip Copy
    el.main.querySelectorAll('.copy-verb, .copy-chip').forEach(card => {
      card.addEventListener('click', () => {
        const text = card.dataset.text;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          showToast(`已复制 "${text.slice(0, 32)}..."`);
        }).catch(() => {
          showToast('复制成功！');
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
        showToast('已恢复官方推荐默认词槽！');
        renderContent();
      });
    });

    // 5. Showcase Filter Buttons (Tab 5)
    el.main.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.showcaseFilter = btn.dataset.filter || 'all';
        renderContent();
      });
    });

    // 6. Showcase Highlight Mode Toggle (Tab 5)
    const toggleHlBtn = el.main.querySelector('#toggle-highlight-mode');
    if (toggleHlBtn) {
      toggleHlBtn.addEventListener('click', () => {
        state.showcaseHighlightMode = !state.showcaseHighlightMode;
        renderContent();
        showToast(state.showcaseHighlightMode ? '已开启【母版骨架与高分词槽高亮对照】模式' : '已切换为【纯净阅读】排版模式');
      });
    }

    // 7. Showcase Translation Toggle (Tab 5)
    const toggleTransBtn = el.main.querySelector('#toggle-translation-mode');
    if (toggleTransBtn) {
      toggleTransBtn.addEventListener('click', () => {
        state.showcaseShowTranslation = !state.showcaseShowTranslation;
        renderContent();
        showToast(state.showcaseShowTranslation ? '已展开全部中英文对照参考译文' : '已收起中英文对照译文');
      });
    }

    // 8. Sentence-by-Sentence Interactive Click-to-Translate (Tab 5)
    el.main.querySelectorAll('.essay-sentence').forEach(sentEl => {
      sentEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const cn = sentEl.getAttribute('data-cn');
        if (!cn) return;

        const parentPara = sentEl.closest('.essay-para') || sentEl.parentNode;
        const existingCallout = parentPara.querySelector('.inline-trans-callout');
        const isCurrentActive = sentEl.classList.contains('is-sentence-active');

        // Deactivate other sentences in this card
        const card = sentEl.closest('.essay-showcase-card') || el.main;
        card.querySelectorAll('.essay-sentence').forEach(s => s.classList.remove('is-sentence-active'));
        card.querySelectorAll('.inline-trans-callout').forEach(c => c.remove());

        if (isCurrentActive && existingCallout) {
          // Toggle off if clicked the same sentence
          return;
        }

        // Activate this sentence
        sentEl.classList.add('is-sentence-active');

        // Create and insert inline translation callout right after this sentence
        const callout = document.createElement('div');
        callout.className = 'inline-trans-callout';
        callout.innerHTML = `
          <div class="trans-callout-inner">
            <div class="trans-callout-header">
              <span class="trans-callout-tag">🇨🇳 本句精准译文</span>
              <button type="button" class="trans-callout-close" title="收起译文" aria-label="关闭">✕</button>
            </div>
            <div class="trans-callout-text">${escapeHTML(cn)}</div>
          </div>
        `;

        sentEl.insertAdjacentElement('afterend', callout);

        callout.querySelector('.trans-callout-close').addEventListener('click', (evt) => {
          evt.stopPropagation();
          sentEl.classList.remove('is-sentence-active');
          callout.remove();
        });
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

