import { useEffect, useRef, useState } from "react";
import "./Bootstrap.css";
import "./App.css";
import { TokenModel } from "./models/Token.model";
import { Login } from "./pages/Auth";
import { getToken } from "./utils/token";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Button, Card } from "antd";
import { getMenu } from "./utils/menu";
import { LogoutOutlined } from "@ant-design/icons";
import { Client } from "./pages/Client";
import { Payment } from "./pages/Payment";
import { Proxy } from "./pages/Proxy";
import { Tariff } from "./pages/Tariff";
import { Dashboard } from "./pages/Dashboard";
import { ClientInfo } from "./pages/ClientInfo";

const App = () => {
    const [token, setToken] = useState<TokenModel | null>(getToken());
    const actionRef = useRef<{ reload: () => void }>();
    const [pathname, setPathname] = useState(window.location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(pathname);
    }, [pathname]);

    if (!token) {
        return <Login setToken={setToken} />;
    }

    const logout = () => {
        setToken(null);
    };

    return (
        <ProLayout
            title="CarFastBot"
            className="h-100"
            actionRef={actionRef}
            menu={{ request: async () => getMenu() }}
            location={{ pathname: pathname }}
            layout={"mix"}
            navTheme={"light"}
            menuItemRender={(item, dom) => {
                return (
                    <div
                        onClick={() => {
                            const path = item.path || "/";

                            if (path === pathname) {
                                navigate(path); 
                            } else {
                                setPathname(path); 
                            }
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            menuFooterRender={(props) => {
                let text = "Выйти";
                let className = "d-flex";

                if (props?.collapsed) {
                    text = "";
                    className = "d-flex justify-content-center";
                }
                return (
                    <div className={className}>
                        <Button
                            className="text-danger"
                            icon={<LogoutOutlined />}
                            type="text"
                            style={{ fontSize: 15 }}
                            onClick={() => logout()}
                        >
                            {text}
                        </Button>
                    </div>
                );
            }}
        >
            <PageContainer>
                <Card>{getRoutes(setToken)}</Card>
            </PageContainer>
        </ProLayout>
    );
};

const getRoutes = (setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>): JSX.Element => {
    return (
        <Routes>
            <Route path="client">
                <Route path=":id" element={<ClientInfo setToken={setToken} />}></Route>
                <Route index element={<Client setToken={setToken} />}></Route>
            </Route>

            <Route path="payment">
                <Route index element={<Payment setToken={setToken} />}></Route>
            </Route>

            <Route path="proxy">
                <Route index element={<Proxy setToken={setToken}/>}></Route>
            </Route>

            <Route path="tariff">
                <Route index element={<Tariff setToken={setToken}/>}></Route>
            </Route>

            <Route path="dashboard">
                <Route index element={<Dashboard setToken={setToken}/>}></Route>
            </Route>

            <Route index element={<Home />}></Route>

            <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
    );
};

export default App;
