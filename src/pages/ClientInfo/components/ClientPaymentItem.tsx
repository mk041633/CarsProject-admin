import { Card, Descriptions, Table } from "antd";
import { PaymentModel } from "../models/Payment.model";
import { currencyFormat } from "../../../utils/format";
import { DeletePaymentButton } from "../../Payment/components";

const PaymentItem = ({ data, onDelete }: { data: any; onDelete: () => void }): JSX.Element => {

    return (
        <Card className={`border rounded shadow cursor-pointer m-1 w-100`}>
            <Table
                bordered
                size="small"
                pagination={false}
                columns={ [{
                    title: "Дата Активации",
                    dataIndex: "createdAt"
                },
                {
                    title: "Цена",
                    dataIndex: "price"
                },
                {
                    title: "Дата окончания",
                    dataIndex: "newExpireDate"
                },
                {
                    title: "Удалить",
                    dataIndex: "action"
                },
            ]}
                dataSource={[{
                    createdAt: new Date(data.createdAt || 0).toLocaleDateString(),
                    price: currencyFormat(data?.price || 0),
                    newExpireDate: new Date(data.newExpireDate || 0).toLocaleDateString(),
                    action: <DeletePaymentButton payment={data} onDelete={onDelete} />
                }]}
                
            />
        </Card>
    );
};

export default PaymentItem;