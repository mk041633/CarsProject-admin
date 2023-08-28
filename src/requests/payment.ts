import { deleteRequest, getRequest, postRequest } from ".";
import { SERVICE_URL } from "../config";
import { TokenModel } from "../models/Token.model";

export const fetchPayments = async (setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) => {
    const url = `${SERVICE_URL}/admin/payment`;

    return getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
        }

        throw err;
    });
};

export const activateClient = async (body: any, setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>) => {
    const url = `${SERVICE_URL}/admin/payment`;

    return postRequest({
        url,
        body,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
        }

        throw err;
    });
};

export const deletePayment = async (paymentId: string) => {
    const url = `${SERVICE_URL}/admin/payment/${paymentId}`;

    return deleteRequest({
        url,
    });
};
