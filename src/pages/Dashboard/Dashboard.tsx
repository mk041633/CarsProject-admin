import { TokenModel } from "../../models/Token.model";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Select } from "antd";
import { fetchDashboard } from "../../requests/dashboard";

const { Option } = Select;

interface DashboardProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

interface ClientData {
    data: { name: string; value: number }[];
    count: number;
}

interface ConversionData {
    test:{
        data: { name: string; value: number }[];
        count: number;
    }
    paid:{
        data: { name: string; value: number }[];
        count: number;
    }
    paid2:{
        data: { name: string; value: number }[];
        count: number;
    }
}

const Dashboard = ({ setToken }: DashboardProps): JSX.Element => {
    const [loading, setIsLoading] = useState(false);
    const [clients, setClients] = useState<ClientData>();
    const [payments, setPayments] = useState<ClientData>();
    const [cars, setCars] = useState<ClientData>();
    const [msgs, setMsgs] = useState<ClientData>();
    const [conversion, setConversion] = useState<ConversionData>();
    const [selectedFilter, setSelectedFilter] = useState<string>("Месяц");

    useEffect(() => {
        fetch();
    }, [selectedFilter]);

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
    };

    const fetch = () => {
        setIsLoading(true);

        fetchDashboard(setToken, selectedFilter)
            .then((data) => {
                setClients(data.users.data || []);
                setPayments(data.payments.data || []);
                setConversion(data.conversion.data || []);
                setCars(data.cars.data || []);
                setMsgs(data.msgs.data || []);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Select defaultValue={selectedFilter} onChange={handleFilterChange}>
                <Option value="Сегодня">Сегодня</Option>
                <Option value="Вчера">Вчера</Option>
                <Option value="Неделя">Неделя</Option>
                <Option value="Месяц">Месяц</Option>
                <Option value="Общее">Общее</Option>
            </Select>
            <h1>Пользователи</h1>
                <h3 className="mb-4">Кол-во за {selectedFilter==='Общее'?' все время':selectedFilter.toLowerCase()}: {clients?.count? clients.count:0} </h3>
                <LineChart width={1150} height={300} data={clients?.data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" name="количество"/>
                </LineChart>
            <h1>Оплаты</h1>
                <h3 className="mb-4">Кол-во за {selectedFilter==='Общее'?' все время':selectedFilter.toLowerCase()}: {payments?.count? payments.count:0} </h3>
                <BarChart width={800} height={300} data={payments?.data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="количество"/>
                </BarChart>
            <h1>Конверсия</h1>
                <h3 className="mb-4">Из зареганных в тест {selectedFilter==='Общее'?' за все время':selectedFilter.toLowerCase()}: {conversion?.test.count?conversion.test.count:0}</h3>
                    <LineChart width={1150} height={300} data={conversion?.test.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="количество"/>
                    </LineChart>
                <h3 className="mb-4">Из теста в оплату {selectedFilter==='Общее'?' за все время':selectedFilter.toLowerCase()}: {conversion?.paid.count?conversion.paid.count:0}</h3>
                    <LineChart width={1150} height={300} data={conversion?.paid.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="количество"/>
                    </LineChart>
                <h3 className="mb-4">Из зареганных в оплаченные {selectedFilter==='Общее'?' за все время':selectedFilter.toLowerCase()}: {conversion?.paid2.count?conversion.paid2.count:0}</h3>
                    <LineChart width={1150} height={300} data={conversion?.paid2.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="количество"/>
                    </LineChart>
            <h1>Объявления</h1>
                <h3 className="mb-4">Количество за {selectedFilter==='Общее'?' все время':selectedFilter.toLowerCase()}: {cars?.count? cars.count:0} </h3>
                    <LineChart width={1150} height={300} data={cars?.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="количество"/>
                    </LineChart>
            <h1>Сообщения</h1>
                <h3 className="mb-4">Количество за {selectedFilter==='Общее'?' все время':selectedFilter.toLowerCase()}: {msgs?.count? msgs.count:0} </h3>
                    <LineChart width={1150} height={300} data={msgs?.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="количество"/>
                    </LineChart>
        </div>
    )
};

export default Dashboard;