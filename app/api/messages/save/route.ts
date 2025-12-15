import { connectDB } from "@/lib/db";
import { Thread } from "@/lib/models/Thread";

export async function POST(req: Request) {
    const { threadId, role, content } = await req.json();

    if (!threadId || !role || !content) {
        return new Response("Missing fields", { status: 400 });
    }

    await connectDB();

    await Thread.updateOne(
        { threadId },
        {
            $push: {
                messages: {
                    role,
                    content,
                    timeStamp: new Date(),
                },
            },
        },
        { upsert: true }
    );

    console.log("Saved message to DB:", { threadId, role, content });

    return Response.json({ ok: true });
}
