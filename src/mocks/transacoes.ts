import { Transacao } from "@/types";

const agora = new Date();
const umaHoraAtras = new Date(agora.getTime() - 60 * 60 * 1000);
const umDiaAtras = new Date(agora.getTime() - 24 * 60 * 60 * 1000);
const umaSemanaAtras = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);

const formatarData = (data: Date): string => {
  return data.toISOString();
};

export const TRANSACOES_MOCK: Transacao[] = [
  {
    id: "1",
    descricao: "Depósito inicial",
    valor: 1000,
    data: formatarData(umaSemanaAtras),
    tipo: "credito",
  },
  {
    id: "2",
    descricao: "Taxa de verificação - Apartamento Centro",
    valor: 50,
    data: formatarData(umDiaAtras),
    tipo: "debito",
  },
  {
    id: "3",
    descricao: "Taxa de verificação - Notebook Gamer",
    valor: 30,
    data: formatarData(umaHoraAtras),
    tipo: "debito",
  },
];

export const getSaldoAtual = (): number => {
  return TRANSACOES_MOCK.reduce((total, transacao) => {
    return transacao.tipo === "credito"
      ? total + transacao.valor
      : total - transacao.valor;
  }, 0);
};

export const getTransacoesRecentes = (limite: number = 10): Transacao[] => {
  return [...TRANSACOES_MOCK]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, limite);
};
