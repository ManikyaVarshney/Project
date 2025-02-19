const apiKey = "eb83f9943a11732543d173ed"; // Get API Key from exchangerate-api.com
const apiURL = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/USD";

// Populate dropdowns with currency codes
async function loadCurrencies() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const currencyCodes = Object.keys(data.conversion_rates);
        const fromDropdown = document.getElementById("fromCurrency");
        const toDropdown = document.getElementById("toCurrency");

        currencyCodes.forEach(currency => {
            const option1 = new Option(currency, currency);
            const option2 = new Option(currency, currency);
            fromDropdown.add(option1);
            toDropdown.add(option2);
        });

        // Set default values
        fromDropdown.value = "USD";
        toDropdown.value = "INR";
    } catch (error) {
        alert("Error loading currencies. Check API key.");
    }
}

// Convert currency
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const exchangeRate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        document.getElementById("result").innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert("Error fetching conversion rates.");
    }
}

// Load currency options on page load
window.onload = loadCurrencies;
