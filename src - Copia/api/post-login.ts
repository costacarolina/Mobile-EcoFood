import { api } from "@/lib/axios";

export async function Login(email: string, senha: string) {
    return await api.post("/api/login", { email, senha });
    
}