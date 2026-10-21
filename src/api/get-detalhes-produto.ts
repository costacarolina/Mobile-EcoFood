import { api } from '../lib/axios';

export async function getDetalhesProduto(id: string) {
  try {
    const response = await api.get(`/api/produto/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do produto:", error);
    throw error;
  }
}