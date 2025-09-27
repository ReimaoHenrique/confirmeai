import { Usuario } from "@/types";

export const USUARIO_ATUAL: Usuario = {
  id: "1",
  nome: "João Silva",
  email: "joao@exemplo.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  papel: "Comprador",
};

export const USUARIOS: Usuario[] = [
  USUARIO_ATUAL,
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria@exemplo.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    papel: "Vendedor",
  },
  {
    id: "3",
    nome: "Carlos Oliveira",
    email: "carlos@exemplo.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    papel: "Validador",
  },
  {
    id: "4",
    nome: "Ana Pereira",
    email: "ana@exemplo.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    papel: "Vendedor",
  },
  {
    id: "5",
    nome: "Pedro Costa",
    email: "pedro@exemplo.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    papel: "Validador",
  },
];

export const getUsuarioPorId = (id: string): Usuario | undefined => {
  return USUARIOS.find((usuario) => usuario.id === id);
};

export const getUsuariosPorPapel = (papel: Usuario["papel"]): Usuario[] => {
  return USUARIOS.filter((usuario) => usuario.papel === papel);
};
