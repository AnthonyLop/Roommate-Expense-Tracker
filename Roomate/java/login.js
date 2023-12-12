function validateLogin() {
    // Get values from input fields
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Perform your validation logic here (e.g., check if username and password are not empty)
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password');
    } else {
      // Simulate a successful login (replace this with your actual login logic)
      var isLoggedIn = true;

      if (isLoggedIn) {
        // Redirect to the home page (index.html) after a successful login
        window.location.href = 'index.html';
      } else {
        alert('Login failed. Please check your credentials.');
      }

      // You can also submit the form to a server using AJAX or other methods
      // document.getElementById('loginForm').submit();
    }
  }