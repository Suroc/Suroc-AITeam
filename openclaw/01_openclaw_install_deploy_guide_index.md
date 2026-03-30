# OpenClaw 安装/部署攻略全网索引

- 采集日期: 2026-03-19
- 采集原则: `官方文档 > 官方仓库 > 官方生态仓库 > 社区经验`
- 可信度分级:
  - `A`: 官方文档/官方仓库
  - `B`: 官方组织下社区生态仓库或可核验社区沉淀
  - `C`: 非官方搬运/二次整理（仅作参考，不作为执行依据）

## A 级（强推荐，执行依据）

1. 安装总览（入口）
- 链接: https://docs.openclaw.ai/install
- 价值: 汇总所有安装方式与系统要求。

2. 新手开始（推荐路径）
- 链接: https://docs.openclaw.ai/start/getting-started
- 价值: 官方给出的默认 onboarding 流程。

3. Installer 原理与高级参数
- 链接: https://docs.openclaw.ai/install/installer
- 价值: 涵盖 `install.sh/install.ps1`、非交互安装、环境变量与故障排查。

4. Docker 安装
- 链接: https://docs.openclaw.ai/install/docker
- 价值: 本地容器化快速部署与 compose 方案。

5. Ansible 安装（生产导向）
- 链接: https://docs.openclaw.ai/install/ansible
- 价值: 安全加固与服务器化部署主路线。

6. Kubernetes 部署
- 链接: https://docs.openclaw.ai/install/kubernetes
- 价值: 集群级部署路线与生产规模化。

7. Windows 平台指南（WSL2）
- 链接: https://docs.openclaw.ai/platforms/windows
- 价值: 官方明确推荐 Windows 走 WSL2 路径。

8. Gateway 安全策略
- 链接: https://docs.openclaw.ai/gateway/security
- 价值: 远程访问、代理与网关安全配置基线。

9. 更新指南
- 链接: https://docs.openclaw.ai/install/updating
- 价值: 升级策略、版本兼容性、回退注意事项。

10. 迁移指南
- 链接: https://docs.openclaw.ai/install/migrating
- 价值: 跨机器/跨版本迁移流程。

11. 官方主仓库
- 链接: https://github.com/openclaw/openclaw
- 价值: README、源码与发布节奏的第一来源。

12. 主仓库 README（原文）
- 链接: https://raw.githubusercontent.com/openclaw/openclaw/main/README.md
- 价值: 最快获取安装命令与项目定位。

13. 官方 Ansible 仓库
- 链接: https://github.com/openclaw/openclaw-ansible
- 价值: 生产部署 playbook 与运维方法。

14. 官方 Ansible README（原文）
- 链接: https://raw.githubusercontent.com/openclaw/openclaw-ansible/main/README.md
- 价值: 部署架构、安全提醒、参数说明。

## A-/B+（官方生态扩展）

1. Railway 部署
- 链接: https://docs.openclaw.ai/install/railway
- 场景: 最快上线公网 demo。

2. Fly.io 部署
- 链接: https://docs.openclaw.ai/install/fly
- 场景: 轻量云托管。

3. GCP 部署
- 链接: https://docs.openclaw.ai/install/gcp
- 场景: 云平台标准化上云。

4. VPS/自建主机路线
- 链接: https://docs.openclaw.ai/vps
- 场景: 中小规模长期运行。

5. Nix 安装（官方生态）
- 链接: https://docs.openclaw.ai/install/nix
- 场景: 可复现环境、偏工程团队。

6. Nix 生态仓库
- 链接: https://github.com/openclaw/nix-openclaw
- 场景: Nix 用户的自动化部署/打包。

## B/C（社区经验，需二次核验）

- 社区会发布大量“OpenClaw 一键安装/免费部署”教程，质量差异大。
- 建议仅把社区内容用于“问题定位思路”，不要直接复制生产命令。
- 执行前务必回到 A 级来源做逐条核验。

## 我给你的筛选结论

1. 真正可作为执行依据的核心来源，集中在官方 docs + 官方 GitHub。
2. 云部署攻略优先使用官方 docs 的 provider 页面，不要优先使用第三方转载。
3. 新电脑首装最佳路径是“Windows(WSL2) + 官方 Installer + Onboarding”，详见下一份文档。
