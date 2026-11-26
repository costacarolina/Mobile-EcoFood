import { api } from "@/lib/axios";

export type ImpactoEvolucao = {
  semana: string;
  alimentosSalvos: number;   // kg aproveitados na semana
  desperdicios: number;      // kg não aproveitados na semana
};

// Formato real devolvido por GET /api/impacto/:restauranteId
export type Impacto = {
  totalAlimentos: number;
  alimentosSalvos: number;
  desperdicioTotal: number;
  reducaoResiduos: number;
  escolhasConscientes: number;
  unidades: { aproveitadas: number; desperdicadas: number };
  evolucao: ImpactoEvolucao[];
};

export async function getImpacto(restauranteId: number): Promise<Impacto> {
  const response = await api.get(`/api/impacto/${restauranteId}`);
  return response.data;
}
