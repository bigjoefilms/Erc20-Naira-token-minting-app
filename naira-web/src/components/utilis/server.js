import axios from 'axios';

// ...

axios.post('http://localhost:3000/signin', {
  username: 'john',
  password: 'secret'
})
.then(response => {
  console.log(response.data.message); // Sign in successful!
})
.catch(error => {
  console.error(error);
});

// ...

axios.post('http://localhost:3000/signup', {
  username: 'john',
  password: 'secret',
  email: 'john@example.com'
})
.then(response => {
  console.log(response.data.message); // Sign up successful!
})
.catch(error => {
  console.error(error);
});