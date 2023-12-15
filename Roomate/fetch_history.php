<?php
// Replace with your actual database credentials
$host = 'localhost';
$username = 'Antwan';
$password = 'Junkwarrior56';
$database = 'antwan';

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Execute a SELECT query to fetch history data
$sql = "SELECT *, ROUND(rent / num_roommates, 2) AS rent_per_roommate, ROUND(utilities / num_roommates, 2) AS utilities_per_roommate FROM expense_allocation ORDER BY timestamp DESC";
$result = mysqli_query($conn, $sql);

// Check if the query was successful
if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

// Display the fetched data in an HTML table
echo "<h2>Expense Allocation History</h2>";
echo "<table border='1'>
        <tr>
            <th>ID</th>
            <th>Number of Roommates</th>
            <th>Rent</th>
            <th>Utilities</th>
            <th>Rent per Roommate</th>
            <th>Utilities per Roommate</th>
            <th>Timestamp</th>
        </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
            <td>{$row['id']}</td>
            <td>{$row['num_roommates']}</td>
            <td>{$row['rent']}</td>
            <td>{$row['utilities']}</td>
            <td>{$row['rent_per_roommate']}</td>
            <td>{$row['utilities_per_roommate']}</td>
            <td>{$row['timestamp']}</td>
          </tr>";
}

echo "</table>";

// Close the database connection
mysqli_close($conn);
?>
