import {CURRENCY_ID_TO_SIGN_MAP} from "config";

export default (currencyName, value) => {
    const sign = CURRENCY_ID_TO_SIGN_MAP[currencyName] || '';
    return `${sign}${value}`;
}