import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Currency configuration
interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Conversion rate from XOF (base currency)
  locale: string;
  decimals: number;
}

const currencyConfigs: Record<string, CurrencyConfig> = {
  XOF: {
    code: "XOF",
    symbol: "F CFA",
    name: "Franc CFA",
    rate: 1,
    locale: "fr-CI",
    decimals: 0,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rate: 0.00152, // 1 XOF ≈ 0.00152 EUR (1 EUR ≈ 656 XOF)
    locale: "fr-FR",
    decimals: 2,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "Dollar américain",
    rate: 0.00165, // 1 XOF ≈ 0.00165 USD (1 USD ≈ 606 XOF)
    locale: "en-US",
    decimals: 2,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "Livre sterling",
    rate: 0.00131, // 1 XOF ≈ 0.00131 GBP
    locale: "en-GB",
    decimals: 2,
  },
};

// Country to currency mapping
const countryCurrencyMap: Record<string, string> = {
  // West Africa (FCFA zone)
  CI: "XOF", // Côte d'Ivoire
  SN: "XOF", // Sénégal
  ML: "XOF", // Mali
  BF: "XOF", // Burkina Faso
  NE: "XOF", // Niger
  TG: "XOF", // Togo
  BJ: "XOF", // Bénin
  GW: "XOF", // Guinée-Bissau
  // Central Africa (FCFA zone)
  CM: "XOF", // Cameroun
  TD: "XOF", // Tchad
  CF: "XOF", // République centrafricaine
  CG: "XOF", // Congo
  GA: "XOF", // Gabon
  GQ: "XOF", // Guinée équatoriale
  // Europe (Euro zone)
  FR: "EUR", // France
  DE: "EUR", // Allemagne
  IT: "EUR", // Italie
  ES: "EUR", // Espagne
  PT: "EUR", // Portugal
  BE: "EUR", // Belgique
  NL: "EUR", // Pays-Bas
  AT: "EUR", // Autriche
  LU: "EUR", // Luxembourg
  IE: "EUR", // Irlande
  FI: "EUR", // Finlande
  GR: "EUR", // Grèce
  MT: "EUR", // Malte
  CY: "EUR", // Chypre
  SK: "EUR", // Slovaquie
  SI: "EUR", // Slovénie
  EE: "EUR", // Estonie
  LV: "EUR", // Lettonie
  LT: "EUR", // Lituanie
  // UK
  GB: "GBP",
  // USA and USD countries
  US: "USD",
  CA: "USD", // Using USD for simplicity
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  countryCode: string;
  isLoading: boolean;
  formatPrice: (priceInXOF: number) => string;
  convertPrice: (priceInXOF: number) => number;
  setCurrency: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(currencyConfigs.XOF);
  const [countryCode, setCountryCode] = useState<string>("CI");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get location from IP
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(3000),
        });
        
        if (response.ok) {
          const data = await response.json();
          const detectedCountry = data.country_code || "CI";
          setCountryCode(detectedCountry);
          
          const currencyCode = countryCurrencyMap[detectedCountry] || "XOF";
          setCurrencyState(currencyConfigs[currencyCode] || currencyConfigs.XOF);
        }
      } catch (error) {
        console.log("Could not detect location, using default (XOF)");
        // Default to XOF (Côte d'Ivoire)
        setCountryCode("CI");
        setCurrencyState(currencyConfigs.XOF);
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we have a stored preference
    const storedCurrency = localStorage.getItem("preferred_currency");
    if (storedCurrency && currencyConfigs[storedCurrency]) {
      setCurrencyState(currencyConfigs[storedCurrency]);
      setIsLoading(false);
    } else {
      detectLocation();
    }
  }, []);

  const setCurrency = (code: string) => {
    if (currencyConfigs[code]) {
      setCurrencyState(currencyConfigs[code]);
      localStorage.setItem("preferred_currency", code);
    }
  };

  const convertPrice = (priceInXOF: number): number => {
    return priceInXOF * currency.rate;
  };

  const formatPrice = (priceInXOF: number): string => {
    const convertedPrice = convertPrice(priceInXOF);
    
    if (currency.code === "XOF") {
      // Format for FCFA without Intl to get cleaner output
      return `${Math.round(convertedPrice).toLocaleString("fr-FR")} F CFA`;
    }
    
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: currency.decimals,
      maximumFractionDigits: currency.decimals,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        countryCode,
        isLoading,
        formatPrice,
        convertPrice,
        setCurrency,
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

// Available currencies for manual selection
export const availableCurrencies = Object.values(currencyConfigs);
