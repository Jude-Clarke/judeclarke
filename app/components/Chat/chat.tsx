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

// Conversation starters
const CHAT_SUGGESTIONS = [
  {
    id: 1,
    simple: "Can you tell me about your background?",
    prompt:
      'You are responding to the question, "Can you tell me about your background?" Please provide a comprehensive overview of your professional background, including your education, technical and design skills, years of experience, notable career transitions, AI focus, and any unique aspects that differentiate you as a software engineer. Highlight how these elements have shaped your approach to work and your fit for a full-stack or design-focused role.',
  },
  {
    id: 2,
    simple: "What's your Machine Learning/AI experience?",
    prompt:
      'You are responding to the question, "What experience do you have in Machine Learning/AI?" Describe your experience with Machine Learning and AI, including the specific projects you’ve worked on, tools and frameworks you’ve used, what you’ve learned over the past two years of study, your active participation (networking and presenting) in the Tampa AI Applications group, and how you’ve applied AI concepts in your work. Highlight both practical implementations (like JudeGPT or AI for UX Design) and any relevant coursework or self-driven learning that demonstrates your ability to deliver value in AI-powered roles.',
  },
  {
    id: 3,
    simple: "What are your strengths as a developer?",
    prompt:
      'You are responding to the question, "What are your strengths as a developer?" Detail your key strengths as a developer, drawing on specific examples from your projects and work experience. Explain how these strengths have contributed to successful project outcomes, your ability to learn new technologies, collaborate with others, solve complex problems, and deliver engaging user experiences. Highlight how your strengths make you a valuable asset to a team or company.',
  },
  {
    id: 4,
    simple: "How do you keep your design skills sharp?",
    prompt:
      'You are responding to the question, "How do you keep your design skills sharp?" Explain the specific steps you take to maintain and improve your design skills, including any ongoing education, courses, self-directed projects, or professional experiences. Describe how you integrate new design trends, tools, or methodologies into your workflow, and provide examples of how this continual development has benefited your recent projects. Emphasize how your commitment to design excellence adds value to your work.',
  },
  {
    id: 5,
    simple: "What projects are you most proud of?",
    prompt:
      'You are responding to the question, "What projects are you most proud of?" For each project you list, provide a paragraph explaining what made it significant, your specific contributions, the challenges you faced, and the practical skills you applied or developed. Highlight how these projects demonstrate your technical abilities, design thinking, and overall impact as a developer. If possible, include how each project contributed to your growth or set you apart from others in your field.',
  },
];

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

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ role, text }, ref) => {
    const renderContent = () => {
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
    return (
      <div ref={ref} className={styles.messageWrapper}>
        {renderContent()}
      </div>
    );
  }
);
Message.displayName = "Message";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrollDisabled, setIsAutoScrollDisabled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Keep the ref in sync with state whenever messages change
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Disable auto scroll into view when user is scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50;

      // If the user scrolls up, disable auto-scroll
      // If they scroll back to the very bottom, re-enable it
      if (!isAtBottom) {
        setIsAutoScrollDisabled(true);
      } else {
        setIsAutoScrollDisabled(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll message into view
  useEffect(() => {
    const container = scrollContainerRef.current;
    const lastMsg = lastMessageRef.current;
    if (!container || !lastMsg || isAutoScrollDisabled) return; // Stop if user is scrolling

    const lastMessageData = messages[messages.length - 1];

    // 1. If user just sent a message, scroll to bottom to see their bubble
    if (lastMessageData?.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 2. Logic for Assistant Streaming
    if (
      lastMessageData?.role === "assistant" ||
      lastMessageData?.role === "code"
    ) {
      const containerRect = container.getBoundingClientRect();
      const msgRect = lastMsg.getBoundingClientRect();

      // Check if the top of the message has reached or passed the top of the container
      const isTopReached = msgRect.top <= containerRect.top;

      if (!isTopReached) {
        // If the message is still "below" the top, scroll to keep the bottom in view
        // or use 'start' to snap the top of the message to the top of the container
        // but 'nearest' usually handles the growth best until the top hits.
        lastMsg.scrollIntoView({ behavior: "auto", block: "nearest" });
      }
      // If isTopReached is true, we do nothing, effectively "pinning" the scroll
      // so the user can read from the start while text generates below.
    }
  }, [messages, isAutoScrollDisabled]);

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

  // KeyDown handler to allow newlines
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      // If Shift + Enter is pressed, allow default behavior (newline)
      if (e.shiftKey) {
        return;
      }

      // If only Enter is pressed, prevent newline and submit
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
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
    setIsAutoScrollDisabled(false);
    setLoading(true);

    if (!isMobile) {
      triggerVideo("/videos/hero/texting.mp4");
    }
  };

  const handleSuggestionClick = (suggestionID: number) => {
    const suggestion = CHAT_SUGGESTIONS.find((sug) => sug.id === suggestionID);
    console.log(suggestion.prompt);
    // 1. Save and Send
    saveUserMessage(suggestion.prompt);
    sendMessage(suggestion.prompt);

    // 2. Update UI
    setMessages((prev) => [...prev, { role: "user", text: suggestion.simple }]);
    setInputDisabled(true);
    setIsAutoScrollDisabled(false);
    setLoading(true);

    if (!isMobile) {
      triggerVideo("/videos/hero/texting.mp4");
    }
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
        <div className={styles.messages} ref={scrollContainerRef}>
          {/* SUGGESTION BUTTONS */}
          {messages.length === 0 && !loading && (
            <div className={styles.suggestionsContainer}>
              <p className={styles.suggestionHeader}>Conversation Starters</p>
              {CHAT_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  className={styles.suggestionButton}
                  onClick={() => handleSuggestionClick(sug.id)}
                >
                  {sug.simple}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, idx) => {
            const isLast = idx === messages.length - 1;
            return (
              <Message
                key={idx}
                role={msg.role}
                text={msg.text}
                ref={isLast ? lastMessageRef : null}
              />
            );
          })}
          {loading && (
            <div ref={loadingRef} className={styles.loading}>
              <PulseLoader />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${styles.inputForm} ${styles.clearfix}`}
        >
          <textarea
            className={styles.input}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              messages.length === 0
                ? "Or enter your question here..."
                : "more details = better results"
            }
            rows={1} // Start with one row
            style={{ resize: "none" }}
            disabled={inputDisabled}
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
