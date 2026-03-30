#!/usr/bin/env python3
"""
Bootstrap MCP services for Suroc-AITeam.

What this script does:
1) Clone/update MCP server repositories into MCP_Manual/sources
2) Install dependencies (best-effort) by detecting project type (Node/Python/Go)
3) Generate MCP client config templates and env template files
4) Write a bootstrap report to MCP_Manual/logs

Usage:
  python bootstrap_mcp_services.py --mode all
  python bootstrap_mcp_services.py --mode clone --update
  python bootstrap_mcp_services.py --mode config --dry-run
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional


@dataclass
class Service:
  key: str
  name: str
  repo: Optional[str] = None
  env_vars: List[str] = field(default_factory=list)
  remote_url: Optional[str] = None
  local_command: Optional[str] = None
  local_args: List[str] = field(default_factory=list)
  notes: str = ""


SERVICES: List[Service] = [
  Service(
    key="github",
    name="GitHub MCP Server",
    repo="https://github.com/github/github-mcp-server",
    env_vars=["GITHUB_PERSONAL_ACCESS_TOKEN"],
    remote_url="https://api.githubcopilot.com/mcp/",
    local_command="docker",
    local_args=["run", "--rm", "-i", "ghcr.io/github/github-mcp-server"],
    notes="Official GitHub MCP service."
  ),
  Service(
    key="slack",
    name="Slack MCP Server",
    repo="https://github.com/zencoderai/slack-mcp-server",
    env_vars=["SLACK_BOT_TOKEN", "SLACK_APP_TOKEN"],
    local_command="npx",
    local_args=["-y", "@zencoderai/slack-mcp-server"],
    notes="Maintained by Zencoder."
  ),
  Service(
    key="google_workspace",
    name="Google Workspace MCP Server",
    repo="https://github.com/ngs/google-mcp-server",
    env_vars=["GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET"],
    local_command="google-mcp-server",
    local_args=["stdio"],
    notes="Calendar/Drive/Gmail/Docs/Sheets support."
  ),
  Service(
    key="tavily",
    name="Tavily MCP",
    repo="https://github.com/tavily-ai/tavily-mcp",
    env_vars=["TAVILY_API_KEY"],
    remote_url="https://mcp.tavily.com/mcp/?tavilyApiKey=${TAVILY_API_KEY}",
    local_command="npx",
    local_args=["-y", "tavily-mcp"],
    notes="Search-focused MCP server."
  ),
  Service(
    key="exa",
    name="Exa MCP Server",
    repo="https://github.com/exa-labs/exa-mcp-server",
    env_vars=["EXA_API_KEY"],
    remote_url="https://mcp.exa.ai/mcp?exaApiKey=${EXA_API_KEY}",
    local_command="npx",
    local_args=["-y", "exa-mcp-server"],
    notes="Semantic retrieval MCP server."
  ),
  Service(
    key="rss",
    name="RSS MCP Server",
    repo="https://github.com/buhe/mcp_rss",
    local_command="npx",
    local_args=["-y", "mcp_rss"],
    notes="RSS feed parser MCP server."
  ),
  Service(
    key="legal_database",
    name="Court Listener MCP",
    repo="https://github.com/Travis-Prall/court-listener-mcp",
    env_vars=["COURT_LISTENER_API_TOKEN"],
    notes="Legal database adapter for CourtListener/eCFR."
  ),
  Service(
    key="financial_news",
    name="Alpha Vantage MCP",
    repo="https://github.com/alphavantage/alpha_vantage_mcp",
    env_vars=["ALPHA_VANTAGE_API_KEY"],
    local_command="uvx",
    local_args=["marketdata-mcp-server"],
    notes="Financial data and news sentiment MCP server."
  ),
  Service(
    key="figma",
    name="Figma MCP",
    repo="https://github.com/mcp/figma/mcp-server",
    env_vars=["FIGMA_API_KEY"],
    remote_url="https://mcp.figma.com/mcp",
    notes="Official Figma MCP endpoint."
  ),
  Service(
    key="image_generation",
    name="ImageGen MCP",
    repo="https://github.com/spartanz51/imagegen-mcp",
    env_vars=["OPENAI_API_KEY"],
    local_command="npx",
    local_args=["-y", "imagegen-mcp"],
    notes="Supports DALL-E 3 and GPT-image models."
  ),
  Service(
    key="filesystem",
    name="Filesystem MCP Server",
    repo="https://github.com/mark3labs/mcp-filesystem-server",
    notes="Filesystem tool server for local project operations."
  ),
  Service(
    key="docker_controller",
    name="Docker MCP Server",
    repo="https://github.com/ckreiling/mcp-server-docker",
    local_command="uvx",
    local_args=["mcp-server-docker"],
    notes="Docker control plane MCP server."
  ),
  Service(
    key="puppeteer",
    name="Puppeteer MCP Server",
    repo="https://github.com/ratiofu/mcp-puppeteer",
    local_command="npx",
    local_args=["-y", "@ratiofu/mcp-puppeteer"],
    notes="Browser automation MCP server."
  ),
  Service(
    key="pytest_executor",
    name="Pytest Runner MCP",
    repo="https://github.com/jwilger/mcp-pytest-runner",
    local_command="uvx",
    local_args=["mcp-pytest-runner"],
    notes="Pytest execution MCP server."
  )
]


def run_command(
  args: List[str],
  cwd: Optional[Path],
  dry_run: bool,
  log_lines: List[str],
) -> bool:
  display_cwd = str(cwd) if cwd else "."
  cmd_text = " ".join(args)
  log_lines.append(f"- CMD (`{display_cwd}`): `{cmd_text}`")

  if dry_run:
    log_lines.append("  - Result: DRY_RUN")
    return True

  try:
    completed = subprocess.run(args, cwd=str(cwd) if cwd else None, check=False, text=True, capture_output=True)
  except FileNotFoundError:
    log_lines.append("  - Result: FAILED (command not found)")
    return False

  ok = completed.returncode == 0
  log_lines.append(f"  - Result: {'OK' if ok else f'FAILED ({completed.returncode})'}")
  if completed.stdout.strip():
    log_lines.append("  - stdout:")
    log_lines.append(f"    {completed.stdout.strip().replace(chr(10), chr(10) + '    ')}")
  if completed.stderr.strip():
    log_lines.append("  - stderr:")
    log_lines.append(f"    {completed.stderr.strip().replace(chr(10), chr(10) + '    ')}")
  return ok


def detect_install_commands(repo_dir: Path) -> List[List[str]]:
  commands: List[List[str]] = []

  package_json = repo_dir / "package.json"
  package_lock = repo_dir / "package-lock.json"
  pnpm_lock = repo_dir / "pnpm-lock.yaml"
  yarn_lock = repo_dir / "yarn.lock"
  pyproject = repo_dir / "pyproject.toml"
  requirements = repo_dir / "requirements.txt"
  go_mod = repo_dir / "go.mod"

  if package_json.exists():
    if package_lock.exists():
      commands.append(["npm", "ci"])
    elif pnpm_lock.exists() and shutil.which("pnpm"):
      commands.append(["pnpm", "install", "--frozen-lockfile"])
    elif yarn_lock.exists() and shutil.which("yarn"):
      commands.append(["yarn", "install", "--frozen-lockfile"])
    else:
      commands.append(["npm", "install"])

  if pyproject.exists():
    if shutil.which("uv"):
      commands.append(["uv", "sync"])
    elif shutil.which("pip"):
      commands.append(["pip", "install", "-e", "."])
  elif requirements.exists() and shutil.which("pip"):
    commands.append(["pip", "install", "-r", "requirements.txt"])

  if go_mod.exists():
    commands.append(["go", "mod", "download"])

  return commands


def clone_or_update_repo(
  service: Service,
  sources_dir: Path,
  update: bool,
  dry_run: bool,
  log_lines: List[str],
) -> Dict[str, str]:
  result = {"service": service.key, "clone": "SKIPPED", "path": ""}
  if not service.repo:
    return result

  target = sources_dir / service.key
  result["path"] = str(target)

  if not target.exists():
    ok = run_command(["git", "clone", service.repo, str(target)], cwd=None, dry_run=dry_run, log_lines=log_lines)
    result["clone"] = "OK" if ok else "FAILED"
    return result

  if update:
    ok = run_command(["git", "pull", "--ff-only"], cwd=target, dry_run=dry_run, log_lines=log_lines)
    result["clone"] = "UPDATED" if ok else "UPDATE_FAILED"
  else:
    result["clone"] = "EXISTS"

  return result


def install_repo_dependencies(
  service: Service,
  sources_dir: Path,
  dry_run: bool,
  log_lines: List[str],
) -> str:
  if not service.repo:
    return "SKIPPED_NO_REPO"

  repo_dir = sources_dir / service.key
  if not repo_dir.exists():
    return "SKIPPED_NO_SOURCE"

  commands = detect_install_commands(repo_dir)
  if not commands:
    return "SKIPPED_NO_DETECTED_TOOLCHAIN"

  all_ok = True
  for cmd in commands:
    ok = run_command(cmd, cwd=repo_dir, dry_run=dry_run, log_lines=log_lines)
    all_ok = all_ok and ok

  return "OK" if all_ok else "FAILED"


def generate_config_files(base_dir: Path, dry_run: bool, log_lines: List[str]) -> None:
  config_dir = base_dir / "config"
  config_dir.mkdir(parents=True, exist_ok=True)

  servers: Dict[str, Dict[str, object]] = {}
  env_keys: List[str] = []

  for service in SERVICES:
    env_keys.extend(service.env_vars)
    entry: Dict[str, object] = {}
    if service.remote_url:
      entry["url"] = service.remote_url
    elif service.local_command:
      entry["command"] = service.local_command
      entry["args"] = service.local_args
    else:
      entry["notes"] = "No default launch command. Use README in cloned repo."
    if service.env_vars:
      entry["env"] = {key: f"${{{key}}}" for key in service.env_vars}
    entry["notes"] = service.notes
    servers[service.key] = entry

  manifest = {
    "generatedAt": datetime.now(timezone.utc).isoformat(),
    "mcpServers": servers
  }

  mcp_json = config_dir / "mcp_servers.template.json"
  env_template = config_dir / ".env.mcp.template"

  if dry_run:
    log_lines.append(f"- DRY_RUN write: {mcp_json}")
    log_lines.append(f"- DRY_RUN write: {env_template}")
    return

  mcp_json.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
  unique_keys = sorted(set(env_keys))
  env_template.write_text("\n".join(f"{k}=" for k in unique_keys) + "\n", encoding="utf-8")

  log_lines.append(f"- Wrote config template: `{mcp_json}`")
  log_lines.append(f"- Wrote env template: `{env_template}`")


def write_report(base_dir: Path, report_lines: List[str], dry_run: bool) -> None:
  logs_dir = base_dir / "logs"
  logs_dir.mkdir(parents=True, exist_ok=True)
  report_file = logs_dir / f"bootstrap_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
  content = "\n".join(report_lines) + "\n"
  if dry_run:
    print(content)
    return
  report_file.write_text(content, encoding="utf-8")
  print(f"Report saved: {report_file}")


def main() -> int:
  parser = argparse.ArgumentParser(description="Bootstrap MCP services")
  parser.add_argument(
    "--mode",
    choices=["clone", "install", "config", "all"],
    default="all",
    help="Execution mode"
  )
  parser.add_argument(
    "--base-dir",
    default=str((Path(__file__).resolve().parents[1])),
    help="Base MCP_Manual directory"
  )
  parser.add_argument("--update", action="store_true", help="Run git pull for existing repositories")
  parser.add_argument("--dry-run", action="store_true", help="Print planned actions without executing commands")
  args = parser.parse_args()

  base_dir = Path(args.base_dir).resolve()
  sources_dir = base_dir / "sources"
  sources_dir.mkdir(parents=True, exist_ok=True)

  report_lines: List[str] = [
    "# MCP Bootstrap Report",
    "",
    f"- Time (UTC): {datetime.now(timezone.utc).isoformat()}",
    f"- Base dir: `{base_dir}`",
    f"- Mode: `{args.mode}`",
    f"- Update existing repos: `{args.update}`",
    f"- Dry run: `{args.dry_run}`",
    "",
    "## Service Actions"
  ]

  summary_rows: List[str] = []

  do_clone = args.mode in {"clone", "all"}
  do_install = args.mode in {"install", "all"}
  do_config = args.mode in {"config", "all"}

  for service in SERVICES:
    report_lines.append("")
    report_lines.append(f"### {service.key} - {service.name}")

    clone_state = "SKIPPED"
    install_state = "SKIPPED"

    if do_clone:
      clone_res = clone_or_update_repo(
        service=service,
        sources_dir=sources_dir,
        update=args.update,
        dry_run=args.dry_run,
        log_lines=report_lines
      )
      clone_state = clone_res["clone"]
      if clone_res["path"]:
        report_lines.append(f"- Source path: `{clone_res['path']}`")

    if do_install:
      install_state = install_repo_dependencies(
        service=service,
        sources_dir=sources_dir,
        dry_run=args.dry_run,
        log_lines=report_lines
      )

    summary_rows.append(
      f"| {service.key} | {clone_state} | {install_state} | {service.repo or '-'} |"
    )

  if do_config:
    report_lines.append("")
    report_lines.append("## Config Generation")
    generate_config_files(base_dir=base_dir, dry_run=args.dry_run, log_lines=report_lines)

  report_lines.append("")
  report_lines.append("## Summary")
  report_lines.append("| Service | Clone | Install | Repo |")
  report_lines.append("|---|---|---|---|")
  report_lines.extend(summary_rows)

  write_report(base_dir=base_dir, report_lines=report_lines, dry_run=args.dry_run)
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
