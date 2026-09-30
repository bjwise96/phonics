'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!PUBLISHABLE_KEY) {
    // Zero-Crash Invariant: Render children without auth wrapper if keys are not present
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
}
