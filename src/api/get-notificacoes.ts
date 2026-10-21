import { api } from "@/lib/axios";

export type Notificacao = {
  produtoId: number;
  nome: string;
  dataValidade: string;
  tipo: "VENCIDO" | "VENCE_HOJE" | "PROXIMO_DO_VENCIMENTO";
  mensagem: string;
};

export async function getQuantidadeNotificacoes(restauranteId: number) {
  const response = await api.get(`/api/notificacoes/${restauranteId}/quantidade`);
  return response.data.quantidade as number;
}

export async function getNotificacoes(restauranteId: number) {
  const response = await api.get(`/api/notificacoes/${restauranteId}`);
  return response.data as { total: number; notificacoes: Notificacao[] };
}