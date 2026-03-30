import { Panel } from "@/components/Panel";
import { TaskTransition } from "@/lib/types";

export function StateTransitionsTable({ rows }: { rows: TaskTransition[] }) {
  return (
    <Panel title="State Machine Transitions">
      <div className="max-h-[360px] overflow-auto">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border text-slate-300">
              <th className="px-2 py-2">Task ID</th>
              <th className="px-2 py-2">Agent</th>
              <th className="px-2 py-2">From</th>
              <th className="px-2 py-2">To</th>
              <th className="px-2 py-2">Cost</th>
              <th className="px-2 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.transitionId} className="border-b border-border/70 text-slate-200">
                <td className="px-2 py-2">{row.taskId}</td>
                <td className="px-2 py-2">{row.agentName}</td>
                <td className="px-2 py-2">{row.fromState ?? "-"}</td>
                <td className="px-2 py-2">{row.toState}</td>
                <td className="px-2 py-2">${row.costUsd.toFixed(2)}</td>
                <td className="px-2 py-2">{new Date(row.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
