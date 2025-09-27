"use client";

import { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export function AppLayout({ children, showBottomNav = true }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
