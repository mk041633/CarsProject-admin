import { ProForm, ProFormText } from "@ant-design/pro-components";
import { LoginOutlined } from "@ant-design/icons";

import { message, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { TokenModel } from "../../models/Token.model";
import { saveToken } from "../../utils/token";
import { login } from "../../requests/auth";

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

const Login = ({ setToken }: LoginProps): JSX.Element => {
    const [loading, setIsLoading] = useState(false);
    const [form] = useForm();

    const onSubmit = async (data: any): Promise<void> => {
        setIsLoading(true);

        login(data)
            .then((data) => {
                const token: TokenModel = {
                    accessToken: data.data?.accessToken,
                    authType: "Bearer",
                };

                setToken(token);
                console.log(token)
                
                saveToken(token)
            })
            .catch((err) => {
                let msgText = "Не удалось авторизоваться";

                if (typeof err?.response?.data?.message === "string") {
                    msgText = err?.response?.data?.message;
                }

                message.error(msgText);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <ProForm
                form={form}
                onFinish={onSubmit}
                submitter={{
                    render: () => {
                        return (
                            <div>
                                <Button type="primary" icon={<LoginOutlined />} loading={loading} onClick={() => form.submit()}>
                                    Войти
                                </Button>
                            </div>
                        );
                    },
                }}
            >
                <h2>Авторизация</h2>
                <ProFormText allowClear={false} placeholder="Логин..." width="md" label="Логин" name="login" rules={[{ required: true }]} />
                <ProFormText.Password
                    allowClear={false}
                    placeholder="Пароль..."
                    width="md"
                    label="Пароль"
                    name="password"
                    rules={[{ required: true }]}
                />
            </ProForm>
        </div>
    );
};

export default Login;
