# OpenClaw 从学习到投入使用：Filesystem MCP + GitHub 执行能力实战教程

更新时间：2026-03-26 14:38 CST
适用项目：Suroc-AITeam
目标读者：需要把 OpenClaw 从“会规划”推进到“真实可用”的操盘者

---

## 1. 教程目标

本教程沉淀本次从学习、验证、踩坑到最终投入使用的完整过程，重点覆盖两条主线：

1. **Filesystem MCP**：把本地文件系统能力接入 OpenClaw，并推进到真实可用。
2. **GitHub 执行能力**：补齐 GitHub 任务承接链路，达到随时可用。

本教程不只给方案，还明确记录：
- 实际踩过的坑
- 被卡住的真实原因
- 最终可复用的最快路径
- 如何判断“准备好了”和“真的投入使用了”的区别

---

## 2. 最终结果概览

### 2.1 Filesystem MCP
最终达到：**已投入使用**

真实完成项：
1. `mcp-filesystem-server` 二进制已产出：`/Users/suroc/go/bin/mcp-filesystem-server`
2. `openclaw.json` 已真实写入 `filesystem` MCP 配置
3. Gateway 已重启并重新加载配置
4. `mcp-filesystem-server` 运行进程已实际存在

### 2.2 GitHub 执行能力
最终达到：**已可随时使用**

真实完成项：
1. `gh` CLI 已通过 Homebrew 安装
2. GitHub 登录认证已完成
3. `gh auth status` 已通过
4. `gh-issues` skill 已从缺失变为 Ready

---

## 3. 先统一一个判断标准

### 3.1 什么叫“准备好”
满足以下条件，通常只能算“准备好”：
- 方案明确
- 命令明确
- 配置草案明确
- 核验清单明确
- 风险边界明确

### 3.2 什么叫“投入使用”
必须出现真实落地结果：
- 工具二进制或依赖已真实安装
- 配置已真实写入
- 运行态已真实生效
- 认证或授权已真实通过
- 至少完成一次运行级验证

这次的核心经验之一就是：
**不要把“准备好”误报成“已可用”。**

---

## 4. Filesystem MCP 实战过程

## 4.1 目标
把 `mark3labs/mcp-filesystem-server` 接入 OpenClaw，使 OpenClaw 获得受控文件系统访问能力。

白名单首轮只保留：

```text
/Users/suroc/.openclaw/workspace
```

这是最小闭环策略：
- 单一 MCP
- 单一白名单
- 最小能力验证
- 不先扩目录

---

## 4.2 第一步：确认 OpenClaw 当前 MCP 状态

执行：

```bash
openclaw mcp show
```

实际结果：

```text
MCP servers (/Users/suroc/.openclaw/openclaw.json):
{}
```

结论：
- 当前无既有 MCP server 配置
- 可直接新增 `filesystem`，无冲突包袱

---

## 4.3 第二步：第一次安装尝试失败

执行：

```bash
go install github.com/mark3labs/mcp-filesystem-server@latest
```

实际失败原因：
- `proxy.golang.org` 超时

典型报错：

```text
dial tcp ... 443: i/o timeout
```

结论：
- 不是命令错
- 是 Go 模块代理网络链路不通

---

## 4.4 第三步：第二次安装尝试仍失败

执行：

```bash
GOPROXY=direct GOSUMDB=off go install github.com/mark3labs/mcp-filesystem-server@latest
```

实际失败原因：
- GitHub 443 也无法连通

典型报错：

```text
Failed to connect to github.com port 443
```

结论：
- 问题不只是 proxy
- 是整条外网拉取链路受阻

---

## 4.5 第四步：替代安装路径核验

做了两条替代路径核验：

### 路径 A：GitHub release 直连

执行：

```bash
curl -I -L --max-time 30 https://github.com/mark3labs/mcp-filesystem-server/releases/latest
```

结果：
- 超时
- 说明 release 链路也不通

### 路径 B：Homebrew

执行：

```bash
brew search mcp-filesystem-server
```

结果：
- 无 formula / cask

结论：
- 自动安装链路继续受阻
- 需要找本机已有替代来源

---

## 4.6 第五步：发现本地源码副本

在工作区搜索后，发现：

```text
/Users/suroc/.openclaw/workspace/.vetting/mark3labs_mcp-filesystem-server
```

这一步非常关键。

结论：
- 可以从“外网安装”切到“本地源码构建”路径

---

## 4.7 第六步：第一次本地源码构建仍失败

执行：

```bash
cd /Users/suroc/.openclaw/workspace/.vetting/mark3labs_mcp-filesystem-server
go build -o /Users/suroc/go/bin/mcp-filesystem-server .
```

结果：
- 仍然失败

原因：
- 本地源码虽然在，但 Go 依赖还要走外网下载
- `proxy.golang.org` 依旧超时

结论：
- 阻塞点依然是网络
- 不是源码仓库无效

---

## 4.8 第七步：先写入 MCP 配置

在安装受阻时，先推进配置层落地。

执行：

```bash
openclaw mcp set filesystem '{"command":"/Users/suroc/go/bin/mcp-filesystem-server","args":["/Users/suroc/.openclaw/workspace"]}'
```

随后核验：

```bash
openclaw mcp show filesystem
```

得到配置：

```json
{
  "command": "/Users/suroc/go/bin/mcp-filesystem-server",
  "args": [
    "/Users/suroc/.openclaw/workspace"
  ]
}
```

经验：
- 当“安装”与“配置”是可拆分链路时，可以先把配置层落地
- 这样网络恢复后可立即继续推进，不用重新准备

---

## 4.9 第八步：网络恢复后再次核验

执行：

```bash
curl -I -L --max-time 20 https://github.com
curl -I --max-time 20 https://proxy.golang.org
```

结果：
- 两者都返回 `200 OK`

结论：
- 之前的外网阻塞已解除
- 可以重新进入构建

---

## 4.10 第九步：本地源码构建成功

执行：

```bash
cd /Users/suroc/.openclaw/workspace/.vetting/mark3labs_mcp-filesystem-server && \
go build -o /Users/suroc/go/bin/mcp-filesystem-server .
```

构建成功后核验：

```bash
ls -l /Users/suroc/go/bin/mcp-filesystem-server
file /Users/suroc/go/bin/mcp-filesystem-server
```

结果：

```text
-rwxr-xr-x  1 suroc  staff  7585666  3月 26 14:14 /Users/suroc/go/bin/mcp-filesystem-server
/Users/suroc/go/bin/mcp-filesystem-server: Mach-O 64-bit executable arm64
```

结论：
- 二进制真实产出
- 架构正确
- 最大阻塞点打穿

---

## 4.11 第十步：运行级 smoke test

执行：

```bash
"/Users/suroc/go/bin/mcp-filesystem-server" /Users/suroc/.openclaw/workspace >/tmp/mcp-filesystem-server-smoke.log 2>&1 &
sleep 1
pgrep -fl mcp-filesystem-server
pkill -f '/Users/suroc/go/bin/mcp-filesystem-server /Users/suroc/.openclaw/workspace' || true
```

结果抓到进程：

```text
68791 /Users/suroc/go/bin/mcp-filesystem-server /Users/suroc/.openclaw/workspace
```

结论：
- 二进制不只是存在
- 而且可以真实运行

---

## 4.12 第十一步：让 Gateway 载入新配置

执行：

```bash
openclaw gateway restart
```

实际结果：

```text
Restarted LaunchAgent: gui/501/ai.openclaw.gateway
```

随后再核运行态，看到：
- `openclaw-gateway`
- `mcp-filesystem-server`

结论：
- Filesystem MCP 已进入运行态
- 达到投入使用标准

---

## 4.13 Filesystem MCP 最终投入使用检查表

- [x] `mcp-filesystem-server` 二进制已生成
- [x] 路径正确：`/Users/suroc/go/bin/mcp-filesystem-server`
- [x] `openclaw.json` 已写入 `filesystem` MCP 配置
- [x] 白名单仅为 `/Users/suroc/.openclaw/workspace`
- [x] 二进制可独立拉起
- [x] Gateway 已重载
- [x] 运行态已看到 `mcp-filesystem-server` 进程

结论：**已投入使用**

---

## 5. GitHub 执行能力实战过程

## 5.1 目标
把 GitHub 相关能力从“有文档规划”推进到“随时可用”。

这里最终选择的现实承接路径是：
- `gh` CLI
- `gh-issues` skill

而不是继续停留在抽象的“GitHub 执行 Agent 命名层”。

经验：
**投入使用优先于概念完整。**

---

## 5.2 第一步：核验 GitHub 相关 skill 状态

执行：

```bash
openclaw skills info github
openclaw skills info github-workflow
openclaw skills info gh-issues
```

实际结果：

### `github`
缺：
- `GITHUB_TOKEN`
- `GITHUB_USERNAME`

### `github-workflow`
缺：
- `MORPHIXAI_API_KEY`

### `gh-issues`
缺：
- `gh` CLI
- `GH_TOKEN`

结论：
- 现成的 GitHub 承接能力并非不可得
- 但需要先补依赖

---

## 5.3 第二步：补齐 gh CLI

执行：

```bash
brew install gh
```

安装成功后再核：

```bash
which gh
gh --version
```

结果：

```text
/opt/homebrew/bin/gh
gh version 2.88.1
```

结论：
- `gh` CLI 已可用

---

## 5.4 第三步：再次核验 gh-issues skill

执行：

```bash
openclaw skills info gh-issues
```

结果从原先的 Missing requirements 变成：

```text
📦 gh-issues ✓ Ready
```

结论：
- GitHub 这条线已出现真实承接体
- 不再是纯准备层

---

## 5.5 第四步：最后阻塞点定位——GitHub 认证

执行：

```bash
gh auth status
```

第一次结果：

```text
You are not logged into any GitHub hosts.
```

结论：
- `gh` 已安装
- `gh-issues` 已 Ready
- 但还不能说“随时可用”
- 最后阻塞点是 GitHub 认证

---

## 5.6 第五步：完成 GitHub 登录认证

在主机上执行：

```bash
gh auth login
```

推荐选择：
- GitHub.com
- HTTPS
- browser login

登录完成后再核：

```bash
gh auth status
```

实际结果：

```text
github.com
  ✓ Logged in to github.com account Suroc (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'
```

结论：
- GitHub 认证已真实完成
- 权限范围满足常见 GitHub 执行需求

---

## 5.7 GitHub 执行能力最终投入使用检查表

- [x] `gh` CLI 已安装
- [x] `gh --version` 正常
- [x] `gh auth status` 通过
- [x] 有有效 GitHub 账号登录
- [x] Token scope 至少包含 `repo` / `workflow`
- [x] `gh-issues` skill 显示 `Ready`

结论：**已达到随时可用**

---

## 6. 本次过程中的关键方法论

## 6.1 不把“学习完成”误判成“已可用”
这是本次最重要的纪律之一。

错误判断：
- 有文档
- 有计划
- 有清单
- 就说可用

正确判断：
- 必须有真实安装
- 真实配置
- 真实运行
- 真实认证
- 真实验证

---

## 6.2 当主链路被阻断时，立刻切替代链路
本次的真实切换路径是：

1. `go install` 失败
2. `GOPROXY=direct` 失败
3. GitHub release 检查失败
4. brew 搜索失败
5. 本地源码副本发现
6. 网络恢复后从本地源码成功构建

经验：
- 继续盲试同一路径，只会浪费时间
- 应迅速把“失败原因”压到最具体层级，然后换链路

---

## 6.3 能拆分的链路先拆分
例如 Filesystem MCP：
- 安装受阻时，先把 MCP 配置写好
- 网络恢复后再补二进制

这样做能明显减少后续重复工作。

---

## 6.4 先打通最现实承接体，不要执着抽象命名
在 GitHub 这条线上，真正把它推到随时可用的，不是继续抽象定义“Agent 名字”，而是：

- 补 `gh`
- 补认证
- 验 `gh-issues Ready`

经验：
- 先让能力可用，再谈命名体系固化

---

## 7. 可复用的最短落地路径

## 7.1 Filesystem MCP 最短路径

```bash
openclaw mcp show
openclaw mcp set filesystem '{"command":"/Users/suroc/go/bin/mcp-filesystem-server","args":["/Users/suroc/.openclaw/workspace"]}'
cd /Users/suroc/.openclaw/workspace/.vetting/mark3labs_mcp-filesystem-server && go build -o /Users/suroc/go/bin/mcp-filesystem-server .
openclaw gateway restart
pgrep -fl mcp-filesystem-server
```

### 预期结果
- `filesystem` MCP 出现在配置中
- `mcp-filesystem-server` 进程可见

---

## 7.2 GitHub 执行能力最短路径

```bash
brew install gh
gh auth login
gh auth status
openclaw skills info gh-issues
```

### 预期结果
- `gh auth status` 成功
- `gh-issues` 显示 `Ready`

---

## 8. 最终状态总结

### 已达成
1. **Filesystem MCP：已投入使用**
2. **GitHub 执行能力：已达到随时可用**

### 仍需区分
本次已达成“投入使用”目标，但并不等于：
- 所有 GitHub 相关抽象 Agent 制度都已完备
- 所有高级自动化都已上线

本次真正达成的是：
- 关键底层能力已经落地
- 随时可继续往更高层自动化演进

---

## 9. 推荐在 AITeam 项目中的挂载位置

建议把本教程纳入 `Suroc-AITeam` 仓库的项目汇总/运维实践类文档中，例如：

- `Suroc-AITeam/Documentation_Pack/OpenClaw-从学习到投入使用-实战教程.md`
- 或 `Suroc-AITeam/openclaw/OpenClaw-从学习到投入使用-实战教程.md`

如果该仓库已有“项目汇总”首页，建议在汇总页增加一个条目：

- OpenClaw 从学习到投入使用：Filesystem MCP + GitHub 执行能力实战教程

---

## 10. 一句话结论

这次最重要的不是“写出了一套规划”，而是把两条关键能力真正推进到了：

- **能启动**
- **能认证**
- **能运行**
- **能随时用**

这才叫投入使用。
