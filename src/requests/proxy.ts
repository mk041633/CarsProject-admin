import { deleteRequest, getRequest, patchRequest, postRequest } from ".";
import { SERVICE_URL } from "../config";
import { TokenModel } from "../models/Token.model";

export const fetchProxy = async(setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) =>{
    const url = `${SERVICE_URL}/admin/proxy`;
    
    return getRequest({
        url,
        
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
        }

        throw err;
    });
}; 

export const addProxy = async (body: any, setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) => {
    try {
        const url = `${SERVICE_URL}/admin/proxy`;

        const response = await postRequest({
            url,
            body,
        });
        


        if (response.status === 201) {
            return response.data; 
        } else if (response.status === 401) {
            setToken(null);
        }

        throw new Error(`Failed to create proxy. Status: ${response.status}`);
    } catch (error) {
        console.error("Error creating proxy:", error);
        throw error;
    }
};

export const deleteProxy =async (proxyId:string) => {
    const url = `${SERVICE_URL}/admin/proxy/${proxyId}`;

    return deleteRequest({
        url
    });
}

export const patchProxy = async (proxyId: string,body: any) => {
    const url = `${SERVICE_URL}/admin/proxy/${proxyId}`;
    const response = await patchRequest({ url,body}); 
    if (response.status === 201) {
        return response.data;
    } else if (response.status === 401) {
        console.log("err");
    }
};
