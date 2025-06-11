'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // First get the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        // Then send visitor data
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip,
            path: pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to track visitor');
        }

        const data = await response.json();
        console.log('Visitor tracked:', data.visitor);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, [pathname]);

  return null; // This component doesn't render anything
} 