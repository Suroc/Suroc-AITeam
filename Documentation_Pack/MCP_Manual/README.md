# MCP Manual

本目录用于管理 MCP 服务的自动化安装与配置。

## 核心文件

- `scripts/bootstrap_mcp_services.py`：自动克隆、依赖安装、配置模板生成
- `config/mcp_servers.template.json`：脚本生成的 MCP 模板配置
- `config/.env.mcp.template`：脚本生成的环境变量模板
- `sources/`：克隆下来的 MCP 服务源码
- `logs/`：执行日志与报告

## 快速使用

```bash
python scripts/bootstrap_mcp_services.py --mode all --update
```
