import React from "react";

/**
 * Renders basic inline Markdown: **bold**, *italic*, [text](url)
 * No external dependency — lightweight parser for product descriptions.
 */
export function SimpleMarkdown({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n').filter(line => line.trim());

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <p key={i} className="whitespace-pre-line">
          {parseInline(line.trim())}
        </p>
      ))}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  // Regex matches: **bold**, *italic*, [label](url)
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[(.+?)\]\((.+?)\))/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push text before match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // **bold**
      nodes.push(<strong key={match.index} className="font-semibold text-foreground">{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      nodes.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[5]) {
      // [label](url)
      nodes.push(
        <a
          key={match.index}
          href={match[7]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {match[6]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
