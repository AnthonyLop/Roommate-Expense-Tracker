<?php
// Connect to the MySQL database
$host = 'localhost'; // Replace with your actual database host
$username = 'Antwan'; // Replace with your actual database username
$password = 'Junkwarrior56'; // Replace with your actual database password
$database = 'antwan'; // Replace with your actual database name

$conn = mysqli_connect($host, $username, $password, $database);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if the keys exist in the $_POST array
if (isset($_POST['numRoommates'], $_POST['rent'], $_POST['utilities'])) {
    // Get data from the HTML form
    $numRoommates = $_POST['numRoommates'];
    $rent = $_POST['rent'];
    $utilities = $_POST['utilities'];

    // Insert data into the database
    $sql = "INSERT INTO expense_allocation (num_roommates, rent, utilities) VALUES ('$numRoommates', '$rent', '$utilities')";

    if (mysqli_query($conn, $sql)) {
        // Data saved successfully, redirect back to the original HTML page
        header("Location: Expense.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
} else {
    echo "One or more required fields are missing.";
}

// Close the database connection
mysqli_close($conn);
?>