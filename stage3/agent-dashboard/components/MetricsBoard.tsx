import { Panel } from "@/components/Panel";
import { Metrics } from "@/lib/types";

interface Props {
  metrics: Metrics;
  successRate: number;
  connected: boolean;
  transport: "websocket" | "sse" | "api";
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-900/60 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  );
}

export function MetricsBoard({ metrics, successRate, connected, transport }: Props) {
  return (
    <Panel title="Task Success KPI">
      <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-slate-900/60 px-3 py-2 text-xs">
        <span className="text-slate-300">Stream Transport: {transport}</span>
        <span className={connected ? "text-ok" : "text-fail"}>{connected ? "Connected" : "Disconnected"}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Card label="Success Rate" value={`${successRate.toFixed(1)}%`} />
        <Card label="Total Tasks" value={`${metrics.totalTasks}`} />
        <Card label="Succeeded" value={`${metrics.successCount}`} />
        <Card label="Failed" value={`${metrics.failCount}`} />
        <Card label="Avg Cost" value={`$${metrics.avgCostUsd.toFixed(2)}`} />
      </div>
    </Panel>
  );
}
