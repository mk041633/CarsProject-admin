/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collapse, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TokenModel } from "../../models/Token.model";
import { fetchClient } from "../../requests/client";
import { ActivateClient, BlockClient, ClientDescription, ClientFilters, ClientMessageStatistics, ClientPayments } from "./components";

const { Panel } = Collapse;

interface ClientInfoProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

const ClientInfo = ({ setToken }: ClientInfoProps): JSX.Element => {
    const params = useParams();
    const Id = params.id || "";
    const [client, setClient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (Id) {
            fetch();
        }
    }, [Id]);

    const fetch = () => {
        setIsLoading(true);

        fetchClient(Id, setToken)
            .then((data) => {
                setClient(data.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            {isLoading && (
                <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
                    <Spin />
                </div>
            )}
            {!isLoading && (
                <>
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <BlockClient client={client} onSuccess={fetch} />

                            <ActivateClient client={client} setToken={setToken} onSuccess={fetch} />
                        </div>
                        <div>
                            <ClientDescription client={client} />
                        </div>
                        {client?.isBlockedByUser && <div className="text-danger mb-3">Бот заблокирован клиентом</div>}
                    </div>
                    <div>
                        <Collapse>
                            <Panel header="Фильтры" key={"filters"}>
                                <ClientFilters chatId={Id} />
                            </Panel>
                            <Panel header="Платежи" key={"payments"}>
                                <ClientPayments client={client} />
                            </Panel>
                            <Panel header="Статистика сообщении" key={"message-statistics"}>
                                <ClientMessageStatistics chatId={Id} />
                            </Panel>
                        </Collapse>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClientInfo;