const express = require('express');
const hbs = require('hbs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});