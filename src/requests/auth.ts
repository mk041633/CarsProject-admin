import { postRequest } from ".";
import { SERVICE_URL } from "../config";

export const login = (body: any) => {
    const url = `${SERVICE_URL}/auth/admin/login`;

    return postRequest({ url, body });
};
