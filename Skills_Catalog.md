# Skills Catalog

更新时间：2026-03-19  
范围：Suroc-AITeam 六大 Agent 的技能库（Phase 2 定义）  
说明：`Skill` 为业务能力单元；下载地址给出该技能主要依赖的 MCP 服务包或仓库。

## Team Lead

| Skill 名称 | 下载地址（npm/python/repo） | 功能描述 | 调用参数示例 |
|---|---|---|---|
| `skill_task_orchestration` | LangGraph: https://github.com/langchain-ai/langgraph | 多 Agent 任务编排、依赖调度、路由分发 | `{"task_id":"TASK-001","priority":1,"dependencies":["TASK-000"]}` |
| `skill_priority_routing` | GitHub MCP: https://github.com/github/github-mcp-server | 按优先级分发到具体执行 Agent | `{"task_id":"TASK-001","target_agent":"developer","reason":"risk_passed"}` |
| `skill_incident_escalation` | Slack MCP: https://github.com/zencoderai/slack-mcp-server | 异常升级、通知值班与阻断任务 | `{"channel":"#ops-alert","severity":"high","incident_id":"INC-88"}` |
| `skill_daily_reporting` | Google MCP: https://github.com/ngs/google-mcp-server | 汇总日报并创建会议日程 | `{"report_date":"2026-03-19","meeting_start":"2026-03-20T09:00:00Z"}` |

## Market Intelligence

| Skill 名称 | 下载地址（npm/python/repo） | 功能描述 | 调用参数示例 |
|---|---|---|---|
| `skill_source_discovery` | Tavily MCP: https://github.com/tavily-ai/tavily-mcp | 全网检索潜在商机来源 | `{"query":"AI automation in logistics","max_results":20}` |
| `skill_signal_dedup` | Exa MCP: https://github.com/exa-labs/exa-mcp-server | 对检索结果去重聚类 | `{"documents":[{"url":"https://..."}],"strategy":"semantic"}` |
| `skill_opportunity_scoring` | Tavily MCP + Exa MCP | 商机评分（热度/时效/可行性） | `{"opportunity_id":"OPP-102","weights":{"demand":0.4,"speed":0.3,"feasibility":0.3}}` |
| `skill_brief_summarization` | RSS MCP: https://github.com/buhe/mcp_rss | 输出结构化商机简报 | `{"cluster_id":"CL-55","format":"brief_v1"}` |

## Risk Control

| Skill 名称 | 下载地址（npm/python/repo） | 功能描述 | 调用参数示例 |
|---|---|---|---|
| `skill_legal_compliance_check` | Court Listener MCP: https://github.com/Travis-Prall/court-listener-mcp | 合规检索（法规/判例） | `{"jurisdiction":"US","keywords":["privacy","data residency"]}` |
| `skill_financial_viability_assessment` | Alpha Vantage MCP: https://github.com/alphavantage/alpha_vantage_mcp | 财务新闻与波动风险评估 | `{"symbols":["NVDA","MSFT"],"from_date":"2026-03-01","to_date":"2026-03-19"}` |
| `skill_risk_scoring` | 内部规则引擎（自建） | 按规则模板输出风险分 | `{"opportunity_id":"OPP-102","signals":{"legal":0.3,"market":0.2}}` |
| `skill_go_no_go_gatekeeping` | LangGraph + Risk MCPs | 执行风控闸门决策 | `{"task_id":"TASK-001","risk_score":0.68,"threshold":0.7}` |

## Product Designer

| Skill 名称 | 下载地址（npm/python/repo） | 功能描述 | 调用参数示例 |
|---|---|---|---|
| `skill_prd_generation` | Figma MCP Catalog: https://www.figma.com/mcp-catalog/ | 生成 PRD 与验收标准草案 | `{"project":"Ops Dashboard","target_users":["operator","manager"]}` |
| `skill_user_flow_design` | Figma MCP Registry: https://github.com/mcp/figma/mcp-server | 设计主流程与异常流程 | `{"flow_name":"opportunity_review","nodes":12}` |
| `skill_wireframe_prototyping` | ImageGen MCP: https://github.com/spartanz51/imagegen-mcp | 概念图与线框生成（DALL-E 3） | `{"prompt":"Operations dashboard with funnel and live logs","model":"dall-e-3"}` |
| `skill_design_handoff` | Figma MCP + GitHub MCP | 设计交接到研发与测试 | `{"figma_file":"abc123","handoff_targets":["developer","qa_tester"]}` |

## Developer

| Skill 名称 | 下载地址（npm/python/repo） | 功能描述 | 调用参数示例 |
|---|---|---|---|
| `skill_task_decomposition` | LangGraph: https://github.com/langchain-ai/langgraph | 将 PRD 切分为开发任务 | `{"epic":"dashboard_streaming","max_task_size":"M"}` |
| `skill_code_implementation` | Filesystem MCP: https://github.com/mark3labs/mcp-filesystem-server | 本地代码读写与实现 | `{"action":"write","path":"app/page.tsx","content":"..."} ` |
| `skill_refactor_and_hardening` | GitHub MCP | 代码重构、审查与变更管理 | `{"repo":"org/repo","action":"pr","title":"refactor stream hook"}` |
| `skill_ci_cd_alignment` | Docker MCP: https://github.com/ckreiling/mcp-server-docker | 容器构建、环境一致性检查 | `{"action":"build","service":"agent-dashboard","args":["--no-cache"]}` |

## QA Tester

| Skill 名称 | 下载地址（npm/python/repo） | 功能描述 | 调用参数示例 |
|---|---|---|---|
| `skill_test_plan_generation` | mcp-pytest-runner: https://github.com/jwilger/mcp-pytest-runner | 自动生成测试计划与覆盖矩阵 | `{"target_module":"dashboard","risk_level":"high"}` |
| `skill_e2e_execution` | mcp-puppeteer: https://github.com/ratiofu/mcp-puppeteer | 浏览器 E2E 自动化执行 | `{"base_url":"http://localhost:3000","scenario":"live-log-stream"}` |
| `skill_regression_analysis` | Pytest + Puppeteer MCP | 失败归因与回归分析 | `{"run_id":"RUN-9201","compare_to":"RUN-9180"}` |
| `skill_defect_reporting` | GitHub MCP | 自动创建缺陷单并回流研发 | `{"repo":"org/repo","title":"E2E timeout in funnel chart","labels":["bug","qa"]}` |

## 推荐安装命令（常用）

```bash
npm i -g @zencoderai/slack-mcp-server tavily-mcp exa-mcp-server mcp_rss imagegen-mcp @ratiofu/mcp-puppeteer
uv tool install mcp-server-docker mcp-pytest-runner marketdata-mcp-server
go install go.ngs.io/google-mcp-server@latest
```

说明：不同 MCP 服务的启动参数与认证方式存在差异，请配合 `Documentation_Pack/MCP_Manual/scripts/bootstrap_mcp_services.py` 自动生成的模板配置使用。
