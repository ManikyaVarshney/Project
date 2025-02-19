function convertNumber() {
    let from = document.getElementById("convertFrom").value;
    let to = document.getElementById("convertTo").value;
    let input = document.getElementById("convertInput").value.trim();
    let output = document.getElementById("convertOutput");

    if (!input) {
        output.textContent = "Output: Please enter a value.";
        return;
    }

    let result;

    try {
        switch (from) {
            case "binary":
                result = parseInt(input, 2);
                break;
            case "decimal":
                result = parseInt(input, 10);
                break;
            case "octal":
                result = parseInt(input, 8);
                break;
            case "hexadecimal":
                result = parseInt(input, 16);
                break;
            case "roman":
                result = romanToDecimal(input.toUpperCase());
                break;
            default:
                result = "Invalid input.";
        }

        if (to === "binary") result = result.toString(2);
        if (to === "decimal") result = result.toString(10);
        if (to === "octal") result = result.toString(8);
        if (to === "hexadecimal") result = result.toString(16);
        if (to === "roman") result = decimalToRoman(parseInt(result));

        output.textContent = `Output: ${result}`;
    } catch (error) {
        output.textContent = "Output: Conversion error!";
    }
}

function romanToDecimal(roman) {
    let romanNumerals = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
    let total = 0;

    for (let i = 0; i < roman.length; i++) {
        let current = romanNumerals[roman[i]];
        let next = romanNumerals[roman[i + 1]];

        if (next > current) {
            total += next - current;
            i++;
        } else {
            total += current;
        }
    }
    return total;
}

function decimalToRoman(num) {
    let lookup = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};
    let roman = '';

    for (let i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}