# Phase 1 MVP - 数据模型草案

更新时间：2026-03-26 16:21 CST
项目：AI 工具导航与需求收集站（MVP）
状态：active

## 实体 1：Tool
字段：
- id
- name
- category
- summary
- tags
- scenario
- website_url
- created_at
- updated_at

## 实体 2：Requirement
字段：
- id
- name
- contact
- type
- description
- source_tool_id（可空）
- status
- created_at

## 状态建议
### Requirement.status
- new
- reviewing
- accepted
- archived
