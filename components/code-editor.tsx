"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeEditorProps {
  code: string;
  language: string;
}

export function CodeEditor({ code, language }: CodeEditorProps) {
  return (
    <div className="rounded-md overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
