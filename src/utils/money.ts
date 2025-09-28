import { currencyConfig } from "@/configs";
import { isEmpty } from "./is-empty";

type ConvertToLocaleParams = {
  amount: number;
  currency_code?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

export const convertToLocale = ({
  amount,
  currency_code = currencyConfig.currency,
  minimumFractionDigits = currencyConfig.minimumFractionDigits,
  maximumFractionDigits = currencyConfig.maximumFractionDigits,
  locale = currencyConfig.locale,
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
};
