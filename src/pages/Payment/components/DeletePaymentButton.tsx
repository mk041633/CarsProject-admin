import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { deletePayment } from "../../../requests/payment";

const DeletePaymentButton = ({ payment, onDelete }: { payment: any; onDelete: () => void }): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const onConfirm = () => {
        setIsLoading(true);

        deletePayment(payment._id)
            .then(() => {
                onDelete();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Popconfirm
            title="Внимание!"
            okText={"Удалить"}
            okButtonProps={{
                className: "text-white bg-danger",
                type: "default",
                loading: isLoading,
            }}
            description={`Вы точно хотите удалить платеж ${payment?.client?.firstName || payment?.client?.username}?`}
            onConfirm={onConfirm}
        >
            <Button className="text-danger" icon={<DeleteOutlined />} loading={isLoading}></Button>
        </Popconfirm>
    );
};

export default DeletePaymentButton;