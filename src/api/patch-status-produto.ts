import { api } from "@/lib/axios";

export type StatusProduto = "APROVEITADO" | "NAO_APROVEITADO";

export type ResultadoAtualizacaoStatus = {
  mensagem: string;
  produto: { id: number; nome: string; status: string };
  impacto: { quantidadeUtilizada: number; unidade: string; foiAproveitado: boolean };
  listaCompra: {
    solicitada: boolean;
    adicionado: boolean;   // true quando o item foi criado na lista agora
    jaExistia: boolean;    // true quando já havia item igual na lista (não duplica)
    item: unknown | null;
  };
};

/**
 * Atualiza o status, registra a quantidade utilizada e, se pedido,
 * adiciona o produto à lista de compras (tudo feito pelo backend numa única transação).
 */
export async function atualizarStatusProduto(
  id: string | number,
  status: StatusProduto,
  quantidadeUtilizada: number,
  adicionarListaCompra: boolean
): Promise<ResultadoAtualizacaoStatus> {
  const response = await api.patch(`/api/status-produtos/${id}/status`, {
    status,
    quantidadeUtilizada,
    adicionarListaCompra,
  });
  return response.data;
}
