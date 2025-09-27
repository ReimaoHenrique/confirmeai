import { Solicitacao, Status } from "@/types";
import { USUARIO_ATUAL, getUsuarioPorId } from "./usuarios";

const agora = new Date();
const umaHoraAtras = new Date(agora.getTime() - 60 * 60 * 1000);
const umDiaAtras = new Date(agora.getTime() - 24 * 60 * 60 * 1000);

const formatarData = (data: Date): string => {
  return data.toISOString();
};

export const SOLICITACOES_MOCK: Solicitacao[] = [
  {
    id: "1",
    item: {
      id: "1",
      titulo: "Apartamento Centro",
      descricao: "Apartamento de 2 quartos no centro da cidade, 70m²",
      fotos: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
      tipo: "Imóvel",
    },
    tipo: "Imóvel",
    dono: getUsuarioPorId("2")!,
    solicitante: USUARIO_ATUAL,
    validador: getUsuarioPorId("3")!,
    status: "Aguardando",
    criadoEm: formatarData(umDiaAtras),
    atualizadoEm: formatarData(umDiaAtras),
    historico: [
      {
        status: "Aguardando",
        data: formatarData(umDiaAtras),
        observacao: "Solicitação criada",
      },
    ],
  },
  {
    id: "2",
    item: {
      id: "2",
      titulo: "Notebook Gamer",
      descricao: "Notebook Gamer com RTX 3060, 16GB RAM, SSD 512GB",
      fotos: [
        "https://images.unsplash.com/photo-1593642702821-8f0b0f3b8f6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
      tipo: "Produto",
    },
    tipo: "Produto",
    dono: getUsuarioPorId("4")!,
    solicitante: USUARIO_ATUAL,
    validador: getUsuarioPorId("5")!,
    status: "Em andamento",
    criadoEm: formatarData(umaHoraAtras),
    atualizadoEm: formatarData(umaHoraAtras),
    historico: [
      {
        status: "Aguardando",
        data: formatarData(umaHoraAtras),
        observacao: "Solicitação criada",
      },
      {
        status: "Em andamento",
        data: formatarData(agora),
        observacao: "Validação em andamento",
      },
    ],
  },
];

export const getSolicitacoesPorUsuario = (usuarioId: string): Solicitacao[] => {
  return SOLICITACOES_MOCK.filter(
    (solicitacao) =>
      solicitacao.solicitante.id === usuarioId ||
      solicitacao.dono.id === usuarioId ||
      solicitacao.validador.id === usuarioId
  );
};

export const getSolicitacaoPorId = (id: string): Solicitacao | undefined => {
  return SOLICITACOES_MOCK.find((solicitacao) => solicitacao.id === id);
};
