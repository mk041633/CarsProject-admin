import { CategoryAliasEnum, SectionAlias, FlatBuildingEnum, MortgageEnum, FlatPrivDormEnum, FlatToiletEnum, FlatPhoneEnum, RentPeriodEnum, LiveFurnitureEnum, OfficeTypeEnum, OfficeRenovationEnum } from "../../../constants/enum";


export class FilterModel {
    _id!: string;
    chatId!: number;
    isActive = true;
    categoryAlias: CategoryAliasEnum = CategoryAliasEnum.KVARTIRY;
    sectionAlias: SectionAlias = SectionAlias.PRODAZHA;
    flatBuilding: FlatBuildingEnum = FlatBuildingEnum.DEFAULT;
    rooms: number | null = null;
    regionId: number | null = -1;
    districtId: number | null = -1;
    microdistrictId: number | null = -1;
    priceFrom: number | null = null;
    priceTo: number | null = null;
    hasPhoto: boolean | null = null;
    who: boolean | null = null;
    novostroiki: boolean | null = null;
    fromAgent: boolean | null = null;
    flatFloorFrom: number | null = null;
    flatFloorTo: number | null = null;
    floorNotLast: boolean | null = null;
    floorNotFirst: boolean | null = null;
    houseYearFrom: number | null = null;
    houseYearTo: number | null = null;
    liveSquareKitchenFrom: number | null = null;
    liveSquareKitchenTo: number | null = null;
    mortgage: MortgageEnum = MortgageEnum.DEFAULT;
    flatPrivDorm: FlatPrivDormEnum = FlatPrivDormEnum.DEFAULT;
    liveSquareLFrom: number | null = null;
    liveSquareLTo: number | null = null;
    hasChange: boolean | null = null;
    flatToilet: FlatToiletEnum = FlatToiletEnum.DEFAULT;
    flatPhone: FlatPhoneEnum = FlatPhoneEnum.DEFAULT;
    regionName = "Весь Казахстан";
    rentPeriod: RentPeriodEnum = RentPeriodEnum.MONTH;
    isOwner = false;
    liveFurniture: LiveFurnitureEnum = LiveFurnitureEnum.DEFAULT;
    officeType: OfficeTypeEnum = OfficeTypeEnum.DEFAULT;
    officeRenovation: OfficeRenovationEnum = OfficeRenovationEnum.DEFAULT;
    squareFrom: number | null = null;
    squareTo: number | null = null;
}