export const DEFAULT_SYMBOLS: string[] = ['GBP', 'EUR', 'USD'];
export const CURRENCY_ID_TO_SIGN_MAP: {[key: string]: string} = {
    GBP: '£',
    EUR: '€',
    USD: '$',
};
export const GET_CURRENCIES_API_URL: string =
    'https://openexchangerates.org/api/currencies.json';
export const GET_RATES_API_URL: string = 'https://api.exchangeratesapi.io/latest?';
export const GET_HISTORY_RATES_API_URL: string =
    'https://api.exchangeratesapi.io/history';
export const POCKETS: {[key: string]: {balance: number}} = {
    GBP: {
        balance: 1000,
    },
    EUR: {
        balance: 0,
    },
    USD: {
        balance: 10,
    },
};
export const FETCH_RATES_TIMEOUT: number = 10 * 1000;
export const MAX_HISTORY_RATE_PERIOD: number = 7;
export const PERIODS_ENUM: {[key: string]: string} = {
    WEEK: '1w',
    MONTH: '1m',
    THREE_MONTHS: '3m',
    SIX_MONTHS: '6m',
    YEAR: '1y',
};
export const PERIODS_MAP: {[key: string]: number} = {
    [PERIODS_ENUM.WEEK]: 7,
    [PERIODS_ENUM.MONTH]: 30,
    [PERIODS_ENUM.THREE_MONTHS]: 90,
    [PERIODS_ENUM.SIX_MONTHS]: 180,
    [PERIODS_ENUM.YEAR]: 365,
};

export const ERRORS: {[key: string]: string} = {
    oops: 'Oops! Something went wrong.',
};
