"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { USUARIO_ATUAL, getUsuariosPorPapel } from "@/mocks/usuarios";
import { TipoVerificacao } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  tipo: z.enum(["Imóvel", "Produto", "Serviço", "Outro"]),
  donoId: z.string().min(1, "Selecione o dono do item"),
  validadorId: z.string().min(1, "Selecione um validador"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NovaSolicitacaoPage() {
  const router = useRouter();
  const vendedores = getUsuariosPorPapel("Vendedor");
  const validadores = getUsuariosPorPapel("Validador");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "Produto",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simular uma requisição à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Em uma aplicação real, aqui você faria uma chamada para a API
      // await api.post('/solicitacoes', data);
      
      toast.success("Solicitação criada com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      toast.error("Ocorreu um erro ao criar a solicitação. Tente novamente.");
    }
  };

  return (
    <AppLayout>
      <div className="container py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Nova Solicitação de Verificação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Sobre o Item</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      placeholder="Ex: Apartamento Centro, Notebook Gamer, etc."
                      {...register("titulo")}
                      error={errors.titulo?.message}
                    />
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição *</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva o item que será verificado..."
                      rows={4}
                      {...register("descricao")}
                      error={errors.descricao?.message}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipo">Tipo de Verificação *</Label>
                    <select
                      id="tipo"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("tipo")}
                    >
                      {(["Imóvel", "Produto", "Serviço", "Outro"] as TipoVerificacao[]).map(
                        (tipo) => (
                          <option key={tipo} value={tipo}>
                            {tipo}
                          </option>
                        )
                      )}
                    </select>
                    {errors.tipo?.message && (
                      <p className="text-sm font-medium text-destructive mt-1">
                        {errors.tipo.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Envolvidos</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="donoId">Dono do Item (Vendedor) *</Label>
                    <select
                      id="donoId"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("donoId")}
                    >
                      <option value="">Selecione o vendedor</option>
                      {vendedores.map((vendedor) => (
                        <option key={vendedor.id} value={vendedor.id}>
                          {vendedor.nome}
                        </option>
                      ))}
                    </select>
                    {errors.donoId?.message && (
                      <p className="text-sm font-medium text-destructive mt-1">
                        {errors.donoId.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="validadorId">Validador *</Label>
                    <select
                      id="validadorId"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("validadorId")}
                    >
                      <option value="">Selecione um validador</option>
                      {validadores.map((validador) => (
                        <option key={validador.id} value={validador.id}>
                          {validador.nome}
                        </option>
                      ))}
                    </select>
                    {errors.validadorId?.message && (
                      <p className="text-sm font-medium text-destructive mt-1">
                        {errors.validadorId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Solicitação
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
