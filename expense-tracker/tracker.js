const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
    alert("Please login first!");
    window.location.href = "login.html";
}

let userData = JSON.parse(localStorage.getItem(currentUser));

document.getElementById("income-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("income-name").value;
    const amount = parseFloat(document.getElementById("income-amount").value);

    userData.data.income.push({ name, amount });
    localStorage.setItem(currentUser, JSON.stringify(userData));
    alert("Income added!");
});

document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});
