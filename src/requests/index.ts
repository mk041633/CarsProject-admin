import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../utils/token";

export interface RequestProps {
    url: string;
    body?: any;
    options?: AxiosRequestConfig;
}

export const postRequest = async (response: RequestProps) => {
    const token = getToken();

    return axios.post(response.url, response.body, {
        headers: {
            Authorization: `${token?.authType} ${token?.accessToken}`,
        },
        ...response.options,
    });
};

export const patchRequest = async (response: RequestProps) => {
    const token = getToken();
    return axios.patch(response.url, response.body, {
        headers: {
            Authorization: `${token?.authType} ${token?.accessToken}`,
        },
        ...response.options,
    });
};

export const getRequest = async (response: RequestProps) => {
    const token = getToken();

    return axios.get(response.url, {
        headers: {
            Authorization: `${token?.authType} ${token?.accessToken}`,
        },
        ...response.options,
    });
};

export const deleteRequest = async (response: RequestProps) => {
    const token = getToken();

    return axios.delete(response.url, {
        headers: {
            Authorization: `${token?.authType} ${token?.accessToken}`,
        },
        ...response.options,
    });
};
