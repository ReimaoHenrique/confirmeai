export type Status = "Aguardando" | "Em andamento" | "Concluído" | "Cancelado";
export type TipoVerificacao = "Imóvel" | "Produto" | "Serviço" | "Outro";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  papel: "Comprador" | "Vendedor" | "Validador";}

export interface Item {
  id: string;
  titulo: string;
  descricao: string;
  fotos?: string[];
  tipo: TipoVerificacao;
}

export interface Solicitacao {
  id: string;
  item: Item;
  tipo: TipoVerificacao;
  dono: Usuario;
  solicitante: Usuario;
  validador: Usuario;
  status: Status;
  criadoEm: string;
  atualizadoEm: string;
  historico: { status: Status; data: string; observacao?: string }[];
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: "credito" | "debito";
}
