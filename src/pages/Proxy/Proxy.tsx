import { Table } from "antd";
import { getProxyDataSource, getProxyTableColumns } from "./utils/table";
import { TokenModel } from "../../models/Token.model";
import { useEffect, useState } from "react";
import { fetchProxy } from "../../requests/proxy";
import { EditProxyModal } from "./components/editProxy";
import { AddProxy } from "./components/addProxy";
import { ProxyData } from "./components/editProxy/EditProxy";

interface ProxyProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

const Proxy = ({ setToken }: ProxyProps) => {
    const [proxy, setProxy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProxy, setSelectedProxy] = useState<ProxyData | null>(null);

    useEffect(() => {
        fetchProxies(); 
    }, []);

    const fetchProxies = () => {
        setLoading(true);
        fetchProxy(setToken)
            .then((data) => {
                setProxy(data.data || []);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClick = (record: ProxyData) => {
        setSelectedProxy(record);
        setModalVisible(true);
    };

    const handlePatchSuccess = () => {
        fetchProxies(); 
        setModalVisible(false);
    };

    return (
        <div>
            <div className="mb-4 d-flex justify-content-end">
                <AddProxy setToken={setToken} proxy={proxy} onSuccess={fetchProxies} />
            </div>
            <Table
                bordered
                size="small"
                pagination={false}
                loading={loading}
                columns={getProxyTableColumns()} 
                dataSource={getProxyDataSource(proxy, handleClick, fetchProxies)} 
            />
            {modalVisible && selectedProxy !== null && (
                <>
                    {console.log("Selected Tariff:", selectedProxy)}
                    <EditProxyModal data={selectedProxy} onClose={() => setModalVisible(false)} onPatch={handlePatchSuccess} />
                </>
            )}
        </div>
    );
};

export default Proxy;
