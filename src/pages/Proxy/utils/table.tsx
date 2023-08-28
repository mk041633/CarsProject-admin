import { DeleteProxyButton } from "../components/deleteProxy";
import { Link } from "react-router-dom";
import { ProxyData } from "../components/editProxy/EditProxy";

export const getProxyTableColumns = (): any[] => {
    return [
        {
           title : "#", 
           dataIndex: "count"
        },
        {
            title: "Прокси",
            dataIndex: "proxy"
        },
        {
            title: "Оплачен до",
            dataIndex: "expireDate"
        },
        {
            title: "Активный",
            dataIndex: "isActive"
        },
        {
            title: "Авторизация",
            dataIndex: "login"
        },
        {
            title: "", 
            dataIndex: "action", 
            width: 40,
           
        }
    ];
};

export const getProxyDataSource = (
    proxies: any[],handleClick: (record:ProxyData) => void,onDelete: () => void) => {
    const result: any[] = [];

    for (let i = 0; i < proxies.length; i++) {
        const proxy = proxies[i];
        result.push({
            count: i + 1,
            _id: proxy?._id,
            proxy: (<Link className="nowrap" to={"#"} onClick={() => handleClick(proxy)}>
                    {proxy?.proxy}
                    </Link>),
            port: proxy?.port,
            host: proxy?.host,
            expireDate: proxy.expireDate ? new Date(proxy.expireDate).toLocaleDateString() : "",
            isActive: proxy.isActive ? 'Да' : 'Нет',
            login: proxy?.login,
            password: proxy?.password,
            action: <DeleteProxyButton proxy={proxy} onDelete={onDelete}/>

        });
    }
    return result;
};

  