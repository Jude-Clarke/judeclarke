import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
    {
        role: { type: String, required: true },
        content: { type: String, required: true },
        timeStamp: { type: Date, default: Date.now },
    },
    { _id: false }
);

const ThreadSchema = new Schema({
    threadId: { type: String, required: true, index: true },
    messages: [MessageSchema],
});

export const Thread =
    models.Thread || model("Thread", ThreadSchema);
