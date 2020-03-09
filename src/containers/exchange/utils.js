import { CURRENCY_ID_TO_SIGN_MAP } from 'config';

/**
 * @param {string} currencyName
 * @param {string} value
 * @return {string}
 */
export function getCurrencySign(currencyName, value) {
    const sign = CURRENCY_ID_TO_SIGN_MAP[currencyName] || '';
    return `${sign}${value}`;
}

/**
 * @param {string} value
 * @return {string}
 */
export function parseValue(value) {
    value = String(value);
    value = value.replace(/[^\d.]/g, '');
    const arr = value.split('.');
    if (arr[1]) {
        arr[1] = arr[1].substr(0, 2);
    }
    return arr.join('.');
}

/**
 * @param {string} value
 * @param {string} currencyTo
 * @param {string} exchangeRates
 * @return {string}
 */
export function getValueFrom(value, currencyTo, exchangeRates) {
    return value ? (value / exchangeRates[currencyTo]).toFixed(2) : '';
}

/**
 * @param {string} value
 * @param {string} currencyTo
 * @param {string} exchangeRates
 * @return {string}
 */
export function getValueTo(value, currencyTo, exchangeRates) {
    return value ? (value * exchangeRates[currencyTo]).toFixed(2) : '';
}

/**
 * @param {string} currency
 * @param {object} pockets
 * @return {number}
 */
export function getBalance(currency, pockets) {
    const pocket = pockets[currency];
    if (pocket) {
        return Number(pocket.balance);
    }
    return 0;
}
