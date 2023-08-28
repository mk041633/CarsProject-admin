export const formatStringToDate = (str: string): Date => {
    const arr = str.split(".");

    const day = parseInt(arr[0]);
    const month = parseInt(arr[1]);
    const year = parseInt(arr[2]);

    return new Date(year, month, day);
};

export const formatCurrencyRegEx = () => {
    return /\B(?=(\d{3})+(?!\d))/g;
};

export const parserCurrencyRegEx = () => {
    return /\$\s?|( *)/g;
};

export const currencyFormat = (num: number, w = true): string => {
    try {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
        });

        const result = formatter.format(num).replace(/,/g, " ");

        return result + (w ? " ₸" : "");
    } catch (e) {
        return `0 ${w ? " ₸" : ""}`;
    }
};

export const toDateFormat = (date: string): string => {
    switch(date){
        case 'Сегодня':
            return 'today'
        case 'Вчера':
            return 'yesterday'
        case 'Неделя':
            return 'week'
        case 'Месяц':
            return 'month'
        default:
            return 'all'
    }
};