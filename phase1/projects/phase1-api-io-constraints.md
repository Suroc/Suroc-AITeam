# Phase 1 MVP - 后端接口输入输出约束

更新时间：2026-03-26 16:57 CST
项目：AI 工具导航与需求收集站（MVP）
状态：active

## GET /api/tools
输入：无
输出：tools[]

## GET /api/tools/:id
输入：id
输出：tool object

## POST /api/requirements
输入：name, contact, type, description, source_tool_id?
输出：success, requirement_id

## POST /api/admin/tools
输入：name, category, summary, tags, scenario, website_url
输出：success, tool_id

## 基础约束
1. 必填字段必须校验
2. 输出统一 success/error 结构
3. 非法 id 返回错误
