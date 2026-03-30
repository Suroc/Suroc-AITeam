# OpenClaw Agent 智能体 AI 团队（一人公司）— 完整分析报告

## 一、知乎文章内容（推断总结）

由于知乎的反爬机制，两篇文章无法直接抓取。但根据文章链接的上下文和对 OpenClaw 的深度调研，这两篇文章大概率涉及：

- **文章1**（p/1971872808159141982）：OpenClaw 的基础介绍与个人 AI 助手搭建
- **文章2**（p/2008325722230523743）：基于 OpenClaw 构建 Agent 团队/一人公司的高级玩法

> **建议**：可以在浏览器中打开这两篇文章，复制正文内容粘贴，可以做更精确的总结。

---

## 二、OpenClaw 是什么？

**OpenClaw** 是一个**开源、自托管的个人 AI 助手网关平台**（前身叫 Clawdbot / Moltbot），由 Peter Steinberger 创建，拥有 **323+ 页文档**、**48 个 CLI 命令**、**35+ 模型供应商支持**。

核心定位：**将聊天应用连接到 AI 编码代理，运行在你自己的硬件上，数据完全自控。**

### 关键数据

| 指标 | 数值 |
|------|------|
| GitHub Stars | 3583 |
| 文档页数 | 323+ |
| CLI 命令 | 48 |
| 支持模型供应商 | 35+ |
| 通信渠道 | 30+ |
| 开源协议 | MIT |
| 官网 | https://openclaw.ai |
| 文档 | https://docs.openclaw.ai |
| 技能市场 | https://clawhub.ai |
| GitHub | https://github.com/openclaw |

---

## 三、OpenClaw 构建"一人公司" Agent 团队的核心能力

### 3.1 多 Agent 架构（核心能力）

OpenClaw **原生支持**多 Agent 路由，这是构建"一人公司"的基础：

| 能力 | 说明 |
|------|------|
| **Agent 隔离** | 每个 Agent 拥有独立的工作区、会话存储、认证配置——完全独立的"大脑" |
| **灵活路由** | 按渠道、账户、发送者、群组等维度将消息路由到不同 Agent |
| **独立人格** | 每个 Agent 可配置独立的 `SOUL.md`（人格）、`AGENTS.md`（行为规则） |
| **独立模型** | 不同 Agent 可使用不同 AI 模型（如日常用 Sonnet，深度工作用 Opus） |
| **Agent 间通信** | 支持 Agent-to-Agent 消息传递（需显式启用） |
| **子 Agent 委派** | 支持 Sub-Agents 和 Delegate Architecture |
| **ACP 协议** | Agent Communication Protocol，标准化的 Agent 通信协议 |

**创建多 Agent 的命令：**

```bash
openclaw agents add coding    # 编码 Agent
openclaw agents add social    # 社交媒体 Agent
openclaw agents add research  # 调研 Agent
```

#### Agent 的定义与核心构成

每个 agent 是一个完全隔离的"大脑"单元，拥有三个独立组件：

1. **工作区（Workspace）**：包含 `AGENTS.md`、`SOUL.md`、`USER.md` 等配置文件，定义人格与行为规则
2. **状态目录（agentDir）**：存储认证配置、模型注册表等，路径为 `~/.openclaw/agents/<agentId>/agent`
3. **会话存储（Session Store）**：聊天历史与路由状态，位于 `~/.openclaw/agents/<agentId>/sessions`

#### 路径总览

| 用途 | 默认路径 |
|------|----------|
| 全局配置 | `~/.openclaw/openclaw.json`（或 `OPENCLAW_CONFIG_PATH`） |
| 状态目录 | `~/.openclaw`（或 `OPENCLAW_STATE_DIR`） |
| 工作区 | `~/.openclaw/workspace` 或 `~/.openclaw/workspace-<agentId>` |
| Agent目录 | `~/.openclaw/agents/<agentId>/agent` |
| 会话 | `~/.openclaw/agents/<agentId>/sessions` |

#### 路由规则（Bindings）优先级

绑定采用**确定性、最具体匹配优先**的策略，优先级从高到低：

1. `peer` 精确匹配（特定 DM/群组/频道 ID）
2. `parentPeer` 匹配（线程继承）
3. `guildId + roles`（Discord 角色路由）
4. `guildId`（Discord）
5. `teamId`（Slack）
6. `accountId` 匹配
7. 渠道级匹配（`accountId: "*"`）
8. 回退到默认 agent（`agents.list[].default` 或列表首项，默认 `main`）

#### Per-Agent 沙箱与工具控制

每个 agent 可独立配置沙箱级别和工具权限：

| 配置项 | 说明 |
|--------|------|
| `sandbox.mode` | `"off"` 关闭 / `"all"` 始终启用 |
| `sandbox.scope` | `"agent"` 每 agent 一个容器 / `"shared"` 共享 |
| `sandbox.docker.setupCommand` | 容器创建后运行一次的初始化命令 |
| `tools.allow` | 允许的工具白名单 |
| `tools.deny` | 禁止的工具黑名单 |

---

### 3.2 30+ 通信渠道集成

Agent 团队可以同时覆盖：

**内置支持：**
- WhatsApp、Telegram、Discord、Slack、Signal、iMessage

**插件扩展：**
- Microsoft Teams、Google Chat、Mattermost、Matrix
- 飞书（Feishu）、LINE、Zalo、IRC、Nostr、Twitch
- BlueBubbles、Synology Chat、Nextcloud Talk、Tlon

**支持多账户的渠道：**
whatsapp、telegram、discord、slack、signal、imessage、irc、line、googlechat、mattermost、matrix、nextcloud-talk、bluebubbles、zalo、nostr、feishu 等。

---

### 3.3 技能系统（Skills）— Agent 的能力扩展

| 特性 | 说明 |
|------|------|
| **ClawHub 技能市场** | 社区共享的技能包，一键安装 `npx clawhub@latest install <skill>` |
| **自建技能** | 可以自己编写 Skills，放在 Agent 工作区的 `skills/` 文件夹 |
| **AI 自创技能** | Agent 可以通过对话**自己创建新技能** |
| **共享与隔离** | 技能分 per-agent（各 Agent 工作区 `skills/`）和 shared（`~/.openclaw/skills`）两种 |
| **版本管理** | 采用类似 npm 的版本控制方式，支持版本化、可回滚 |
| **向量搜索** | 通过向量技术使技能包可被高效搜索 |

---

### 3.4 自动化引擎

| 功能 | 说明 |
|------|------|
| **Cron 定时任务** | 定时执行任务（如每日报告、定期检查） |
| **Heartbeat 心跳** | 主动式检查，AI 自动评估如何帮你 |
| **Webhooks** | 接收外部事件（如 Sentry 报错），自动修 bug、提 PR |
| **Hooks 钩子** | 事件驱动的自动化 |
| **Standing Orders** | 持久性指令，Agent 长期遵循 |
| **Gmail PubSub** | Gmail 推送通知集成 |
| **Polls 轮询** | 基于轮询的自动化机制 |

---

### 3.5 其他关键能力

- **持久记忆**：跨会话记忆，记住用户偏好和上下文（支持 Builtin、Honcho、QMD 三种引擎）
- **浏览器自动化**：可浏览网页、填表、抓取数据
- **代码执行**：沙箱化的代码执行环境
- **媒体处理**：图片/音频/视频/文档的收发和理解
- **语音通话**：支持 TTS 语音合成和通话、语音唤醒
- **35+ 模型供应商**：Anthropic、OpenAI、Google Gemini、DeepSeek、Qwen、Ollama 本地模型等
- **模型故障转移**：自动在不同供应商之间切换
- **OAuth 支持**：第三方服务的 OAuth 流程
- **上下文引擎**：智能构建和管理上下文窗口

---

### 3.6 支持的模型供应商（35+）

| 供应商 | 说明 |
|--------|------|
| Anthropic | Claude 系列 |
| OpenAI | GPT 系列 |
| Google | Gemini 系列 |
| Amazon Bedrock | AWS 托管模型 |
| DeepSeek | DeepSeek 模型 |
| Mistral | Mistral 模型 |
| Qwen | 阿里通义千问 |
| Groq | 高速推理 |
| Ollama | 本地模型 |
| vLLM | 本地推理框架 |
| Together AI | Together 推理 |
| OpenRouter | 多供应商网关 |
| MiniMax | MiniMax 模型 |
| xAI | Grok 模型 |
| NVIDIA | NIM 端点 |
| Hugging Face | HF 推理 API |
| Perplexity | 搜索增强 |
| LiteLLM | 多供应商代理 |
| 百度千帆 | Qianfan 平台 |
| 火山引擎 | ByteDance Doubao |
| 月之暗面 | Moonshot/Kimi |
| GitHub Copilot | Copilot 作为供应商 |
| 小米 MiMo | Xiaomi 模型 |
| 其他 | SGLang、Venice、Vercel AI Gateway、Cloudflare 等 |

---

## 四、"一人公司" Agent 团队架构设计建议

### 4.1 团队架构图

```
┌─────────────────────────────────────────────────────┐
│                   OpenClaw Gateway                   │
│                  (你的硬件/云服务器)                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  CEO Agent (Opus 模型)                               │
│  ├─ 人格：战略决策者                                   │
│  ├─ 渠道：Telegram（深度工作）                         │
│  ├─ 能力：全局规划、任务分配、Agent间协调               │
│  │                                                    │
│  Coder Agent (Sonnet 模型)                           │
│  ├─ 人格：高级工程师                                   │
│  ├─ 渠道：Discord / Slack                             │
│  ├─ 能力：代码编写、Debug、PR 管理                     │
│  │                                                    │
│  Researcher Agent (Gemini/Perplexity)                │
│  ├─ 人格：调研分析师                                   │
│  ├─ 渠道：WhatsApp                                    │
│  ├─ 能力：网络搜索、信息整理、竞品分析                  │
│  │                                                    │
│  Social Agent (Sonnet 模型)                          │
│  ├─ 人格：社交媒体运营                                 │
│  ├─ 渠道：多平台                                      │
│  ├─ 能力：内容创作、社媒管理                           │
│  │                                                    │
│  Admin Agent (轻量模型)                               │
│  ├─ 人格：行政助理                                     │
│  ├─ 渠道：iMessage / WhatsApp                         │
│  ├─ 能力：日程管理、邮件处理、提醒                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 4.2 配置示例

```json5
{
  agents: {
    list: [
      { id: "ceo",        model: "anthropic/claude-opus-4-6" },
      { id: "coder",      model: "anthropic/claude-sonnet-4-6" },
      { id: "researcher", model: "google/gemini-2.5-pro" },
      { id: "social",     model: "anthropic/claude-sonnet-4-6" },
      { id: "admin",      model: "anthropic/claude-haiku-4-5" }
    ]
  },
  bindings: [
    { agentId: "ceo",        match: { channel: "telegram" } },
    { agentId: "coder",      match: { channel: "discord" } },
    { agentId: "researcher", match: { channel: "whatsapp", accountId: "research" } },
    { agentId: "social",     match: { channel: "slack" } },
    { agentId: "admin",      match: { channel: "whatsapp", accountId: "personal" } }
  ],
  tools: {
    agentToAgent: {
      enabled: true,
      allow: ["ceo", "coder", "researcher", "social", "admin"]
    }
  }
}
```

### 4.3 跨渠道分流示例

将 WhatsApp 路由到快速日常 agent（使用 Sonnet 模型），Telegram 路由到深度工作 agent（使用 Opus 模型）：

```json5
{
  agents: {
    list: [
      { id: "chat", model: "anthropic/claude-sonnet-4-6" },
      { id: "opus", model: "anthropic/claude-opus-4-6" }
    ]
  },
  bindings: [
    { agentId: "chat", match: { channel: "whatsapp" } },
    { agentId: "opus", match: { channel: "telegram" } }
  ]
}
```

### 4.4 单号多人路由（DM Split）

在同一个 WhatsApp 号码上将不同发送者路由到不同 agent：

```json5
{
  bindings: [
    {
      agentId: "alex",
      match: { channel: "whatsapp", peer: { kind: "direct", id: "+15551230001" } }
    },
    {
      agentId: "mia",
      match: { channel: "whatsapp", peer: { kind: "direct", id: "+15551230002" } }
    }
  ],
  channels: {
    whatsapp: {
      dmPolicy: "allowlist",
      allowFrom: ["+15551230001", "+15551230002"]
    }
  }
}
```

---

## 五、OpenClaw 完整文档结构（323+ 页）

| 分类 | 页数 | 说明 |
|------|------|------|
| 自动化（Automation） | 9 | Cron、Heartbeat、Webhooks、Hooks、Standing Orders |
| 通信渠道（Channels） | 29 | 30+ 消息平台接入 |
| CLI 命令（CLI） | 48 | 完整命令行工具集 |
| 核心概念（Concepts） | 33 | Agent Runtime、多Agent路由、记忆系统、会话管理等 |
| 网关（Gateway） | 34 | 配置、安全、沙箱、远程访问 |
| 安装部署（Install） | 24 | Docker、K8s、云平台、树莓派等 |
| 节点（Nodes） | 9 | iOS/Android 节点、语音、相机 |
| 平台（Platforms） | 19 | macOS/Windows/Linux/iOS/Android 应用 |
| 插件（Plugins） | 13 | 插件开发 SDK |
| 供应商（Providers） | 37 | 35+ 模型供应商配置 |
| 参考（Reference） | 22 | 模板、配置参考 |
| 工具（Tools） | 35 | 浏览器、搜索、代码执行、多Agent工具等 |
| 入门（Getting Started） | 13 | 安装引导、快速上手 |
| 其他 | 若干 | 安全、Web界面、帮助、调试 |

---

## 六、部署方式

| 部署方式 | 说明 |
|----------|------|
| **npm 全局安装** | `npm install -g openclaw@latest` |
| **一键脚本** | curl 安装脚本，自动安装 Node.js 和依赖 |
| **Docker** | 容器化部署 |
| **Kubernetes** | K8s 部署 |
| **Git Clone** | 源码模式，完全可定制 |
| **macOS 应用** | 菜单栏伴侣应用（Beta） |
| **云平台** | Azure、GCP、DigitalOcean、Hetzner、Fly.io、Railway、Render、Oracle、Northflank |
| **树莓派** | 支持 ARM 架构 |
| **Nix** | NixOS 安装 |
| **Podman** | Podman 容器 |

---

## 七、能力评估总结

| 评估维度 | 评分 | 说明 |
|---------|------|------|
| 多 Agent 支持 | ★★★★★ | 原生支持，隔离完善，路由灵活 |
| 通信渠道 | ★★★★★ | 30+ 渠道，覆盖主流平台 |
| 模型灵活性 | ★★★★★ | 35+ 供应商，可混用不同模型 |
| 自动化能力 | ★★★★★ | Cron + Heartbeat + Webhooks + Hooks |
| 技能扩展 | ★★★★☆ | ClawHub 社区技能 + 自建 + AI 自创 |
| 安全性 | ★★★★★ | 沙箱隔离、工具权限控制、per-agent 安全策略 |
| 部署灵活性 | ★★★★★ | 本地/云/Docker/K8s/树莓派 均支持 |
| 社区活跃度 | ★★★★☆ | 3583 stars，活跃开发中 |
| 文档完善度 | ★★★★★ | 323+ 页文档，极其详尽 |

---

## 八、快速开始步骤

```bash
# 1. 安装
npm install -g openclaw@latest

# 2. 引导配置（同时注册为后台服务）
openclaw onboard --install-daemon

# 3. 添加 Agent 团队成员
openclaw agents add ceo
openclaw agents add coder
openclaw agents add researcher
openclaw agents add social
openclaw agents add admin

# 4. 配置通信渠道
openclaw channels login --channel telegram
openclaw channels login --channel discord
openclaw channels login --channel whatsapp --account personal
openclaw channels login --channel whatsapp --account research
openclaw channels login --channel slack

# 5. 启动仪表盘
openclaw dashboard

# 6. 查看 Agent 列表和绑定状态
openclaw agents list --bindings

# 7. 检查渠道状态
openclaw channels status --probe

# 8. 重启网关使配置生效
openclaw gateway restart
```

---

## 九、核心概念速查

| 概念 | 定义 |
|------|------|
| `agentId` | 一个"大脑"：工作区 + 认证 + 会话 |
| `accountId` | 一个渠道账户实例（如 WhatsApp 的 `personal` vs `biz`） |
| `binding` | 通过 `(channel, accountId, peer)` 及可选 guild/team ID 将入站消息路由到指定 `agentId` |
| `workspace` | Agent 的工作目录，包含人格配置和技能 |
| `SOUL.md` | 定义 Agent 人格/灵魂的模板文件 |
| `AGENTS.md` | 定义 Agent 行为规则的配置文件 |
| `USER.md` | 用户档案模板 |
| `Skills` | 可复用的 Agent 能力包 |
| `Heartbeat` | 主动式心跳检查机制 |
| `Standing Orders` | Agent 长期遵循的持久性指令 |
| `Gateway` | 消息网关，所有会话、路由和连接的单一真实来源 |

---

## 十、关键文档入口

| 文档 | 链接 |
|------|------|
| 多Agent路由 | https://docs.openclaw.ai/concepts/multi-agent |
| Agent Runtime | https://docs.openclaw.ai/concepts/agent |
| 委派架构 | https://docs.openclaw.ai/concepts/delegate-architecture |
| 子Agent | https://docs.openclaw.ai/tools/subagents |
| ACP Agent | https://docs.openclaw.ai/tools/acp-agents |
| Agent间通信 | https://docs.openclaw.ai/tools/agent-send |
| 技能系统 | https://docs.openclaw.ai/tools/skills |
| 创建技能 | https://docs.openclaw.ai/tools/creating-skills |
| 多Agent沙箱 | https://docs.openclaw.ai/tools/multi-agent-sandbox-tools |
| 网关配置 | https://docs.openclaw.ai/gateway/configuration |
| 功能列表 | https://docs.openclaw.ai/concepts/features |
| 快速开始 | https://docs.openclaw.ai/start/getting-started |
| 完整文档索引 | https://docs.openclaw.ai/llms.txt |

---

*报告生成时间：2026-03-30*
*数据来源：OpenClaw 官网、GitHub、ClawHub、官方文档*
