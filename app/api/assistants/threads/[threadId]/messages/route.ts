import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import mongoose from "mongoose";
import { AssistantStream } from "openai/lib/AssistantStream";

export const runtime = "nodejs";





// DATABASE LOGIC
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    // dbName: 'clarkebotDB' // Specify the database name
    dbName: "testDB" // DB for testing
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// MongoDB Schema and Model
const threadSchema = new mongoose.Schema({
    userMessage: String,
    threadId: String,
    messages: [{ role: String, content: String }],
});

// Specify the collection name explicitly
const Thread = mongoose.model('Thread', threadSchema);

// DATABASE LOGIC





// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { content } = await request.json();

  // Save the user message to the database
  await Thread.updateOne(
    { threadId },
    { $push: { messages: { role: "user", content } } },
    { upsert: true }
  );

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  // Temporary variable to store the response
  let assistantResponse = '';

  // Set up AssistantStream to handle events and save messages to the database
  const assistantStream = AssistantStream.fromReadableStream(stream.toReadableStream());

  assistantStream.on("textCreated", () => {
    console.log("Assistant is creating a new message...");
  });

  assistantStream.on("textDelta", (delta) => {
    if (delta.value != null) {
      assistantResponse += delta.value; // Collect the response tokens
    }
  });

  assistantStream.on("imageFileDone", async (image) => {
    await Thread.updateOne(
      { threadId },
      { $push: { messages: { role: "assistant", content: `![${image.file_id}](/api/files/${image.file_id})` } } }
    );
  });

  assistantStream.on("toolCallCreated", (toolCall) => {
    if (toolCall.type != "code_interpreter") return;
    // Handle tool call if needed
  });

  assistantStream.on("toolCallDelta", (delta, snapshot) => {
    if (delta.type != "code_interpreter") return;
    if (!delta.code_interpreter.input) return;
    // Handle tool call delta if needed
  });

  assistantStream.on("event", async (event) => {
    if (event.event === "thread.run.requires_action") {
      await handleRequiresAction(event);
    }
    if (event.event === "thread.run.completed") {
      await handleRunCompleted(event);
    }
  });

  // Function to handle requires_action event
  const handleRequiresAction = async (event) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
  };

  // Function to handle run.completed event
  const handleRunCompleted = async (event) => {
    // Save the complete assistant response to the database
    await Thread.updateOne(
      { threadId },
      { $push: { messages: { role: "assistant", content: assistantResponse } } }
    );
  };

  return new Response(stream.toReadableStream());
}






//    // Create and save the test document
//    const test = await new Thread({
//     userMessage: "The test passed",
//     threadId: "testId",
//     messages: [{ role: "user", content: "Hello there!"}],
// });

// await test.save()
//     .then(() => console.log('Test thread created'))
//     .catch(error => console.error('Error creating test thread:', error));


