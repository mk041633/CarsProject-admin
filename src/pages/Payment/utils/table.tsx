import { Link } from "react-router-dom";
import { currencyFormat } from "../../../utils/format";
import { DeletePaymentButton } from "../components";

export const getPaymentColumns = (): any[] => {
    return [
        {
            title: "Дата",
            dataIndex: "activationDate",
        },
        {
            title: <div className="nowrap">ID пользов.</div>,
            dataIndex: "chatId",
        },
        {
            title: "Цена",
            dataIndex: "price",
        },
        {
            title: <div className="nowrap">Активирован до</div>,
            dataIndex: "activatedTo",
        },
        {
            title: "Активировал",
            dataIndex: "activatedBy",
        },
        {
            title: "Тариф",
            dataIndex: "tariff",
        },
        {
            title: "",
            dataIndex: "action",
            width: 40,
        },
    ];
};

export const getPaymentsDataSource = (payments: any[], onDelete: () => void) => {
    const result: any = [];

    for (const payment of payments) {
        result.push({
            activationDate: new Date(payment.createdAt || 0).toLocaleDateString(),
            chatId: (
                <Link className="nowrap" to={`/client/${payment.client._id}`}>
                    {payment?.client?.firstName} ({payment.chatId || ""})
                </Link>
            ),
            price: <div className="nowrap">{currencyFormat(payment?.price || 0)}</div>,
            activatedTo: new Date(payment.newExpireDate || 0).toLocaleDateString(),
            tariff: payment?.tariff?.name,
            activatedBy: payment?.user?.login,
            action: <DeletePaymentButton payment={payment} onDelete={onDelete} />,
        });
    }

    return result;
};