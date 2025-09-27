import { useState, useEffect } from "react";
import { Usuario } from "@/types";
import { USUARIO_ATUAL } from "@/mocks/usuarios";

const USUARIO_STORAGE_KEY = "confirme_ai_usuario";

export const useUsuario = () => {
  const [usuario, setUsuario] = useState<Usuario>(USUARIO_ATUAL);
  const [carregando, setCarregando] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const carregarUsuario = () => {
      try {
        const usuarioSalvo = localStorage.getItem(USUARIO_STORAGE_KEY);
        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuario();
  }, []);

  // Atualizar usuário
  const atualizarUsuario = (dadosAtualizados: Partial<Usuario>) => {
    const usuarioAtualizado = { ...usuario, ...dadosAtualizados };
    setUsuario(usuarioAtualizado);
    localStorage.setItem(
      USUARIO_STORAGE_KEY,
      JSON.stringify(usuarioAtualizado)
    );
  };

  // Fazer logout
  const fazerLogout = () => {
    localStorage.removeItem(USUARIO_STORAGE_KEY);
    setUsuario(USUARIO_ATUAL);
  };

  return {
    usuario,
    carregando,
    atualizarUsuario,
    fazerLogout,
  };
};
