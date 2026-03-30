# OpenClaw 智能体AI团队 — 部署指南

## 团队架构总览

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenClaw AI Agent Team                     │
│                     "一人公司"智能体团队                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                    ┌──────────────┐                           │
│                    │  🧠 Brain    │                           │
│                    │  主控大脑     │                           │
│                    │  Opus 4.6    │                           │
│                    └──────┬───────┘                           │
│              ┌────────┬───┴───┬────────┬────────┐            │
│              ▼        ▼       ▼        ▼        ▼            │
│      ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ ┌──────┐    │
│      │Product │ │Designer│ │Developer│ │DevOps│ │Intel │    │
│      │产品经理 │ │设计师   │ │全栈工程师│ │运维   │ │情报   │    │
│      │Sonnet  │ │Sonnet  │ │Sonnet   │ │Sonnet│ │Gemini│    │
│      └────────┘ └────────┘ └────────┘ └──────┘ └──────┘    │
│                                                               │
│  通信渠道：Telegram | Discord | Slack | WhatsApp              │
│  Agent间通信：全互联（agent-to-agent enabled）                 │
│  自动化：Cron定时任务 | Heartbeat心跳 | Webhooks               │
└─────────────────────────────────────────────────────────────┘
```

## Agent 角色一览

| Agent ID | 角色 | 模型 | 路由渠道 | 核心职责 |
|----------|------|------|---------|---------|
| `brain` | 主控大脑 | Claude Opus 4.6 | Telegram | 接收需求、拆解任务、调配团队、质量把控 |
| `product` | 产品经理 | Claude Sonnet 4.6 | WhatsApp(product) | 需求分析、PRD、竞品调研、用户体验 |
| `designer` | UI/UX设计师 | Claude Sonnet 4.6 | WhatsApp(design) | 界面设计、交互设计、设计系统、原型 |
| `developer` | 全栈工程师 | Claude Sonnet 4.6 | Discord | 前后端开发、数据库、API、代码审查 |
| `devops` | DevOps工程师 | Claude Sonnet 4.6 | Slack | 测试、CI/CD、部署、监控、运维 |
| `intel` | 情报分析师 | Gemini 2.5 Pro | WhatsApp(intel) | 信息收集、数据分析、趋势追踪、报告 |

## 权限矩阵

| 权限 | brain | product | designer | developer | devops | intel |
|------|:-----:|:-------:|:--------:|:---------:|:------:|:-----:|
| Agent间通信 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 网页浏览 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 网络搜索 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 文件读写 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 代码执行 | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Shell操作 | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Docker | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| 沙箱隔离 | 关闭 | 关闭 | 关闭 | 独立容器 | 独立容器 | 关闭 |

## 部署步骤

### 前提条件

```bash
# 1. 安装 Node.js (v20+)
# 2. 安装 OpenClaw
npm install -g openclaw@latest

# 3. 初始化配置
openclaw onboard --install-daemon
```

### 一键部署

```bash
# 将本目录下的 openclaw/ 文件夹拷贝到 ~/.openclaw/
# (Windows: C:\Users\<用户名>\.openclaw\)

# Linux/macOS:
cp -r ./openclaw/* ~/.openclaw/

# Windows (PowerShell):
Copy-Item -Recurse -Force .\openclaw\* "$env:USERPROFILE\.openclaw\"
```

### 验证配置

```bash
# 查看Agent列表
openclaw agents list

# 查看绑定状态
openclaw agents list --bindings

# 检查渠道状态
openclaw channels status --probe

# 启动网关
openclaw gateway restart

# 打开仪表盘
openclaw dashboard
```

### 配置通信渠道

```bash
# 根据需要配置渠道（按你实际使用的平台选择）
openclaw channels login --channel telegram
openclaw channels login --channel discord
openclaw channels login --channel slack
openclaw channels login --channel whatsapp --account product
openclaw channels login --channel whatsapp --account design
openclaw channels login --channel whatsapp --account intel
```

## 工作流示例

### 场景1：开发一个新功能
```
用户 → brain: "我需要开发一个用户注册登录系统"
brain → product: 拆解需求，输出PRD
brain → intel: 调研主流认证方案
product → brain: PRD完成
intel → brain: 调研报告完成
brain → designer: 基于PRD设计登录页面
designer → brain: 设计稿完成
brain → developer: 基于设计稿开发
developer → brain: 开发完成
brain → devops: 测试和部署
devops → brain: 测试通过，已部署
brain → 用户: "登录系统已完成，以下是详情..."
```

### 场景2：竞品分析
```
用户 → brain: "帮我分析3个竞品的优劣势"
brain → intel: 收集竞品信息
brain → product: 准备分析框架
intel → product: 提供竞品数据
product → brain: 竞品分析报告完成
brain → 用户: "竞品分析报告如下..."
```

## 自动化任务

| 任务 | 执行者 | 频率 | 说明 |
|------|--------|------|------|
| 每日情报扫描 | intel | 每天 09:00 | 行业新闻、技术趋势、竞品动态 |
| 团队日报 | brain | 每天 20:00 | 汇总各Agent工作进展 |
| 产品周报 | product | 每周一 10:00 | 需求完成情况、优先级排序 |
| 服务健康检查 | devops | 每30分钟 | 检查所有服务状态 |

## 自定义修改指南

### 更换模型
编辑 `openclaw.json` 中 `agents.list` 对应Agent的 `model` 字段。

### 调整路由
编辑 `openclaw.json` 中 `bindings` 数组，修改 `match` 规则。

### 修改Agent人格
编辑对应工作区的 `SOUL.md` 文件。

### 修改Agent行为规则
编辑对应工作区的 `AGENTS.md` 文件。

### 添加新Agent
1. 在 `agents/` 下创建新的Agent目录
2. 在 `workspace-<id>/` 下创建工作区
3. 编写 SOUL.md、AGENTS.md、USER.md
4. 在 `openclaw.json` 中添加Agent配置和绑定

---

*文档版本：v1.0 | 生成时间：2026-03-30*
