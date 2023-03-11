const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configure body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Define route for sign-in endpoint
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  // Do something with username and password data here
  res.json({ message: 'Sign in successful!' });
});

// Define route for sign-up endpoint
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  // Do something with username, password, and email data here
  res.json({ message: 'Sign up successful!' });
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
