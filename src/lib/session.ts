import AsyncStorage from "@react-native-async-storage/async-storage";

export type Usuario = { id: number; name: string; email: string };

// guarda quem fez login (fica na memória enquanto o app está aberto)
let usuarioLogado: Usuario | null = null;

export function setUsuario(usuario: Usuario | null) {
  usuarioLogado = usuario;
}

export function getUsuario() {
  return usuarioLogado;
}

// a foto fica salva no celular, separada por usuário
export async function getFoto(id: number) {
  return await AsyncStorage.getItem(`foto:${id}`);
}

export async function salvarFoto(id: number, foto: string) {
  await AsyncStorage.setItem(`foto:${id}`, foto);
}
