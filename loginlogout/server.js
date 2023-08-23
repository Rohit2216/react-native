const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const usersDataPath = './db.json';

let users = [];

try {
  const usersData = fs.readFileSync(usersDataPath, 'utf-8');
  users = JSON.parse(usersData).users;
} catch (error) {
  console.error('Error reading user data:', error);
}

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const userExists = users.some((user) => user.username === username || user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  fs.writeFileSync(usersDataPath, JSON.stringify({ users }));

  res.status(201).json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (bcrypt.compareSync(password, user.password)) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});