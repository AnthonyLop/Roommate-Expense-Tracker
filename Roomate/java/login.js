// Dummy user credentials for demonstration purposes
const dummyUser = {
  username: 'lopezant@gmail.com',
  password: 'Junkwarrior56',
};

// Function to validate login
function validateLogin() {
  // Get values from input fields
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // Check if the entered credentials match the dummy user
  if (usernameInput === dummyUser.username && passwordInput === dummyUser.password) {
    // Redirect to index.html upon successful login
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

// login.js

// Dummy user email for demonstration purposes
const dummyUserEmail = 'lopezant@kean.edu';

// Function to simulate sending a reset link
function sendResetLink(email) {
  // Simulate sending an email (replace this with your actual email sending logic)
  console.log(`Reset link sent to ${email}`);
}

// Function to validate forgot password
function validateForgot() {
  // Get value from the email input field
  const emailInput = document.getElementById('email').value;

  // Check if the entered email matches the dummy user email
  if (emailInput === dummyUserEmail) {
    // Simulate sending a reset link
    sendResetLink(emailInput);
    alert('Reset link sent. Please check your email.');
  } else {
    alert('Invalid email address. Please try again.');
  }
}

function validateRegistration() {
  // Perform registration validation logic here

  // For demonstration purposes, let's assume registration is successful
  var registrationSuccessful = true;

  if (registrationSuccessful) {
    alert('Account has been created successfully!');
    // Redirect to index.html
    window.location.href = 'index.html';
  } else {
    // Handle registration failure if needed
    alert('Registration failed. Please try again.');
  }
}
