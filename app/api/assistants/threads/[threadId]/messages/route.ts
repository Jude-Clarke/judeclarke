import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import mongoose from "mongoose";
import { AssistantStream } from "openai/lib/AssistantStream";
import moment from "moment";

export const runtime = "nodejs";




// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  let messageContent;
  let messageStream
  try {
    const { content } = await request.json();
    messageContent = content;

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });

    const stream = openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId,
    });
    messageStream = stream
    
    return new Response(stream.toReadableStream());
  } catch(error) {
    console.error("Error: ", error);
    return new Response("Error occured", {status: 500 });
  } 
  finally {

    // DATABASE LOGIC
    const MONGODB_URI = process.env.MONGODB_URI;

    // Connect to MongoDB
    mongoose.connect(MONGODB_URI, {
        // dbName: 'clarkebotDB' // Specify the database name
        dbName: process.env.DB // DB for testing
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
        messages: [{ role: String, content: String, timeStamp: String}],
    });

    // Specify the collection name explicitly
    const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

    // DATABASE LOGIC


    // Save the user message to the database
    const content = messageContent;
    const stream = messageStream;
    const updateUserMessage = async ()=> {
    await Thread.updateOne(
        { threadId },
        { $push: { messages: { role: "user", content, timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a') } } },
        { upsert: true }
      );
    }
    updateUserMessage();


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
        { $push: { messages: { role: "assistant", content: `![${image.file_id}](/api/files/${image.file_id})`, timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a') } } }
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
        { $push: { messages: { role: "assistant", content: assistantResponse, timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a') } } }
      );
    };
  }
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


