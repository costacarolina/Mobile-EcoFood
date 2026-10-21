import axios from "axios"

export const api = axios.create({
    baseURL: "http://10.92.199.28:3000",
})