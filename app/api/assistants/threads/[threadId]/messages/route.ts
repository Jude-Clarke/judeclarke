import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Send a new message to a thread (STREAM ONLY)
export async function POST(
  request: Request,
  { params: { threadId } }: { params: { threadId: string } }
) {
  try {
    const { content } = await request.json();

    // 1. Add user message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content,
    });

    // 2. Start assistant run as a stream
    const stream = openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId,
    });

    // 3. Return stream directly — NOTHING ELSE
    return new Response(stream.toReadableStream(), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Assistant stream error:", error);
    return new Response("Failed to start assistant stream", { status: 500 });
  }
}
