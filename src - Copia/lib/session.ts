import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/lib/axios";

// Alterado para salvar também no AsyncStorage para não perder ao reiniciar/recarregar
export async function setToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  await AsyncStorage.setItem("token", token);
}

export type Usuario = {
  id: number;
  name: string;
  email: string;
  cnpj?: string;
  telefone?: string;
  endereco?: string;
};

let usuarioLogado: Usuario | null = null;

export function setUsuario(usuario: Usuario | null) {
  usuarioLogado = usuario;
}

export function getUsuario() {
  return usuarioLogado;
}

export async function getFoto(id: number) {
  return await AsyncStorage.getItem(`foto:${id}`);
}

export async function salvarFoto(id: number, foto: string) {
  await AsyncStorage.setItem(`foto:${id}`, foto);
}

// Limpa o token do armazenamento também ao sair
export async function sair() {
  usuarioLogado = null;
  delete api.defaults.headers.common.Authorization;
  await AsyncStorage.removeItem("token");
}