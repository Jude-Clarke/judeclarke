import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';

const CustomMarkdown = ({ markdown }) => {
  return (
    <ReactMarkdown 
      children={markdown}
      rehypePlugins={[
        rehypeRaw,
        [rehypeExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }],
      ]}
    />
  );
};

export default CustomMarkdown;
