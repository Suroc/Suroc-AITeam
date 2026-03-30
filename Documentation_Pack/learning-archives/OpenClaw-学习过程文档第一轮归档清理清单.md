# OpenClaw 学习过程文档第一轮归档清理清单

更新时间：2026-03-26 15:48 CST
状态：round-1 execution

## 1. 本轮触发原因
本地 `tasks/` 中已累计大量学习过程文档，且本次 `Filesystem MCP + GitHub 执行能力` 已达到投入使用，满足“学习过程文档沉淀—归档—清理流”的自动执行条件。

## 2. 已有稳定沉淀
以下稳定文档已可承接本轮核心经验：

1. `Documentation_Pack/OpenClaw-从学习到投入使用-实战教程.md`
2. `Documentation_Pack/learning-archives/OpenClaw-学习过程文档归档与清理工作流.md`
3. `ops/task-artifact-archival-policy.md`
4. `memory/2026-03-26.md`

## 3. 本轮默认保留范围
### 3.1 长期规则 / 关键整改
- `tasks/execution-consistency-correction-round29.md`

### 3.2 当前仍具独立价值的非 round 文档
- `tasks/README.md`
- `tasks/skill-learning-workflow.md`
- `tasks/skill-install-audit-2026-03-26.md`
- `tasks/common-skill-routing-table-final.md`

## 4. 本轮归档后清理候选
### 4.1 MCP 学习过程稿
- `tasks/mcp-learning-evolution-round1.md` ~ `tasks/mcp-learning-evolution-round17.md`
- `tasks/mcp-install-prep-round18.md` ~ `tasks/mcp-install-prep-round26.md`
- `tasks/mcp-execution-prep-round27.md`
- `tasks/mcp-execution-prep-round28.md`
- `tasks/mcp-execution-action-round30.md`
- `tasks/mcp-execution-action-round31.md`
- `tasks/mcp-execution-checklist-round32.md`

### 4.2 Agent / GitHub 学习过程稿
- `tasks/agent-learning-evolution-round1.md` ~ `tasks/agent-learning-evolution-round17.md`
- `tasks/agent-github-proposal-round18.md` ~ `tasks/agent-github-proposal-round26.md`
- `tasks/agent-github-establish-prep-round27.md`
- `tasks/agent-github-establish-prep-round28.md`
- `tasks/agent-github-establish-action-round30.md`
- `tasks/agent-github-establish-action-round31.md`
- `tasks/agent-github-establish-checklist-round32.md`

## 5. 本轮执行边界
1. 只处理已被稳定教程与归档文档覆盖的学习过程稿
2. 不删除 `MEMORY.md` / `memory/*.md` / `AGENTS.md`
3. 不删除当前仍具长期规则价值的关键整改文件
4. 不碰与本轮主题无关的其他业务文档

## 6. 本轮下一步
1. 将本清单与已生成稳定文档一并提交到 AITeam Git 仓库
2. Git 推送完成后，执行本地过程稿清理
3. 清理后回报剩余保留文件与已删除范围
