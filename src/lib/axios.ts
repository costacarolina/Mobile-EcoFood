import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://10.92.199.28:3000",
});

// Interceptador para injetar o token automaticamente em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao ler o token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);