# Phase 1 MVP - 架构方案

更新时间：2026-03-26 16:12 CST
项目：AI 工具导航与需求收集站（MVP）
状态：draft

## 1. 架构目标
用最小复杂度实现一个可展示、可提交、可管理的 MVP。

## 2. 建议架构
### 前端
- Next.js / React
- 负责工具列表、详情页、需求提交页、简易后台页面

### 后端
- Node.js / Next API Routes 或轻量服务端
- 提供工具列表接口、详情接口、需求提交接口、后台管理接口

### 数据层
- SQLite / Postgres（二选一，MVP 优先轻量）
- 存储工具目录与需求提交记录

## 3. 模块划分
1. Tool Catalog 模块
2. Tool Detail 模块
3. Requirement Intake 模块
4. Admin Basic 模块

## 4. 非功能要求
1. 结构清晰，便于后续扩展
2. 支持最小部署
3. 接口与页面边界清晰
4. 数据模型保持简单

## 5. 初步数据实体
### Tool
- id
- name
- category
- summary
- tags
- scenario

### Requirement
- id
- name
- contact
- type
- description
- created_at
