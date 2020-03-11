import { CURRENCY_ID_TO_SIGN_MAP } from 'config';

export function getCurrencySign(currencyName: string, value: number): string {
    const sign = CURRENCY_ID_TO_SIGN_MAP[currencyName] || '';
    return `${sign}${value}`;
}

export function parseValue(value: string): number {
    if (Number(value) > Number.MAX_VALUE) {
        value = String(Number.MAX_VALUE);
    }
    value = value.replace(/[^\d.]/g, '');
    const arr = value.split('.');
    if (arr[1]) {
        arr[1] = arr[1].substr(0, 2);
    }
    return Number(arr.join('.'));
}

interface ExchangeRates {
    [key: string]: number;
}
export function getValueFrom(value: number, currencyTo: string, exchangeRates: ExchangeRates): string {
    return value ? (value / exchangeRates[currencyTo]).toFixed(2) : '';
}
export function getValueTo(value: number, currencyTo: string, exchangeRates: ExchangeRates): string {
    return value ? (value * exchangeRates[currencyTo]).toFixed(2) : '';
}

interface Pockets {
    [key: string]: {balance: number};
}
export function getBalance(currency: string, pockets: Pockets): number {
    const pocket = pockets[currency];
    if (pocket) {
        return Number(pocket.balance);
    }
    return 0;
}
