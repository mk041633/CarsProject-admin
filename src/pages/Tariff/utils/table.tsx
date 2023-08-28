import { Button } from "antd";
import { DeleteTariffButton } from "../components/deleteTariff";
import { TariffData } from "../components/editTariff/EditTariff";

export const getTarifTableColumns = (): any[] => {
    return [
        {
            title: "#",
            dataIndex: "count"
        },
        {
            title: "Название",
            dataIndex: "name"
        },
        {
            title: "Цена",
            dataIndex: "price"
        },
        {
            title: "Макс кол-во фильт.",
            dataIndex: "maxFiltersCount"
        },
        {
            title: "Архивирован", 
            dataIndex: "isArchive",
        },
        {
            title: "Активный",
            dataIndex: "isActive"
        },
        {
            title: "Доп. фильтры",
            dataIndex: "additionalFilters"
        },
        {
            title: "", 
            dataIndex: "action", 
            width: 40,
        }
    ];
};


export const getTariffDataSource = (
    tariffs: any[],onDelete: () => void, onRowClick: (tariff: any) => void) =>{
    const result: any[] = []   
    for (let i = 0; i < tariffs.length; i++) {
        const tariff = tariffs[i];
        result.push({
            count: i + 1,
            _id: tariff?._id,
            name: (
                <a
                    className="tariff-name"
                    href="#" // You can set the appropriate link here if needed
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default link behavior
                        onRowClick(tariff);
                    }}
                >
                    {tariff?.name}
                </a>
            ),
            price: tariff?.price,
            qrLink: tariff?.qrLink,
            maxFiltersCount: tariff?.maxFiltersCount,
            isArchive: tariff.isArchive ? "Да" : "Нет",
            isActive: tariff.isActive ? 'Да' : 'Нет',
            additionalFilters: tariff.additionalFilters ? 'Да' : 'Нет',
            action: <DeleteTariffButton tariff={tariff} onDelete={onDelete} />
        });
    }
     return result;
     }
