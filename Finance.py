import csv
import datetime
import matplotlib.pyplot as plt

# Load previous spending data
def load_spending_data():
    categories = {}
    try:
        with open('spending.csv', 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header
            for row in reader:
                date, category, amount = row
                amount = float(amount)
                if category not in categories:
                    categories[category] = 0
                categories[category] += amount
    except FileNotFoundError:
        pass
    return categories

# Save spending data to file
def save_spending_data(categories):
    with open('spending.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        for category, amount in categories.items():
            date = datetime.datetime.now().strftime('%Y-%m-%d')
            writer.writerow([date, category, amount])

# Visualize spending
def visualize_spending(categories, savings_goal):
    # Filter out categories with zero spending
    non_zero_categories = {k: v for k, v in categories.items() if v > 0}

    labels = non_zero_categories.keys()
    sizes = non_zero_categories.values()

    fig, ax = plt.subplots()
    ax.bar(labels, sizes)
    ax.set_xlabel('Categories')
    ax.set_ylabel('Spending Amount')
    ax.set_title('Spending by Category')

    # Rotate x-axis labels and set their alignment
    plt.setp(ax.get_xticklabels(), rotation=45, ha='right', rotation_mode='anchor')

    # Add a grid to the graph
    ax.grid(axis='y')

    # Add a horizontal line representing the savings goal
    ax.axhline(y=savings_goal, color='r', linestyle='--', label='Savings Goal')

    # Add a legend
    ax.legend()

    plt.show()



    
# Save user data to a CSV file
def save_user_data(categories):
    with open('user_data.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Category', 'Total Spent'])
        for category, amount in categories.items():
            writer.writerow([category, amount])
# Set a savings goal
def set_savings_goal():
    try:
        goal = float(input("Enter your savings goal: "))
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return 0
    return goal

# Check savings progress
def check_savings_progress(goal, total_expenses):
    if goal > 0:
        progress = (goal - total_expenses) / goal * 100
        remaining_amount = goal - total_expenses
        print(f"Savings progress: {progress:.2f}%")
        print(f"You are ${remaining_amount:.2f} away from your savings goal.")

        
# Main program
categories = load_spending_data()
savings_goal = set_savings_goal()

# Create a dictionary to store current session categories
current_categories = {}

# Track your spending
while True:
    try:
        expense = float(input("Enter expense amount (or 0 to exit): "))
        if expense == 0:
            break
        category = input("Enter category: ")
        if category not in categories:
            categories[category] = 0
        if category not in current_categories:
            current_categories[category] = 0
        categories[category] += expense
        current_categories[category] += expense
    except ValueError:
        print("Invalid input. Please enter a valid number.")


# Use current_categories for visualizing the spending
visualize_spending(current_categories, savings_goal)

# Save the data entered during the current session
save_user_data(current_categories)

# Check and display savings progress
total_expenses = sum(current_categories.values())
check_savings_progress(savings_goal, total_expenses)
