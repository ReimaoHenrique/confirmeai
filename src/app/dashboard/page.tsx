import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { getSolicitacoesPorUsuario } from "@/mocks/solicitacoes";
import { USUARIO_ATUAL } from "@/mocks/usuarios";

export default function DashboardPage() {
  const solicitacoes = getSolicitacoesPorUsuario(USUARIO_ATUAL.id);

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Minhas Solicitações</h1>
          <Button asChild>
            <Link href="/solicitacoes/nova" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Nova</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {solicitacoes.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Você ainda não tem nenhuma solicitação.
                </p>
                <Button asChild>
                  <Link href="/solicitacoes/nova" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Criar primeira solicitação</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            solicitacoes.map((solicitacao) => (
              <Link key={solicitacao.id} href={`/solicitacoes/${solicitacao.id}`}>
                <Card className="transition-colors hover:bg-accent/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{solicitacao.item.titulo}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {new Date(solicitacao.criadoEm).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {solicitacao.tipo}
                      </span>
                      <span
                        className={clsx(
                          "rounded-full px-2 py-1 text-xs font-medium",
                          {
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400":
                              solicitacao.status === "Aguardando",
                            "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400":
                              solicitacao.status === "Em andamento",
                            "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400":
                              solicitacao.status === "Concluído",
                            "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400":
                              solicitacao.status === "Cancelado",
                          }
                        )}
                      >
                        {solicitacao.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}

import { clsx } from "clsx";
