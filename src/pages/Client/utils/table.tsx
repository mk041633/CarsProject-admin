import { parsePhoneNumber, PhoneNumber } from "libphonenumber-js";
import { Link } from "react-router-dom";

export const getClientColumns = (): any[] => {
    return [
       
        {
            title: "Имя",
            dataIndex: "firstName",
        },
        {
            title: <div className="nowrap">Имя пользователя</div>,
            dataIndex: "username",
        },
        {
            title: <div className="nowrap">Номер телефона</div>,
            dataIndex: "phone",
        },
        {
            title: <div className="nowrap">Оплачен до</div>,
            dataIndex: "expireDate",
        },
        {
            title: "Cтатус",
            dataIndex: "active",
        },
        
    ];
};

export const getClientDataSource = (clients: any[]) => {
    const result: any[] = [];

    for (const client of clients) {
        let phoneNumber: PhoneNumber | undefined;
        try {
            phoneNumber = parsePhoneNumber(`+${client.phone}`.replace("+", ""), "KZ");
        } catch (_e) {
            console.log();
        }

        const expireDateFormatted = (client.expireDate) ? formatDate(client.expireDate) : '';


        result.push({
            firstName: <Link to={`/client/${client._id}`}>{client.firstName}</Link>,
            username: client.username,
            phone: client.phone,
            expireDate: expireDateFormatted,
            active: getClientStatus(client)
        });
    }

    return result;
};
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
const getClientStatus = (client: any) => {
    if (client?.isBlocked) {
        return <div className="text-danger">В блоке</div>;
    }

    if (!client.phone) {
        return <div className="text-warning">Регистрация не&nbsp;завершена</div>;
    }

    if (client.expireDate) {
        if (client?.isTest && new Date(client.expireDate) < new Date()) {
            return <div className="text-danger">Тест закончился</div>;
        }
    }

    if (client?.isTest) {
        return <div className="text-warning">Тестирует</div>;
    }

    if (new Date(client.expireDate) > new Date()) {
        return <div className="text-success">Активный</div>;
    }

    return <div className="text-danger">Не оплатил</div>;
};

