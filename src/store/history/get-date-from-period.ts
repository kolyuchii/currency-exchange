import { MAX_HISTORY_RATE_PERIOD, PERIODS_MAP } from 'config';

/**
 * @param {PERIODS_ENUM} period
 * @return {{start: string, end: string}}
 */
export default period => {
    const periodInDays = PERIODS_MAP[period] || MAX_HISTORY_RATE_PERIOD;
    const currentDate = new Date();
    return {
        start: getDate(
            new Date(currentDate.setDate(currentDate.getDate() - periodInDays))
        ),
        end: getDate(null),
    };
};

/**
 * @param {Date|null} date
 * @return {string}
 */
export function getDate(date) {
    const currentDate = date || new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${currentDate.getFullYear()}-${month}-${day}`;
}
