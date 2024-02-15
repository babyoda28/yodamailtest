const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dummy database for demonstration (replace with actual database)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

// Serve static files (including HTML)
app.use(express.static('public'));

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send({ success: true, message: 'Login successful' });
  } else {
    res.status(401).send({ success: false, message: 'Invalid username or password' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO handling
io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

