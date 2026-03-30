import { ActiveAgent } from "@/lib/types";
import { Panel } from "@/components/Panel";

const statusColor: Record<ActiveAgent["status"], string> = {
  idle: "bg-slate-500",
  running: "bg-ok",
  blocked: "bg-fail"
};

export function ActiveAgentsPanel({ agents }: { agents: ActiveAgent[] }) {
  return (
    <Panel title="Active Agents">
      <div className="space-y-3">
        {agents.map((agent) => (
          <article
            key={agent.agentName}
            className="flex items-center justify-between rounded-lg border border-border bg-slate-900/50 p-3"
          >
            <div>
              <p className="font-medium text-slate-100">{agent.agentName}</p>
              <p className="text-xs text-slate-400">
                Task: {agent.currentTaskId ?? "none"} | Updated:{" "}
                {new Date(agent.updatedAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${statusColor[agent.status]}`} />
              <span className="text-xs uppercase tracking-wide text-slate-300">{agent.status}</span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
