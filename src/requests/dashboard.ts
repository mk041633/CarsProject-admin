import { toDateFormat } from "../utils/format";
import { getRequest, patchRequest } from ".";
import { SERVICE_URL } from "../config";
import { TokenModel } from "../models/Token.model";

export const fetchDashboard = async (setToken:  React.Dispatch<React.SetStateAction<TokenModel | null>>,filter: string ) => {
    const date = toDateFormat(filter)
    let url = `${SERVICE_URL}/admin/users/statistics/${date}`;
    const users= await getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
            console.log(err)
        }

        throw err;
    });
    console.log(users)
    url = `${SERVICE_URL}/admin/payment/statistics/${date}`;
    const payments = await getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
            console.log(err)
        }

        throw err;
    });
    url = `${SERVICE_URL}/admin/users/conversion-statistics/${date}`;
    const conversion = await getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
            console.log(err)
        }

        throw err;
    });
    url = `${SERVICE_URL}/admin/cars/statistics/${date}`;
    const cars = await getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
            console.log(err)
        }

        throw err;
    });
    url = `${SERVICE_URL}/admin/msg/statistics/${date}`;
    const msgs = await getRequest({
        url,
    }).catch((err) => {
        if (err?.response?.status === 401) {
            setToken(null);
            console.log(err)
        }

        throw err;
    });
    return {users, payments, conversion, cars, msgs}
};