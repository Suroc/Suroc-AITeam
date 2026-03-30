# 第二阶段：智能体深度定义与 MCP 配置

- 项目：Suroc-AITeam
- 阶段目标：为 6 个 Agent 定义角色、任务、Skill、触发条件与 MCP 接入方案
- 生成时间：2026-03-19

## 1. 交付清单

已生成 6 个独立 JSON 配置文件：

1. `stage2/agents/team_lead.agent.json`
2. `stage2/agents/market_intelligence.agent.json`
3. `stage2/agents/risk_control.agent.json`
4. `stage2/agents/product_designer.agent.json`
5. `stage2/agents/developer.agent.json`
6. `stage2/agents/qa_tester.agent.json`

每个文件都包含：

1. 角色定位
2. 核心任务
3. 集成 MCP 工具
4. Skill 名称
5. 触发条件
6. System Prompt
7. Tool Definitions（输入结构）

## 2. 分析记录（决策过程摘要）

## 2.1 选型原则

1. 优先官方实现（Official）或平台方维护实现。
2. 若官方缺失，选活跃社区实现，并标记“社区维护”。
3. 对“仅参考实现”的仓库，不直接作为生产首选。
4. 统一输出为“可审计、可替换”的配置结构（server 与 tool 分层）。

## 2.2 关键发现

1. `github/github-mcp-server` 是 GitHub 官方 MCP 服务，支持 remote endpoint 与 toolset 控制。
2. Slack 在 MCP 参考仓库中已转由 Zencoder 维护（`zencoderai/slack-mcp-server`）。
3. Tavily 与 Exa 都提供托管 remote MCP endpoint，适合情报类 Agent 的快速接入。
4. Figma MCP 已有官方 remote/local 路径（remote: `https://mcp.figma.com/mcp`）。
5. DALL-E 3 仍可通过 OpenAI Images API 使用（`model: "dall-e-3"`）；本次配置选了支持 `dall-e-3` 的 imagegen MCP 封装。
6. `modelcontextprotocol/servers` 仓库明确声明“参考实现为教育用途，不等于生产级”，且部分历史服务器已归档（包含 Puppeteer、旧 Slack 等），因此生产需做额外加固与版本锁定。

## 2.3 映射策略（与需求逐项对齐）

1. Team Lead：Google Calendar + Slack + GitHub Management
2. Market Intelligence：Tavily + Exa + RSS
3. Risk Control：Legal Database + Financial News
4. Product Designer：Figma + DALL-E 3
5. Developer：Filesystem + GitHub + Docker
6. QA Tester：Puppeteer + Pytest

## 3. 六大 Agent 规格总览

| Agent | 角色定位 | 主要触发 | 关键输出 |
|---|---|---|---|
| Team Lead | 总控编排与决策 | 每小时巡检、异常升级、阶段完成 | 指派任务、状态决议、日报 |
| Market Intelligence | 全网商机发现 | 00:00全量、2小时增量 | 商机简报、证据链、评分 |
| Risk Control | 合规与可行性闸门 | 收到高分商机、敏感词命中 | 风险评分卡、Go/No-Go |
| Product Designer | PRD 与设计资产生成 | 风控通过、需求变更 | PRD、验收标准、原型说明 |
| Developer | 代码实现与交付 | 设计批准、缺陷回流 | 代码变更、PR、构建结果 |
| QA Tester | 自动化质量验证 | PR/合并触发、夜间回归 | 测试报告、缺陷单、发布建议 |

## 4. 推荐 MCP 服务地址（下载/接入）

以下为“建议优先级”清单（按可用性与维护状态综合）：

| 能力域 | 推荐地址 | 类型 | 说明 |
|---|---|---|---|
| GitHub Management | https://github.com/github/github-mcp-server | 官方 | GitHub 官方 MCP 服务 |
| Slack | https://github.com/zencoderai/slack-mcp-server | 维护迁移 | 参考仓库中明确 Slack 由 Zencoder 维护 |
| Google Calendar / Workspace | https://github.com/ngs/google-mcp-server | 社区活跃 | 覆盖 Calendar/Drive/Gmail/Docs/Sheets |
| Tavily Search | https://github.com/tavily-ai/tavily-mcp | 官方/平台方 | 提供 remote endpoint |
| Exa.ai | https://github.com/exa-labs/exa-mcp-server | 官方/平台方 | 提供 remote endpoint |
| RSS Parser | https://github.com/buhe/mcp_rss | 社区 | 提供 RSS 工具接口 |
| Legal Database | https://github.com/Travis-Prall/court-listener-mcp | 社区 | 对接 CourtListener + eCFR |
| Financial News API | https://github.com/alphavantage/alpha_vantage_mcp | 官方/平台方 | 含 `NEWS_SENTIMENT` 等金融情报能力 |
| Figma API | https://www.figma.com/mcp-catalog/ | 官方 | 官方文档与安装入口（remote/local） |
| Figma MCP Registry Entry | https://github.com/mcp/figma/mcp-server | 官方集成登记 | 可用于 MCP 客户端发现 |
| DALL-E 3 Image Gen MCP | https://github.com/spartanz51/imagegen-mcp | 社区 | 支持 `dall-e-3` / `gpt-image-1` |
| Filesystem | https://github.com/mark3labs/mcp-filesystem-server | 社区活跃 | 工具完整，支持 Docker 运行 |
| Docker Controller | https://github.com/ckreiling/mcp-server-docker | 社区活跃 | 支持容器/镜像/网络/卷管理 |
| Puppeteer | https://github.com/ratiofu/mcp-puppeteer | 社区 | 轻量可用，需配合 Chromium 远程调试 |
| Pytest Executor | https://github.com/jwilger/mcp-pytest-runner | 社区活跃 | `discover_tests` + 执行能力 |

## 5. 已生成 JSON 配置说明

## 5.1 Team Lead

- 文件：`stage2/agents/team_lead.agent.json`
- MCP：Google Calendar / Slack / GitHub
- 触发：定时巡检 + 事件状态变更 + 阈值告警

## 5.2 Market Intelligence

- 文件：`stage2/agents/market_intelligence.agent.json`
- MCP：Tavily / Exa / RSS
- 触发：全量扫描 + 增量扫描 + 临时情报任务

## 5.3 Risk Control

- 文件：`stage2/agents/risk_control.agent.json`
- MCP：Legal Database / Financial News
- 触发：高分商机进入风控、敏感关键词命中、定时复评

## 5.4 Product Designer

- 文件：`stage2/agents/product_designer.agent.json`
- MCP：Figma / DALL-E 3 Image Gen
- 触发：风控通过、需求变更

## 5.5 Developer

- 文件：`stage2/agents/developer.agent.json`
- MCP：Filesystem / GitHub / Docker
- 触发：设计包批准、缺陷回流、依赖修复窗口

## 5.6 QA Tester

- 文件：`stage2/agents/qa_tester.agent.json`
- MCP：Puppeteer / Pytest Executor
- 触发：PR/合并、夜间回归、高风险变更加测

## 6. 建议的生产加固（基于分析）

1. 对全部 MCP 服务做版本锁定（tag 或 commit SHA），避免供应链漂移。
2. 默认最小权限：按 Agent 维度拆分 API Key，禁止跨角色复用高权限 token。
3. 网络隔离：高风险工具（Filesystem、Docker、Git）运行在受限执行环境。
4. 增加“工具调用审计日志”：记录参数、调用人、结果摘要与失败原因。
5. 为每个 Agent 建立“降级策略”：远程 MCP 不可用时切换本地缓存或备用服务。

## 7. 主要参考来源（本阶段检索）

1. GitHub MCP 官方：  
   https://github.com/github/github-mcp-server
2. Slack MCP（Zencoder）：  
   https://github.com/zencoderai/slack-mcp-server
3. Google Workspace MCP：  
   https://github.com/ngs/google-mcp-server
4. Tavily MCP：  
   https://github.com/tavily-ai/tavily-mcp
5. Exa MCP：  
   https://github.com/exa-labs/exa-mcp-server
6. RSS MCP：  
   https://github.com/buhe/mcp_rss
7. CourtListener MCP：  
   https://github.com/Travis-Prall/court-listener-mcp
8. Alpha Vantage MCP：  
   https://github.com/alphavantage/alpha_vantage_mcp
9. Figma MCP 官方入口：  
   https://www.figma.com/mcp-catalog/
10. Figma MCP Registry 条目：  
   https://github.com/mcp/figma/mcp-server
11. ImageGen MCP（支持 DALL-E 3）：  
   https://github.com/spartanz51/imagegen-mcp
12. OpenAI DALL·E 3 文档：  
   https://help.openai.com/en/articles/8555480-dall-e-3-api  
   https://platform.openai.com/docs/models/dall-e-3
13. Filesystem MCP（社区活跃）：  
   https://github.com/mark3labs/mcp-filesystem-server
14. Docker MCP：  
   https://github.com/ckreiling/mcp-server-docker
15. Puppeteer MCP：  
   https://github.com/ratiofu/mcp-puppeteer
16. Pytest Runner MCP：  
   https://github.com/jwilger/mcp-pytest-runner
17. MCP 参考仓库说明（参考实现与归档说明）：  
   https://github.com/modelcontextprotocol/servers

