import { Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchClientPayments } from "../../../requests/client";
import { PaymentModel } from "../models/Payment.model";
import PaymentItem from "./ClientPaymentItem";


const ClientPayments = ( {client} : any ) => {
    const [payments, setPayments] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [client]);

    const fetch = () => {
        setIsLoading(true);

        fetchClientPayments(client)
            .then((data) => setPayments(data))
            .finally(() => setIsLoading(false));
    };

    if (isLoading) {
        return (
            <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: 100 }}>
                <Spin size="small" />
            </div>
        );
    }
    console.log(payments)
    return (
        <div className="d-flex flex-wrap justify-content-center">
            
            {payments.map((payment, index) => {
                return <PaymentItem data={payment} onDelete={fetch} />;
            })}
        </div>
    );
};

export default ClientPayments;
