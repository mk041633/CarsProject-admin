import { getRequest, patchRequest } from ".";
import { SERVICE_URL } from "../config";
import { TokenModel } from "../models/Token.model";
import { FilterModel } from "../pages/ClientInfo/models/Filter.model";


export const fetchClients = async (setToken:  React.Dispatch<React.SetStateAction<TokenModel | null>>,page: number ,limit: number,search:string) => {
    if(search.substring(0, 2) === '01'){
        search = search.slice(2)
    }
    const url = `${SERVICE_URL}/admin/users?page=${page}&limit=${limit}&keyword=${search}`;

    return getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
            console.log(err)
        }

        throw err;
    });
};
export const fetchClient = async (id: string, setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) => {
    const url = `${SERVICE_URL}/admin/users/${id}`;

    return getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
        }

        throw err;
    });
};

export const block = async (id: string) => {
    const url = `${SERVICE_URL}/admin/users/${id}/block`;

    return patchRequest({
        url,
    });
};

export const fetchClientMessageStatistics = async (chatId: string | number) => {
    const url = `${SERVICE_URL}/client/${chatId}/message-statistics`;

    return getRequest({
        url,
    }).then((data) => {
        return data.data;
    });
};

export const fetchClientFilters = async (chatId: string | number): Promise<FilterModel[]> => {
    const url = `${SERVICE_URL}/admin/filter/${chatId}`;

    return getRequest({
        url,
    }).then((data) => {
        const filters: FilterModel[] = [];

        if (Array.isArray(data.data)) {
            for (const filter of data.data) {
                filters.push(formatFilter(filter));
            }
        }

        return filters;
    });
};

const formatFilter = (data: any): FilterModel => {
    const result: FilterModel = {
        chatId: data?.chatId,
        ...data,
    };

    return result;
};

export const fetchClientPayments = async (client:any): Promise<any[]> => {
    const url = `${SERVICE_URL}/admin/payment/${client.chatId}`;

    return getRequest({
        url,
    }).then((data) => { 
        const payments = [];

        for (const payment of data.data.data) {
            payments.push(payment);
        }
        return payments;
    });
};

