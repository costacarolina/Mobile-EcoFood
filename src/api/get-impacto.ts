import { api } from "@/lib/axios";

export type Impacto = {
  alimentosSalvos: number;
  reducaoResiduos: number;
  escolhasConscientes: number;
  evolucao: { semana: string; kg: number }[];
};

export async function getImpacto(restauranteId: number): Promise<Impacto> {
  const response = await api.get(`/api/impacto/${restauranteId}`);
  return response.data;
}