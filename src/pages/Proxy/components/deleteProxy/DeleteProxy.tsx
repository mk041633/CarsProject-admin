import { useState } from "react";
import { deleteProxy } from "../../../../requests/proxy";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteProxyButton = ({proxy,onDelete}: {proxy: any; onDelete: () => void}): JSX.Element =>{
    const [isLoading,setIsLoading] = useState(false);

    const onConfirm = () => {
        setIsLoading(true);

        deleteProxy(proxy._id)
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
            description={`Вы точно хотите удалить прокси ${proxy?.login}?`}
            onConfirm={onConfirm}
        >
            <Button className="text-danger" icon={<DeleteOutlined />} loading={isLoading}></Button>
        </Popconfirm>
    );
}

export default DeleteProxyButton;