import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import styles from "./chat.module.css";

const TARGET_DRIVE_LINK =
  "https://drive.google.com/file/d/1W8K12743oCt_U8gFR0h3WIaxI5mi_uD7/view?usp=sharing";

const CustomMarkdown = ({ markdown }) => {
  const TextRenderer = ({ value }) => {
    // Regex that catches your specific Drive Link OR any Email
    const combinedRegex = new RegExp(
      `(${TARGET_DRIVE_LINK.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]{2,})`,
      "gi"
    );

    if (!combinedRegex.test(value)) return value;

    const parts = value.split(combinedRegex);

    return parts.map((part, index) => {
      // 1. If it's the Drive Link
      if (part === TARGET_DRIVE_LINK) {
        return (
          <a
            key={index}
            href={part}
            className={styles.resumeCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Resume
          </a>
        );
      }

      // 2. If it's an Email
      if (/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]{2,}/i.test(part)) {
        return (
          <a key={index} href={`mailto:${part}`} className={styles.emailLink}>
            {part}
          </a>
        );
      }

      // 3. Otherwise return plain text
      return part;
    });
  };

  const LinkRenderer = ({ href, children, ...props }) => {
    // This handles cases where the AI actually uses proper Markdown [text](url)
    if (href === TARGET_DRIVE_LINK) {
      return (
        <a
          href={href}
          className={styles.resumeCta}
          target="_blank"
          rel="noopener noreferrer"
        >
          View My Resume
        </a>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };

  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
      ]}
      components={{
        text: TextRenderer,
        a: LinkRenderer,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
