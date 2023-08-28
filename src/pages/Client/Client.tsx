import { Table, Pagination,Button,Input} from "antd";
import { useEffect,SetStateAction, useState } from "react";
import { TokenModel } from "../../models/Token.model";
import { fetchClients } from "../../requests/client";
import { getClientColumns, getClientDataSource } from "./utils/table";
import { SearchOutlined } from "@ant-design/icons";

interface ClientProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
}

const Client = ({ setToken }: ClientProps): JSX.Element => {
    const [loading, setIsLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPage, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch();
    }, [currentPage,limitPage]);

    const handlePageChange = (newPage: number,pageSizeOptions: SetStateAction<number>) => {
        setCurrentPage(newPage);
        setLimit(pageSizeOptions);
    };

    const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
          fetch(); 
        }
      };

    const fetch = () => {
        setIsLoading(true);

        fetchClients(setToken, currentPage,limitPage, searchTerm)
            .then((data) => {
                setClients(data.data.data || []);
                setTotalCount(data.data.totalCount || 0);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
            <h3 className="mb-4">Кол-во: {clients.length}</h3>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                            <Input
                                    type="text"
                                    placeholder="Поиск..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress} 
                                    style={{ marginRight: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                            />
                            <Button
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    onClick={fetch}
                                >
                                    Поиск
                            </Button>
                </div>
                </div>

            <div style={{ overflow: "auto" }}>
                <Table
                    pagination={false}
                    bordered
                    loading={loading}
                    size="small"
                    columns={getClientColumns()}
                    dataSource={getClientDataSource(clients)}
                />
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Pagination
                     
                    current={currentPage}
                    pageSize={limitPage}
                    onChange={handlePageChange}
                    pageSizeOptions = {[10, 20, 50]}
                    total={totalCount}
                    showSizeChanger={true}
                />
            </div>
        </div>
    );
};

export default Client;
