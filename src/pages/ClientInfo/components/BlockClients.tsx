import { Button, message, Popconfirm } from "antd";
import { useState } from "react";
import { block } from "../../../requests/client";

interface BlockClientProps {
    client: any;
    onSuccess: () => void;
}

const BlockClient = ({ client, onSuccess }: BlockClientProps): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const isBlocked = client?.isBlocked;

    const description = (
        <div>
            <p>
                Вы точно хотите заблокировать <b>{client?.firstName}</b>?
            </p>
            <p>
                <b>Клиенту будет отправлено сообщение.</b>
            </p>
        </div>
    );

    const blockClient = () => {
        setLoading(true);

        block(client?._id)
            .then(() => {
                let msgText = "Клиент заблокирован";
                if (isBlocked) {
                    msgText = "Клиент разблокирован";
                }

                message.success(msgText);

                onSuccess();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (!isBlocked) {
        return (
            <Popconfirm
                title="Внимание!"
                description={description}
                onConfirm={blockClient}
                okButtonProps={{
                    ghost: true,
                    className: "text-danger border-danger",
                    loading: loading,
                }}
                okText="Заблокировать"
            >
                <Button
                    loading={loading}
                    ghost
                    type="primary"
                    className={`${isBlocked ? "text-primary border-primary" : "text-danger border-danger"}`}
                >
                    {isBlocked ? "Разблокировать" : "Заблокировать"}
                </Button>
            </Popconfirm>
        );
    }

    return (
        <Button
            ghost
            type="primary"
            className={`${isBlocked ? "text-primary border-primary" : "text-danger border-danger"}`}
            onClick={blockClient}
            loading={loading}
        >
            {isBlocked ? "Разблокировать" : "Заблокировать"}
        </Button>
    );
};

export default BlockClient;
