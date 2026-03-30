# OpenClaw 学习过程文档归档与清理工作流（首版汇总）

更新时间：2026-03-26 15:34 CST
状态：stable
适用范围：Skill / MCP / Agent 学习流产生的大量过程文档

---

## 1. 为什么需要这个工作流

在学习和强化过程中，会持续产生大量类似以下文件：

- `tasks/mcp-learning-evolution-round*.md`
- `tasks/agent-learning-evolution-round*.md`
- `tasks/mcp-install-prep-round*.md`
- `tasks/mcp-execution-*.md`
- `tasks/agent-github-proposal-round*.md`
- `tasks/agent-github-establish-*.md`

这些文件的价值主要在于：
- 记录过程推演
- 留存阶段判断
- 提供中间验收链

但它们通常不是长期记忆本身。

如果长期堆积，会造成：
1. 工作区噪音变大
2. 检索成本上升
3. 上下文污染风险增加
4. 本地磁盘空间持续被消耗

因此需要固定的“沉淀—归档—清理”闭环。

---

## 2. 结论性原则

### 2.1 不直接删过程稿
先沉淀核心经验，再归档到 Git，最后再删除本地中间稿。

### 2.2 长期记忆与过程文档分层
- 长期规则：写入 `MEMORY.md` / `memory/*.md`
- 稳定知识：写入 Git 教程 / runbook / 汇总文档
- 中间推演：归档后可清理

### 2.3 判断是否可清理的标准
如果某批过程文档已经满足：
1. 核心经验已被提炼
2. 最终清单 / runbook 已形成
3. Git 归档已完成

那么这些过程文件就不再是长期必留资产。

---

## 3. 标准工作流

## Phase A：核心沉淀
从多轮 round / prep / checklist / action 文档中提炼：

1. 长期规则
2. 最终操作清单
3. 稳定教程 / runbook
4. 学习总结文档

## Phase B：Git 归档
优先写入：

```text
Documentation_Pack/tutorials/
Documentation_Pack/runbooks/
Documentation_Pack/learning-archives/
```

形成至少一份高密度稳定文档，再推送到 GitHub。

## Phase C：本地清理
在确认 Git 已归档后：

1. 保留当前活跃任务文件
2. 保留关键纠错文档
3. 清理被稳定文档覆盖的中间稿

---

## 4. 默认触发条件
满足任一条件时，自动评估是否执行归档清理：

1. 单一学习主题 round 文档超过 10 份
2. `tasks/` 中同类中间稿超过 20 份
3. 某项能力已达到“投入使用”
4. 任务已经明显收口
5. 老大明确说“收尾 / 归档 / 做教程 / 清理”

---

## 5. 本次学习的直接应用
本次 `Filesystem MCP + GitHub 执行能力` 学习过程，已经满足：

1. 能力已达到投入使用
2. 稳定教程已形成
3. 经验已经可以抽成长期工作流

因此后续应按该工作流：
- 将核心教程与归档文档放入 AITeam Git 仓库
- 再清理本地 round / prep / checklist / action 中间稿

---

## 6. 一句话规则

**过程记录不是长期记忆；核心经验进记忆与 Git，已被稳定文档覆盖的学习中间稿定期清理。**
