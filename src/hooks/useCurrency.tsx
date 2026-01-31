import { createContext, useContext, ReactNode } from "react";

// Currency configuration - XOF only
interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  locale: string;
  decimals: number;
}

const xofCurrency: CurrencyConfig = {
  code: "XOF",
  symbol: "F CFA",
  name: "Franc CFA",
  locale: "fr-CI",
  decimals: 0,
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const formatPrice = (price: number): string => {
    return `${Math.round(price).toLocaleString("fr-FR")} F CFA`;
  };

  const convertPrice = (price: number): number => {
    return price; // No conversion needed
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: xofCurrency,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

// For compatibility - no longer used
export const availableCurrencies = [xofCurrency];
