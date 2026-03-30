import { AgentLog } from "@/lib/types";
import { Panel } from "@/components/Panel";

const levelClass: Record<AgentLog["level"], string> = {
  info: "text-brand",
  warn: "text-warn",
  error: "text-fail"
};

export function LogStreamPanel({ logs }: { logs: AgentLog[] }) {
  return (
    <Panel title="Live Log Stream">
      <div className="max-h-[360px] space-y-2 overflow-auto pr-1">
        {logs.length === 0 && <p className="text-sm text-slate-400">Waiting for logs...</p>}
        {logs.map((log) => (
          <div key={log.logId} className="rounded-lg border border-border bg-slate-900/60 p-2 text-xs">
            <div className="mb-1 flex items-center justify-between">
              <span className={`font-semibold uppercase ${levelClass[log.level]}`}>{log.level}</span>
              <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
            <p className="text-slate-200">
              [{log.agentName}] {log.message}
            </p>
            <p className="mt-1 text-slate-500">Task: {log.taskId}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
