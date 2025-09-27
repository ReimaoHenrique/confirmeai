"use client";

import { useParams, useRouter } from "next/navigation";
import { Calendar, Clock, User, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/app-layout";
import { getSolicitacaoPorId } from "@/mocks/solicitacoes";
import { USUARIO_ATUAL } from "@/mocks/usuarios";
import { toast } from "sonner";

export default function DetalheSolicitacaoPage() {
  const router = useRouter();
  const { id } = useParams();
  const solicitacao = getSolicitacaoPorId(id as string);

  if (!solicitacao) {
    return (
      <AppLayout>
        <div className="container py-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Solicitação não encontrada</h2>
              <p className="text-muted-foreground mb-6">
                A solicitação que você está procurando não existe ou foi removida.
              </p>
              <Button onClick={() => router.push("/dashboard")}>
                Voltar para o início
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const usuarioAtual = USUARIO_ATUAL;
  const isSolicitante = usuarioAtual.id === solicitacao.solicitante.id;
  const isDono = usuarioAtual.id === solicitacao.dono.id;
  const isValidador = usuarioAtual.id === solicitacao.validador.id;

  const handleCancelar = async () => {
    try {
      // Simular uma requisição à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Solicitação cancelada com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      toast.error("Ocorreu um erro ao cancelar a solicitação. Tente novamente.");
    }
  };

  const handleIniciarValidacao = async () => {
    try {
      // Simular uma requisição à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Validação iniciada com sucesso!");
      router.refresh();
    } catch (error) {
      console.error("Erro ao iniciar validação:", error);
      toast.error("Ocorreu um erro ao iniciar a validação. Tente novamente.");
    }
  };

  const handleConcluir = async () => {
    try {
      // Simular uma requisição à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Solicitação concluída com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao concluir solicitação:", error);
      toast.error("Ocorreu um erro ao concluir a solicitação. Tente novamente.");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Aguardando: {
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400",
        icon: <Clock className="h-4 w-4" />,
      },
      "Em andamento": {
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400",
        icon: <Clock className="h-4 w-4" />,
      },
      Concluído: {
        className: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400",
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
      Cancelado: {
        className: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400",
        icon: <XCircle className="h-4 w-4" />,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      icon: null,
    };

    return (
      <Badge className={`inline-flex items-center gap-1 ${config.className}`}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{solicitacao.item.titulo}</h1>
            <p className="text-muted-foreground">{solicitacao.tipo}</p>
          </div>
          <div>{getStatusBadge(solicitacao.status)}</div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Detalhes do Item */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Item</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Descrição</h3>
                  <p className="text-muted-foreground">{solicitacao.item.descricao}</p>
                </div>

                {solicitacao.item.fotos && solicitacao.item.fotos.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Fotos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {solicitacao.item.fotos.map((foto, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-md">
                          <img
                            src={foto}
                            alt={`Foto ${index + 1} do item`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Histórico */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {solicitacao.historico.map((evento, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-primary mt-1" />
                        {index < solicitacao.historico.length - 1 && (
                          <div className="w-px h-full bg-border my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {evento.status}
                            {evento.observacao && (
                              <span className="text-muted-foreground ml-2">
                                • {evento.observacao}
                              </span>
                            )}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(evento.data), "dd/MM/yyyy 'às' HH:mm", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informações Adicionais */}
          <div className="space-y-6">
            {/* Envolvidos */}
            <Card>
              <CardHeader>
                <CardTitle>Envolvidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Solicitante</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={solicitacao.solicitante.avatar} />
                      <AvatarFallback>
                        {solicitacao.solicitante.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{solicitacao.solicitante.nome}</p>
                      <p className="text-sm text-muted-foreground">Comprador</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Dono do Item</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={solicitacao.dono.avatar} />
                      <AvatarFallback>
                        {solicitacao.dono.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{solicitacao.dono.nome}</p>
                      <p className="text-sm text-muted-foreground">Vendedor</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Validador</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={solicitacao.validador.avatar} />
                      <AvatarFallback>
                        {solicitacao.validador.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{solicitacao.validador.nome}</p>
                      <p className="text-sm text-muted-foreground">Validador</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metadados */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Criado em</p>
                    <p>
                      {format(new Date(solicitacao.criadoEm), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Atualizado em</p>
                    <p>
                      {format(new Date(solicitacao.atualizadoEm), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            {(isSolicitante || isDono || isValidador) && (
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isSolicitante && solicitacao.status === "Aguardando" && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleCancelar}
                    >
                      Cancelar Solicitação
                    </Button>
                  )}

                  {isValidador && solicitacao.status === "Aguardando" && (
                    <Button className="w-full" onClick={handleIniciarValidacao}>
                      Iniciar Validação
                    </Button>
                  )}

                  {isValidador && solicitacao.status === "Em andamento" && (
                    <div className="space-y-2">
                      <Button className="w-full" onClick={handleConcluir}>
                        Marcar como Concluído
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleCancelar}
                      >
                        Cancelar Validação
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
