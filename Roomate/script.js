function calculateBudget() {
    var income = parseFloat(document.getElementById('income').value);
    var expenses = parseFloat(document.getElementById('expenses').value);

    if (isNaN(income) || isNaN(expenses)) {
        alert('Please enter valid numbers for income and expenses.');
        return;
    }

    var budget = income - expenses;

    var resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Your monthly budget: $' + budget.toFixed(2);

    if (budget >= 0) {
        resultElement.style.color = '#27ae60';
    } else {
        resultElement.style.color = '#e74c3c';
    }
}

function downloadResults(expense, monthlyBudget) {
    // Create a CSV file content with additional information
    var csvContent = "data:text/csv;charset=utf-8," +
        "Expense,Monthly Income\n" +
        expense + "," + monthlyBudget + "\n";

    // Append the existing result content
    var resultContent = document.getElementById("result").innerText;
    csvContent += resultContent;

    // Create a Blob containing the CSV file content
    var blob = new Blob([csvContent], { type: "text/csv" });

    // Create a link element and trigger a download
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "budget_results.csv";
    link.click();
}
