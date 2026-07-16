'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/docs/README');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="spinner"></div>
    </div>
  );
}
