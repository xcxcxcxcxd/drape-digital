import React, { createContext, useContext, useState, useEffect } from "react";
import countryToCurrency from "country-to-currency";
import getSymbolFromCurrency from "currency-symbol-map";

interface CurrencyContextType {
  country: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number;
  formatPrice: (usdAmount: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
  country: "US",
  currencyCode: "USD",
  currencySymbol: "$",
  exchangeRate: 1,
  formatPrice: (usdAmount: number) => `$${usdAmount.toLocaleString()}`,
  isLoading: true,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState("US");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCurrency = async () => {
      try {
        // 1. Get user country
        const geoRes = await fetch("/api/geo");
        const geoData = await geoRes.json();
        const detectedCountry = geoData.country || "US";
        setCountry(detectedCountry);

        // 2. Map country to currency code
        const detectedCurrencyCode = countryToCurrency[detectedCountry as keyof typeof countryToCurrency] || "USD";
        setCurrencyCode(detectedCurrencyCode);
        setCurrencySymbol(getSymbolFromCurrency(detectedCurrencyCode) || "$");

        // 3. Get exchange rate (USD base)
        if (detectedCurrencyCode !== "USD") {
          const ratesRes = await fetch("https://open.er-api.com/v6/latest/USD");
          const ratesData = await ratesRes.json();
          if (ratesData && ratesData.rates && ratesData.rates[detectedCurrencyCode]) {
            setExchangeRate(ratesData.rates[detectedCurrencyCode]);
          }
        }
      } catch (error) {
        console.error("Failed to initialize currency:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initCurrency();
  }, []);

  const formatPrice = (usdAmount: number) => {
    const convertedAmount = Math.round(usdAmount * exchangeRate);
    // Format nicely based on local rules
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        country,
        currencyCode,
        currencySymbol,
        exchangeRate,
        formatPrice,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
