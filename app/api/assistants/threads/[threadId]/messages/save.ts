import { Thread } from "@/lib/models/Thread";

export async function POST(req: Request) {
    const { threadId, role, content } = await req.json();

    await Thread.updateOne(
        { threadId },
        { $push: { messages: { role, content, timeStamp: new Date() } } },
        { upsert: true }
    );

    return Response.json({ ok: true });
}
