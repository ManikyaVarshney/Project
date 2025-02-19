document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", calculateBMI);
    document.getElementById("themeToggle").addEventListener("click", toggleDarkMode);
});

let bmiData = [];

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
    let asanas = "";
    let diet = "";

    if (bmi < 18.5) {
        category = "Underweight 😔";
        asanas = "Yoga Asanas: Bhujangasana, Vajrasana, Surya Namaskar";
        diet = "Diet: High protein & carbs - bananas, nuts, dairy, eggs";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal Weight 😊";
        asanas = "Yoga Asanas: Tadasana, Vrikshasana, Trikonasana";
        diet = "Diet: Balanced meals - vegetables, fruits, whole grains";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight 😕";
        asanas = "Yoga Asanas: Surya Namaskar, Dhanurasana, Warrior Pose";
        diet = "Diet: Low carbs - salads, lean protein, green tea";
    } else {
        category = "Obese 😟";
        asanas = "Yoga Asanas: Kapalbhati, Anulom Vilom, Utkatasana";
        diet = "Diet: Strict - fiber-rich foods, detox drinks, avoid sugar";
    }

    document.getElementById("result").innerHTML = `Your BMI: ${bmi} <br> Category: ${category}`;

    document.getElementById("recommendation").innerHTML = `
        <p><strong>${asanas}</strong></p>
        <p><strong>${diet}</strong></p>
    `;

    bmiData.push(bmi);
    updateChart();
}

function updateChart() {
    let ctx = document.getElementById("bmiChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: bmiData.length }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: "BMI Trend",
                data: bmiData,
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    let themeBtn = document.getElementById("themeToggle");
    themeBtn.textContent = themeBtn.textContent === "🌞" ? "🌙" : "🌞";
}
