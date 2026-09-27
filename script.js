const form = document.getElementById("transactionForm");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const transactionList = document.getElementById("transactionList");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

let transactions = [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    const transaction = {
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    displayTransactions();

    updateSummary();

    form.reset();
});


function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function(transaction, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${transaction.description} - ₹${transaction.amount}
            </span>

            <button onclick="deleteTransaction(${index})">
                Delete
            </button>
        `;

        transactionList.appendChild(li);
    });
}


function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            income += transaction.amount;
        }
        else {
            expense += transaction.amount;
        }

    });

    const balance = income - expense;

    incomeElement.innerText = "₹" + income;
    expenseElement.innerText = "₹" + expense;
    balanceElement.innerText = "₹" + balance;
}


function deleteTransaction(index) {

    transactions.splice(index, 1);

    displayTransactions();

    updateSummary();
}