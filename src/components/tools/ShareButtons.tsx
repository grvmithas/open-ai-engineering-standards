'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: 'compact' | 'full' | 'card';
}

export default function ShareButtons({
  title = 'AI Engineering Standard (AIES)',
  text = 'Check out the AI Engineering Standard - An open-source operational standard for production AI.',
  url,
  className = '',
  variant = 'compact',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://www.ai-standards.dev');
  const shareText = `${text} ${targetUrl}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(targetUrl)}&hashtags=AIES,AIEngineering,AIDLC`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(targetUrl)}`;
  const redditShareUrl = `https://reddit.com/submit?url=${encodeURIComponent(targetUrl)}&title=${encodeURIComponent(title)}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider mr-1">
        Share:
      </span>

      {/* Twitter / X */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400 transition-all"
        title="Share on X / Twitter"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X / Twitter</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-blue-600/50 hover:bg-blue-600/10 hover:text-blue-400 transition-all"
        title="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
        <span>LinkedIn</span>
      </a>

      {/* Reddit */}
      <a
        href={redditShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 transition-all"
        title="Share on Reddit"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.196-.491.956 0 1.733.778 1.733 1.734 0 .61-.316 1.144-.792 1.45.023.2.035.402.035.607 0 3.083-3.6 5.578-8.04 5.578-4.441 0-8.04-2.495-8.04-5.578 0-.205.012-.407.036-.607a1.735 1.735 0 0 1-.793-1.45c0-.956.778-1.734 1.734-1.734.465 0 .888.182 1.196.49 1.194-.856 2.85-1.418 4.674-1.487l.953-4.475a.4.4 0 0 1 .47-.31l3.056.643a1.246 1.246 0 0 1 .796-.341z" />
        </svg>
        <span>Reddit</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all cursor-pointer"
        title="Copy share link"
      >
        {copied ? (
          <>
            <span className="text-emerald-500">✓</span>
            <span className="text-emerald-500 font-bold">Copied!</span>
          </>
        ) : (
          <>
            <span>📋</span>
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
