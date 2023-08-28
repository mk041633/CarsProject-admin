import { Card, Descriptions } from "antd";
import { useNavigate } from "react-router-dom";
import { FilterModel } from "../models/Filter.model";
import { FilterService } from "../utils/filter.service";
import { SERVICE_URL } from "../../../config";

export interface FilterItemProps {
    index?: number;
    data: FilterModel;
}

const FilterItem = ({ data }: FilterItemProps): JSX.Element => {
    const filterService = new FilterService(data);
    const navigate = useNavigate();

    const openFilter = () => {
        navigate(`${SERVICE_URL}/admin/filter/${data.chatId}`);
    };

    return (
        <Card onClick={openFilter} className={`border rounded shadow cursor-pointer m-1 w-100`}>
            <div className="d-flex align-items-center justify-content-between">
                {filterService.getSectionAndCategory()}

                <div
                    style={{ fontSize: 12, width: 85 }}
                    className={`text-center border rounded px-1 text-${data.isActive ? "success" : "danger"} border-${
                        data.isActive ? "success" : "danger"
                    }`}
                >
                    {data.isActive ? "Активен" : "Не активен"}
                </div>
            </div>
            <div style={{ fontWeight: 400, fontSize: 12 }} className="text-secondary">
                {data.regionName}
            </div>
            {filterService.getYear()}
            {filterService.getPrice()}
            <Descriptions className="m-0 p-0 mt-3 w-100" style={{}} column={1}>
                {filterService.getFlatToilet()}
                {filterService.getFlatPrivDorm()}
                {/* {filterService.getMortgage()} */}
                {filterService.getFlatBuilding()}
                {filterService.getFloor()}
                {filterService.getOwner()}
                {filterService.getLiveSquare()}
                {filterService.getLiveFurniture()}
                {filterService.getOfficeType()}
                {filterService.getOfficeRenovation()}
            </Descriptions>
        </Card>
    );
};

export default FilterItem;