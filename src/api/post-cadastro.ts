import { api } from "@/lib/axios";

export async function Cadastro(dados: {
  nome: string;
  endereco: string;
  telefone: string;
  cnpj: string;
  email: string;
  senha: string;
}) {
  return await api.post("/api/user", dados);
}