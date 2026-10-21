import { api } from '../lib/axios';

// Tipagem para ajudar o TypeScript a saber o que esperar
export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  localArmazenamento: string;
  quantidade: number;
  unidade: string;
  dataValidade: string;
  diasRestantes: number;
  status: string;
}

export interface RespostaEstoque {
  totalProximosVencimento: number;
  produtos: Produto[];
}

export async function getProdutos(restauranteId?: number, local?: string, busca?: string): Promise<RespostaEstoque> {
  try {
    // Montar os parâmetros da URL caso eles existam
    const params = new URLSearchParams();
    if (restauranteId) params.append('restauranteId', restauranteId.toString());
    if (local) params.append('local', local);
    if (busca) params.append('busca', busca);

    // Fazer a requisição para a rota '/produtos' (ajuste se a sua rota base for diferente no server.ts)
    const response = await api.get(`/api/produto?${params.toString()}`);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    throw error;
  }
}