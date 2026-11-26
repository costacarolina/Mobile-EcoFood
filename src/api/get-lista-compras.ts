import { api } from "@/lib/axios";

export type ItemListaCompra = {
  id: number;
  nome: string;
  categoria: string;
  localArmazenamento: string;
  quantidade: number;
  unidade: string;
  prioridade: boolean;
  comprado: boolean;
  restauranteId: number;
  criadoEm: string;
};

type RespostaListaCompra = {
  totalItens: number;
  grupos: Record<string, ItemListaCompra[]>;
};

// A API devolve os itens agrupados por local; a tela agrupa por categoria,
// então aqui os grupos são achatados em uma lista única.
export async function getListaCompras(): Promise<ItemListaCompra[]> {
  const response = await api.get<RespostaListaCompra>("/api/listaCompra");
  return Object.values(response.data.grupos ?? {}).flat();
}

export async function criarItemListaCompra(dados: {
  nome: string;
  categoria: string;
  localArmazenamento: string;
  quantidade: number;
  unidade: string;
}): Promise<ItemListaCompra> {
  const response = await api.post("/api/listaCompra", dados);
  return response.data;
}

export async function atualizarComprado(id: number, comprado: boolean) {
  const response = await api.put(`/api/listaCompra/${id}`, { comprado });
  return response.data as ItemListaCompra;
}

export async function excluirItemListaCompra(id: number) {
  await api.delete(`/api/listaCompra/${id}`);
}
