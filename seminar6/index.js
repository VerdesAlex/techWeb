const express = require('express');
const users = require('./users');
const cors = require('cors');
const app = express();

// app.use(cors);

app.use(cors({
    origin: 'https://127.0.0.1:5500'
}))

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/users', function(req, res){
    const dbUsers = users;

    res.status(200), send(dbUsers);
})

app.get('/users/:id', function(req, res){
    const userId = req.params.id ? Number(req.params.id) : null;

    console.log(userId);

    if(!userId){
        throw new Error('User id not found!');
    }

    const user = users.find(user => user.id === userId);

    if(user){
        res.status(200).send(user);
    }
    else{
        throw new Error('User with id ${userId} not found');
    }
})

app.listen(3000, () =>{
    "WLL!"
});
    