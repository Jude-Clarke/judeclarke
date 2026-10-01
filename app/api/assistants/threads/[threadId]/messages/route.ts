import { openai } from "@/app/openai";
import { systemInstructions } from "@/app/instructions";
import { getVectorStoreId } from "@/app/vector-store";

export const runtime = "nodejs";

// Send a new message and stream the response (STREAM ONLY)
export async function POST(request: Request) {
  try {
    const { content, history = [] } = await request.json();
    const vectorStoreId = await getVectorStoreId();

    const stream = await openai.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions: systemInstructions,
      input: [...history, { role: "user", content }],
      tools: [{ type: "file_search", vector_store_ids: [vectorStoreId] }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
          }
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({ type: "response.failed", message: String(err) }) + "\n"
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Response stream error:", error);
    return new Response("Failed to start response stream", { status: 500 });
  }
}
