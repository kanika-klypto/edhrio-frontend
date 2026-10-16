const logoModules = import.meta.glob("../assets/Logos/*.svg", {
  eager: true,
  import: "default",
});

const LOGO_MAP = {};
for (const path in logoModules) {
  const filename = path.split("/").pop().replace(/\.svg$/i, "").toUpperCase();
  LOGO_MAP[filename] = logoModules[path];
}


export const getStockLogo = (symbol, name, code) => {
  const candidates = [name, symbol, code]
    .filter(Boolean)
    .map((s) => String(s).trim().toUpperCase());

  for (const raw of candidates) {
    const clean = raw.replace(/-(EQ|BE|SM)$/, "");

    // 1. Direct or alias match
    if (LOGO_MAP[clean]) return LOGO_MAP[clean];
    if (clean === "POWERINDIA" && LOGO_MAP["ABB"]) return LOGO_MAP["ABB"];

    // 2. Brand group matching (ADANI, BAJAJ, TATA)
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
