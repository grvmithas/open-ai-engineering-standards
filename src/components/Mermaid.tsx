'use client';

import { useEffect, useId, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    
    // Import mermaid dynamically to avoid SSR errors
    import('mermaid').then(async ({ default: mermaid }) => {
      if (!isMounted) return;
      
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
          themeVariables: {
            background: '#10101e',
            primaryColor: '#8b5cf6',
            primaryTextColor: '#fff',
            lineColor: '#6d28d9',
            fontSize: '12px'
          }
        });

        const id = `mermaid-svg-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvg(renderedSvg);
        }
      } catch (err: unknown) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram.');
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <div className="p-4 border border-red-950/40 bg-red-950/10 text-red-400 rounded-lg text-xs font-mono my-4">
        <strong>Mermaid Render Error:</strong>
        <p className="mt-1">{error}</p>
        <pre className="mt-2 text-[10px] opacity-70 overflow-x-auto">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center h-32 bg-slate-950/20 border border-violet-950/10 rounded-lg my-4">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div 
      ref={elementRef}
      className="mermaid-wrapper flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
