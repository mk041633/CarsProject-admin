import { Descriptions } from "antd";

import { currencyFormat } from "../../../utils/format";
import { OFFICE_RENOVAtiON_OPTIONS, OFFICE_TYPE_OPTIONS } from "../constants/options";
import { FilterModel } from "../models/Filter.model";
import { SectionAlias, RentPeriodEnum, CategoryAliasEnum, LiveFurnitureEnum, FlatToiletEnum, FlatPrivDormEnum, MortgageEnum, FlatBuildingEnum } from "../../../constants/enum";

export class FilterService {
    private readonly filter: FilterModel;

    constructor(filter: FilterModel) {
        this.filter = filter;
    }

    public getRegionName(): JSX.Element {
        let text = "Весь Казахстан";

        if (this.filter.microdistrictId) {
            text = this.filter.microdistrictId + "";
        } else if (this.filter.districtId) {
            text = this.filter.districtId + "";
        } else if (this.filter.regionId) {
            text = this.filter.regionId + "";
        }

        return <div style={{ fontWeight: 700 }}>{text}</div>;
    }

    public getPrice(): JSX.Element {
        let text = "";

        if (this.filter.priceFrom) {
            text += `от ${currencyFormat(this.filter.priceFrom)}`;
        }
        if (this.filter.priceFrom && this.filter.priceTo) {
            text += ` - `;
        }
        if (this.filter.priceTo) {
            text += `до ${currencyFormat(this.filter.priceTo)}`;
        }

        if (!text) {
            return <></>;
        }

        return (
            <div className="mt-0" style={{ fontSize: 12 }}>
                {text}
            </div>
        );
    }

    public getSectionAndCategory(): JSX.Element {
        let section = `Купить`;
        if (SectionAlias.ARENDA === this.filter.sectionAlias) {
            section = "Арендовать";
        }
        let category = `квартиру`;

        let rentPeriod = "";
        if (SectionAlias.ARENDA === this.filter.sectionAlias) {
            if (RentPeriodEnum.MONTH === this.filter.rentPeriod) {
                rentPeriod = `помесячно`;
            } else if (RentPeriodEnum.POSUTOCHNO === this.filter.rentPeriod) {
                rentPeriod = `посуточно`;
            } else if (RentPeriodEnum.PO_CHASAM === this.filter.rentPeriod) {
                rentPeriod = `по часам`;
            }
        }
        if (CategoryAliasEnum.OFISA === this.filter.categoryAlias) {
            category = "офис";
        }

        const text = `${section} ${category} ${rentPeriod}`;

        return (
            <div className="mt-0 me-3" style={{ fontSize: 15, fontWeight: 700 }}>
                {text}
            </div>
        );
    }

    public getYear(): JSX.Element {
        let year = ``;

        if (this.filter.houseYearFrom) {
            year += `с ${this.filter.houseYearFrom} г`;
        }
        if (this.filter.houseYearTo) {
            year += ` по ${this.filter.houseYearTo} г`;
        }

        if (!year) {
            return <></>;
        }

        return (
            <div className="mt-0 text-secondary" style={{ fontSize: 12 }}>
                {year}
            </div>
        );
    }

    public getLiveSquare(): JSX.Element {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }

        const label = "Площадь, м²";

        let text = "";

        if (this.filter.liveSquareLFrom) {
            text += `от ${currencyFormat(this.filter.liveSquareLFrom, false)}`;
        }
        if (this.filter.liveSquareLFrom && this.filter.liveSquareLTo) {
            text += ` - `;
        }
        if (this.filter.liveSquareLTo) {
            text += `до ${currencyFormat(this.filter.liveSquareLTo, false)}`;
        }
        if (!text) {
            text = "Не важно";
        }

        if (!text) {
            text = "Не важно";
        }

        return this.getDescriptionItem(label, text);
    }

    public getLiveFurniture(): JSX.Element {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }

        if (this.filter.sectionAlias !== SectionAlias.ARENDA) {
            return <></>;
        }

        const label = "Квартира меблирована";
        let text = "Не важно";

        if (this.filter.liveFurniture === LiveFurnitureEnum.FULLY) {
            text = "Полностью";
        } else if (this.filter.liveFurniture === LiveFurnitureEnum.PARTIALLY) {
            text = "Частично";
        } else if (this.filter.liveFurniture === LiveFurnitureEnum.WITHOUT) {
            text = "Без мебели";
        }

        return this.getDescriptionItem(label, text);
    }

    public getFlatToilet(): JSX.Element {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }
        if (this.filter.sectionAlias !== SectionAlias.PRODAZHA) {
            return <></>;
        }

        const label = "Санузел";
        let value = "Не важно";
        if (this.filter.flatToilet === FlatToiletEnum.COMBINED) {
            value = "Комбинированный";
        } else if (this.filter.flatToilet === FlatToiletEnum.COURTYARD) {
            value = "Нет";
        } else if (this.filter.flatToilet === FlatToiletEnum.SEPARATED) {
            value = "Разделенный";
        } else if (this.filter.flatToilet === FlatToiletEnum.TWO_OR_MORE) {
            value = "2 с/у и более";
        }

        return this.getDescriptionItem(label, value);
    }

    public getFlatPrivDorm(): JSX.Element {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }
        if (SectionAlias.PRODAZHA !== this.filter.sectionAlias) {
            return <></>;
        }

        const label = "Бывшее общежитие";
        let value = "Не важно";
        if (this.filter.flatPrivDorm === FlatPrivDormEnum.YES) {
            value = "Да";
        } else if (this.filter.flatPrivDorm === FlatPrivDormEnum.NO) {
            value = "Нет";
        }

        return this.getDescriptionItem(label, value);
    }

    public getMortgage() {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }
        if (this.filter.sectionAlias !== SectionAlias.PRODAZHA) {
            return <></>;
        }

        const label = "В залоге";
        let value = "Не важно";
        if (this.filter.mortgage === MortgageEnum.YES) {
            value = "Да";
        } else if (this.filter.mortgage === MortgageEnum.NO) {
            value = "Нет";
        }

        return this.getDescriptionItem(label, value);
    }

    public getFloor(): JSX.Element {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }

        const label = "Этаж";

        let text = "";

        if (this.filter.flatFloorFrom) {
            text += `от ${currencyFormat(this.filter.flatFloorFrom, false)}`;
        }
        if (this.filter.flatFloorFrom && this.filter.flatFloorTo) {
            text += ` - `;
        }
        if (this.filter.flatFloorTo) {
            text += `до ${currencyFormat(this.filter.flatFloorTo, false)}`;
        }
        if (!text) {
            text = "Не важно";
        }

        return this.getDescriptionItem(label, text);
    }

    public getOwner(): JSX.Element {
        const label = "От хозяев";
        let value = "Не важно";

        if (this.filter.isOwner) {
            value = "Да";
        }

        return this.getDescriptionItem(label, value);
    }

    public getFlatBuilding(): JSX.Element {
        if (this.filter.categoryAlias !== CategoryAliasEnum.KVARTIRY) {
            return <></>;
        }
        if (this.filter.sectionAlias !== SectionAlias.PRODAZHA) {
            return <></>;
        }

        const label = "Тип строения";
        let value = "Не важно";
        if (this.filter.flatBuilding === FlatBuildingEnum.BRICK) {
            value = "Кирпичный";
        } else if (this.filter.flatBuilding === FlatBuildingEnum.MONOLITHIC) {
            value = "Монолитный";
        } else if (this.filter.flatBuilding === FlatBuildingEnum.OTHER) {
            value = "Иное";
        } else if (this.filter.flatBuilding === FlatBuildingEnum.PANEL) {
            value = "Панельный";
        }

        return this.getDescriptionItem(label, value);
    }

    public getOfficeType() {
        if (this.filter.categoryAlias !== CategoryAliasEnum.OFISA) {
            return <></>;
        }

        const label = "Тип офиса";
        let value = "Не важно";
        const foundOption = OFFICE_TYPE_OPTIONS.find((v: any) => v.value === this.filter.officeType);
        if (foundOption) {
            value = foundOption.label;
        }

        return this.getDescriptionItem(label, value);
    }

    public getOfficeRenovation() {
        if (this.filter.categoryAlias !== CategoryAliasEnum.OFISA) {
            return <></>;
        }

        const label = "Состояние";
        let value = "Не важно";
        const foundOption = OFFICE_RENOVAtiON_OPTIONS.find((v: any) => v.value === this.filter.officeRenovation);
        if (foundOption) {
            value = foundOption.label;
        }

        return this.getDescriptionItem(label, value);
    }

    private getDescriptionItem(label: string, description: string) {
        return (
            <Descriptions.Item
                label={
                    <div style={{ fontSize: 12 }} className="text-secondary">
                        {label}
                    </div>
                }
                className="m-0 p-0"
            >
                <div className="w-100 d-flex justify-content-end" style={{ fontSize: 12, fontWeight: 600 }}>
                    {description}
                </div>
            </Descriptions.Item>
        );
    }
}
