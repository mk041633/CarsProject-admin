import { Descriptions } from "antd";

interface ClientDescriptionProps {
    client: any;
}

const ClientDescription = ({ client }: ClientDescriptionProps): JSX.Element => {
    return (
        <div>
            <h3>
                {client?.firstName} {client?.username ? `(${client?.username})` : ""}
            </h3>
            <Descriptions column={1}>
                <Descriptions.Item label="Номер телефона">{client?.phone}</Descriptions.Item>
                <Descriptions.Item label="Дата регистрации">{new Date(client?.createdAt).toLocaleString()}</Descriptions.Item>
                <Descriptions.Item label="Активен до">{new Date(client?.expireDate).toLocaleString()}</Descriptions.Item>
                {client?.isBlocked && (
                    <Descriptions.Item>
                        <h3 className="text-danger m-0">В блоке</h3>
                    </Descriptions.Item>
                )}
            </Descriptions>
        </div>
    );
};

export default ClientDescription;
