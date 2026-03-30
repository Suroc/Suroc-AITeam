import {
  ActiveAgent,
  AgentLog,
  DashboardEvent,
  DashboardSnapshot,
  FunnelStage,
  Metrics,
  TaskTransition
} from "@/lib/types";

const AGENT_NAMES = [
  "team_lead",
  "market_intelligence",
  "risk_control",
  "product_designer",
  "developer",
  "qa_tester"
];

export function getMockDashboardSnapshot(): DashboardSnapshot {
  const now = new Date();

  const activeAgents: ActiveAgent[] = [
    {
      agentName: "market_intelligence",
      status: "running",
      currentTaskId: "TASK-20260319-001",
      updatedAt: now.toISOString()
    },
    {
      agentName: "risk_control",
      status: "running",
      currentTaskId: "TASK-20260319-001",
      updatedAt: now.toISOString()
    },
    {
      agentName: "developer",
      status: "blocked",
      currentTaskId: "TASK-20260319-004",
      updatedAt: now.toISOString()
    },
    {
      agentName: "qa_tester",
      status: "idle",
      currentTaskId: null,
      updatedAt: now.toISOString()
    },
    {
      agentName: "product_designer",
      status: "idle",
      currentTaskId: null,
      updatedAt: now.toISOString()
    },
    {
      agentName: "team_lead",
      status: "running",
      currentTaskId: "TASK-20260319-CTRL",
      updatedAt: now.toISOString()
    }
  ];

  const metrics: Metrics = {
    totalTasks: 182,
    successCount: 151,
    failCount: 19,
    runningCount: 12,
    avgCostUsd: 1.42
  };

  const logs: AgentLog[] = [
    {
      logId: "LOG-1",
      taskId: "TASK-20260319-001",
      agentName: "market_intelligence",
      level: "info",
      message: "Scanned 248 sources and grouped 13 candidate opportunities.",
      timestamp: now.toISOString()
    },
    {
      logId: "LOG-2",
      taskId: "TASK-20260319-001",
      agentName: "risk_control",
      level: "warn",
      message: "Jurisdiction mismatch found. Requesting legal data refresh.",
      timestamp: new Date(now.getTime() - 60_000).toISOString()
    },
    {
      logId: "LOG-3",
      taskId: "TASK-20260319-004",
      agentName: "developer",
      level: "error",
      message: "CI build failed on integration tests.",
      timestamp: new Date(now.getTime() - 120_000).toISOString()
    }
  ];

  const transitions: TaskTransition[] = [
    {
      transitionId: "TR-1",
      taskId: "TASK-20260319-001",
      agentName: "market_intelligence",
      fromState: "queued",
      toState: "running",
      inputPayload: "{\"query\":\"AI automation market\"}",
      outputPayload: null,
      costUsd: 0.23,
      timestamp: new Date(now.getTime() - 300_000).toISOString()
    },
    {
      transitionId: "TR-2",
      taskId: "TASK-20260319-001",
      agentName: "risk_control",
      fromState: "handoff",
      toState: "running",
      inputPayload: "{\"opportunity_id\":\"OPP-4492\"}",
      outputPayload: "{\"risk_score\":0.64}",
      costUsd: 0.37,
      timestamp: new Date(now.getTime() - 180_000).toISOString()
    },
    {
      transitionId: "TR-3",
      taskId: "TASK-20260319-004",
      agentName: "developer",
      fromState: "running",
      toState: "failed",
      inputPayload: "{\"branch\":\"feature/opportunity-004\"}",
      outputPayload: "{\"error\":\"integration tests failed\"}",
      costUsd: 0.91,
      timestamp: new Date(now.getTime() - 90_000).toISOString()
    }
  ];

  const funnel: FunnelStage[] = [
    { stage: "Scanned", value: 1240 },
    { stage: "Shortlisted", value: 206 },
    { stage: "Risk Passed", value: 88 },
    { stage: "Designed", value: 55 },
    { stage: "Built", value: 34 },
    { stage: "Test Passed", value: 27 }
  ];

  return {
    activeAgents,
    logs,
    transitions,
    metrics,
    funnel,
    generatedAt: now.toISOString()
  };
}

function randomAgentName(): string {
  return AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)] ?? "team_lead";
}

export function createRandomEvent(): DashboardEvent {
  const now = new Date().toISOString();
  const random = Math.random();

  if (random < 0.35) {
    return {
      type: "log",
      payload: {
        logId: `LOG-${Date.now()}`,
        taskId: `TASK-${Date.now()}`,
        agentName: randomAgentName(),
        level: Math.random() > 0.8 ? "warn" : "info",
        message: "Heartbeat update from runtime stream.",
        timestamp: now
      }
    };
  }

  if (random < 0.55) {
    return {
      type: "transition",
      payload: {
        transitionId: `TR-${Date.now()}`,
        taskId: `TASK-${Date.now()}`,
        agentName: randomAgentName(),
        fromState: "running",
        toState: Math.random() > 0.85 ? "failed" : "succeeded",
        inputPayload: "{\"source\":\"event\"}",
        outputPayload: "{\"status\":\"done\"}",
        costUsd: Number((Math.random() * 1.2).toFixed(2)),
        timestamp: now
      }
    };
  }

  if (random < 0.75) {
    return {
      type: "active_agents",
      payload: AGENT_NAMES.map((agentName, idx) => ({
        agentName,
        status: idx % 3 === 0 ? "running" : idx % 2 === 0 ? "blocked" : "idle",
        currentTaskId: idx % 3 === 0 ? `TASK-ACT-${idx}` : null,
        updatedAt: now
      }))
    };
  }

  if (random < 0.9) {
    return {
      type: "metrics",
      payload: {
        totalTasks: 182 + Math.floor(Math.random() * 10),
        successCount: 151 + Math.floor(Math.random() * 8),
        failCount: 19 + Math.floor(Math.random() * 4),
        runningCount: 8 + Math.floor(Math.random() * 7),
        avgCostUsd: Number((1.2 + Math.random() * 0.6).toFixed(2))
      }
    };
  }

  return {
    type: "funnel",
    payload: [
      { stage: "Scanned", value: 1240 + Math.floor(Math.random() * 30) },
      { stage: "Shortlisted", value: 206 + Math.floor(Math.random() * 10) },
      { stage: "Risk Passed", value: 88 + Math.floor(Math.random() * 6) },
      { stage: "Designed", value: 55 + Math.floor(Math.random() * 4) },
      { stage: "Built", value: 34 + Math.floor(Math.random() * 3) },
      { stage: "Test Passed", value: 27 + Math.floor(Math.random() * 2) }
    ]
  };
}
