const CURRENCY = 'PHP'; // change this: 'USD', 'EUR', 'GBP', 'JPY', ...
const LOCALE = 'en-PH'; // controls number formatting, e.g. 'en-US', 'en-GB', 'de-DE'

export const currencyCode = CURRENCY;
export const money = (n) =>
    new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY }).format(n);
