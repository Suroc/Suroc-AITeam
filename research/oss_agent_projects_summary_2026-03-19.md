# 开源项目总结（精炼版）

- 更新日期: 2026-03-19
- 上游原始清单: `research/oss_agent_projects_raw_2026-03-19.md`
- 目标: 为“类似 OpenClaw + 可视化管理 + 多模态智能体 + AI 团队”路线提供可执行选型。

## 1) 一句话结论

- 若你要做“AI 团队平台”主线: 以 `CrewAI + LangGraph + AutoGen + AgentScope` 作为编排核心最稳。
- 若你要做“可视化管理后台”主线: 以 `Dify / Flowise / Langflow / n8n` 作为 UI 编排层最省时间。
- 若你要做“OpenClaw 类 computer-use”主线: 以 `OpenClaw / OpenHands / browser-use / CUA / UI-TARS` 做执行层，`OmniParser` 做视觉理解底座。
- 若你要做“多角色软件公司模拟”主线: 以 `MetaGPT / ChatDev / CAMEL / AgentVerse` 做研究线对照组。

## 2) 精炼项目矩阵

| 类别 | 项目 | 定位 | 可视化管理 | 多模态/GUI | AI团队协作 | 备注 |
|---|---|---|---|---|---|---|
| OpenClaw 相近 | OpenClaw | 个人 AI 助手/自治代理 | 弱 | 中 | 中 | 目标形态对齐 |
| OpenClaw 相近 | OpenHands | AI 工程执行代理 | 中 | 中 | 中 | 开发任务落地强 |
| OpenClaw 相近 | Open Interpreter | 电脑控制与命令执行 | 弱 | 中 | 弱 | 单代理快速验证 |
| OpenClaw 相近 | browser-use | 网页执行代理 | 弱 | 中 | 弱 | 浏览器自动化成熟 |
| OpenClaw 相近 | Skyvern | 浏览器工作流代理 | 中 | 中 | 弱 | 业务流程自动化 |
| OpenClaw 相近 | CUA | computer-use 基础设施 | 弱 | 强 | 弱 | 跨平台操作层 |
| OpenClaw 相近 | UI-TARS Desktop | 桌面多模态代理 | 中 | 强 | 弱 | GUI 操作能力强 |
| 多模态组件 | OmniParser | GUI 视觉解析器 | 弱 | 强 | 弱 | 可作为感知层 |
| 多模态组件 | AppAgent | 移动端 APP 操作代理 | 弱 | 强 | 弱 | 手机端代表项目 |
| 可视化平台 | Dify | 生产级 agent workflow 平台 | 强 | 中 | 中 | 企业化最完整之一 |
| 可视化平台 | Flowise | 可视化搭建 AI Agents | 强 | 中 | 中 | 上手成本低 |
| 可视化平台 | Langflow | 可视化流程 + 部署 | 强 | 中 | 中 | 与 LangChain 生态相近 |
| 可视化平台 | n8n | 通用自动化 + AI 能力 | 强 | 弱 | 中 | 非 AI 场景整合强 |
| 可视化平台 | ComfyUI | 节点式多模态工作流 | 强 | 强 | 弱 | 图像/视频生成链路强 |
| AI 团队框架 | CrewAI | Crew+Flow 多角色协作 | 中 | 中 | 强 | 团队协作友好 |
| AI 团队框架 | AutoGen | 多代理对话与工具编排 | 中 | 中 | 强 | 研究与工程兼容 |
| AI 团队框架 | LangGraph | 图状态机编排 | 中 | 中 | 强 | 复杂流程可控性高 |
| AI 团队框架 | Semantic Kernel | 企业级编排 SDK | 中 | 中 | 中 | 微软生态友好 |
| AI 团队框架 | MetaGPT | AI 软件公司范式 | 弱 | 弱 | 强 | 团队分工思路清晰 |
| AI 团队框架 | ChatDev | 软件流程多角色协作 | 弱 | 弱 | 强 | 教学/研究价值高 |
| AI 团队框架 | AgentVerse | 多代理任务与模拟 | 弱 | 弱 | 强 | 偏研究平台 |
| AI 团队框架 | AgentScope | 可观测可控多代理 | 中 | 中 | 强 | 工程化观测较好 |
| AI 团队框架 | CAMEL | 多代理研究生态 | 弱 | 中 | 中 | 学术与社区活跃 |
| AI 团队框架 | smolagents | 轻量代码型 agent | 弱 | 中 | 弱 | 原型效率高 |
| AI 团队框架 | pydantic-ai | 类型安全 agent 框架 | 弱 | 中 | 弱 | Python 工程规范友好 |
| AI 团队框架 | LlamaIndex | RAG + Agent 编排 | 中 | 中 | 中 | 知识库场景强 |
| AI 团队框架 | Agno | 生产导向多代理 | 中 | 中 | 中 | 新兴框架，需跟踪 |
| AI 团队框架 | Haystack | 组件化流程与 agent | 中 | 中 | 中 | 检索增强经验丰富 |
| AI 团队框架 | Griptape | 模块化 agents/workflows | 中 | 中 | 中 | 中等体量、可扩展 |
| 历史代表 | AutoGPT | 早期自治代理 | 弱 | 弱 | 中 | 历史里程碑项目 |
| 历史代表 | SuperAGI | 早期平台化多代理 | 中 | 弱 | 中 | 活跃度需评估 |
| 历史代表 | TaskWeaver | 代码优先代理框架 | 弱 | 弱 | 中 | 2026-02-05 已归档 |
| 新近框架 | Mastra | TS 生态 agent/workflow | 中 | 中 | 中 | 对前端团队友好 |

## 3) 推荐落地路径（按你的当前工程）

1. 主干编排层: `LangGraph` 或 `CrewAI` 二选一作为核心。
2. 可视化运营层: `Dify`（企业向）或 `Flowise/Langflow`（快速迭代向）。
3. 多模态执行层: `browser-use + UI-TARS + OmniParser` 组合。
4. AI团队实验层: `MetaGPT + ChatDev + CAMEL` 做基准对照。
5. 可观测与治理: 引入 `AgentScope` 的可观测思路，统一日志与状态。

## 4) 风险与维护提示

- 不要直接依赖已归档项目（如 TaskWeaver）做核心生产路径。
- 对历史项目（AutoGPT/SuperAGI）建议作为“能力参考”，而非主框架。
- 新兴框架（Agno/Mastra）建议先在沙盒验证，再进入主干。

## 5) 官方仓库引用（检索来源）

- https://github.com/openclaw/openclaw
- https://github.com/OpenHands/OpenHands
- https://github.com/openinterpreter/open-interpreter
- https://github.com/browser-use/browser-use
- https://github.com/Skyvern-AI/skyvern
- https://github.com/trycua/cua
- https://github.com/bytedance/UI-TARS-desktop
- https://github.com/microsoft/OmniParser
- https://github.com/TencentQQGYLab/AppAgent
- https://github.com/LLmHub-dev/open-computer-use
- https://github.com/langgenius/dify
- https://github.com/FlowiseAI/Flowise
- https://github.com/langflow-ai/langflow
- https://github.com/n8n-io/n8n
- https://github.com/Comfy-Org/ComfyUI
- https://github.com/crewAIInc/crewAI
- https://github.com/microsoft/autogen
- https://github.com/langchain-ai/langgraph
- https://github.com/microsoft/semantic-kernel
- https://github.com/FoundationAgents/MetaGPT
- https://github.com/OpenBMB/ChatDev
- https://github.com/OpenBMB/AgentVerse
- https://github.com/agentscope-ai/agentscope
- https://github.com/camel-ai/camel
- https://github.com/huggingface/smolagents
- https://github.com/pydantic/pydantic-ai
- https://github.com/run-llama/llama_index
- https://github.com/agno-agi/agno
- https://github.com/deepset-ai/haystack
- https://github.com/griptape-ai/griptape
- https://github.com/Significant-Gravitas/AutoGPT
- https://github.com/TransformerOptimus/SuperAGI
- https://github.com/microsoft/TaskWeaver
- https://github.com/mastra-ai/mastra
