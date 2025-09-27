import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Entrar</h1>
          <p className="text-muted-foreground mt-2">
            Acesse sua conta para continuar
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" placeholder="seu@email.com" type="email" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Link
                href="/auth/recuperar-senha"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>

          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </div>

        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/auth/registrar" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
