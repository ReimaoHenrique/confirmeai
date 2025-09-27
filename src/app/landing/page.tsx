import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";

export default function OnboardingPage() {
  return (
    <AppLayout showBottomNav={false}>
      <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
        <div className="mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            Bem-vindo ao <span className="text-primary">Confirme.AI</span>
          </h1>
          <p className="text-muted-foreground">
            A maneira mais simples de gerenciar suas solicitações de verificação
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/dashboard">Entrar como convidado</Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
