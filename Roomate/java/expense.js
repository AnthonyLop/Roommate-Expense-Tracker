function calculateAllocation() {
  // Call the updateRoommates function to calculate and display results
  updateRoommates();
}

function updateRoommates() {
  var numRoommatesInput = document.getElementById('numRoommates');
  var numRoommatesHidden = document.getElementById('numRoommatesHidden');
  numRoommatesHidden.value = numRoommatesInput.value;
  var rentInput = parseFloat(document.getElementById('rent').value);
  var utilitiesInput = parseFloat(document.getElementById('utilities').value);

  // Check if all fields are filled
  if (isNaN(numRoommatesInput.value) || isNaN(rentInput) || isNaN(utilitiesInput)) {
    // Display an error message if any field is missing
    document.getElementById('result').innerHTML = '';
  } else {
    // Calculate the amounts for each roommate
    var rentAmount = calculateAmount(numRoommatesInput.value, rentInput);
    var utilitiesAmount = calculateAmount(numRoommatesInput.value, utilitiesInput);

    // Display the results
    document.getElementById('result').innerHTML =
      'Each roommate needs to contribute $' + rentAmount.toFixed(2) + ' for rent.<br>' +
      'Each roommate needs to contribute $' + utilitiesAmount.toFixed(2) + ' for utilities.';
  }
}

function resetForm() {
  // Reset the form fields
  document.getElementById('numRoommates').value = '';
  document.getElementById('rent').value = '';
  document.getElementById('utilities').value = '';

  // Clear the result
  document.getElementById('result').innerHTML = '';
  event.preventDefault();
}

function fetchHistory() {
  // Toggle visibility of the history table container
  var historyTableContainer = document.getElementById('historyTableContainer');
  historyTableContainer.style.display = historyTableContainer.style.display === 'none' ? 'block' : 'none';

  // If the history table container is visible, fetch history data
  if (historyTableContainer.style.display === 'block') {
    $.ajax({
      url: 'fetch_history.php', // Update with the correct PHP script name
      type: 'GET',
      success: function (data) {
        // Display the fetched data in the 'result' div
        $('#result').html(data);
      },
      error: function (error) {
        console.error('Error fetching history:', error);
      }
    });
  }
  event.preventDefault();
}
