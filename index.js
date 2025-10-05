const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from Node.js!');
});



const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());

let users = [];
let currentId = 1;

// CREATE - POST /users

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required.' });
    }

    const newUser = { id: currentId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

//
// 📖 READ ALL - GET /users
//
app.get('/users', (req, res) => {
    res.json(users);
});

//
// 🔍 READ ONE - GET /users/:id
//
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
});


// UPDATE - PUT /users/:id

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});


//  DELETE - DELETE /users/:id

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const deletedUser = users.splice(index, 1);
    res.json({ message: 'User deleted.', user: deletedUser[0] });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
