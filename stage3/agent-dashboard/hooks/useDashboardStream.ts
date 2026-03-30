"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardEvent, DashboardSnapshot } from "@/lib/types";

const MAX_LOGS = 300;
const MAX_TRANSITIONS = 300;

const initialState: DashboardSnapshot = {
  activeAgents: [],
  logs: [],
  transitions: [],
  metrics: {
    totalTasks: 0,
    successCount: 0,
    failCount: 0,
    runningCount: 0,
    avgCostUsd: 0
  },
  funnel: [],
  generatedAt: new Date().toISOString()
};

function applyEvent(prev: DashboardSnapshot, event: DashboardEvent): DashboardSnapshot {
  if (event.type === "snapshot") {
    return event.payload;
  }

  if (event.type === "log") {
    return {
      ...prev,
      logs: [event.payload, ...prev.logs].slice(0, MAX_LOGS)
    };
  }

  if (event.type === "transition") {
    return {
      ...prev,
      transitions: [event.payload, ...prev.transitions].slice(0, MAX_TRANSITIONS)
    };
  }

  if (event.type === "active_agents") {
    return {
      ...prev,
      activeAgents: event.payload
    };
  }

  if (event.type === "metrics") {
    return {
      ...prev,
      metrics: event.payload
    };
  }

  return {
    ...prev,
    funnel: event.payload
  };
}

export function useDashboardStream() {
  const [data, setData] = useState<DashboardSnapshot>(initialState);
  const [connected, setConnected] = useState(false);
  const [transport, setTransport] = useState<"websocket" | "sse" | "api">("api");

  useEffect(() => {
    let ws: WebSocket | null = null;
    let source: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const consume = (event: DashboardEvent) => {
      setData((prev) => applyEvent(prev, event));
    };

    const loadSnapshot = async () => {
      try {
        const res = await fetch("/api/dashboard/snapshot", { cache: "no-store" });
        if (!res.ok) {
          return;
        }
        const snapshot = (await res.json()) as DashboardSnapshot;
        consume({ type: "snapshot", payload: snapshot });
      } catch {
        // keep existing state
      }
    };

    const connectWs = () => {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
      if (!wsUrl) {
        return false;
      }

      ws = new WebSocket(wsUrl);
      setTransport("websocket");

      ws.onopen = () => setConnected(true);

      ws.onmessage = (message) => {
        try {
          const parsed = JSON.parse(message.data) as DashboardEvent;
          consume(parsed);
        } catch {
          // ignore malformed events
        }
      };

      ws.onerror = () => setConnected(false);

      ws.onclose = () => {
        setConnected(false);
        reconnectTimer = setTimeout(() => {
          connectWs();
        }, 1500);
      };

      return true;
    };

    const connectSse = () => {
      source = new EventSource("/api/dashboard/events");
      setTransport("sse");

      source.onopen = () => setConnected(true);
      source.onerror = () => setConnected(false);
      source.onmessage = (message) => {
        try {
          const parsed = JSON.parse(message.data) as DashboardEvent;
          consume(parsed);
        } catch {
          // ignore malformed events
        }
      };
    };

    loadSnapshot();

    if (!connectWs()) {
      connectSse();
    }

    return () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      ws?.close();
      source?.close();
    };
  }, []);

  const successRate = useMemo(() => {
    if (data.metrics.totalTasks === 0) {
      return 0;
    }
    return (data.metrics.successCount / data.metrics.totalTasks) * 100;
  }, [data.metrics.successCount, data.metrics.totalTasks]);

  return {
    data,
    connected,
    transport,
    successRate
  };
}
