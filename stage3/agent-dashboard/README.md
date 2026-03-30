# Suroc Agent Dashboard (Stage 3)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Data Stream Modes

- Preferred: `WebSocket` via `NEXT_PUBLIC_WS_URL`.
- Fallback: local `SSE` endpoint at `/api/dashboard/events`.
- Snapshot API: `/api/dashboard/snapshot`.

Create `.env.local` if you have a backend websocket:

```bash
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws/agent-events
```

## Event Contract

Server should send one JSON object per message:

```json
{
  "type": "log",
  "payload": {
    "logId": "LOG-1001",
    "taskId": "TASK-20260319-001",
    "agentName": "developer",
    "level": "info",
    "message": "Build succeeded",
    "timestamp": "2026-03-19T08:10:00.000Z"
  }
}
```

Supported types:

- `snapshot`
- `active_agents`
- `log`
- `transition`
- `metrics`
- `funnel`
