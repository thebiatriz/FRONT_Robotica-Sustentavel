import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios"

function apiConfig(baseUrl: string): AxiosRequestConfig {
    return {
        baseURL: baseUrl,
    };
}

function initAxios(config: AxiosRequestConfig): AxiosInstance {
    const defineInstance = axios.create(config);
    defineInstance.interceptors.request.use(
        (request) => {
            return request;
        },
        (error) => Promise.reject(error)
    );

    defineInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            alert(error);
            return Promise.reject(error);
        }
    );

    return defineInstance;
}

function api(baseURL = "/api") {
    return initAxios(apiConfig(baseURL));
}

export default api;