import React, { useState, useEffect } from "react";
import {  Table } from "antd";
import { getTarifTableColumns, getTariffDataSource } from "./utils/table"; // Import TariffData type
import { TokenModel } from "../../models/Token.model";
import { fetchTariffs } from "../../requests/tariff";
import EditTariffModal, { TariffData } from "./components/editTariff/EditTariff";
import { AddTarif } from "./components/addTariff";

interface TarifProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

const Tariff: React.FC<TarifProps> = ({ setToken }: TarifProps) => {
    const [tariff, setTariff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTariff, setSelectedTariff] = useState<TariffData | null>(null);
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false); // Add this state


    useEffect(() => {
        fetchTariff();
    }, []);

    const fetchTariff = () => {
        setLoading(true);
        fetchTariffs(setToken)
            .then((data) => {
                setTariff(data.data || []);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRowClick = (record: TariffData) => {
        setSelectedTariff(record);
        setModalVisible(true);
        setDeleteButtonClicked(false); 

    };

    const handlePatchSuccess = () => {
        fetchTariff(); 
        setModalVisible(false);
    };

    return (
        <div>
            <div className="mb-4 d-flex align-items-center justify-content-end">
                <AddTarif setToken={setToken} tariff={tariff} onSuccess={fetchTariff} />
            </div>
            <Table
                bordered
                size="small"
                pagination={false}
                loading={loading}
                columns={getTarifTableColumns()}
                dataSource={getTariffDataSource(tariff, fetchTariff, handleRowClick)}
                
            />
            {modalVisible && selectedTariff !== null && (
                <>
                    <EditTariffModal data={selectedTariff} onClose={() => setModalVisible(false)} onPatch={handlePatchSuccess} />
                </>
            )}
        </div>
    );
};

export default Tariff;

