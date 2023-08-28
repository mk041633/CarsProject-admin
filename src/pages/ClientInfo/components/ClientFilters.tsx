import { Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchClientFilters } from "../../../requests/client";
import { FilterModel } from "../models/Filter.model";
import FilterItem from "./ClientFilterItem";


const ClientFilters = ({ chatId }: { chatId: string | number }) => {
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [chatId]);

    const fetch = () => {
        setIsLoading(true);

        fetchClientFilters(chatId)
            .then((data) => setFilters(data))
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
        <div className="d-flex flex-wrap justify-content-center">
            {filters.map((filter, index) => {
                return <FilterItem key={index} data={filter} index={index} />;
            })}
        </div>
    );
};

export default ClientFilters;
