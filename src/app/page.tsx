'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    // In a real app, you would check auth token or user state
    const isAuthenticated = true; // Set to false to test the auth flow

    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth/entrar');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
