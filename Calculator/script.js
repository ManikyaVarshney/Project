let display = document.getElementById("display");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value.replace("÷", "/").replace("×", "*"));
  } catch (error) {
    display.value = "Error";
  }
}
// 🌗 Dark / Light Mode Toggle
const modeToggle = document.getElementById("modeToggle");
const currentMode = localStorage.getItem("theme");

if (currentMode === "dark") {
  document.body.classList.add("dark-mode");
  modeToggle.textContent = "☀️";
}

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    modeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    modeToggle.textContent = "🌙";
  }
});
