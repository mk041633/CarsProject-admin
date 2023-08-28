import { useState } from "react";
import { deleteTarif } from "../../../../requests/tariff";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteTariffButton = ({tariff,onDelete}: {tariff: any; onDelete: () => void}): JSX.Element =>{
    const [isLoading,setIsLoading] = useState(false);

    const onConfirm = () => {
        setIsLoading(true);

        deleteTarif(tariff._id)
        .then(() =>{
            onDelete();
        })
        .finally(()=>{
            setIsLoading(false);
        })
    };
    return (
        <Popconfirm
            title="Внимание!"
            okText={"Удалить"}
            okButtonProps={{
                className: "text-white bg-danger",
                type: "default",
                loading: isLoading,
            }}
            description={`Вы точно хотите удалить тариф ${tariff?.name}?`}
            onConfirm={onConfirm}
        >
            <Button className="text-danger" icon={<DeleteOutlined />} loading={isLoading}></Button>
        </Popconfirm>
    );
}

export default DeleteTariffButton;