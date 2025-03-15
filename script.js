// Select Elements
const balanceElement = document.getElementById('totalBalance');
const incomeElement = document.getElementById('totalIncome');
const expensesElement = document.getElementById('totalExpenses');
const transactionList = document.getElementById('transactionHistory');
const transactionName = document.getElementById('transactionName');
const transactionAmount = document.getElementById('transactionAmount');
const themeToggle = document.getElementById('themeToggle');
const budgetInput = document.getElementById('budgetInput');
const saveBudgetBtn = document.getElementById('saveBudgetBtn');
const alertMessage = document.getElementById('alertMessage');

// Transaction Data (Load from Local Storage or Empty Array)
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let budgetLimit = JSON.parse(localStorage.getItem('budgetLimit')) || 0;

// Function to Add Transaction
function addTransaction() {
    const name = transactionName.value.trim();
    const amount = parseFloat(transactionAmount.value.trim());

    if (name === '' || isNaN(amount)) {
        alert('Please enter valid details.');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        name,
        amount,
        date: new Date().toLocaleDateString() // Current Date in DD/MM/YYYY format
    };

    transactions.push(newTransaction);
    updateLocalStorage();
    updateUI();
    transactionName.value = '';
    transactionAmount.value = '';
}

// Function to Remove Transaction
function removeTransaction(id) {
    const confirmation = confirm('Are you sure you want to delete this transaction?');
    if (confirmation) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateLocalStorage();
        updateUI();
    }
}

// Function to Save Transactions and Budget in Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budgetLimit', JSON.stringify(budgetLimit));
}

// Function to Save Budget Limit
saveBudgetBtn.addEventListener('click', () => {
    const enteredBudget = parseFloat(budgetInput.value);
    if (isNaN(enteredBudget) || enteredBudget <= 0) {
        alert('Please enter a valid budget amount.');
        return;
    }

    budgetLimit = enteredBudget;
    updateLocalStorage();
    updateUI();
    alert('Budget limit saved successfully! ✅');
});

// Update UI
function updateUI() {
    transactionList.innerHTML = '';
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.name} - ₹${transaction.amount.toFixed(2)}
            <span class="date">(${transaction.date})</span>
            <span class="remove-btn" onclick="removeTransaction(${transaction.id})">❌</span>
        `;
        transaction.amount > 0 ? totalIncome += transaction.amount : totalExpenses += Math.abs(transaction.amount);
        transactionList.appendChild(li);
    });

    const totalBalance = totalIncome - totalExpenses;

    balanceElement.textContent = `₹${totalBalance.toFixed(2)}`;
    incomeElement.textContent = `₹${totalIncome.toFixed(2)}`;
    expensesElement.textContent = `₹${totalExpenses.toFixed(2)}`;

    // Alert Logic
    if (totalExpenses > budgetLimit && budgetLimit > 0) {
        alertMessage.classList.remove('hidden');
    } else {
        alertMessage.classList.add('hidden');
    }
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Event Listeners
document.getElementById('addTransaction').addEventListener('click', addTransaction);

// Initialize UI (Load Data from Local Storage)
budgetInput.value = budgetLimit;  // Load saved budget
updateUI();

// Select Elements
const exportDataBtn = document.getElementById('exportDataBtn');

// Function to Export Data as CSV
function exportDataAsCSV() {
    if (transactions.length === 0) {
        alert('No transactions available to export!');
        return;
    }

    // CSV Header
    let csvContent = "Date,Name,Amount,Type\n";

    // Data Rows
    transactions.forEach(transaction => {
        const type = transaction.amount > 0 ? "Income" : "Expense";
        csvContent += `${transaction.date},${transaction.name},${transaction.amount},${type}\n`;
    });

    // Create CSV File
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create Download Link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'FinTrack_Transactions.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    alert('Data exported successfully! ✅');
}

// Event Listener for Export Button
exportDataBtn.addEventListener('click', exportDataAsCSV);
 
// Select Elements
const dashboardUserName = document.getElementById('dashboardUserName');
const dashboardProfilePicture = document.getElementById('dashboardProfilePicture');
const dashboardProfile = document.getElementById('dashboardProfile');

// Load Saved Profile Data
function loadDashboardProfileData() {
    const savedName = localStorage.getItem('userName') || 'John Doe';
    const savedPicture = localStorage.getItem('profilePicture') || 'default-profile.png';

    dashboardUserName.textContent = savedName;
    dashboardProfilePicture.src = savedPicture;
}

// Redirect to Profile Page on Click
dashboardProfile.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

// Initialize Profile Data
loadDashboardProfileData();
 

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
        console.log('Service Worker Registered:', registration);
    })
    .catch((error) => {
        console.log('Service Worker Registration Failed:', error);
    });
}
