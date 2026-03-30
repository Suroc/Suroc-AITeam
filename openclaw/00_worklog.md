# OpenClaw 任务过程记录

- 任务日期: 2026-03-19
- 任务目标:
  1. 新建 `openclaw` 目录
  2. 搜罗 OpenClaw 安装/部署攻略
  3. 给出新电脑最佳安装方案

## 执行日志

1. 创建目录
- 已创建: `openclaw/`

2. 全网检索与来源分层
- 采用“官方优先 + 社区补充 + 低可信剔除”的方法。
- 重点检索并核验:
  - 官方文档总览与安装页
  - 官方 GitHub 仓库与 README
  - 官方推荐的替代安装链路（Docker/Podman/Nix/Ansible/K8s/VPS）
  - 官方文档里引用的云部署攻略（Railway/Render/Northflank/Fly/GCP/Hetzner/macOS VM）

3. 文档产出
- `01_openclaw_install_deploy_guide_index.md`
  - 汇总安装部署攻略入口
  - 给出可信度等级与适用场景
- `02_new_pc_best_install_plan.md`
  - 给出新电脑最佳实践（Windows 新机 -> WSL2 路线）
  - 包含完整命令步骤、安全基线、验收清单、回滚与维护建议

## 结论摘要

- 官方文档明确推荐:
  - Windows 场景优先 WSL2（Ubuntu）
  - 安装方式优先官方安装脚本
  - 生产部署优先 Ansible（安全加固）或官方云部署路径
- 新电脑最佳方案（默认）:
  - Windows 11 + WSL2 + 官方 `install.sh` + `openclaw onboard --install-daemon`
  - 再按需启用 Docker sandbox 与远程安全访问（Tailscale/SSH 隧道）

## 备注

- 在检索中发现部分非官方镜像/搬运页，已从“执行建议”中剔除，仅保留官方与可核验来源。
