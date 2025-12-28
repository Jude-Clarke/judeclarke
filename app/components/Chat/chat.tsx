"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { AssistantStream } from "openai/lib/AssistantStream";
// @ts-expect-error - no types for this yet
import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import CustomMarkdown from "./CustomMarkdown";
import { PulseLoader } from "react-spinners";
import { FaPaperPlane } from "react-icons/fa";
import { useMedia } from "../../contexts/MediaContext";

type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
};

const removeAnnotations = (text: string) => text.replace(/【.*?】/g, "");

const UserMessage = ({ text }: { text: string }) => (
  <div className={styles.userMessage}>{text}</div>
);
const AssistantMessage = ({ text }: { text: string }) => (
  <div className={styles.assistantMessage}>
    <CustomMarkdown markdown={text} />
  </div>
);
const CodeMessage = ({ text }: { text: string }) => (
  <div className={styles.codeMessage}>
    {text.split("\n").map((line, index) => (
      <div key={index}>
        <span>{`${index + 1}. `}</span>
        {line}
      </div>
    ))}
  </div>
);

const Message = ({ role, text }: MessageProps) => {
  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={removeAnnotations(text)} />;
    case "code":
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};

type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall
  ) => Promise<string>;
};

const Chat = ({
  functionCallHandler = () => Promise.resolve(""),
}: ChatProps) => {
  const { triggerVideo, activeVideo, isChatOpen, setIsChatOpen } = useMedia();
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");
  const [isInitial, setIsInitial] = useState(true); // track first render

  const toggleChat = () => {
    if (isInitial) setIsInitial(false); // once clicked, it's no longer the initial render
    if (isChatOpen) {
      triggerVideo("/videos/hero/phone.mp4");
    }

    setIsChatOpen(!isChatOpen);
  };

  const handleButtonHover = () => {
    if (!activeVideo && !isChatOpen) {
      triggerVideo("/videos/hero/go-ahead.mp4");
    }
  };

  // store last assistant message in a ref to avoid React state timing issues
  const lastAssistantRef = useRef("");

  // saving functions
  const saveUserMessage = async (text: string) => {
    if (!threadId) return;
    try {
      await fetch("/api/messages/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, role: "user", content: text }),
      });
    } catch (err) {
      console.error("Failed to save user message:", err);
    }
  };

  const saveAssistantMessage = async (text: string) => {
    if (!threadId || !text) return;
    try {
      await fetch("/api/messages/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, role: "assistant", content: text }),
      });
    } catch (err) {
      console.error("Failed to save assistant message:", err);
    }
  };

  // loading refs for scrolling
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);
  const loadingBottomRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef([]);

  // Keep the ref in sync with state whenever messages change
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (loading && loadingRef.current) {
      loadingBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, messages]);

  // create a new thread ID when chat mounts
  useEffect(() => {
    const createThread = async () => {
      const res = await fetch("/api/assistants/threads", { method: "POST" });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const sendMessage = async (text: string) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({ content: text }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const submitActionResult = async (runId, toolCallOutputs) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, toolCallOutputs }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // save user immediately
    saveUserMessage(userInput);

    sendMessage(userInput);
    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
    setUserInput("");
    setInputDisabled(true);
    setLoading(true);
    triggerVideo("/videos/hero/texting.mp4");
  };

  /* Stream Event Handlers */
  const handleTextCreated = () => {
    appendMessage("assistant", "");
    lastAssistantRef.current = "";
  };

  const handleTextDelta = (delta) => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
      lastAssistantRef.current += delta.value;
    }
  };

  const handleImageFileDone = (image) => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
    lastAssistantRef.current += `\n![${image.file_id}](/api/files/${image.file_id})\n`;
  };

  const toolCallCreated = (toolCall) => {
    if (toolCall.type !== "code_interpreter") return;
    appendMessage("code", "");
  };

  const toolCallDelta = (delta) => {
    if (delta.type !== "code_interpreter" || !delta.code_interpreter.input)
      return;
    appendToLastMessage(delta.code_interpreter.input);
  };

  const handleRequiresAction = async (
    event: AssistantStreamEvent.ThreadRunRequiresAction
  ) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };

  const handleRunCompleted = async () => {
    setLoading(false);
    setInputDisabled(false);

    const assistantMessageContent = lastAssistantRef.current;

    // Use the REF here instead of the state variable
    const currentMessages = messagesRef.current;
    const lastUserMessage =
      currentMessages.filter((m) => m.role === "user").pop()?.text || "";

    // Logic for first message check using the ref
    const isFirst =
      currentMessages.filter((m) => m.role === "user").length === 1;

    await saveAssistantMessage(assistantMessageContent);
    lastAssistantRef.current = "";

    await fetch("/api/notifications/pushover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: lastUserMessage,
        assistantMessage: assistantMessageContent,
        threadId,
        isFirstMessage: isFirst,
      }),
    });
  };

  const handleReadableStream = (stream: AssistantStream) => {
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", handleTextDelta);
    stream.on("imageFileDone", handleImageFileDone);
    stream.on("toolCallCreated", toolCallCreated);
    stream.on("toolCallDelta", toolCallDelta);
    stream.on("event", (event) => {
      if (event.event === "thread.run.requires_action")
        handleRequiresAction(event);
      if (event.event === "thread.run.completed") handleRunCompleted();
    });
  };

  /* Utility helpers */
  const appendToLastMessage = (text: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      const updated = { ...last, text: last.text + text };
      return [...prev.slice(0, -1), updated];
    });
  };

  const appendMessage = (role: "user" | "assistant" | "code", text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  return (
    <div
      className={`${styles.chatContainer} ${
        isInitial ? styles.initial : isChatOpen ? styles.open : styles.closed
      }`}
      onMouseEnter={handleButtonHover}
    >
      <button className={styles.toggleButton} onClick={toggleChat}>
        {isChatOpen ? "Close Chat" : "Ask JudeGPT"}
      </button>
      <>
        <div className={styles.messages}>
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} text={msg.text} />
          ))}
          {loading && (
            <div ref={loadingRef} className={styles.loading}>
              <PulseLoader />
              <div
                ref={loadingBottomRef}
                className={styles.loadingBottom}
              ></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${styles.inputForm} ${styles.clearfix}`}
        >
          <input
            type="text"
            className={styles.input}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your question"
          />
          <button
            type="submit"
            className={styles.button}
            disabled={inputDisabled}
          >
            <FaPaperPlane className={styles.repositionIcon} />
          </button>
        </form>
      </>
    </div>
  );
};

export default Chat;
