# 新电脑安装 OpenClaw 最佳方案（推荐执行版）

- 版本基准日期: 2026-03-19
- 适用对象: Windows 新电脑（你当前环境）
- 目标: 在保证安全与可维护的前提下，最快稳定跑通 OpenClaw

## 为什么这套是“最佳方案”

1. 官方平台建议对 Windows 优先走 WSL2（Ubuntu）路线。
2. 官方 Installer（`install.sh`）覆盖依赖检查、安装流程和后续维护。
3. 上手快（1 台机器即可）且可平滑迁移到 Ansible/K8s 生产方案。

## 最终架构

- 主机: Windows 11
- 运行层: WSL2 (Ubuntu)
- 安装方式: 官方 Installer (`install.sh`)
- 初始化: `openclaw onboard --install-daemon`
- 可选增强: Docker sandbox + Tailscale/SSH 隧道远程访问

## 一次性安装步骤（可直接执行）

### 0) Windows 侧前置

1. 开启虚拟化（BIOS）
2. 安装 WSL2 + Ubuntu

```powershell
wsl --install
```

3. 重启并初始化 Ubuntu 用户

### 1) WSL2(Ubuntu) 内环境准备

1. 更新系统

```bash
sudo apt update && sudo apt upgrade -y
```

2. 安装基础工具

```bash
sudo apt install -y curl git build-essential
```

3. 安装 Node.js（按官方安装页要求版本，建议 Node 24）

```bash
# 使用 nvm 示例
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 24
nvm use 24
```

### 2) 安装 OpenClaw（官方推荐）

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 3) 首次初始化（官方 getting-started）

```bash
openclaw onboard --install-daemon
```

### 4) 启动验证

```bash
openclaw doctor
openclaw status
openclaw dashboard
```

> 如果你的 `dashboard` 没自动打开，直接访问 CLI 提示的本地地址。

## 安全与稳定性基线（强烈建议）

1. 不在你的主力办公系统里给 OpenClaw过高权限。
2. 先用“最小权限 API Key”接模型与第三方服务。
3. 网关外网访问优先用 Tailscale 或 SSH 隧道，不直接裸露端口。
4. 把 OpenClaw 数据目录纳入定时备份（每天至少一次）。
5. 升级前先快照（系统快照/数据目录备份），再走官方升级文档。

## 什么时候切换到 Ansible/K8s

- 你出现以下任一情况时切换：
  1. 需要 7x24 长时间稳定运行
  2. 多人协作访问同一实例
  3. 需要统一安全策略与运维自动化

切换路径建议:
- 先看官方: `install/ansible`
- 再看官方: `install/kubernetes`

## 备选路径（你可能会用到）

1. Docker 本地路线
- 文档: https://docs.openclaw.ai/install/docker
- 适合: 快速验证、多环境隔离。

2. 云端最快上线（Railway/Fly/GCP/VPS）
- 文档入口: https://docs.openclaw.ai/install
- 适合: 需要公网访问、机器性能不足。

## 验收清单（Done 标准）

- `openclaw doctor` 无阻塞错误
- `openclaw status` 显示服务可用
- `openclaw dashboard` 可访问
- 成功完成一次 Agent 任务
- 已完成一次数据备份

## 关键参考

- https://docs.openclaw.ai/install
- https://docs.openclaw.ai/start/getting-started
- https://docs.openclaw.ai/platforms/windows
- https://docs.openclaw.ai/install/installer
- https://docs.openclaw.ai/install/docker
- https://docs.openclaw.ai/install/ansible
- https://docs.openclaw.ai/install/kubernetes
- https://docs.openclaw.ai/gateway/security
- https://github.com/openclaw/openclaw
- https://github.com/openclaw/openclaw-ansible
