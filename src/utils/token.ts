import { TokenModel } from "../models/Token.model";

export const getToken = (): TokenModel | null => {
    const accessToken = localStorage.getItem("accessToken");
    const authType = localStorage.getItem("authType") || "Bearer";
    if (accessToken) {
        return {
            accessToken,
            authType,
        };
    }

    return null;
};

export const saveToken = (token: TokenModel) => {
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("authType", token.authType);
};