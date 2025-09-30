"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import { BottomNav } from "./bottom-nav";

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const navRoutes = ["/dashboard", "/solicitacoes/nova", "/wallet", "/perfil"];

export function AppLayout({ children, showBottomNav = true }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = navRoutes.indexOf(pathname);
      if (currentIndex < navRoutes.length - 1 && currentIndex !== -1) {
        router.push(navRoutes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = navRoutes.indexOf(pathname);
      if (currentIndex > 0) {
        router.push(navRoutes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers}>
            <main className="flex-1 pb-24 pt-[env(safe-area-inset-top)] md:pb-0">{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
