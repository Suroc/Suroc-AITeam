import { createRandomEvent } from "@/lib/mock";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();
  let interval: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      interval = setInterval(() => {
        const event = createRandomEvent();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }, 2000);
    },
    cancel() {
      if (interval) {
        clearInterval(interval);
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform"
    }
  });
}
