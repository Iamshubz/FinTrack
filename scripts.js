// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const transactions = [];

    function updateDashboard() {
        let totalIncome = 0, totalExpenses = 0;
        const transactionList = document.getElementById("transactions");
        transactionList.innerHTML = "";

        transactions.forEach((tx, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${tx.name} <span class='${tx.type}'>${tx.amount > 0 ? '+' : ''}$${tx.amount}</span> <span class='remove' onclick='confirmDelete(${index})'>❌</span>`;
            transactionList.appendChild(li);

            if (tx.type === "income") totalIncome += tx.amount;
            else totalExpenses += Math.abs(tx.amount);
        });

        document.getElementById("total-income").textContent = `$${totalIncome}`;
        document.getElementById("total-expenses").textContent = `$${totalExpenses}`;
        document.getElementById("current-balance").textContent = `$${totalIncome - totalExpenses}`;
    }

    window.confirmDelete = function(index) {
        if (confirm("Are you sure you want to delete this transaction?")) {
            transactions.splice(index, 1);
            updateDashboard();
        }
    };

    document.getElementById("add-transaction").addEventListener("click", () => {
        const name = prompt("Enter transaction name:");
        const amount = parseFloat(prompt("Enter amount (+ for income, - for expense):"));
        const type = amount > 0 ? "income" : "expense";

        if (name && !isNaN(amount)) {
            transactions.push({ name, amount, type });
            updateDashboard();
        } else {
            alert("Invalid input. Please try again.");
        }
    });

    document.getElementById("view-analytics").addEventListener("click", () => {
        const expenseData = transactions.filter(tx => tx.type === "expense");
        const labels = expenseData.map(tx => tx.name);
        const data = expenseData.map(tx => Math.abs(tx.amount));

        const chartContainer = document.getElementById('analytics-container');
        chartContainer.innerHTML = `<canvas id="expenseChart"></canvas>`;

        const ctx = document.getElementById("expenseChart").getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FFC107"]
                }]
            }
        });
    });

    document.getElementById("toggle-dark-mode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelector(".sidebar").classList.toggle("dark-mode");
        document.querySelector("header").classList.toggle("dark-mode");
        document.querySelector("footer").classList.toggle("dark-mode");
    });

    updateDashboard();
});
