"use client";

import { ActiveAgentsPanel } from "@/components/ActiveAgentsPanel";
import { FunnelChartCard } from "@/components/FunnelChartCard";
import { LogStreamPanel } from "@/components/LogStreamPanel";
import { MetricsBoard } from "@/components/MetricsBoard";
import { StateTransitionsTable } from "@/components/StateTransitionsTable";
import { useDashboardStream } from "@/hooks/useDashboardStream";

export default function DashboardPage() {
  const { data, connected, transport, successRate } = useDashboardStream();

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">Suroc Multi-Agent Operations</h1>
        <p className="mt-2 text-sm text-slate-300">
          Real-time visibility for active agents, log streams, success KPI, and conversion funnel.
        </p>
      </header>

      <section className="mb-4">
        <MetricsBoard metrics={data.metrics} successRate={successRate} connected={connected} transport={transport} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ActiveAgentsPanel agents={data.activeAgents} />
        <FunnelChartCard funnel={data.funnel} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <LogStreamPanel logs={data.logs} />
        <StateTransitionsTable rows={data.transitions} />
      </section>
    </main>
  );
}
