function calculateAmount(numRoommates, totalAmount) {
    // Calculate the amount for each roommate
    var amountPerRoommate = totalAmount / numRoommates;
    return amountPerRoommate;
  }

  function updateRoommates() {
    // Fetch the selected number of roommates
    var numRoommates = parseInt(document.getElementById('numRoommates').value);
    var rentInput = parseFloat(document.getElementById('rent').value);
    var utilitiesInput = parseFloat(document.getElementById('utilities').value);

    // Check if all fields are filled
    if (isNaN(numRoommates) || isNaN(rentInput) || isNaN(utilitiesInput)) {
      // Display an error message if any field is missing
      document.getElementById('result').innerHTML = '';
    } else {
      // Calculate the amounts for each roommate
      var rentAmount = calculateAmount(numRoommates, rentInput);
      var utilitiesAmount = calculateAmount(numRoommates, utilitiesInput);

      // Display the results
      document.getElementById('result').innerHTML =
        'Each roommate needs to contribute $' + rentAmount.toFixed(2) + ' for rent.<br>' +
        'Each roommate needs to contribute $' + utilitiesAmount.toFixed(2) + ' for utilities.';
    }
  }

  function calculateAllocation() {
    // Call the updateRoommates function to calculate and display results
    updateRoommates();
  }

  function resetForm() {
    // Reset the form fields
    document.getElementById('numRoommates').value = '';
    document.getElementById('rent').value = '';
    document.getElementById('utilities').value = '';

    // Clear the result
    document.getElementById('result').innerHTML = '';
  }