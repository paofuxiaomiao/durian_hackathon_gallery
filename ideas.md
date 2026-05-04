# AI 榴莲黑客松作品展厅 · 设计构思

围绕"AI × 榴莲 × Hackathon"这条主线,做三种风格化的 brainstorm,每个想法都给出独立的世界观、版式与节奏,选出最契合"作品展示"目标的一种。

<response>
<text>
**Idea 1 · Tropical Editorial(热带杂志刊物)**
- **Design Movement**:Modern Editorial / Tropical Modernism 的混合体——把一本"榴莲特别号"印刷杂志搬到屏幕上。
- **Core Principles**:1) Magazine spread,大量的版式留白与栏宽;2) 文字即图形,用中文超大标题做视觉锚点;3) 信息密度优先于装饰;4) 印刷质感(纸张暖色、网点纹理、铅字感)。
- **Color Philosophy**:暖象牙白 `#F7F0E1` 打底,主色"榴莲果壳"墨绿 `#1F3A2D` + "果肉金"`#E8B233`,点缀刺红 `#C2452F`。整体像翻开一本带咖渍的旧杂志,稳重又有人情味。
- **Layout Paradigm**:左右非对称的 12 栏栅格,每个项目用"封面图 + 大号引文 + 数据卡"做杂志跨页;Hero 区把"AI 榴莲黑客松"四个字做成超大中文衬线,旁边压一张榴莲剖面摄影。
- **Signature Elements**:1) 装饰性的榴莲壳纹剖面线条;2) 编号 No.01/02 + 角标;3) 引用文字两侧的双引号印章。
- **Interaction Philosophy**:翻页式的微动效,卡片 hover 时图像微微下沉,标题做切片打字动画,像翻杂志。
- **Animation**:section 进入用 stagger fade-up;详情页用横向 slide;感想 quote 卡有打字光标。
- **Typography**:中文主标 Noto Serif SC 900;英文衬线 Fraunces;正文 Noto Sans SC + Inter;数字标号用 IBM Plex Mono。
</text>
<probability>0.05</probability>
</response>

<response>
<text>
**Idea 2 · Neon Night Market(夜市霓虹赛博)**
- **Design Movement**:Cyber Night Market,把东南亚夜市霓虹招牌的视觉语言赛博化。
- **Core Principles**:1) 深夜底色 + 高饱和霓虹高光;2) 粗体英文 + 中文细黑大反差;3) 画面像 LED 招牌,有光晕/光斑;4) 元素带轻微抖动与扫描线。
- **Color Philosophy**:夜空蓝紫 `#0B0A1F` 打底,招牌粉 `#FF3D8A`、电路青 `#3DF1F1`、果肉金 `#FFC857`。让 AI 的赛博感和榴莲市场的烟火气撞色。
- **Layout Paradigm**:横向滚动的"摊位走廊",每个项目像一块发光招牌,首页用 marquee 横幅 + 错落卡片墙,详情页是大图全屏 + 侧边信息栏。
- **Signature Elements**:1) 像素榴莲 emoji 灯;2) 像素扫描线 / CRT 光斑;3) 招牌外发光描边。
- **Interaction Philosophy**:hover 时招牌"通电"——边缘霓虹流动一圈;背景 noise 静态扫描;光标变成发光圆点。
- **Animation**:进入 glitch + fade,卡片 hover neon-flicker,数字滚动,quote 文字逐字点亮。
- **Typography**:英文 Space Grotesk 700,中文 Misans / Noto Sans SC 900;数字 / 代号 JetBrains Mono。
</text>
<probability>0.04</probability>
</response>

<response>
<text>
**Idea 3 · Botanical Lab(植物图鉴标本馆)**
- **Design Movement**:科学博物馆 + 植物图鉴 + Swiss minimalism。
- **Core Principles**:1) 像翻开一本榴莲品种图鉴,每个项目是一份"标本";2) 大量结构化标签、编号、刻度线;3) 手绘风的榴莲线稿与真实摄影并置;4) 干净安静、又带点学术幽默。
- **Color Philosophy**:米色标本纸 `#F4EEE0` 打底,深绿主色 `#22382A`,标签红 `#B23A3A`,标尺灰 `#8C8678`。整体像植物学家的笔记本。
- **Layout Paradigm**:首页是一面"标本墙"——10 个项目像挂在墙上的标本卡(不规则错落 + 细线指引);详情页是图鉴跨页:左为线稿/截图 + 数据,右为长文(项目介绍/感想)。
- **Signature Elements**:1) 手绘榴莲线稿/解剖图;2) 标签贴纸式的元数据(队伍、日期、工具);3) 细线指引 + 标尺刻度。
- **Interaction Philosophy**:节制、安静的微动效——hover 时标本卡像被风吹动一样轻轻倾斜;标签贴纸有撕开的纸感。
- **Animation**:进入 fade-up + 极短 spring;hover 4° 倾斜;数字 count-up;quote 用淡入。
- **Typography**:中文 Noto Serif SC 700;英文 Fraunces / DM Serif Display;正文 Noto Sans SC + Inter;数字 IBM Plex Mono。
</text>
<probability>0.03</probability>
</response>

---

## 最终选择:Idea 1 · Tropical Editorial(热带杂志刊物)

理由:
1. 用户是想"展示作品 + 展示队员的真心感想",杂志风天生擅长大段文字阅读、引用、数据排版,完美匹配"项目介绍 + vibe coding 心得 + 活动感受"这种内容形态。
2. 暖底色 + 墨绿/榴莲金的搭配既保留了榴莲的视觉符号,又比霓虹方案更耐看、更适合长时间浏览。
3. 杂志跨页结构能优雅地承载 10 支队伍的差异化内容,后续如果要扩展(新增队伍、加入颁奖词)也容易延续节奏。

### 设计语言定稿
- **背景**:暖象牙白 `#F7F0E1`(light)/ 深墨绿 `#0E1F18`(详情区局部反白)。
- **主色**:墨绿 `#1F3A2D`、果肉金 `#E8B233`、刺红 `#C2452F`。
- **字体**:Noto Serif SC(中文标题/引文)+ Fraunces(英文衬线/数字)+ Noto Sans SC(中文正文)+ IBM Plex Mono(编号、元数据)。
- **栅格**:12 栏 + 8px 基线,卡片对齐杂志跨页节奏。
- **签名元素**:超大期号编号 NO.01–NO.10、双引号印章、榴莲剖面线条 SVG、刺纹斑点。
- **动效**:进入用 fade-up + 微 stagger;卡片 hover 图像微下沉、标题描边色块滑入;quote 卡片有 typing caret。

后续所有 CSS / 组件文件顶部都必须重复这条设计语言提醒,确保选定的 Tropical Editorial 风格被严格执行。
