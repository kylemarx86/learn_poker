const express = require('express');
const hbs = require('hbs');
var app = express();


// app.get('/', (req, res) => {
//     res.send('home.html')
// });

// app.get('/', (req, res) => {
//     res.render('home.html');
// });

// app.get('/', (req, res) => {
//     res.render('home.hbs');
// });

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.listen(3000, () => {
    console.log(`server is up on port 3000`);
});