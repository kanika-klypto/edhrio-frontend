const logoModules = import.meta.glob("../assets/Logos/*.svg", {
  eager: true,
  import: "default",
});

const LOGO_MAP = {};
for (const path in logoModules) {
  const filename = path.split("/").pop().replace(/\.svg$/i, "").toUpperCase();
  LOGO_MAP[filename] = logoModules[path];
}


const NAME_ALIASES = {
  "STATE BANK OF INDIA": "SBIN",
  "TATA CONSULTANCY SERVICES": "TCS",
  "LARSEN & TOUBRO": "LT",
  "LARSEN AND TOUBRO": "LT",
  "L&T": "LT",
  "HINDUSTAN UNILEVER": "HINDUNILVR",
  "BHARTI AIRTEL": "BHARTIARTL",
  "MARUTI SUZUKI": "MARUTI",
  "SUN PHARMACEUTICAL": "SUNPHARMA",
  "SUN PHARMA": "SUNPHARMA",
  "ASIAN PAINTS": "ASIANPAINT",
  "POWER GRID": "POWERGRID",
  "COAL INDIA": "COALINDIA",
  "INDIAN OIL": "IOC",
  "BHARAT PETROLEUM": "BPCL",
  "HINDUSTAN PETROLEUM": "HINDPETRO",
  "OIL & NATURAL GAS": "ONGC",
  "MAHINDRA & MAHINDRA": "M&M",
  "M & M": "M&M",
  "KOTAK MAHINDRA BANK": "KOTAKBANK",
  "AVENUE SUPERMARTS": "DMART",
  "ONE97 COMMUNICATIONS": "PAYTM",
  "INFOSYS": "INFY",
  "RELIANCE INDUSTRIES": "RELIANCE",
  "ULTRATECH CEMENT": "ULTRACEMCO",
  "DR REDDY": "DRREDDY",
  "DR. REDDY": "DRREDDY",
  "APOLLO HOSPITALS": "APOLLOHOSP",
  "TORRENT PHARMA": "TORNTPHARM",
  "TORRENT POWER": "TORNTPOWER",
  "CHOLAMANDALAM": "CHOLAFIN",
  "SHRIRAM FINANCE": "SHRIRAMFIN",
  "MUTHOOT FINANCE": "MUTHOOTFIN",
  "MAX FINANCIAL": "MFSL",
  "LIFE INSURANCE CORPORATION": "LICI",
  "HDFC LIFE": "HDFCLIFE",
  "SBI LIFE": "SBILIFE",
  "ICICI PRUDENTIAL": "ICICIPRULI",
  "ICICI LOMBARD": "ICICIGI",
  "INTERGLOBE AVIATION": "INDIGO",
  "INDIAN HOTELS": "INDHOTEL",
  "PIDILITE INDUSTRIES": "PIDILITIND",
  "DIVIS LABORATORIES": "DIVISLAB",
  "AUROBINDO PHARMA": "AUROPHARMA",
  "COLGATE PALMOLIVE": "COLPAL",
  "CROMPTON GREAVES": "CROMPTON",
  "CUMMINS INDIA": "CUMMINSIND",
  "DALMIA BHARAT": "DALBHARAT",
  "EXIDE INDUSTRIES": "EXIDEIND",
  "HINDALCO INDUSTRIES": "HINDALCO",
  "HINDUSTAN ZINC": "HINDZINC",
  "JINDAL STEEL": "JINDALSTEL",
  "JIO FINANCIAL": "JIOFIN",
  "JUBILANT FOODWORKS": "JUBLFOOD",
  "LAURUS LABS": "LAURUSLABS",
  "LIC HOUSING": "LICHSGFIN",
  "PERSISTENT SYSTEMS": "PERSISTENT",
  "PETRONET LNG": "PETRONET",
  "POWER FINANCE CORPORATION": "PFC",
  "PB FINTECH": "POLICYBZR",
  "RURAL ELECTRIFICATION": "RECLTD",
  "REC LIMITED": "RECLTD",
  "RAIL VIKAS NIGAM": "RVNL",
  "STEEL AUTHORITY OF INDIA": "SAIL",
  "SHREE CEMENT": "SHREECEM",
  "SUZLON ENERGY": "SUZLON",
  "TUBE INVESTMENTS": "TIINDIA",
  "UNITED SPIRITS": "UNITDSPR",
  "VEDANTA": "VEDL",
  "ZYDUS LIFESCIENCES": "ZYDUSLIFE",
  "HDFC BANK": "HDFCBANK",
  "ICICI BANK": "ICICIBANK",
  "AXIS BANK": "AXISBANK",
  "BANK OF BARODA": "BANKBARODA",
  "BANK OF INDIA": "BANKINDIA",
  "CANARA BANK": "CANBK",
  "UNION BANK": "UNIONBANK",
  "PUNJAB NATIONAL BANK": "PNB",
  "FEDERAL BANK": "FEDERALBNK",
  "BANDHAN BANK": "BANDHANBNK",
  "IDFC FIRST": "IDFCFIRSTB",
  "AU SMALL FINANCE": "AUBANK",
};

export const getStockLogo = (symbol, name, code) => {
  const candidates = [name, symbol, code]
    .filter(Boolean)
    .map((s) => String(s).trim().toUpperCase());

  for (const raw of candidates) {
    const clean = raw.replace(/-(EQ|BE|SM)$/, "").trim();
    const noSpaces = clean.replace(/[\s\.\-_]+/g, "");

    // 1. Direct match
    if (LOGO_MAP[clean]) return LOGO_MAP[clean];
    if (LOGO_MAP[noSpaces]) return LOGO_MAP[noSpaces];

    // 2. Alias lookup
    if (NAME_ALIASES[clean] && LOGO_MAP[NAME_ALIASES[clean]]) {
      return LOGO_MAP[NAME_ALIASES[clean]];
    }
    for (const [key, mappedSymbol] of Object.entries(NAME_ALIASES)) {
      if (clean.includes(key) && LOGO_MAP[mappedSymbol]) {
        return LOGO_MAP[mappedSymbol];
      }
    }

    if (clean === "POWERINDIA" && LOGO_MAP["ABB"]) return LOGO_MAP["ABB"];

    // 3. First word match (e.g. "CIPLA LIMITED" -> "CIPLA")
    const firstWord = clean.split(/\s+/)[0];
    if (firstWord && LOGO_MAP[firstWord]) {
      return LOGO_MAP[firstWord];
    }

    // 4. Brand group matching (ADANI, BAJAJ, TATA, GODREJ, JSW)
    if (clean.startsWith("ADANI") && LOGO_MAP["ADANI"]) {
      return LOGO_MAP["ADANI"];
    }
    if ((clean.startsWith("BAJAJ") || clean.startsWith("BAJ")) && LOGO_MAP["BAJAJ"]) {
      return LOGO_MAP["BAJAJ"];
    }
    if (clean.startsWith("TATA") && LOGO_MAP["TATA"]) {
      return LOGO_MAP["TATA"];
    }
    if (clean.startsWith("GODREJ") && LOGO_MAP["GODREJ"]) {
      return LOGO_MAP["GODREJ"];
    }
    if (clean.startsWith("JSW") && LOGO_MAP["JSW"]) {
      return LOGO_MAP["JSW"];
    }
  }
  return null;
};

export const getStockFullName = (stock, detailsList = []) => {
  if (!stock) return "";
  if (stock.fullName) return stock.fullName;
  if (stock.description) return stock.description;
  if (stock.companyName) return stock.companyName;

  if (Array.isArray(detailsList) && detailsList.length > 0) {
    const found = detailsList.find(
      (s) =>
        (s?.token && stock?.token && String(s.token) === String(stock.token)) ||
        (s?.symbol && stock?.symbol && String(s.symbol).toUpperCase() === String(stock.symbol).toUpperCase()) ||
        (s?.name && stock?.name && String(s.name).toUpperCase() === String(stock.name).toUpperCase())
    );
    if (found?.fullName) return found.fullName;
    if (found?.description) return found.description;
    if (found?.companyName) return found.companyName;
  }

  if (stock.name && stock.symbol && stock.name !== stock.symbol) return stock.name;
  return stock.fullName || stock.name || stock.symbol || "";
};
