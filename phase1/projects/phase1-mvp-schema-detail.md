# Phase 1 MVP - 数据表结构细化

更新时间：2026-03-26 16:42 CST
项目：AI 工具导航与需求收集站（MVP）
状态：active

## tools 表
- id: string / uuid
- name: string
- category: string
- summary: text
- tags: text/json
- scenario: text
- website_url: string
- created_at: datetime
- updated_at: datetime

## requirements 表
- id: string / uuid
- name: string
- contact: string
- type: string
- description: text
- source_tool_id: string nullable
- status: string
- created_at: datetime
