export enum SectionAlias {
    "PRODAZHA" = "PRODAZHA",
    "ARENDA" = "ARENDA",
}

export enum CategoryAliasEnum {
    "KVARTIRY" = "KVARTIRY",
    "OFISA" = "OFISA",
}

export enum FlatBuildingEnum {
    "DEFAULT" = "",
    "BRICK" = "BRICK", // Кирпичный
    "PANEL" = "PANEL", // Панельный
    "MONOLITHIC" = "MONOLITHIC", // Монолитный
    "OTHER" = "OTHER",
}

export enum FlatPrivDormEnum { // Бывшее общежитие
    "DEFAULT" = "",
    "YES" = "YES",
    "NO" = "NO",
}

export enum FlatToiletEnum { // Санузел
    "DEFAULT" = "",
    "SEPARATED" = "SEPARATED", // разделенный
    "COMBINED" = "COMBINED", // комбинированный
    "TWO_OR_MORE" = "TWO_OR_MORE", // 2 или более
    "COURTYARD" = "COURTYARD", // во дворе
}

export enum FlatPhoneEnum { // Телефон
    "DEFAULT" = "",
    "SEPERATE" = "SEPERATE",
    "BLOCKER" = "BLOCKER",
    "POSSIBLE_TO_CONNECT" = "POSSIBLE_TO_CONNECT",
    "NO" = "NO",
}

export enum MortgageEnum { // Залог
    "DEFAULT" = "",
    "YES" = "YES",
    "NO" = "NO",
}

export enum FlatRenovationEnum { // Состояние
    "DEFAULT" = "",
    "GOOD" = "GOOD",
    "MIDDLE" = "MIDDLE",
    "NEEDS_REPAIR" = "NEEDS_REPAIR", // требует ремонта
    "FREE_LAYOUT" = "FREE_LAYOUT", // свободная планировка
    "ROUGH_FINISH" = "ROUGH_FINISH", // черновая отделка
    "NOT_COMPLETED" = "NOT_COMPLETED",
}

export enum RentPeriodEnum {
    "DEFAULT" = "",
    "MONTH" = "MONTH",
    "POSUTOCHNO" = "POSUTOCHNO",
    "PO_CHASAM" = "PO_CHASAM",
}

export enum LiveFurnitureEnum {
    "DEFAULT" = "",
    "FULLY" = "FULLY",
    "PARTIALLY" = "PARTIALLY",
    "WITHOUT" = "WITHOUT",
}

export enum OfficeTypeEnum {
    "BUSINESS_CENTER" = "BUSINESS_CENTER",
    "ADMINISTRATIVE_BUILDING" = "ADMINISTRATIVE_BUILDING",
    "RESIDENTIAL_BUILDING" = "RESIDENTIAL_BUILDING",
    "COTTAGE" = "COTTAGE",
    "OTHER" = "OTHER",
    "DEFAULT" = "",
}

export enum OfficeRenovationEnum {
    "GOOD" = "GOOD",
    "AVERAGE" = "AVERAGE",
    "NEEDS_REPAIR" = "NEEDS_REPAIR",
    "FREE_LAYOUT" = "FREE_LAYOUT",
    "ROUGH_FINISH" = "ROUGH_FINISH",
    "DEFAULT" = "",
}