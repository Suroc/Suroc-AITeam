# 第三阶段：可视化监控与状态记录系统开发

- 项目：Suroc-AITeam
- 阶段目标：实时展示 Agent 活跃状态、日志流、任务成功率、商机转化漏斗，并持久化状态迁移数据
- 生成日期：2026-03-19

## 1. 需求分析（含决策过程）

## 1.1 功能拆解

用户需求拆解为四个前端视图能力与两个后端支撑能力：

1. 前端实时态势：当前活跃 Agent。
2. 前端日志可视：实时日志流。
3. 前端指标看板：任务成功率、失败数、平均成本。
4. 前端漏斗图：商机从扫描到测试通过的转化过程。
5. 后端状态持久化：记录任务状态机的每次迁移。
6. 实时推送机制：将 Agent 日志和状态变化推送到前端。

## 1.2 技术选型分析

1. 前端框架：`Next.js + React + Tailwind CSS`  
原因：具备组件化开发、SSR/路由能力、UI 开发效率高。

2. 图表库：`Recharts`  
原因：对漏斗图和响应式容器支持直接，接入成本低。

3. 实时通道：`WebSocket 优先 + SSE 兜底 + Snapshot API`  
原因：  
- WebSocket 最适合高频双向消息。  
- SSE 在 Next.js Route Handler 中实现简单，适合作为本地演示与降级方案。  
- Snapshot API 可用于首屏加载与断线恢复。

4. 状态持久化：`PostgreSQL`  
原因：支持审计、事务一致性、复杂查询与 BI 分析。

## 1.3 状态机建模原则

任务状态采用统一枚举，便于跨 Agent 统计与回放：

- `queued`
- `running`
- `handoff`
- `succeeded`
- `failed`
- `cancelled`

每次状态变化写入一条 transition 记录，包含你要求的字段：

- `Task_ID`
- `Agent_Name`
- `Input`
- `Output`
- `Cost`
- `Timestamp`

## 2. 已落地代码框架

## 2.1 目录结构

```text
stage3/
  agent-dashboard/
    app/
      api/dashboard/snapshot/route.ts
      api/dashboard/events/route.ts
      globals.css
      layout.tsx
      page.tsx
    components/
      ActiveAgentsPanel.tsx
      FunnelChartCard.tsx
      LogStreamPanel.tsx
      MetricsBoard.tsx
      Panel.tsx
      StateTransitionsTable.tsx
    hooks/
      useDashboardStream.ts
    lib/
      mock.ts
      types.ts
    package.json
    tailwind.config.ts
    postcss.config.mjs
    tsconfig.json
    README.md
  db/
    schema.sql
```

## 2.2 前端页面能力映射

1. `ActiveAgentsPanel`：展示每个 Agent 的 `status/currentTask/更新时间`。
2. `LogStreamPanel`：滚动显示 `info/warn/error` 日志。
3. `MetricsBoard`：展示成功率、总任务数、失败数、平均成本，并显示连接状态。
4. `FunnelChartCard`：展示商机转化漏斗。
5. `StateTransitionsTable`：展示状态机迁移明细（Task、Agent、From/To、Cost、Timestamp）。

## 2.3 数据流实现

`useDashboardStream` Hook 的策略：

1. 首次加载：请求 `/api/dashboard/snapshot`。
2. 若配置 `NEXT_PUBLIC_WS_URL`：优先连接 WebSocket。
3. 若未配置或不可用：连接 `/api/dashboard/events`（SSE）。
4. 收到事件后按 `type` 增量更新本地状态（`log/transition/metrics/funnel/...`）。

## 3. 数据库 Schema 设计

Schema 文件：`stage3/db/schema.sql`

## 3.1 核心表

1. `agents`：Agent 注册信息与心跳状态。
2. `tasks`：任务主信息。
3. `task_state_transitions`：状态迁移审计表（核心）。
4. `agent_logs`：日志明细。
5. `metrics_hourly`：小时级 KPI 汇总。
6. `opportunity_funnel_snapshots`：漏斗快照。

## 3.2 关键字段映射（满足题目要求）

在 `task_state_transitions` 中对应如下：

1. `Task_ID` -> `task_id`
2. `Agent_Name` -> `agent_name`
3. `Input` -> `input_payload` (JSONB)
4. `Output` -> `output_payload` (JSONB)
5. `Cost` -> `cost_usd`
6. `Timestamp` -> `timestamp`

## 3.3 查询与性能

已为常见查询建索引：

1. 按任务回放状态流：`(task_id, timestamp DESC)`
2. 按 Agent 审计：`(agent_name, timestamp DESC)`
3. 按时间窗口汇总：`tasks/metrics/funnel` 时间列索引

## 4. 实时推送集成说明（WebSocket 或 API）

## 4.1 推荐生产路径（WebSocket）

1. 后端 Agent Runtime 将标准事件写入消息总线（Redis Streams/Kafka）。
2. Realtime Gateway 消费总线并广播到 WebSocket 客户端。
3. 前端在 `.env.local` 设置：

```bash
NEXT_PUBLIC_WS_URL=ws://your-realtime-gateway/ws/agent-events
```

4. 前端收到事件后按 `type` 更新局部状态，避免整页重渲染。

## 4.2 事件协议（建议）

```json
{
  "type": "transition",
  "payload": {
    "transitionId": "TR-9001",
    "taskId": "TASK-20260319-009",
    "agentName": "risk_control",
    "fromState": "running",
    "toState": "succeeded",
    "inputPayload": "{\"opportunity_id\":\"OPP-7781\"}",
    "outputPayload": "{\"risk_score\":0.42}",
    "costUsd": 0.31,
    "timestamp": "2026-03-19T09:21:10.000Z"
  }
}
```

## 4.3 API/SSE 兜底路径

1. 首屏先请求 `/api/dashboard/snapshot`。
2. 持续监听 `/api/dashboard/events`（SSE）接收增量事件。
3. 若 SSE 中断，前端可重新拉取 snapshot 恢复状态。

## 5. 运行与联调说明

在 `stage3/agent-dashboard` 目录：

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:3000
```

若未接入真实后端，也可以看到内置 mock 数据和 SSE 模拟流。

## 6. 风险与加固建议（分析结论）

1. 事件幂等：增加 `event_id` 去重，避免重连导致重复写库。
2. 成本一致性：`cost_usd` 由后端统一结算，前端只读展示。
3. 日志安全：对 `input/output` 做脱敏（PII、密钥、财务敏感字段）。
4. 高可用：WebSocket 网关建议无状态化，结合 Redis/Kafka 做广播扩展。
5. 数据生命周期：热数据放主表，冷日志按月归档到分区或对象存储。

## 7. 本阶段交付物清单

1. 前端代码框架：`stage3/agent-dashboard/*`
2. 状态持久化 Schema：`stage3/db/schema.sql`
3. 运行说明：`stage3/agent-dashboard/README.md`
4. 阶段总文档：`phase3_visualization_state_persistence.md`（本文件）
