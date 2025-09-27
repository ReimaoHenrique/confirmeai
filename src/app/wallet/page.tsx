"use client";

import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { getSaldoAtual, getTransacoesRecentes } from "@/mocks/transacoes";
import { formatCurrency } from "@/lib/utils";

export default function WalletPage() {
  const saldoAtual = getSaldoAtual();
  const transacoesRecentes = getTransacoesRecentes();

  const handleAdicionarFundos = () => {
    // Simular adição de fundos
    console.log("Adicionar fundos");
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Minha Carteira</h1>
          <Button onClick={handleAdicionarFundos} className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Fundos
          </Button>
        </div>

        {/* Saldo Atual */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saldo Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatCurrency(saldoAtual)}</span>
              <span className="text-sm text-muted-foreground">
                {saldoAtual >= 0 ? "Saldo positivo" : "Saldo negativo"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Transações */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            {transacoesRecentes.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                Nenhuma transação encontrada.
              </div>
            ) : (
              <div className="space-y-4">
                {transacoesRecentes.map((transacao) => (
                  <div key={transacao.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          transacao.tipo === "credito"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                        }`}
                      >
                        {transacao.tipo === "credito" ? (
                          <ArrowDown className="h-5 w-5" />
                        ) : (
                          <ArrowUp className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(transacao.data), "dd MMM yyyy 'às' HH:mm", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-medium ${
                        transacao.tipo === "credito"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transacao.tipo === "credito" ? "+" : "-"}
                      {formatCurrency(transacao.valor)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
