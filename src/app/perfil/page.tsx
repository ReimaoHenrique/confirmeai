"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Save, Edit, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-with-error";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppLayout } from "@/components/layout/app-layout";
import { useUsuario } from "@/hooks/useUsuario";
import { toast } from "sonner";

const profileFormSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  avatar: z.string().url("URL do avatar inválida").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function PerfilPage() {
  const { usuario, atualizarUsuario } = useUsuario();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nome: usuario.nome,
      email: usuario.email,
      avatar: usuario.avatar,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      atualizarUsuario({
        ...usuario,
        ...data,
      });
      
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Ocorreu um erro ao atualizar o perfil. Tente novamente.");
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      reset();
    }
    setIsEditing(!isEditing);
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={handleEditClick}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                Cancelar
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Editar Perfil
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={usuario.avatar} alt={usuario.nome} />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => {
                          // Lógica para alterar a foto
                          const newAvatar = prompt("Cole a URL da nova foto de perfil:");
                          if (newAvatar) {
                            atualizarUsuario({ ...usuario, avatar: newAvatar });
                          }
                        }}
                      >
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Alterar foto</span>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{usuario.nome}</h2>
                  <p className="text-muted-foreground">{usuario.email}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {usuario.papel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    disabled={!isEditing || isSubmitting}
                    {...register("nome")}
                    error={errors.nome?.message}
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    disabled={!isEditing || isSubmitting}
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar alterações
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ID do Usuário</p>
                <p className="font-mono text-sm">{usuario.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo de Conta</p>
                <p>{usuario.papel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Membro desde</p>
                <p>{new Date().toLocaleDateString("pt-BR")}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferências</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tema</p>
                  <p className="text-sm text-muted-foreground">
                    Aparência do aplicativo
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Alterar Tema
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações</p>
                  <p className="text-sm text-muted-foreground">
                    Gerenciar notificações
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
