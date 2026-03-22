import React, { useEffect, useRef } from 'react';

interface ChartProps {
  title: string;
  src: string;
  id: string;
  height?: string;
}

export const Chart: React.FC<ChartProps> = ({ title, src, id, height = "500px" }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data['datawrapper-height']) {
        const iframes = document.querySelectorAll('iframe');
        for (const key in e.data['datawrapper-height']) {
          for (let i = 0; i < iframes.length; i++) {
            if (iframes[i].contentWindow === e.source) {
              iframes[i].style.height = e.data['datawrapper-height'][key] + 'px';
            }
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="my-12 w-full overflow-hidden border-y border-on-surface/5 py-8">
      <div className="relative w-full" style={{ minHeight: height }}>
        <iframe
          ref={iframeRef}
          id={id}
          title={title}
          src={src}
          scrolling="no"
          frameBorder="0"
          className="w-full transition-opacity duration-500"
          style={{ minWidth: '100% !important', border: 'none' }}
        />
      </div>
    </div>
  );
};
