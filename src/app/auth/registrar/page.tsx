import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Criar conta</h1>
          <p className="text-muted-foreground mt-2">
            Preencha os dados para criar sua conta
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome completo
            </label>
            <Input id="name" placeholder="Seu nome" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" placeholder="seu@email.com" type="email" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input id="password" type="password" />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium">
              Confirmar senha
            </label>
            <Input id="confirm-password" type="password" />
          </div>

          <Button className="w-full" type="submit">
            Criar conta
          </Button>
        </div>

        <div className="text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/auth/entrar" className="text-primary hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
