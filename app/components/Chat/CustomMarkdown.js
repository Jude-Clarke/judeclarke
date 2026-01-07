import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import styles from "./chat.module.css";

const TARGET_DRIVE_LINK =
  "https://drive.google.com/file/d/1W8K12743oCt_U8gFR0h3WIaxI5mi_uD7/view?usp=sharing";

const CustomMarkdown = ({ markdown }) => {
  // This handles [View My Resume](DRIVE_LINK)
  const LinkRenderer = ({ href, children, ...props }) => {
    const isDriveLink = href === TARGET_DRIVE_LINK;

    if (isDriveLink) {
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

  // This handles "Here is the link: https://drive.google..." (Naked URLs)
  const ParagraphRenderer = ({ children }) => {
    return (
      <p>
        {React.Children.map(children, (child) => {
          if (typeof child === "string") {
            // Check for Drive Link or Email in plain text
            const combinedRegex = new RegExp(
              `(${TARGET_DRIVE_LINK.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              )}|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]{2,})`,
              "gi"
            );

            if (!combinedRegex.test(child)) return child;

            const parts = child.split(combinedRegex);
            return parts.map((part, index) => {
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
              if (
                /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]{2,}/i.test(
                  part
                )
              ) {
                return (
                  <a
                    key={index}
                    href={`mailto:${part}`}
                    className={styles.emailLink}
                  >
                    {part}
                  </a>
                );
              }
              return part;
            });
          }
          return child;
        })}
      </p>
    );
  };

  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        [rehypeExternalLinks, { rel: "noopener noreferrer" }],
      ]}
      components={{
        a: LinkRenderer,
        p: ParagraphRenderer, // Use p instead of text
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
