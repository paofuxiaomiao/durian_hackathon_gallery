// Tropical Editorial · 热带杂志刊物 设计语言
// 暖象牙白 + 墨绿 + 果肉金 + 刺红 / Noto Serif SC + Fraunces + IBM Plex Mono
// 此文件保存所有作品提交数据(来自飞书多维表格 FRH9bg2tBaTbRvs8PaQcmDaUn4g)。

export interface Project {
  id: string;
  issueNo: string; // NO.01 ~ NO.11
  teamName: string;
  projectTitle: string; // 网站展示用的项目名(从项目介绍中提炼)
  tagline: string; // 一句话副标题
  leader: string;
  members: string;
  affiliation: string;
  completionDate: string; // YYYY-MM-DD
  tools: string[];
  projectUrls: { label: string; href: string }[];
  description: string; // 项目介绍(完整)
  vibeCoding: string; // vibe coding 心得
  feeling: string; // 活动感受
  accent: "green" | "gold" | "red"; // 杂志主题色调
  category: string; // 标签:工具 / 游戏 / 营销 / 教育 / ...
  hue: number; // 0-360, 用于卡片色相微差(占位封面)
}

export const projects: Project[] = [
  {
    id: "durian-camera",
    issueNo: "NO.01",
    teamName: "中南大学队",
    projectTitle: "榴莲相机 合成猫山王",
    tagline: "一个队伍两个作品：本地 AI 选榴莲 + 合成猫山王小游戏",
    leader: "类桐",
    members: "类桐、扶瑤琪",
    affiliation: "中南大学计算机学院",
    completionDate: "2026-05-04",
    tools: ["Codex", "古法编程", "Claude Code"],
    projectUrls: [
      { label: "榴莲相机", href: "http://durian.innohub.ltd" },
      { label: "合成猫山王", href: "https://hcmsw.xyz" },
      { label: "GitHub 源码", href: "https://github.com/shuhari04/durian" },
    ],
    description:
      "中南大学队以一队双拽交了两个作品。『榴莲相机』是一个本地运行的 AI 选榴莲助手：用户上传榴莲照片后，系统会在 Mac 本机完成图像分析，不调用云端 API，用于判断榴莲的外观成熟度、整体品相与购买风险，帮助用户更快做出『推荐购买、可以购买、谨慎购买或不建议购买』的决策。当前版本复用了开源榴莲成熟度识别模型，并结合本地 OpenCV 图像分析规则生成品相评分，功能包括本地 AI 推理（FastAPI + PyTorch）、成熟度识别、品相评分（0-100 分）、购买建议、风险提示与标注结果图。\n另一个作品『合成猫山王』是一个轻量级的合成类小游戏：用调皮的 vibe 把“点点点合成”玩法玩出了“点点点出猫山王”的仪式感，在浏览器里即开即玩。两个项目一轻一重，一个走二位本地推理与产品体验，一个走创意与热点传播，合起来是中南大学队本届黑客松上交的一张完整名片。",
    vibeCoding: "",
    feeling:
      "很有趣的活动!之前参加过很多黑客松,和这次榴莲黑客松比起来都显得太严肃了。喜欢这种有趣的活动,尤其是奖品最有趣。",
    accent: "green",
    category: "本地 AI · 影像识别 · 小游戏",
    hue: 160,
  },
  {
    id: "qifeiba-dictation",
    issueNo: "NO.02",
    teamName: "起飞吧",
    projectTitle: "AI 单词听写网页",
    tagline: "用 Manus 一个人搭建的英语单词听写工具",
    leader: "王璐斐",
    members: "无(单人参赛)",
    affiliation: "青岛希幔电商",
    completionDate: "2026-04-17",
    tools: ["Manus"],
    projectUrls: [
      { label: "在线体验", href: "https://carolwang888.github.io/word-dictation417" },
    ],
    description:
      "使用 Manus 自己制作了单词听写的网页工具。之前听写需要自己校对,现在每次听写完,系统会自动判定对错,并可以对错误的单词进行继续听写,一直到全部正确。每个单词的错误次数有记录,可以定期反复听写错题,极大提高正确率。",
    vibeCoding:
      "自己在完全不懂代码的情况下,用 AI Agent 可以做出自己想要的软件工具,非常棒。后期还会根据自己工作和生活场景,创造更多方便使用的工具软件。AI 时代,每个人都可以是程序员,创造者。",
    feeling: "活动满有趣味的,重点是,我好喜欢吃榴莲!",
    accent: "gold",
    category: "教育工具",
    hue: 42,
  },
  {
    id: "ai-durian-king",
    issueNo: "NO.03",
    teamName: "赵巍老师战队",
    projectTitle: "AI 榴莲大王工具箱",
    tagline: "选榴莲 · 卖榴莲 · 推榴莲,东盟产业链 AI 助手",
    leader: "赵巍",
    members: "赵巍、小伍、俊杰等",
    affiliation: "开启时代(Hermes Agent)",
    completionDate: "2026-05-03",
    tools: ["龙虾系/XXclaw", "其他"],
    projectUrls: [
      { label: "在线体验", href: "http://dm.jggys.cn/" },
    ],
    description:
      "AI 榴莲大王工具箱是一款面向榴莲产业链的智能 AI 助手,围绕『选榴莲、卖榴莲、推榴莲』三大场景,利用智谱 GLM 大模型能力,为消费者、电商主播、东盟贸易商提供一站式 AI 工具。模块一是 AI 选榴莲助手,通过 8 项外观特征输入,以『榴莲品鉴大师』角色输出综合评分、成熟度判断、风味预测、性价比分析与购买建议,并内置榴莲百科 AI 问答。模块二是榴莲直播营销助手,输入产品信息后,自动生成完整直播带货脚本与多平台营销文案(抖音/快手/淘宝),支持多种风格,内置营销策略 AI 顾问。模块三是东盟商品数字名片,可一键生成带 QR 码的精美名片 HTML,支持多品种图鉴展示。视觉上采用暗金赛博朋克 UI、玻璃拟态、AI 生成 Hero 背景,并通过腾讯云 + Nginx 完成部署。",
    vibeCoding:
      "1) AI 让创意落地变快了——智谱 GLM-5 的中文理解和生成能力很强,做 prompt 工程时调教几轮就能产出高质量的分析报告和营销文案,以前这种项目需要专业写手 + 设计师 + 开发团队,现在一个人 + AI 就能搞定。2) 技术选型做了减法——前端没用任何框架,纯 HTML/CSS/JS;后端 FastAPI 也够轻量,一个 main.py 500 多行搞定所有 API。3) AI 生图是意外惊喜——用七牛云的 Kling 模型生成了 Hero 背景图,效果超出预期。4) 『小而美』适合黑客松——三个独立可用、功能完整的工具型模块,比一个半成品大系统更容易出效果。",
    feeling:
      "活动赛题很有温度,榴莲 + AI 看起来是个有趣的碰撞。东盟贸易、直播带货、水果挑选——都是真实场景,不是空中楼阁。把 AI 能力落到这些接地气的场景里,项目才有实际价值感。",
    accent: "red",
    category: "AI 工具集",
    hue: 12,
  },
  {
    id: "durian-mbti",
    issueNo: "NO.04",
    teamName: "榴莲大王",
    projectTitle: "榴莲 MBTI",
    tagline: "给榴莲赋予人格标签的趣味问答",
    leader: "陈 c",
    members: "wu",
    affiliation: "湖南大学",
    completionDate: "2026-05-02",
    tools: ["Codex"],
    projectUrls: [
      { label: "在线体验", href: "https://durianme.swf666.cn/" },
    ],
    description:
      "测试榴莲 MBTI——给榴莲赋予人格标签的趣味互动测试,通过一组问答推导出每颗榴莲对应的『人格类型』,并生成可分享的结果页。",
    vibeCoding:
      "这次用 AI 辅助开发『榴莲 MBTI』项目的体验,让我对 vibe coding 的理念有了全新的理解。借助 Codex 的能力,我得以将精力聚焦在创意设计与产品逻辑上,而非被繁琐的基础代码实现所困。从构思『给榴莲赋予人格标签』的趣味设定,到快速迭代问答逻辑与结果生成界面,AI 不仅大幅提升了开发效率,更像一个随叫随到的搭档,帮我验证想法、排查问题。",
    feeling:
      "这次 AI 榴莲黑客松的参与经历是一次非常有趣且充实的挑战。从一开始被『榴莲 MBTI』这个脑洞点子吸引,到借助 Codex 快速实现原型,整个过程充满了探索的乐趣。活动节奏紧凑而高效,也让我第一次完整体验了从创意构思到产品落地的快速迭代过程。",
    accent: "gold",
    category: "趣味互动",
    hue: 35,
  },
  {
    id: "durian-stairs",
    issueNo: "NO.05",
    teamName: "小猫嬉闹你心",
    projectTitle: "榴莲上楼梯小游戏",
    tagline: "世界上第一个榴莲黑客松里诞生的小游戏",
    leader: "吃猪脚饭的卢伽尔大人",
    members: "无(单人参赛)",
    affiliation: "湖南女子学院",
    completionDate: "2026-05-04",
    tools: ["Meoo"],
    projectUrls: [
      { label: "在线体验", href: "https://wradz7a5ffpq.meoo.info" },
    ],
    description:
      "榴莲主题的上楼梯小游戏,操作简单、节奏轻快,适合作为黑客松场上的一杯调剂饮料。",
    vibeCoding:
      "审美、创意、角度、跨领域知识的连接、独特的成长经历和独立的思考方式——这些才是 AI 提升效率的护城河。",
    feeling: "世界上第一个榴莲黑客松。",
    accent: "green",
    category: "休闲游戏",
    hue: 130,
  },
  {
    id: "durian-kill",
    issueNo: "NO.06",
    teamName: "极限工益 AI",
    projectTitle: "东盟榴莲杀 DURIAN KILL",
    tagline: "以东盟名贵榴莲品种为主题的多人在线卡牌对战游戏",
    leader: "唐敏",
    members: "唐敏、赵妤嘉",
    affiliation: "湖南极限工益开发服务中心",
    completionDate: "2026-05-04",
    tools: ["Codex", "龙虾系/XXclaw"],
    projectUrls: [
      { label: "在线体验", href: "https://dms.jggys.cn/" },
    ],
    description:
      "东盟榴莲杀(DURIAN KILL)是一款以东盟名贵榴莲品种为主题的多人在线卡牌对战游戏。游戏灵感源自经典桌游《三国杀》,将榴莲品种拟人化为战斗角色。玩家选择一种榴莲化身(猫山王、黑刺、金枕头、托玛尼、青尼),使用『砸、躲、催、走私、滞销』等卡牌展开实时对战,最终存活者获胜。每个角色拥有独特的主动技、锁定技和觉醒技,策略深度丰富。技术上采用 FastAPI + WebSocket 实现实时对战通信,Vue 3 + TypeScript 构建前端,纯内存房间制无数据库依赖;同时调用七牛云 AI 图像生成 API(Gemini 模型)为 5 个角色自动生成赛博朋克风格卡面,通过 NPS 内网穿透 + Nginx 反代 + Let's Encrypt SSL 实现一键上线。",
    vibeCoding:
      "1) 想法到代码的延迟从『小时』降到『分钟』——6 张新牌从设计到全栈落地不到 1 小时。2) 最花时间的不是写代码,是验证和修坑——70% 的时间在调试 Vue Router 在 Vite HMR 下静默失败、地图 z-index 压住 UI、history 模式下 InfoWindow 链接被拦截等上下文相关的坑。3) 『会描述问题』比『会写代码』更重要——好的 prompt = 精确的约束 + 清晰的架构映射 + 具体的文件路径。4) 架构理解不可替代——AI 写出的代码质量完全取决于你提供的上下文。5) 最大的陷阱是速度带来的幻觉——编译通过 ≠ 逻辑正确,vibe coding 越快,越需要刻意慢下来验证。",
    feeling:
      "这次怀化东盟榴莲节黑客松对我来说是一次高强度的全栈实战。从 0 到上线压缩在极短时间内完成,从游戏规则设计、后端引擎开发、前端 UI 搭建,到 AI 生图、域名部署、SSL 配置——每一个环节都是边学边做。AI 工具链大幅提升了效率,角色卡面用七牛云 AI 生图 API 一次生成,全程用 AI 辅助编程,这让我深刻体会到——AI 不是替代开发者,而是让一个开发者能扛起一整条链路。榴莲杀,不只是杀牌,更是杀出一条从想法到产品的路。",
    accent: "red",
    category: "多人在线游戏",
    hue: 350,
  },
  {
    id: "durian-shopper",
    issueNo: "NO.07",
    teamName: "榴莲战队",
    projectTitle: "AI 榴莲选购助手",
    tagline: "上传图片或文字描述,大模型给你榴莲选购建议",
    leader: "许全均",
    members: "千逐、笙默、刘豪、小伍、须臾许",
    affiliation: "湖南工商大学",
    completionDate: "2026-05-04",
    tools: ["GPT/Gemini/豆包/DeepSeek 等 LLM", "Codex"],
    projectUrls: [
      { label: "在线体验", href: "https://liulian.mizhou.xyz/" },
    ],
    description:
      "本项目基于大模型能力,构建一个『AI 榴莲选购助手』,帮助用户根据榴莲的外观特征(颜色、裂口、形状、重量等)进行智能判断与推荐。用户可通过上传图片或输入描述,系统自动分析榴莲成熟度、甜度和品质,并给出选购建议。同时结合简单科普与交互问答,降低新手选购门槛,提升购买体验与决策效率。",
    vibeCoding:
      "在本次项目中,深刻体验到了『vibe coding』的开发方式——通过自然语言驱动开发,将想法快速转化为可运行的产品。借助大模型与 Codex 等工具,大幅降低了开发门槛,使非专业开发者也能够参与产品构建。这种方式的核心不在于代码能力本身,而在于问题拆解能力与表达能力:如何把需求讲清楚,如何不断迭代提示词,让 AI 生成更符合预期的结果。同时也发现,vibe coding 更适合做快速验证(Demo / MVP),在复杂系统、稳定性和细节控制方面仍需要人工介入。",
    feeling:
      "通过本次黑客松活动,不仅系统学习了 AI 应用落地的基本流程,也提升了团队协作与快速开发能力。在有限时间内从想法到 Demo 实现,深刻体会到 AI 工具对开发效率的提升。同时也结识了许多对 AI 充满热情的伙伴,拓宽了视野,对未来 AI 应用方向有了更清晰的认知。",
    accent: "gold",
    category: "选购助手",
    hue: 50,
  },
  {
    id: "durian-insight-pro",
    issueNo: "NO.08",
    teamName: "智核觉醒者",
    projectTitle: "Durian Insight Pro",
    tagline: "面向高端榴莲市场的市场情报与可视化分析平台",
    leader: "弥舟",
    members: "千逐、伍、弥舟、笙默、须臾许",
    affiliation: "长沙理工大学",
    completionDate: "2026-05-03",
    tools: ["Codex"],
    projectUrls: [
      { label: "在线体验", href: "https://durian.mizhou.xyz/" },
    ],
    description:
      "Durian Insight Pro 是一个面向高端榴莲市场的市场情报与可视化分析平台,围绕市场概览、大盘分析、竞品对比、价格监测、用户洞察、渠道拆解和报告中心等模块,帮助用户快速了解高端榴莲市场的价格波动、渠道结构、用户口碑和竞品趋势。系统支持按品类、产地、品牌进行筛选,可展示在售品牌 128 个、平均售价 89.6 元/500g、用户好评率 92.4%、搜索热度 168,732 等核心指标;同时结合进口规模趋势、产地份额、价格销量散点、情感分布、渠道占比和利润漏斗等图表,为用户提供更直观的市场洞察与机会分析。",
    vibeCoding:
      "本次项目让我感受到 vibe coding 的核心价值不只是『更快写代码』,而是把想法直接推进成可交互、可表达、可迭代的作品。AI 在这个过程中像一个持续在线的协作者,能够帮助我快速搭建页面结构、整理信息层级、生成文案雏形,并在具体实现时补足许多繁琐但必要的细节。相比传统开发流程,这种方式明显降低了从概念到成品之间的摩擦,让我能更专注于产品感觉、业务逻辑和表达方式本身。",
    feeling:
      "这次活动让我更直观地体验到 AI 辅助开发在信息架构设计、数据整理和前端落地上的效率提升。项目从市场概览到竞品分析的搭建过程比较顺畅,尤其是在可视化表达和页面结构梳理上,AI 帮助我更快完成原型和迭代,也让我能把更多注意力放在业务逻辑和用户价值本身。",
    accent: "green",
    category: "市场情报 · 数据可视化",
    hue: 150,
  },
  {
    id: "wang-loves-durian",
    issueNo: "NO.09",
    teamName: "王先森爱榴莲",
    projectTitle: "AI 榴莲品种与成熟度识别",
    tagline: "上传一张图,识别榴莲品种与成熟度",
    leader: "王先森",
    members: "无(单人参赛)",
    affiliation: "单人参赛",
    completionDate: "2026-04-04",
    tools: ["龙虾系/XXclaw"],
    projectUrls: [
      { label: "在线体验", href: "http://liulian.laiyaai.cn/" },
    ],
    description:
      "上传榴莲的图片,就能用 AI 进行识别榴莲品种与成熟度,让挑选榴莲变得更加简单。",
    vibeCoding: "",
    feeling: "很好玩,很有趣。",
    accent: "gold",
    category: "影像识别",
    hue: 28,
  },
  {
    id: "llti-shopper",
    issueNo: "NO.10",
    teamName: "IGNAI · 洋来社",
    projectTitle: "榴莲人格导购官 LLTI",
    tagline: "让购物像吃榴莲一样上瘾——多重人格 AI 导购",
    leader: "千逐",
    members: "小伍、笙墨、刘豪、小许",
    affiliation: "IGNAI · 洋来社",
    completionDate: "2026-05-04",
    tools: ["GPT/Gemini/豆包/DeepSeek 等 LLM"],
    projectUrls: [
      { label: "在线体验", href: "https://llti.qianzhu.online/" },
    ],
    description:
      "榴莲人格导购官(LLTI)是一款基于大语言模型(LLM)和人格化提示工程打造的智能购物导购平台。我们将『榴莲』作为核心品牌符号(热情、独特、让人欲罢不能),为 AI 导购官注入多重鲜明人格,让每一次购物咨询都像和不同性格的好朋友聊天——『热情榴莲妹』情感化推荐,『理性预算师』性价比优先,『潮流毒舌达人』敢说真话,『奢华生活家』高端品质建议。核心创新在于人格化 AI:通过精心设计的系统提示,不同人格在语气、知识侧重、决策逻辑上完全不同,极大提升了用户沉浸感和信任度。功能涵盖多重人格导购系统、自然语言智能对话、精准商品推荐与对比、购物全流程陪伴。技术上是响应式网页 + LLM API + 动态人格提示管理系统,支持上下文记忆与无感人格切换。",
    vibeCoding:
      "这次 vibe coding 的体验真的太上头了!就像吃榴莲一样——第一口有点挑战,但一旦进入状态就完全停不下来。我用 GPT/Gemini/豆包等 LLM 作为核心引擎,通过精心设计的人格化 System Prompt,实现了多个鲜明人格的无感切换。整个开发过程我完全沉浸其中:白天想 Prompt,晚上调前端,AI 工具把迭代速度拉满,从 idea 到网页版上线只用了很短时间。最深的感悟是——AI 不是替代工具,而是最懂你的创意伙伴。人格化 Prompt Engineering 真的能让产品拥有灵魂。",
    feeling:
      "参加 AI 榴莲黑客松是我今年最爽的 coding 经历!整个活动氛围超级有 vibe,大家一起用 AI 做产品的那种兴奋感和速度感让我肾上腺素飙升。我带着『榴莲人格导购官(LLTI)』这个 idea 入场,从自然语言对话到人格切换,再到个性化推荐,全程都像在和 AI 一起脑暴、一起迭代。AI 把开发门槛大幅降低的同时,也把创意的上限拉得极高。最打动我的是『榴莲』这个主题——热情、独特、上头,和 LLTI 想传递的购物乐趣完美契合!",
    accent: "red",
    category: "对话式商业",
    hue: 5,
  },
  {
    id: "durian-self-intro",
    issueNo: "NO.11",
    teamName: "榴榴又莲莲",
    projectTitle: "榴莲：一封来自热带的自我介绍信",
    tagline: "面向榴莲文化节的互动式科普介绍页，以榴莲的第一人称口吻讲述跨越六千万年的传奇故事",
    leader: "小能猫",
    members: "无(单人参赛)",
    affiliation: "个人参赛 / 北京市朝阳区",
    completionDate: "2026-05-05",
    tools: ["Claude Code", "DeepSeek V4", "豆包"],
    projectUrls: [],
    description:
      `"榴莲：一封来自热带的自我介绍信"是一个面向榴莲文化节的互动式科普介绍页，以榴莲的第一人称口吻，讲述这颗"热带水果之王"跨越六千万年的传奇故事。项目以单页滚动叙事为载体，将植物学知识与视觉设计深度融合，让观众从"看到榴莲"升级为"看懂榴莲"。页面内容涵盖榴莲从马来群岛起源、大航海时代的跨洲传播，到现代嫁接种植技术，以及中国海南打破"种不了榴莲"魔咒的产业突破。\n\n核心功能：\n1. 滚动叙事结构——五大章节层层递进（六千万年旅程→古籍印象→成长史→中国新篇章→趣味百科）\n2. 多媒体融合——6张AI主题插画+5段循环动画视频，图文动三位一体\n3. 种植五步动态卡片——育苗/定植/田间管理/授粉/采收，滚动触发动效播放\n4. 实时视觉调节面板——右下角Tweeks面板可调色相、饱和度、动效速度、字体大小\n5. 交互动效系统——缓流渐变背景、滚动触发渐显、数字计数动画、粒子漂浮，纯CSS实现零依赖\n6. 响应式适配——桌面/平板/手机全断点覆盖，适配大屏展陈与移动端浏览`,
    vibeCoding:
      "这次黑客松让我深刻体会到'内容驱动的设计'和'AI 辅助创作'的结合力量。起初直接使用Claude的效果非常差——充斥AI味的网页设计、糟糕的蓝紫色渐变……我在网上找到了专门用于网页设计的skill，调成了如今的黄绿色渐变设计。DeepSeek V4的加入极大的节省了开发成本，整个页面只花费了7毛钱！豆包的免费图片以及视频生成也十分便利，现在的'一人开发'真的不是梦想了。",
    feeling: "",
    accent: "gold",
    category: "互动科普 · 叙事网页",
    hue: 62,
  },
];

export const eventStats = {
  totalTeams: projects.length,
  totalMembers: 27,
  liveProjects: projects.filter((p) => p.projectUrls.length > 0).length,
  toolCount: Array.from(new Set(projects.flatMap((p) => p.tools))).length,
};
