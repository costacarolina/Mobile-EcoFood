import { api } from "@/lib/axios";

export async function getTelaInicio(restauranteId: number) {
  const response = await api.get(`/api/telaInicio/${restauranteId}`);
  return response.data;
}