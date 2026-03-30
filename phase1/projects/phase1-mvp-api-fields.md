# Phase 1 MVP - API 字段定义

更新时间：2026-03-26 16:42 CST
项目：AI 工具导航与需求收集站（MVP）
状态：active

## GET /api/tools
返回字段：
- id
- name
- category
- summary
- tags

## GET /api/tools/:id
返回字段：
- id
- name
- category
- summary
- tags
- scenario
- website_url

## POST /api/requirements
请求字段：
- name
- contact
- type
- description
- source_tool_id（可选）

## POST /api/admin/tools
请求字段：
- name
- category
- summary
- tags
- scenario
- website_url
