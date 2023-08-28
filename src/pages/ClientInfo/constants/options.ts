import { SectionAlias, CategoryAliasEnum, RentPeriodEnum, FlatBuildingEnum, OfficeTypeEnum, OfficeRenovationEnum } from "../../../constants/enum";

export const ACTIVATION_TYPE_OPTIONS = [
    {
        value: "month",
        label: "Месяц",
    },
    {
        value: "week",
        label: "Неделя",
    },
    {
        value: "day",
        label: "День",
    },
];

export const SEGMENTED_OPTIONS = [
    {
        label: "Арендовать",
        value: SectionAlias.ARENDA,
    },
    {
        label: "Купить",
        value: SectionAlias.PRODAZHA,
    },
];

export const CATEGORY_ALIAS_OPTIONS = [
    {
        label: "Квартиры",
        value: CategoryAliasEnum.KVARTIRY,
    },
    {
        label: "Офисы",
        value: CategoryAliasEnum.OFISA,
    },
];

export const RENT_PERIOD_OPTIONS = [
    {
        label: "Помесячно",
        value: RentPeriodEnum.MONTH,
    },
    // {
    //   label: "Посуточно",
    //   value: RentPeriodEnum.POSUTOCHNO,
    // },
    // {
    //   label: "По часам",
    //   value: RentPeriodEnum.PO_CHASAM,
    // },
];

export const RENT_BUILDING_OPTIONS = [
    {
        label: "Не важно",
        value: "",
    },
    {
        label: "Кирпичный",
        value: FlatBuildingEnum.BRICK,
    },
    {
        label: "Панельный",
        value: FlatBuildingEnum.PANEL,
    },
    {
        label: "Монолитный",
        value: FlatBuildingEnum.MONOLITHIC,
    },
    {
        label: "Иное",
        value: FlatBuildingEnum.OTHER,
    },
];

export const FLAT_TOILET_OPTIONS = [
    {
        label: "Не важно",
        value: "",
    },
    {
        label: "Раздельный",
        value: "SEPARATED",
    },
    {
        label: "Совмещенный",
        value: "COMBINED",
    },
    {
        label: "2 с/у и более",
        value: "TWO_OR_MORE",
    },
    {
        label: "Нет",
        value: "COURTYARD",
    },
];

export const FLAT_PRIV_DORM_OPTIONS = [
    {
        label: "Не важно",
        value: "",
    },
    {
        label: "Да",
        value: "YES",
    },
    {
        label: "Нет",
        value: "NO",
    },
];

export const LIVE_FURNITURE_OPTIONS = [
    {
        label: "Не важно",
        value: "",
    },
    {
        label: "Полностью",
        value: "FULLY",
    },
    {
        label: "Частично",
        value: "PARTIALLY",
    },
    {
        label: "Без мебели",
        value: "WITHOUT",
    },
];

export const OFFICE_TYPE_OPTIONS = [
    {
        label: "Не важно",
        value: OfficeTypeEnum.DEFAULT,
    },
    {
        label: "В бизнес-центре",
        value: OfficeTypeEnum.BUSINESS_CENTER,
    },
    {
        label: "В административном здании",
        value: OfficeTypeEnum.ADMINISTRATIVE_BUILDING,
    },
    {
        label: "В жилом доме",
        value: OfficeTypeEnum.RESIDENTIAL_BUILDING,
    },
    {
        label: "В коттедже",
        value: OfficeTypeEnum.COTTAGE,
    },
    {
        label: "Иное",
        value: OfficeTypeEnum.OTHER,
    },
];

export const OFFICE_RENOVAtiON_OPTIONS = [
    {
        label: "Не важно",
        value: OfficeRenovationEnum.DEFAULT,
    },
    {
        label: "Хорошее",
        value: OfficeRenovationEnum.GOOD,
    },
    {
        label: "Среднее",
        value: OfficeRenovationEnum.AVERAGE,
    },
    {
        label: "Требует ремонта",
        value: OfficeRenovationEnum.NEEDS_REPAIR,
    },
    {
        label: "Свободная планировка",
        value: OfficeRenovationEnum.FREE_LAYOUT,
    },
    {
        label: "Черновая отделка",
        value: OfficeRenovationEnum.ROUGH_FINISH,
    },
];
