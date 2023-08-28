import { Table } from "antd";
import { useEffect, useState } from "react";
import { TokenModel } from "../../models/Token.model";
import { fetchPayments } from "../../requests/payment";
import { getPaymentColumns, getPaymentsDataSource } from "./utils/table";

interface PaymentProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

const Payment = ({ setToken }: PaymentProps) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);

        fetchPayments(setToken)
            .then((data) => {
                setPayments(data.data.data || []);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={{ overflow: "auto" }}>
            <Table
                pagination={false}
                loading={loading}
                bordered
                size="small"
                columns={getPaymentColumns()}
                dataSource={getPaymentsDataSource(payments, fetch)}
            />
        </div>
    );
};

export default Payment;
