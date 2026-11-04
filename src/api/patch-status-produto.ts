import { api } from "@/lib/axios";

export async function atualizarStatusProduto(
  id: string,
  status: "APROVEITADO" | "NAO_APROVEITADO"
) {
  const response = await api.patch(`/api/status-produtos/${id}/status`, { status });
  return response.data;
}