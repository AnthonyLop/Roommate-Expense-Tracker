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
  // Filter out categories with zero spending
  const nonZeroCategories = Object.fromEntries(
    Object.entries(categories).filter(([category, amount]) => amount > 0)
  );

  const labels = Object.keys(nonZeroCategories);
  const sizes = Object.values(nonZeroCategories);

  // Get the canvas and its context
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');

  // Clear previous chart
  if(window.myChart) {
    window.myChart.destroy();
  }

  // Create new chart
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Spending Amount',
          data: sizes,
          backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5'],
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
    },
  });
};

const checkSavingsProgress = (goal, totalExpenses) => {
  if (goal > 0) {
    const progress = ((goal - totalExpenses) / goal) * 100;
    const remainingAmount = goal - totalExpenses;
    
    // Display savings progress as a prompt
    const userInput = prompt(`Savings progress: ${progress.toFixed(2)}%\nYou are ${remainingAmount.toFixed(2)} away from your savings goal. Enter additional savings:`);

    // Update the text container on the left side of the calculator
    const savingsTextContainer = document.getElementById('savingsTextContainer');
    if (savingsTextContainer) {
      savingsTextContainer.innerText = `Savings Progress: ${progress.toFixed(2)}%\nRemaining Amount: ${remainingAmount.toFixed(2)}`;
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
  