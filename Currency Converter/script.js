
"use strict";

/* =========================================
   1. API CONFIGURATION
========================================= */

const API_URL =
  "https://currency-converter-api.manasmanikya.workers.dev";


/* =========================================
   2. HTML ELEMENTS
========================================= */

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertButton = document.getElementById("convert-button");
const swapButton = document.getElementById("swap-button");
const resetButton = document.getElementById("reset-button");
const refreshButton = document.getElementById("refresh-button");

const resultElement = document.getElementById("result");
const rateInfo = document.getElementById("rate-info");
const messageElement = document.getElementById("message");
const statusElement = document.getElementById("api-status");
const updatedTime = document.getElementById("updated-time");


/* =========================================
   3. APPLICATION STATE
========================================= */

let exchangeRates = null;
let isLoading = false;


/* =========================================
   4. MESSAGE AND STATUS
========================================= */

function showMessage(message, type = "error") {
  messageElement.textContent = message;

  messageElement.className =
    type === "success" ? "message success" : "message";
}

function setStatus(message, type) {
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
}


/* =========================================
   5. NUMBER FORMATTING
========================================= */

function formatNumber(value, currencyCode) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 4
    }).format(value);

  } catch (error) {
    return `${value.toLocaleString("en-US", {
      maximumFractionDigits: 4
    })} ${currencyCode}`;
  }
}


/* =========================================
   6. API ERROR HANDLING
========================================= */

function getApiErrorMessage(errorType) {

  const errors = {
    "invalid-key":
      "Invalid API key. Please check your API key.",

    "inactive-account":
      "Your API account is inactive. Please verify your email.",

    "quota-reached":
      "API request limit reached. Check your subscription.",

    "unsupported-code":
      "The selected currency is not supported.",

    "malformed-request":
      "Invalid API request.",

    "plan-upgrade-required":
      "Your API plan does not support this request."
  };

  return errors[errorType] ||
    `API error: ${errorType || "Unknown error"}`;
}


/* =========================================
   7. LOAD CURRENCIES FROM API
========================================= */

async function loadCurrencies() {

  if (isLoading) return;

  isLoading = true;

  convertButton.disabled = true;
  refreshButton.disabled = true;
  swapButton.disabled = true;
  resetButton.disabled = true;

  setStatus("Loading rates...", "loading");

  showMessage("Connecting to ExchangeRate-API...");

  try {

    const response = await fetch(API_URL, {
      method: "GET",
      cache: "no-store"
    });

    let data;

    try {
      data = await response.json();

    } catch {
      throw new Error(
        "Invalid response received from the currency API."
      );
    }

    // Check HTTP response.
    if (!response.ok) {

      throw new Error(
        data["error-type"]
          ? getApiErrorMessage(data["error-type"])
          : `Request failed. HTTP status: ${response.status}`
      );
    }

    // Check API response.
    if (data.result !== "success") {

      throw new Error(
        getApiErrorMessage(data["error-type"])
      );
    }

    // Validate conversion rates.
    if (
      !data.conversion_rates ||
      typeof data.conversion_rates !== "object"
    ) {
      throw new Error(
        "Currency rates were not found in the API response."
      );
    }

    const rates = data.conversion_rates;

    if (
      typeof rates.USD !== "number" ||
      !Number.isFinite(rates.USD) ||
      rates.USD <= 0
    ) {
      throw new Error("The API returned invalid USD rates.");
    }

    exchangeRates = rates;

    const currencies = Object.keys(exchangeRates).sort();

    if (currencies.length === 0) {
      throw new Error("No currencies were returned by the API.");
    }

    // Populate dropdowns.
    populateDropdown(fromCurrency, currencies);
    populateDropdown(toCurrency, currencies);

    // Set default currencies.
    fromCurrency.value = currencies.includes("USD")
      ? "USD"
      : currencies[0];

    toCurrency.value = currencies.includes("INR")
      ? "INR"
      : currencies[0];

    // Update status.
    setStatus("Connected", "online");

    convertButton.disabled = false;
    swapButton.disabled = false;
    resetButton.disabled = false;

    // Display update date.
    const updateDate = data.time_last_update_utc
      ? new Date(data.time_last_update_utc).toLocaleString()
      : "Not provided";

    updatedTime.textContent =
      `Rates last updated: ${updateDate}`;

    showMessage(
      "Currency rates loaded successfully.",
      "success"
    );

    // Initial conversion.
    convertCurrency();

  } catch (error) {

    console.error("Currency API error:", error);

    exchangeRates = null;

    convertButton.disabled = true;
    swapButton.disabled = true;
    resetButton.disabled = false;

    fromCurrency.disabled = true;
    toCurrency.disabled = true;

    setStatus("Connection failed", "offline");

    resultElement.textContent = "—";

    rateInfo.textContent =
      "Exchange rate unavailable.";

    updatedTime.textContent = "";

    const errorMessage =
      error instanceof TypeError
        ? "Network error. Check your internet connection and browser console."
        : error.message || "Unable to load currency rates.";

    showMessage(errorMessage);

  } finally {

    isLoading = false;
    refreshButton.disabled = false;

  }
}


/* =========================================
   8. POPULATE CURRENCY DROPDOWNS
========================================= */


function populateDropdown(selectElement, currencies) {

  const currencyDetails = {
    INR: ["India", "₹", "Indian Rupee"],
    USD: ["United States", "$", "US Dollar"],
    GBP: ["United Kingdom", "£", "British Pound"],
    EUR: ["Eurozone", "€", "Euro"],
    JPY: ["Japan", "¥", "Japanese Yen"],
    CNY: ["China", "¥", "Chinese Yuan"],
    CAD: ["Canada", "$", "Canadian Dollar"],
    AUD: ["Australia", "$", "Australian Dollar"],
    CHF: ["Switzerland", "CHF", "Swiss Franc"],
    AED: ["United Arab Emirates", "د.إ", "UAE Dirham"],
    SAR: ["Saudi Arabia", "﷼", "Saudi Riyal"],
    SGD: ["Singapore", "$", "Singapore Dollar"],
    NZD: ["New Zealand", "$", "New Zealand Dollar"],
    PKR: ["Pakistan", "₨", "Pakistani Rupee"],
    BDT: ["Bangladesh", "৳", "Bangladeshi Taka"],
    LKR: ["Sri Lanka", "Rs", "Sri Lankan Rupee"],
    NPR: ["Nepal", "रू", "Nepalese Rupee"],
    RUB: ["Russia", "₽", "Russian Ruble"],
    KRW: ["South Korea", "₩", "South Korean Won"],
    THB: ["Thailand", "฿", "Thai Baht"],
    MYR: ["Malaysia", "RM", "Malaysian Ringgit"],
    IDR: ["Indonesia", "Rp", "Indonesian Rupiah"],
    PHP: ["Philippines", "₱", "Philippine Peso"],
    BRL: ["Brazil", "R$", "Brazilian Real"],
    MXN: ["Mexico", "$", "Mexican Peso"],
    ZAR: ["South Africa", "R", "South African Rand"],
    TRY: ["Turkey", "₺", "Turkish Lira"],
    VND: ["Vietnam", "₫", "Vietnamese Dong"],
    HKD: ["Hong Kong", "$", "Hong Kong Dollar"],
    SEK: ["Sweden", "kr", "Swedish Krona"],
    NOK: ["Norway", "kr", "Norwegian Krone"],
    DKK: ["Denmark", "kr", "Danish Krone"],
    PLN: ["Poland", "zł", "Polish Zloty"],
    EGP: ["Egypt", "£", "Egyptian Pound"],
    KWD: ["Kuwait", "د.ك", "Kuwaiti Dinar"],
    QAR: ["Qatar", "ر.ق", "Qatari Riyal"],
    OMR: ["Oman", "ر.ع.", "Omani Rial"]
  };

  selectElement.innerHTML = "";

  currencies.forEach((currency) => {

    const option = document.createElement("option");

    option.value = currency;

    if (currencyDetails[currency]) {

      const [country, symbol, name] = currencyDetails[currency];

      option.textContent = `${country} (${symbol} – ${name})`;

    } else {

      let currencyName = currency;

      try {
        currencyName = new Intl.DisplayNames(
          ["en"],
          { type: "currency" }
        ).of(currency) || currency;
      } catch (error) {
        console.warn("Currency name unavailable:", currency);
      }

      option.textContent = `${currency} (${currencyName})`;

    }

    selectElement.appendChild(option);

  });

  selectElement.disabled = false;
}



/* =========================================
   9. CONVERT CURRENCY
========================================= */

function convertCurrency() {

  if (!exchangeRates) {

    showMessage("Currency rates are not loaded yet.");

    return;
  }

  const amountText = amountInput.value.trim();
  const amount = Number(amountText);

  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Validate amount.
  if (
    amountText === "" ||
    !Number.isFinite(amount) ||
    amount < 0
  ) {

    showMessage(
      "Please enter a valid amount (zero or greater)."
    );

    return;
  }

  // Validate currencies.
  if (
    !Object.prototype.hasOwnProperty.call(exchangeRates, from) ||
    !Object.prototype.hasOwnProperty.call(exchangeRates, to) ||
    !Number.isFinite(exchangeRates[from]) ||
    !Number.isFinite(exchangeRates[to]) ||
    exchangeRates[from] <= 0
  ) {

    showMessage("Selected currency rate is unavailable.");

    return;
  }

  // Calculate cross exchange rate.
  const exchangeRate =
    exchangeRates[to] / exchangeRates[from];

  const convertedAmount =
    amount * exchangeRate;

  if (!Number.isFinite(convertedAmount)) {

    showMessage("Unable to calculate this conversion.");

    return;
  }

  // Display result.
  resultElement.textContent =
    formatNumber(convertedAmount, to);

  rateInfo.textContent =
    `1 ${from} = ${exchangeRate.toFixed(6)} ${to}`;

  showMessage(
    "Conversion completed successfully.",
    "success"
  );
}


/* =========================================
   10. SWAP CURRENCIES
========================================= */

function swapCurrencies() {

  if (!exchangeRates) return;

  const previousFrom = fromCurrency.value;

  fromCurrency.value = toCurrency.value;
  toCurrency.value = previousFrom;

  convertCurrency();
}


/* =========================================
   11. RESET CONVERTER
========================================= */

function resetConverter() {

  amountInput.value = "1";

  if (exchangeRates) {

    fromCurrency.value =
      exchangeRates.USD !== undefined
        ? "USD"
        : Object.keys(exchangeRates)[0];

    toCurrency.value =
      exchangeRates.INR !== undefined
        ? "INR"
        : Object.keys(exchangeRates)[0];

    convertCurrency();

  } else {

    resultElement.textContent = "—";

    rateInfo.textContent =
      "Exchange rate will appear here.";

    showMessage(
      "Please load currency rates before converting."
    );

  }
}


/* =========================================
   12. BUTTON EVENTS
========================================= */

convertButton.addEventListener(
  "click",
  convertCurrency
);

swapButton.addEventListener(
  "click",
  swapCurrencies
);

resetButton.addEventListener(
  "click",
  resetConverter
);

refreshButton.addEventListener(
  "click",
  loadCurrencies
);


/* =========================================
   13. INPUT EVENTS
========================================= */

fromCurrency.addEventListener(
  "change",
  convertCurrency
);

toCurrency.addEventListener(
  "change",
  convertCurrency
);

amountInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      convertCurrency();
    }

  }
);


/* =========================================
   14. INITIALIZE APPLICATION
========================================= */

loadCurrencies();
