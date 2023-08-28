import { Button, InputNumber, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { TokenModel } from "../../../models/Token.model";
import { activateClient } from "../../../requests/payment";
import { fetchTariffs } from "../../../requests/tariff";
import { formatCurrencyRegEx, parserCurrencyRegEx } from "../../../utils/format";
import { ACTIVATION_TYPE_OPTIONS } from "../constants/options";

interface ActivateClientProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
    client: any;
    onSuccess: () => void;
}

const ActivateClient = ({ setToken, client, onSuccess }: ActivateClientProps) => {
    const [visible, setVisible] = useState(false);
    const [form] = useForm();
    const [activationType, setActivationType] = useState(ACTIVATION_TYPE_OPTIONS[0].value);
    const [price, setPrice] = useState(0);
    const [tariffs, setTariffs] = useState<any[]>([]);
    const [activationPeriod, setActivationPeriod] = useState(0);
    const [tariffId, setTariffId] = useState("");
    const [loading, setLoading] = useState(false);
    const [maxFiltersCount, setMaxFiltersCount] = useState(0);

    useEffect(() => {
        
        fetch();
    }, []);

    useEffect(() => {
        const tariff: any = tariffs.find((v: any) => v._id === tariffId);

        if (tariff) {
            setPrice(tariff.price);
            setMaxFiltersCount(tariff.maxFiltersCount);
        }
    }, [tariffId]);

    useEffect(() => {
        if (tariffs.length > 0) {
            setTariffId(tariffs[0]._id);
        }
    }, [tariffs]);

    const fetch = () => {
        setLoading(true);

        fetchTariffs(setToken)
            .then((data) => {
                setTariffs(data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onClose = () => {
        form.resetFields();

        setActivationType(ACTIVATION_TYPE_OPTIONS[0].value);

        setVisible(false);
    };

    const activate = () => {
        const body = getBody();

        setLoading(true);

        activateClient(body, setToken)
            .then(() => {
                message.success(`Клиент успешно активирован`);

                setVisible(false);
                onSuccess();
            })
            .catch(() => {
                message.error("Не удалось активировать клиента");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getBody = () => {
        const result: any = {
            price,
            tariffId,
            chatId: client.chatId,
            clientId: client._id,
            maxFiltersCount,
        };
        
        if (activationType === "month") {
            result["numberOfMonth"] = activationPeriod;
        } else if (activationType === "week") {
            result["numberOfWeek"] = activationPeriod;
        } else if (activationType === "day") {
            result["numberOfDay"] = activationPeriod;
        }

        return result;
    };

    return (
        <>
            <Button loading={loading} className="me-3 text-success border-success" ghost type="primary" onClick={() => setVisible(true)}>
                Активировать
            </Button>

            <Modal
                title="Активировать клиента"
                visible={visible}
                onCancel={onClose}
                okText="Активировать"
                destroyOnClose
                onOk={activate}
                okButtonProps={{
                    loading: loading,
                }}
            >
                <div className="mt-4">
                    <div className="mb-3">
                        <div>Выберите тариф:</div>
                        <Select
                            value={tariffId}
                            onChange={(v) => setTariffId(v)}
                            className="w-100"
                            options={tariffs.map((tariff: any) => {
                                return {
                                    value: tariff._id,
                                    label: tariff.name,
                                };
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <div>Тип активации:</div>
                        <Select
                            className="w-100"
                            loading={loading}
                            value={activationType}
                            onChange={(v) => setActivationType(v)}
                            options={ACTIVATION_TYPE_OPTIONS}
                        />
                    </div>
                    <div className="mb-3">
                        <div>Cрок активации:</div>
                        <InputNumber
                            value={activationPeriod + ""}
                            disabled={loading}
                            className="w-100"
                            formatter={(value) => `${value}`.replace(formatCurrencyRegEx(), " ")}
                            parser={(value) => {
                                if (!value) {
                                    return "";
                                }

                                return value.replace(parserCurrencyRegEx(), "");
                            }}
                            onChange={(v) => setActivationPeriod(parseInt(v?.toString() || "0"))}
                        />
                    </div>
                    <div className="mb-3">
                        <div>Кол-во фильтров:</div>
                        <InputNumber
                            value={maxFiltersCount + ""}
                            disabled={true}
                            className="w-100"
                            formatter={(value) => `${value}`.replace(formatCurrencyRegEx(), " ")}
                            parser={(value) => {
                                if (!value) {
                                    return "";
                                }

                                return value.replace(parserCurrencyRegEx(), "");
                            }}
                            onChange={(v) => setMaxFiltersCount(parseInt(v?.toString() || "0"))}
                        />
                    </div>
                    <div className="mb-3">
                        <div>Сумма:</div>
                        <InputNumber
                            value={price + ""}
                            disabled={loading}
                            className="w-100"
                            addonBefore="₸"
                            formatter={(value) => `${value}`.replace(formatCurrencyRegEx(), " ")}
                            parser={(value) => {
                                if (!value) {
                                    return "";
                                }

                                return value.replace(parserCurrencyRegEx(), "");
                            }}
                            onChange={(v) => setPrice(parseInt(v?.toString() || "0"))}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ActivateClient;
