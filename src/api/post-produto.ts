import { api } from '../lib/axios';

export interface NovoProduto {
    nome: string;
    categoria: string;
    localArmazenamento: string;
    codigoBarras?: string;
    quantidade?: number; 
    unidade?: string;
    dataValidade?: string; 
    restauranteId: number;
}

export async function criarProduto(dados: NovoProduto) {
    try {
        // Fazemos um POST para a rota do back-end
        const response = await api.post('/api/produto', dados);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar o produto:", error);
        throw error;
    }
}