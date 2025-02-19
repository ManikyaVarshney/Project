document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", calculateBMI);
});

function calculateBMI() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if (!weight || !height || weight <= 0 || height <= 0) {
        alert("Please enter valid weight and height!");
        return;
    }

    height = height / 100; // Convert cm to meters
    let bmi = (weight / (height * height)).toFixed(2);

    let category = "";
    if (bmi < 18.5) {
        category = "Underweight 😔";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal Weight 😊";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight 😕";
    } else {
        category = "Obese 😟";
    }

    document.getElementById("result").innerHTML = `Your BMI: ${bmi} <br> Category: ${category}`;
}
