// Listas usadas no cadastro de produto, na lista de compras e no scanner.
// Devem ser as mesmas nas três telas para os dados baterem.
export const CATEGORIAS_PRODUTO = [
  "Hortifruti",
  "Carnes",
  "Laticínios",
  "Bebidas",
  "Outros",
] as const;

export const LOCAIS_ARMAZENAMENTO = ["Geladeira", "Freezer", "Despensa"] as const;

export type CategoriaProduto = (typeof CATEGORIAS_PRODUTO)[number];
