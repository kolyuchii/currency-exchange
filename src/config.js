export const DEFAULT_SYMBOLS = ['GBP', 'EUR', 'USD'];
export const CURRENCY_ID_TO_SIGN_MAP = {
    GBP: '£',
    EUR: '€',
    USD: '$',
};
export const GET_CURRENCIES_API_URL =
    'https://openexchangerates.org/api/currencies.json';
export const GET_RATES_API_URL = 'https://api.exchangeratesapi.io/latest?';
export const GET_HISTORY_RATES_API_URL =
    'https://api.exchangeratesapi.io/history';
export const POCKETS = {
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
export const FETCH_RATES_TIMEOUT = 10 * 1000;
export const MAX_HISTORY_RATE_PERIOD = 7;
export const PERIODS_ENUM = {
    WEEK: 1,
    MONTH: 2,
    THREE_MONTHS: 3,
    SIX_MONTHS: 4,
    YEAR: 5,
};
export const PERIODS_MAP = {
    [PERIODS_ENUM.WEEK]: 7,
    [PERIODS_ENUM.MONTH]: 30,
    [PERIODS_ENUM.THREE_MONTHS]: 90,
    [PERIODS_ENUM.SIX_MONTHS]: 180,
    [PERIODS_ENUM.YEAR]: 365,
};
