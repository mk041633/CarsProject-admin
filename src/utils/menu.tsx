import { BarChartOutlined, BookOutlined, ClusterOutlined, DollarOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { MenuDataItem } from "@ant-design/pro-components";

export const getMenu = (): MenuDataItem[] => {
    return [
        {
            path: "/",
            name: "Главная",
            icon: <HomeOutlined />,
        },
        {
            path: "/dashboard",
            name: "Дашборд",
            icon: <BarChartOutlined />,
        },
        {
            path: "/client",
            name: "Клиенты",
            icon: <UserOutlined />,
        },
        {
            path: "/payment",
            name: "Платежи",
            icon: <DollarOutlined />,
        },
        {
            path: "/proxy",
            name: "Прокси",
            icon: <ClusterOutlined />,
        },
        {
            path: "/tariff",
            name: "Тарифы",
            icon: <BookOutlined />,
        },
    ];
};