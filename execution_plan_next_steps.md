# Suroc-AITeam 实操执行规划（Next Steps）

- 创建日期：2026-03-19
- 目标：把现有 Phase1-Phase4 的文档与代码变成可运行、可观测、可迭代的系统

## 0. 执行原则

1. 先打通最小闭环，再做规模化。
2. 每一步都有验收标准（DoD）。
3. 任何外部依赖失败都可降级到 mock 模式继续推进。

## 1. 第 1 天：环境与仓库基线

## 1.1 你要做什么

1. 安装/确认工具：`git`、`python`、`node`、`npm`、`docker`（可选）。
2. 进入项目根目录：`d:\Whitelist\Template\Building\Suroc-AITeam`。
3. 执行一次基线检查（版本、目录完整性）。

## 1.2 建议命令

```powershell
git --version
python --version
node --version
npm --version
docker --version
```

## 1.3 验收标准（DoD）

1. 本机具备 Python 与 Node。
2. 能进入项目目录并看到 `stage2/`, `stage3/`, `Documentation_Pack/`。

## 2. 第 1-2 天：MCP 服务配置落地

## 2.1 你要做什么

1. 先 dry-run 看脚本动作。
2. 再执行真实克隆/安装。
3. 填写 MCP 所需 API Key。

## 2.2 建议命令

```powershell
python Documentation_Pack\MCP_Manual\scripts\bootstrap_mcp_services.py --mode all --dry-run
python Documentation_Pack\MCP_Manual\scripts\bootstrap_mcp_services.py --mode all --update
```

生成并编辑：

- `Documentation_Pack/MCP_Manual/config/.env.mcp.template`
- `Documentation_Pack/MCP_Manual/config/mcp_servers.template.json`

## 2.3 验收标准（DoD）

1. `Documentation_Pack/MCP_Manual/sources/` 下出现目标 MCP 仓库。
2. `config` 下模板文件已生成并填入关键环境变量。
3. `logs/bootstrap_report_*.md` 无关键失败项（或失败项有替代方案）。

## 3. 第 2-3 天：前端看板启动与联调入口

## 3.1 你要做什么

1. 启动 Phase3 看板。
2. 先用内置 mock+SSE 验证页面可运行。
3. 再准备接后端 WebSocket。

## 3.2 建议命令

```powershell
cd stage3\agent-dashboard
npm install
npm run dev
```

打开：

- `http://localhost:3000`

## 3.3 验收标准（DoD）

1. 页面能显示活跃 Agent、日志流、成功率、漏斗图、状态迁移表。
2. SSE 模拟流每 2 秒有增量变化。

## 4. 第 3-5 天：后端最小 Runtime（必须项）

## 4.1 你要做什么

1. 建一个最小后端服务（建议 Python FastAPI 或 Node）。
2. 实现 3 个能力：
   - 写入 `task_state_transitions`
   - 写入 `agent_logs`
   - WebSocket 推送事件到前端

## 4.2 最小接口建议

1. `POST /events/log`
2. `POST /events/transition`
3. `GET /ws/agent-events`（WebSocket）

## 4.3 验收标准（DoD）

1. 前端设置 `NEXT_PUBLIC_WS_URL` 后可显示真实后端事件。
2. 状态变化可在数据库中按时间回放。

## 5. 第 5-7 天：六 Agent 串联演练（试运行）

## 5.1 你要做什么

1. 先串 3 个 Agent（Market -> Risk -> Team Lead）做闭环。
2. 再扩到 6 个 Agent 完整链路。
3. 对每次任务记录成本、输入输出和状态迁移。

## 5.2 验收标准（DoD）

1. 一条任务能完整流转并生成最终汇总。
2. 测试失败能回流到 Developer。
3. 看板指标与数据库统计一致。

## 6. 第 2 周：稳定性与上线准备

## 6.1 你要做什么

1. 增加重试、幂等键、告警（Slack）。
2. 做权限与脱敏（日志、输入输出）。
3. 做每日自动报告任务（Team Lead）。

## 6.2 验收标准（DoD）

1. 连续运行 24 小时无致命中断。
2. 失败重试与降级策略可验证。
3. 每日自动报告可生成并推送。

## 7. 你的今日执行清单（直接照做）

1. 运行 MCP 脚本 `--mode all --update`。
2. 填写 `.env.mcp.template` 并生成正式 `.env`。
3. 启动 `stage3/agent-dashboard`，确认 UI 正常。
4. 决定后端 Runtime 技术栈（Python 或 Node）。
5. 实现最小 WebSocket 事件网关（先跑通 log/transition 两类事件）。

## 8. 风险与回退

1. MCP 服务安装失败：先保留仓库源码，跳过该服务，用 mock 数据继续闭环。
2. WebSocket 暂不可用：前端继续使用 SSE fallback。
3. 部分 API Key 未就绪：对应 Agent 标记为 `degraded`，不阻塞主流程验证。

## 9. 对齐建议（你回复我即可）

为了下一步我直接帮你继续落地，请你只回复一个选项：

1. `A`：我先帮你做“后端最小 Runtime（Python FastAPI + WebSocket + PostgreSQL）”
2. `B`：我先帮你做“MCP 服务真实安装与连通性验证”
3. `C`：我先帮你做“六 Agent 编排脚手架（LangGraph）”
