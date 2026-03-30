# OpenClaw 常用 Agent 调研（2026-03-20）

> 调研方式：以 OpenClaw 官方 Cookbook 的可复用配方为主，结合官方技能体系与社区技术博客实践（部署、监控、生产化）整理。

## 最常用 Agent 清单

| Agent 名称 | 描述 | 作用 | 应用场景 | 如何构建 |
|---|---|---|---|---|
| Daily News Bot | 自动抓取指定主题新闻并输出摘要。 | 帮团队持续跟踪行业动态。 | 行业监测、舆情追踪、晨报自动化。 | 组合 `Web Search + Summarizer`，配置关键词/来源站点，设置定时触发与摘要模板。 |
| Email Assistant | 自动分类、摘要邮件并支持草拟回复。 | 降低邮件处理耗时。 | 销售邮箱、客户支持邮箱、管理层收件箱。 | 组合 `Email + Summarizer`，定义分类规则和回复风格，增加人工确认开关。 |
| Meeting Scheduler | 自动识别可用时段并发起会议安排。 | 减少跨团队约会冲突。 | 跨时区排会、候选人面试排程、项目例会。 | 组合 `Calendar + Email`，配置时区策略与冲突处理，输出邀约模板。 |
| Code Review Bot | 对提交代码进行自动审查并给建议。 | 提升代码质量与评审效率。 | PR 初筛、规范检查、重复问题拦截。 | 组合 `GitHub + Code Reviewer`，绑定仓库和分支策略，设定规则阈值。 |
| Smart Home Automation Agent | 根据指令控制智能家居设备。 | 将自然语言转为设备控制动作。 | 家居自动化、场景联动、语音控制。 | 使用 `Home Assistant` 相关 Skills，绑定设备实体与权限，定义场景命令模板。 |
| Web Scraping & Data Extraction Agent | 在网页中自动采集结构化数据。 | 为分析与报表提供数据输入。 | 价格监控、竞品采集、信息汇总。 | 组合 `Browser Automation + Data Store`，定义抓取字段与清洗规则，设置重试与反爬容错。 |
| Multi-Step Workflow Orchestration Agent | 将多个子任务按顺序或并行自动执行。 | 打通“检索-分析-写入-通知”端到端流程。 | 周报生成、运营流水线、自动运营任务。 | 组合 `Orchestration + Calendar + Email + Database`，设计步骤依赖图和失败回滚。 |
| Customer Support Bot | 自动回答常见问题并升级复杂工单。 | 提升客服响应速度与一致性。 | FAQ 自助、售前咨询、工单分流。 | 组合 `Knowledge Base Search + Ticketing + Translator`，配置知识库索引和升级规则。 |

## 构建 OpenClaw Agent 的通用流程（生产可用）

1. 明确目标：先定义输入、输出、成功指标（例如准确率、响应时延、人工接管率）。  
2. 选择 Skills：从高频通用技能（搜索、摘要、通信、数据）开始，再按业务补专用技能。  
3. 编排工作流：把单步操作拆成可观测的多步骤流程，加入重试、超时与回退。  
4. 权限与安全：最小权限接入邮箱、仓库、数据库；上线前执行 `healthcheck`。  
5. 监控与迭代：保留 `session-logs`，建立失败样本池，按周更新提示词与规则。  

## 参考来源

- https://openclawdoc.com/docs/cookbook/overview
- https://openclawdoc.com/docs/cookbook/daily-news-bot/
- https://openclawdoc.com/docs/cookbook/email-assistant/
- https://openclawdoc.com/docs/cookbook/meeting-scheduler/
- https://openclawdoc.com/docs/cookbook/code-review-bot/
- https://openclawdoc.com/docs/cookbook/smart-home
- https://openclawdoc.com/docs/cookbook/web-scraping
- https://openclawdoc.com/docs/cookbook/customer-support/
- https://github.com/openclaw/openclaw/tree/main/skills
- https://dev.to/gaodalie_ai/openclaw-monitoring-and-observability-in-production-1k09
- https://medium.com/@anasssikri/openclaw-comprehensive-guide-and-practical-use-cases-f4b724402eed

## 第二轮增补：高质量常用 Agent 模板

| Agent 名称 | 描述 | 作用 | 应用场景 | 如何构建 |
|---|---|---|---|---|
| Price Monitor Agent | 基于浏览器自动化持续抓取商品页价格与库存。 | 自动发现价格波动并触发通知。 | 电商比价、采购跟踪、库存预警。 | 组合 `browser-use + Web Search + Slack/Email`，配置抓取频率、阈值和去重规则。 |
| Memory-Enhanced Assistant | 带长期记忆的问答与任务执行 Agent。 | 在跨会话任务中保持上下文一致性。 | 客户长期跟踪、项目管理助理、知识型助理。 | 在 Agent 中启用 memory 系统并定义写入策略（摘要写入、事实写入、冲突处理）。 |
| Report Generator Agent | 文件输入到报告输出的文档流水线 Agent。 | 自动整合多文件并输出标准报告。 | 周报/月报、尽调资料整理、法务/财务材料汇总。 | 组合 `file-management + summarizer + template`，加入文件校验与版本号策略。 |
| Shell Data Pipeline Agent | 使用 shell 指令链执行数据清洗与转换。 | 提升批处理效率，减少人工脚本拼装。 | 日志处理、CSV/JSON 清洗、批量文件处理。 | 开启 `shell-commands`，设置命令白名单、超时、输出路径和审计日志。 |
| DevOps Diagnostics Agent | 自动执行健康检查、日志检索、诊断命令。 | 缩短故障定位时间。 | 线上故障排查、部署后验收、巡检自动化。 | 组合 `healthcheck + shell-commands + session-logs`，配置告警和回滚建议。 |
| Multi-Agent Support Team | “Support-bot + Code-reviewer”等协作式多 Agent。 | 将客服、研发、质量流程拆分并协同。 | SaaS 客服升级流程、技术支持闭环。 | 在 `multi-agent setup` 中定义角色边界、路由规则、共享上下文和交接协议。 |
| Workspace Copilot Agent | 面向办公协同的日程/邮件/文档一体化 Agent。 | 提升团队事务处理自动化程度。 | 会议前准备、行动项分发、跨系统同步。 | 组合 `gog + calendar + email + notion`，定义每日/每周自动计划。 |
| Secure Intake Agent | 先做提示注入和安全检测，再进入业务流程。 | 降低恶意输入影响范围。 | 面向外部用户的客服入口、网页采集入口。 | 在入口前串联 `prompt-guard/security-monitor`，风险高时自动转人工。 |
| Deep Research Agent | 多轮搜索、交叉验证、结构化结论输出。 | 产出可引用的研究报告。 | 市场研究、竞品分析、技术选型。 | 组合 `deep-research + Web Search + summarizer`，强制来源记录与证据链。 |
| Team Notification Agent | 将关键信号推送到 Slack/Email 并附上下文。 | 提升跨团队响应效率。 | CI 失败通知、运营告警、销售机会推送。 | 组合 `github + slack + email`，设置优先级路由和静默时段。 |

## 第二轮构建建议（实战）

1. 先选“单职责 Agent”做 MVP，再升级为多 Agent 协作。  
2. 每个 Agent 默认增加“观测层”：日志、失败样本、重试记录。  
3. 生产入口统一加安全网关（注入防护 + 权限分级 + 人工兜底）。  

## 第二轮新增来源

- https://openclawdoc.com/docs/agents/overview/
- https://openclawdoc.com/docs/agents/browser-automation/
- https://openclawdoc.com/docs/agents/file-management/
- https://openclawdoc.com/docs/agents/memory/
- https://openclawdoc.com/docs/agents/shell-commands/
- https://github.com/sundial-org/awesome-openclaw-skills
- https://dev.to/linou518/openclaw-guide-ch6-agent-architecture-and-planning-1h26
- https://dev.to/gaodalie_ai/openclaw-multi-agent-system-design-lessons-from-real-world-architecture-4k8m

## 第三轮增补：官方工程化 Agent 模式（可直接配置）

| Agent 名称 | 描述 | 作用 | 应用场景 | 如何构建 |
|---|---|---|---|---|
| Broadcast Specialist Team Agent | 在同一聊天中并行触发多个专职 Agent 共同回应。 | 用“专家分工”提升响应质量。 | 代码评审群、支持群、项目群。 | 使用 `broadcast` 配置同一群映射多个 `agentId`，策略优先 `parallel`。 |
| Multi-Language Broadcast Agent | 一个输入触发多语言 Agent 同步回复。 | 降低国际化支持的人力成本。 | 全球客服、跨国社区运营。 | 为 EN/DE/ES 等 Agent 分别配置语言身份与模板，通过 `broadcast` 绑定同一 peer。 |
| QA Gatekeeper Agent | 业务回答 Agent + 质量审查 Agent 协同。 | 对外回复前做质量兜底。 | 客服质检、合规文本检查。 | 使用 broadcast 顺序模式 `sequential`，先回答后质检，异常时二次修正。 |
| Thread-Bound Subagent Agent | 为长任务绑定线程，后续消息持续路由到同一子代理。 | 提升多轮任务连续性。 | Discord 长工单、持续调试任务。 | 用 `sessions_spawn` + `thread: true` + `mode: session`，并配置 `/focus` 与 session idle/max-age。 |
| Orchestrator-Worker Nested Agent | 主 Agent -> 编排子 Agent -> 工人子子 Agent 的层级执行。 | 支持复杂任务并行拆解。 | 大规模研究、批量代码任务、数据流水线。 | 开启 `maxSpawnDepth: 2`，设置 `maxChildrenPerAgent` 和 `maxConcurrent`，明确汇总链路。 |
| Messaging-Only Support Agent | 仅保留消息类工具（如 Slack）并禁用危险写操作。 | 在外部沟通场景下降低风险。 | 客服机器人、通知机器人。 | 设置 `tools.profile: messaging`，必要时只追加 `allow: [\"slack\"]`。 |
| Public Read-Only Agent | 公网入口 Agent 全量沙箱 + 只读工具策略。 | 把高风险输入隔离在最小权限环境。 | 公开群聊、对外问答入口。 | `sandbox.mode: all` + `tools.allow: [\"read\"]` + deny `exec/write/edit/apply_patch`。 |
| Family Restricted Agent | 家庭/私域群专用受限 Agent，与个人主 Agent 隔离。 | 保护主环境与私有凭据。 | 家庭群助手、私域社群助手。 | 为 `family` Agent 单独 `workspace` 与 `agentDir`，使用 per-agent auth 存储。 |
| Node-Bound Operations Agent | 把命令执行绑定到指定 node/gateway 并启用审批。 | 将运维执行与聊天入口解耦。 | 远程运维、跨设备自动化、边缘节点执行。 | 在 `tools.exec` 中设 `host=node`、`ask=on-miss`、审批策略和节点绑定。 |
| PDF Intelligence Agent | 自动解析单/多 PDF 并产出摘要/问答结论。 | 快速消费合同、报告、规范文档。 | 尽调、法务审阅、研究报告分析。 | 组合 `pdf + summarizer`，配置 `pdfModel/imageModel` 与页码过滤。 |

## 第三轮构建注意点（生产）

1. 子代理默认隔离会话与上下文，避免跨任务污染。  
2. 多 Agent 场景要显式限制工具权限，避免“一个高权限拖垮全局”。  
3. 对公网或第三方输入链路，优先“沙箱 + 只读 + 审批”的三层防护。  
4. 广播组建议控制在 5-10 个 Agent 内，避免响应拥塞与成本暴涨。  

## 第三轮新增来源

- https://docs.openclaw.ai/channels/broadcast-groups
- https://docs.openclaw.ai/tools/subagents
- https://docs.openclaw.ai/tools/multi-agent-sandbox-tools
- https://docs.openclaw.ai/tools/exec
- https://docs.openclaw.ai/tools/pdf
- https://docs.openclaw.ai/tools/skills
- https://docs.openclaw.ai/tools/clawhub
- https://www.theverge.com/news/874011/openclaw-ai-skill-clawhub-extensions-security-nightmare
- https://www.tomshardware.com/tech-industry/cyber-security/malicious-moltbot-skill-targets-crypto-users-on-clawhub
