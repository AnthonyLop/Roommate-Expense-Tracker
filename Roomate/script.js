function calculateBudget() {
    // Get the values from the input fields
    var income1 = parseFloat(document.getElementById('income1').value) || 0;
    var income2 = parseFloat(document.getElementById('income2').value) || 0;
    var expenses1 = parseFloat(document.getElementById('expenses1').value) || 0;
    var expenses2 = parseFloat(document.getElementById('expenses2').value) || 0;

    // Calculate the budget
    var totalIncome = income1 + income2;
    var totalExpenses = expenses1 + expenses2;
    var budget = totalIncome - totalExpenses;

    // Display the result
    document.getElementById('result').innerHTML =
        'Your total income is: $' + totalIncome.toFixed(2) + '<br>' +
        'Your total expenses are: $' + totalExpenses.toFixed(2) + '<br>' +
        'Your budget is: $' + budget.toFixed(2);
}

function downloadResults() {
    // Get the values from the input fields
    var income1 = parseFloat(document.getElementById('income1').value) || 0;
    var income2 = parseFloat(document.getElementById('income2').value) || 0;
    var expenses1 = parseFloat(document.getElementById('expenses1').value) || 0;
    var expenses2 = parseFloat(document.getElementById('expenses2').value) || 0;
  
    // Create a CSV file content with additional information
    var csvContent =
    "User Inputs,Calculation\n" +
    "Income 1: $" + income1.toFixed(2) + "," +
    "Your total income is: $" + (income1 + income2).toFixed(2) + '\n' +
    "Income 2: $" + income2.toFixed(2) + "," +
    "Your total expenses are: $" + (expenses1 + expenses2).toFixed(2) + '\n' +
    "Expense 1: $" + expenses1.toFixed(2) + "," +
    "Your budget is: $" + (income1 + income2 - expenses1 - expenses2).toFixed(2) + '\n' +
    "Expense 2: $" + expenses2.toFixed(2) + "\n\n";
  
    // Create a Blob containing the CSV file content
    var blob = new Blob([csvContent], { type: "text/csv" });
  
    // Create a link element and trigger a download
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "budget_results.csv";
    link.click();
  }
