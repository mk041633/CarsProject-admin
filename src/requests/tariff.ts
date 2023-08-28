import { DashOutlined } from "@ant-design/icons";
import { deleteRequest, getRequest, patchRequest, postRequest } from ".";
import { SERVICE_URL } from "../config";
import { TokenModel } from "../models/Token.model";
import { error } from "console";

export const fetchTariffs = async (setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) => {
    const url = `${SERVICE_URL}/admin/tariff`;

    return getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
        }

        throw err;
    });
};

export const AddTariff = async (body: any, setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) => {
    try {
        const url = `${SERVICE_URL}/admin/tariff`;

        const response = await postRequest({
            url,
            body,
        });
        if (response.status === 201) {
            console.log(response.data);
            return response.data; 
        } else if (response.status === 401) {
            setToken(null);
        }

        throw new Error(`Failed to create tariff. Status: ${response.status}`);
    } catch (error) {
        console.error("Error creating tarif:", error);
        throw error;
    }
};

export const deleteTarif =async (tarifId:string) => {
    const url = `${SERVICE_URL}/admin/tariff/${tarifId}`;
    
    return deleteRequest({
        url
    });
}


  
export const patchTariff = async (tarifId: string,body: any) => {
    const url = `${SERVICE_URL}/admin/tariff/${tarifId}`;
    const response = await patchRequest({ url,body}); 
    if (response.status === 201) {
        return response.data;
    } else if (response.status === 401) {
        console.log("err");
    }
};
