"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FilePlus, Wallet, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Início",
      href: "/dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      name: "Nova",
      href: "/solicitacoes/nova",
      icon: FilePlus,
      active: pathname === "/solicitacoes/nova",
    },
    {
      name: "Carteira",
      href: "/wallet",
      icon: Wallet,
      active: pathname === "/wallet",
    },
    {
      name: "Perfil",
      href: "/perfil",
      icon: User,
      active: pathname === "/perfil",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors hover:text-primary",
              item.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
