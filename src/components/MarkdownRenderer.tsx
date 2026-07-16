'use client';

import { useEffect } from 'react';
import Mermaid from './Mermaid';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

interface DocBlock {
  type: 'html' | 'mermaid';
  content: string;
}

interface MarkdownRendererProps {
  blocks: DocBlock[];
}

export default function MarkdownRenderer({ blocks }: MarkdownRendererProps) {
  useEffect(() => {
    // Run syntax highlighting
    document.querySelectorAll('pre code').forEach((block) => {
      // Don't highlight mermaid text containers
      if (!block.classList.contains('language-mermaid')) {
        hljs.highlightElement(block as HTMLElement);
      }
    });

    // Add copy buttons to pre blocks
    document.querySelectorAll('pre').forEach((pre) => {
      // Check if we already added a copy button
      if (pre.querySelector('.copy-code-btn')) return;

      const code = pre.querySelector('code');
      if (!code) return;

      // Extract class to determine language if present
      const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
      if (langClass) {
        const lang = langClass.replace('language-', '');
        pre.setAttribute('data-lang', lang);
      }

      const button = document.createElement('button');
      button.className = 'copy-code-btn absolute top-2 right-2 px-2 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-300 bg-slate-900/80 border border-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition duration-150 outline-none cursor-pointer';
      button.innerText = 'Copy';
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(code.innerText).then(() => {
          button.innerText = 'Copied!';
          button.classList.add('text-emerald-400', 'border-emerald-950');
          setTimeout(() => {
            button.innerText = 'Copy';
            button.classList.remove('text-emerald-400', 'border-emerald-950');
          }, 2000);
        });
      });

      pre.classList.add('group');
      pre.appendChild(button);
    });
  }, [blocks]);

  return (
    <div className="prose">
      {blocks.map((block, idx) => {
        if (block.type === 'mermaid') {
          return <Mermaid key={idx} chart={block.content} />;
        }
        return (
          <div
            key={idx}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      })}
    </div>
  );
}
