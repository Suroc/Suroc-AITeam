# OpenClaw 必备 Skills 调研（2026-03-20）

> 调研方式：基于 OpenClaw 官方文档（Popular Skills/Cookbook）+ 官方 GitHub `skills` 目录与 SKILL.md + 社区技术博客（部署/监控实践）交叉整理。

## 必备 Skills 清单

| Skills 名称 | 描述 | 作用 |
|---|---|---|
| Web Search | 让 Agent 可联网检索并抓取网页内容。 | 构建新闻摘要、竞品监控、资料收集类 Agent 的基础能力。 |
| Summarizer | 将长文本压缩为结构化摘要。 | 降低信息噪声，给下游决策或自动化流程提供可消费结果。 |
| Calendar | 读写日历事件与时间安排。 | 用于会议编排、冲突检测、自动排期。 |
| Email | 读取/发送邮件。 | 打通通知、审批、客户沟通链路。 |
| GitHub | 通过 `gh` CLI 执行 Issue/PR/CI 查询与操作。 | 支撑研发自动化（代码审查、CI 跟踪、变更协同）。 |
| Browser Automation | 自动化浏览器交互（打开页面、填写表单、抓取数据）。 | 处理需要真实页面操作的业务流程与数据采集。 |
| Database Query | 执行数据库查询。 | 将 Agent 直接连接业务数据层，完成检索和报表生成。 |
| Translator | 多语言翻译能力。 | 用于跨语言客服、国际化内容处理。 |
| clawhub | 用 ClawHub CLI 搜索、安装、更新、发布 Skills。 | 作为 Skills 生态入口，快速补齐缺失能力。 |
| coding-agent | 将复杂编码任务委派给 Codex/Claude/Pi 等子代理。 | 适合大改造、批量重构、并行代码任务。 |
| session-logs | 检索并分析历史会话日志。 | 追溯上下文、排障、复盘交互质量。 |
| healthcheck | 面向 OpenClaw 部署主机的安全基线检查与加固流程。 | 保障生产环境安全与可持续巡检。 |
| openai-whisper | 基于 Whisper CLI 的本地语音转文本。 | 会议纪要、语音工单、音频归档检索。 |
| openai-image-gen | 调用 OpenAI Images API 批量生成图片。 | 用于营销素材、产品草图、内容生产自动化。 |
| weather | 通过 wttr.in/Open-Meteo 获取天气与预报。 | 适用于行程建议、提醒类生活助手场景。 |

## 建议的落地优先级

1. 第一优先（几乎所有团队都需要）：`Web Search`、`Summarizer`、`GitHub`、`Email`、`Calendar`。  
2. 第二优先（按业务选配）：`Browser Automation`、`Database Query`、`Translator`、`openai-whisper`。  
3. 平台治理能力（运维必备）：`clawhub`、`session-logs`、`healthcheck`、`coding-agent`。  

## 参考来源

- https://openclawdoc.com/docs/skills/popular-skills/
- https://openclawdoc.com/docs/cookbook/overview
- https://github.com/openclaw/openclaw/tree/main/skills
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/clawhub/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/coding-agent/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/github/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/healthcheck/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/openai-whisper/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/openai-image-gen/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/session-logs/SKILL.md
- https://raw.githubusercontent.com/openclaw/openclaw/main/skills/weather/SKILL.md
- https://dev.to/gaodalie_ai/openclaw-monitoring-and-observability-in-production-1k09
- https://medium.com/@anasssikri/openclaw-comprehensive-guide-and-practical-use-cases-f4b724402eed

## 第二轮增补：高质量 Skills（官方验证 + 社区高下载）

| Skills 名称 | 描述 | 作用 |
|---|---|---|
| calculator | 官方 Popular Skills 的高评分数学引擎技能（Verified 4.9）。 | 解决金额计算、换算、科学计算等“高准确性”场景，避免纯模型心算误差。 |
| code-interpreter | 在沙箱中执行 Python/JS/Shell 代码并返回结果。 | 用于快速数据分析、脚本验证、图表与文件生成。 |
| file-converter | 文档/图片/数据格式转换（如 PDF、DOCX、CSV、JSON 等）。 | 作为通用数据管道中的“格式标准化”能力。 |
| weather-now | 实时天气与多日预报。 | 行程提醒、运营活动天气风险控制、客服应答增强。 |
| byterover | 社区高热度记忆技能（下载量领先），用于结构化知识查询与沉淀。 | 给 Agent 增强长期知识管理能力，提升连续任务稳定性。 |
| self-improvement | 捕获失败与纠正并固化经验。 | 降低重复错误，支持 Agent 持续改进。 |
| tavily | 面向 Agent 的搜索技能（返回更凝练结果）。 | 作为 Web 检索替代/补充，提升研究与事实校验效率。 |
| brave-search | 轻量搜索与内容提取能力。 | 适合低成本高频检索任务。 |
| gog | Google Workspace 一体化能力（Gmail/Calendar/Drive/Docs/Sheets）。 | 构建“办公自动化 Agent”时的核心基础技能。 |
| caldav-calendar | 对 CalDAV 日历进行同步与查询。 | 适合 iCloud/Fastmail/Nextcloud 等跨平台日历场景。 |
| slack | 在 Slack 渠道执行消息协作动作。 | 构建团队协作、告警通知、工单流转 Agent。 |
| notion | Notion 页面/数据库/Block 的 API 管理。 | 将 Agent 结果沉淀为结构化知识库与项目文档。 |
| obsidian | 基于 Obsidian Vault 的知识管理。 | 适合本地知识库、离线文档工作流。 |
| 1password | 通过 `op` CLI 管理密钥与机密。 | 给生产 Agent 增加安全的凭据访问能力。 |
| prompt-guard | 提示注入防护与风险评分。 | 提升邮件/网页输入场景下的安全性。 |
| security-monitor | 实时安全监控类技能。 | 用于长期运行 Agent 的安全巡检与告警。 |

## 第二轮筛选标准

1. 官方文档明确推荐或给出 Verified/评分信息。  
2. 社区技能需具备持续维护信号（活跃仓库 + 可用安装方式）。  
3. 优先选择下载量和复用度较高、且可直接用于生产流程的技能。  

## 第二轮新增来源

- https://openclawdoc.com/docs/skills/popular-skills/
- https://github.com/sundial-org/awesome-openclaw-skills
- https://dev.to/linou518/openclaw-guide-ch8-monitoring-and-debugging-18f1
- https://dev.to/ialijr/lessons-from-openclaws-architecture-for-agent-builders-1j93

## 第三轮增补：官方内置“工具型 Skills”能力（高稳定）

| Skills 名称 | 描述 | 作用 |
|---|---|---|
| web_search | OpenClaw 官方内置检索工具，可选 Brave/Firecrawl/Gemini/Grok/Kimi/Perplexity/Tavily 等 provider。 | 统一检索入口，降低多搜索源接入复杂度。 |
| web_fetch | 官方内置网页提取工具（HTTP 拉取 + 可读内容抽取）。 | 快速把网页转为 Agent 可消费文本，适合信息抓取流水线。 |
| tavily_search | Tavily 的深度搜索工具（支持 topic/depth/domain filters）。 | 在研究类任务中提升检索精度与结构化程度。 |
| tavily_extract | Tavily 的 URL 内容提取工具（支持 JS 渲染页面）。 | 对指定 URL 做高质量抽取，减少手工清洗成本。 |
| firecrawl_search | Firecrawl 搜索工具（含 bot-circumvention 支持）。 | 处理反爬严格或 JS-heavy 场景下的稳定搜索。 |
| firecrawl_scrape | Firecrawl 页面抓取工具。 | 高可用内容采集，适用于价格监控和竞品采集。 |
| perplexity-search | Perplexity Search API provider（结构化结果与过滤参数）。 | 在事实检索和带来源回答场景下提升信息密度。 |
| brave-search | Brave Search provider（支持 freshness/日期过滤）。 | 构建新闻/趋势跟踪类 Agent 的低门槛检索能力。 |
| pdf | 官方 PDF 分析工具（支持单/多 PDF，含 fallback 提取链路）。 | 合同、报告、研究文档自动解析与摘要。 |
| exec | 官方命令执行工具，支持 sandbox/gateway/node 与审批策略。 | 承载自动化运维、批处理、脚本化任务执行。 |
| process | exec 关联的后台进程管理能力。 | 用于长任务异步运行、轮询、结果回传。 |
| apply_patch | 官方补丁编辑工具。 | 在代码工作流中进行可审计、可回滚的精确修改。 |

## 第三轮安全筛选规则（必做）

1. 仅安装可追溯来源技能，优先官方文档与受信仓库。  
2. 第三方技能默认视为不可信代码，先审 `SKILL.md` 与安装脚本再启用。  
3. 生产环境强制启用沙箱 + 工具白名单（至少限制 `exec/write/edit/apply_patch`）。  
4. 对 ClawHub 技能做持续审计（版本锁定、哈希比对、异常流量监测）。  
5. 高风险输入链路（网页抓取/外部消息）必须叠加注入防护与人工兜底。  

## 第三轮新增来源

- https://docs.openclaw.ai/tools/skills
- https://docs.openclaw.ai/tools/web
- https://docs.openclaw.ai/tools/tavily
- https://docs.openclaw.ai/tools/firecrawl
- https://docs.openclaw.ai/tools/perplexity-search
- https://docs.openclaw.ai/tools/brave-search
- https://docs.openclaw.ai/tools/pdf
- https://docs.openclaw.ai/tools/exec
- https://docs.openclaw.ai/tools/clawhub
- https://www.theverge.com/news/874011/openclaw-ai-skill-clawhub-extensions-security-nightmare
- https://www.tomshardware.com/tech-industry/cyber-security/malicious-moltbot-skill-targets-crypto-users-on-clawhub
