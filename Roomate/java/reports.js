// Main program

const categories = {};
const currentCategories = {};

// Placeholder for saving user data
const saveUserData = (data) => {
  // Implement your save logic here, e.g., save to localStorage or send to a server
  console.log('Saving user data:', data);
};

// Function to track expense and visualize spending
const trackExpenseAndVisualize = () => {
  try {
    const expense = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('category').value;
    const savingsGoal = parseFloat(document.getElementById('savingsGoal').value);

    // Validate expense input
    if (isNaN(expense) || expense <= 0) {
      throw new Error('Invalid expense amount. Please enter a valid positive number.');
    }

    // Validate category input
    if (!/^[a-zA-Z\s]+$/.test(category)) {
      throw new Error('Invalid category. Please enter only letters and spaces.');
    }

    // Validate savings goal input
    if (isNaN(savingsGoal) || savingsGoal < 0) {
      throw new Error('Invalid savings goal. Please enter a valid non-negative number.');
    }

    if (!categories[category]) {
      categories[category] = 0;
    }

    if (!currentCategories[category]) {
      currentCategories[category] = 0;
    }

    categories[category] += expense;
    currentCategories[category] += expense;

    // Visualize spending
    visualizeSpending(currentCategories);

    // Save the data entered during the current session
    if (typeof saveUserData === 'function') {
      saveUserData(currentCategories);
    }

    // Check and display savings progress
    const totalExpenses = Object.values(currentCategories).reduce((total, amount) => total + amount, 0);
    checkSavingsProgress(savingsGoal, totalExpenses);

  } catch (error) {
    alert(error.message);
  }
};
 



// Function to visualize spending data using Chart.js
const visualizeSpending = (categories) => {
  const nonZeroCategories = Object.fromEntries(
    Object.entries(categories).filter(([category, amount]) => amount > 0)
  );

  const labels = Object.keys(nonZeroCategories);
  const sizes = Object.values(nonZeroCategories);

  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Spending Amount',
          data: sizes,
          backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#E91E63'],
          borderColor: '#333', // Border color for bars
          borderWidth: 1,      // Border width for bars
          borderRadius: 10,    // Bar border radius
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Spending by Category',
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: false,  // Hide legend as it's not needed for this chart
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.yLabel.toFixed(2)}`,
        },
      },
    },
  });
};


const checkSavingsProgress = (goal, totalExpenses) => {
  if (goal > 0) {
    const progress = ((goal - totalExpenses) / goal) * 100;
    const remainingAmount = goal - totalExpenses;

    // Update the text container on the left side of the calculator
    const savingsTextContainer = document.getElementById('savingsTextContainer');
    if (savingsTextContainer) {
      savingsTextContainer.innerText = `Savings Progress: ${progress.toFixed(2)}%\nAmount to Reach Goal: ${remainingAmount.toFixed(2)}`;
    }
  }
};

const resetForm = () => {
  document.getElementById('expenseAmount').value = '';
  document.getElementById('category').value = '';
  document.getElementById('savingsGoal').value = '';

  // Clear the chart
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Reset data
  for (let key in categories) {
    delete categories[key];
  }
  for (let key in currentCategories) {
    delete currentCategories[key];
  }
  // Reset savings progress and remaining amount
  const savingsTextContainer = document.getElementById('savingsTextContainer');
  if (savingsTextContainer) {
    savingsTextContainer.innerText = '';
}
};

// Function to download CSV file
const downloadCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
