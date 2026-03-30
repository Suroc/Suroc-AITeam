export type AgentStatus = "idle" | "running" | "blocked";

export type TaskState =
  | "queued"
  | "running"
  | "handoff"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface ActiveAgent {
  agentName: string;
  status: AgentStatus;
  currentTaskId: string | null;
  updatedAt: string;
}

export interface AgentLog {
  logId: string;
  taskId: string;
  agentName: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

export interface TaskTransition {
  transitionId: string;
  taskId: string;
  agentName: string;
  fromState: TaskState | null;
  toState: TaskState;
  inputPayload: string;
  outputPayload: string | null;
  costUsd: number;
  timestamp: string;
}

export interface Metrics {
  totalTasks: number;
  successCount: number;
  failCount: number;
  runningCount: number;
  avgCostUsd: number;
}

export interface FunnelStage {
  stage: string;
  value: number;
}

export interface DashboardSnapshot {
  activeAgents: ActiveAgent[];
  logs: AgentLog[];
  transitions: TaskTransition[];
  metrics: Metrics;
  funnel: FunnelStage[];
  generatedAt: string;
}

export type DashboardEvent =
  | { type: "snapshot"; payload: DashboardSnapshot }
  | { type: "active_agents"; payload: ActiveAgent[] }
  | { type: "log"; payload: AgentLog }
  | { type: "transition"; payload: TaskTransition }
  | { type: "metrics"; payload: Metrics }
  | { type: "funnel"; payload: FunnelStage[] };
