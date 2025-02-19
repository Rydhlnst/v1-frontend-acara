import { environment } from "@/config/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
    accessToken?: string
}

const headers = {
    "Content-Type": "application/json"
}

// Membuat axios instance
const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000
});

// Kenapa menggunakan interceptors? Karena untuk mengecek error dan session Token Request ke dalam API 
instance.interceptors.request.use(
    async (request) => {
        // Mengecek akses token untuk login
        const session: CustomSession | null = await getSession();
        if(session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export default instance;