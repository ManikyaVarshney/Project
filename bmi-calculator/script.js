function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (weight === "" || height === "") {
        alert("Please enter valid weight and height!");
        return;
    }

    height = height / 100; // Convert cm to meters
    let bmi = (weight / (height * height)).toFixed(2); // BMI Formula

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
