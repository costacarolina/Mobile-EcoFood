import { CATEGORIAS_PRODUTO, CategoriaProduto } from "@/lib/categorias";

export type ProdutoIdentificado = {
  codigoBarras: string;
  nome: string;
  categoria: CategoriaProduto;
};

// Base pública de produtos (Open Food Facts). Não exige chave de API.
const BASE = "https://world.openfoodfacts.org/api/v2/product";
const TIMEOUT_MS = 10000;

function mapearCategoria(tags: string[] = []): CategoriaProduto {
  const texto = tags.join(" ").toLowerCase();

  // Ordem importa: "fruit-juices" deve virar Bebidas, não Hortifruti
  if (/beverage|drink|juice|soda|water|coffee|tea/.test(texto)) return "Bebidas";
  if (/meat|poultry|chicken|beef|pork|fish|seafood|sausage|ham/.test(texto)) return "Carnes";
  if (/dairy|dairies|milk|cheese|yogurt|yoghurt|butter/.test(texto)) return "Laticínios";
  if (/fruit|vegetable|fresh-food|produce/.test(texto)) return "Hortifruti";

  return CATEGORIAS_PRODUTO[CATEGORIAS_PRODUTO.length - 1];
}

/**
 * Retorna o produto identificado pelo código de barras, ou null quando
 * a base não conhece o código. Lança erro somente em falha de rede/servidor.
 */
export async function identificarProdutoPorCodigo(
  codigoBarras: string
): Promise<ProdutoIdentificado | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const url =
      `${BASE}/${encodeURIComponent(codigoBarras)}.json` +
      `?fields=code,product_name,product_name_pt,brands,categories_tags`;

    const resposta = await fetch(url, {
      headers: { "User-Agent": "EcoFood/1.0 (TCC - app academico)" },
      signal: controller.signal,
    });

    if (!resposta.ok) {
      throw new Error(`Base de produtos respondeu com status ${resposta.status}`);
    }

    const dados = await resposta.json();

    // status 0 = código não encontrado na base
    if (dados.status !== 1 || !dados.product) return null;

    const p = dados.product;
    const nome = String(p.product_name_pt || p.product_name || "").trim();

    // Sem nome confiável não cadastramos nada: o usuário preenche manualmente
    if (!nome) return null;

    return {
      codigoBarras,
      nome,
      categoria: mapearCategoria(p.categories_tags),
    };
  } finally {
    clearTimeout(timer);
  }
}
