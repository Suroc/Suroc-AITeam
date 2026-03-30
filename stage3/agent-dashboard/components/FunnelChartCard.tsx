"use client";

import { Panel } from "@/components/Panel";
import { FunnelStage } from "@/lib/types";
import { Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from "recharts";

export function FunnelChartCard({ funnel }: { funnel: FunnelStage[] }) {
  return (
    <Panel title="Opportunity Conversion Funnel">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={funnel} isAnimationActive fill="#38bdf8">
              <LabelList position="right" fill="#cbd5e1" stroke="none" dataKey="stage" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
