import { Descriptions, Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchClientMessageStatistics } from "../../../requests/client";

const ClientMessageStatistics = ({ chatId }: { chatId: number | string }): JSX.Element => {
    const [messageStats, setMessageStats] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [chatId]);

    const fetch = () => {
        setIsLoading(true);

        fetchClientMessageStatistics(chatId)
            .then((data) => setMessageStats(data))
            .finally(() => setIsLoading(false));
    };

    if (isLoading) {
        return (
            <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: 100 }}>
                <Spin size="small" />
            </div>
        );
    }

    return (
        <div>
            <Descriptions title="Статистика за последние 24 часа" column={1}>
                <Descriptions.Item label="Отправлено">{messageStats?.totalCount}</Descriptions.Item>
                {messageStats?.messages?.map((message: any) => {
                    return <Descriptions.Item label={message._id}>{message?.count}</Descriptions.Item>;
                })}
            </Descriptions>
        </div>
    );
};

export default ClientMessageStatistics;
