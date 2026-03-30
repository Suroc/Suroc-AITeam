-- Stage 3: Monitoring and State Persistence Schema
-- PostgreSQL 15+

CREATE TYPE agent_status AS ENUM ('idle', 'running', 'blocked');
CREATE TYPE task_state AS ENUM ('queued', 'running', 'handoff', 'succeeded', 'failed', 'cancelled');
CREATE TYPE log_level AS ENUM ('info', 'warn', 'error');

CREATE TABLE agents (
  agent_id          BIGSERIAL PRIMARY KEY,
  agent_name        VARCHAR(80) NOT NULL UNIQUE,
  role_name         VARCHAR(120) NOT NULL,
  current_status    agent_status NOT NULL DEFAULT 'idle',
  last_heartbeat_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  task_id              VARCHAR(64) PRIMARY KEY,
  correlation_id       VARCHAR(64),
  business_domain      VARCHAR(80),
  title                TEXT NOT NULL,
  priority             SMALLINT NOT NULL DEFAULT 3,
  source_channel       VARCHAR(80),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_at            TIMESTAMPTZ
);

-- Required fields from request are embedded here:
-- task_id, agent_name, input_payload, output_payload, cost_usd, timestamp
CREATE TABLE task_state_transitions (
  transition_id        BIGSERIAL PRIMARY KEY,
  task_id              VARCHAR(64) NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
  agent_name           VARCHAR(80) NOT NULL REFERENCES agents(agent_name),
  from_state           task_state,
  to_state             task_state NOT NULL,
  input_payload        JSONB NOT NULL DEFAULT '{}'::jsonb,
  output_payload       JSONB,
  cost_usd             NUMERIC(12, 4) NOT NULL DEFAULT 0,
  token_in             INTEGER NOT NULL DEFAULT 0,
  token_out            INTEGER NOT NULL DEFAULT 0,
  timestamp            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE agent_logs (
  log_id               BIGSERIAL PRIMARY KEY,
  task_id              VARCHAR(64) REFERENCES tasks(task_id) ON DELETE SET NULL,
  agent_name           VARCHAR(80) NOT NULL REFERENCES agents(agent_name),
  level                log_level NOT NULL DEFAULT 'info',
  message              TEXT NOT NULL,
  metadata             JSONB NOT NULL DEFAULT '{}'::jsonb,
  timestamp            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE metrics_hourly (
  bucket_start         TIMESTAMPTZ PRIMARY KEY,
  total_tasks          INTEGER NOT NULL,
  success_count        INTEGER NOT NULL,
  fail_count           INTEGER NOT NULL,
  running_count        INTEGER NOT NULL,
  avg_cost_usd         NUMERIC(12, 4) NOT NULL
);

CREATE TABLE opportunity_funnel_snapshots (
  snapshot_id          BIGSERIAL PRIMARY KEY,
  bucket_start         TIMESTAMPTZ NOT NULL,
  scanned_count        INTEGER NOT NULL DEFAULT 0,
  shortlisted_count    INTEGER NOT NULL DEFAULT 0,
  risk_passed_count    INTEGER NOT NULL DEFAULT 0,
  designed_count       INTEGER NOT NULL DEFAULT 0,
  built_count          INTEGER NOT NULL DEFAULT 0,
  test_passed_count    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_transitions_task_time
  ON task_state_transitions(task_id, timestamp DESC);

CREATE INDEX idx_transitions_agent_time
  ON task_state_transitions(agent_name, timestamp DESC);

CREATE INDEX idx_logs_agent_time
  ON agent_logs(agent_name, timestamp DESC);

CREATE INDEX idx_tasks_created_at
  ON tasks(created_at DESC);

CREATE INDEX idx_funnel_bucket
  ON opportunity_funnel_snapshots(bucket_start DESC);
