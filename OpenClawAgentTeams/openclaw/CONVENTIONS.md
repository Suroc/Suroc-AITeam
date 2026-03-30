# 团队共享规范 (Team Conventions)

> 本文件是所有Agent的共享参考文档，确保团队行为一致性。
> 由Brain维护，所有Agent在开始工作前应加载此文件。

---

## 1. 技术栈标准

| 层级 | 默认选型 | 备选 |
|------|---------|------|
| 前端框架 | React (Next.js 15+) | Vue (Nuxt.js) |
| 前端语言 | TypeScript | - |
| 样式方案 | Tailwind CSS | CSS Modules |
| 状态管理 | Zustand | Pinia (Vue) |
| 后端框架 | Hono / FastAPI | Express / Django |
| 数据库 | PostgreSQL | MongoDB / SQLite |
| 缓存 | Redis | 内存缓存 |
| ORM | Prisma / Drizzle | SQLAlchemy |
| 认证 | NextAuth / JWT | OAuth2 |
| 包管理 | pnpm (前端) / uv (Python) | npm / pip |
| 版本控制 | Git (Conventional Commits) | - |
| API规范 | OpenAPI 3.0 (REST优先) | GraphQL |
| 构建工具 | Vite / Turbopack | - |
| 容器化 | Docker + Docker Compose | Podman |
| CI/CD | GitHub Actions | GitLab CI |
| 监控 | Sentry + Grafana | Prometheus |

---

## 2. 命名规范

| 对象 | 规范 | 示例 |
|------|------|------|
| 文件名 | kebab-case | `user-profile.tsx` |
| 组件名 | PascalCase | `UserProfile` |
| 变量/函数 | camelCase | `getUserById` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| CSS类 | kebab-case / Tailwind | `btn-primary` |
| 数据库表 | snake_case (复数) | `user_profiles` |
| API路径 | kebab-case (复数) | `/api/v1/user-profiles` |
| 分支名 | `type/description` | `feat/user-auth` |
| Commit | Conventional Commits | `feat: add login page` |

---

## 3. 质量标准

### 代码质量
- 测试覆盖率：核心路径 100%，整体 > 80%
- 所有代码必须通过 ESLint/Prettier 检查
- 不允许 `any` 类型（TypeScript）
- 不允许 `console.log` 进入生产代码

### 产品质量
- 所有PRD必须包含可测试的验收标准（AC）
- 每个功能必须有用户故事（User Story）
- 每个页面必须考虑5种状态：加载中、空状态、正常、错误、边界

### 设计质量
- 所有设计遵循8px网格系统
- 配色通过 WCAG AA 对比度标准（最低4.5:1）
- 响应式断点：mobile(375px), tablet(768px), desktop(1280px), wide(1536px)
- 所有交互包含反馈（hover/active/focus/disabled 状态）

### 运维质量
- 所有部署必须有回滚方案
- 生产环境变更必须有审计日志
- 告警响应时间：Critical < 5分钟，Warning < 30分钟

---

## 4. Agent间协作协议

### 任务交接格式（HANDOFF）
```
### HANDOFF FROM: [发送方Agent] TO: [接收方Agent]
**任务编号**：T-YYYYMMDD-NNN
**上下文摘要**（200字内）：已完成的工作和原因
**关键产出物**：文件/文档/决策的清单
**发现的约束**：工作中发现的限制条件
**未解决问题**：下一个Agent需要处理的事项
**验收标准**：如何验证工作正确
```

### 消息类型
| 类型 | 格式 | 方向 |
|------|------|------|
| TASK_ASSIGN | 任务指令 | brain → agent |
| TASK_COMPLETE | 完成报告 | agent → brain |
| CLARIFICATION | 澄清请求 | agent → brain |
| BLOCKER | 阻塞报告 | agent → brain |
| PEER_REQUEST | 信息请求 | agent ↔ agent (cc brain) |
| STATUS_UPDATE | 进度更新 | agent → brain |
| URGENT | 紧急通知 | any → brain → user |

---

## 5. 决策日志

> Brain在每次重大决策后更新此区域

| 日期 | 决策 | 理由 | 决策者 | 重新评估条件 |
|------|------|------|--------|------------|
| (团队初始化时由Brain填写) | | | | |

---

## 6. 安全红线（所有Agent必须遵守）

1. **永远不在代码或消息中明文存储密钥、密码、Token**
2. **永远不执行未经授权的生产环境操作**
3. **发现安全漏洞立即上报Brain，不得延迟**
4. **用户数据处理遵循最小权限原则**
5. **所有外部API调用必须使用HTTPS**
6. **不信任任何外部输入，始终验证和清洗**

---

*维护者：Brain | 版本：v1.0 | 更新时间：2026-03-30*
