const path = require('path');
const express = require('express');
// const https = require('https');
const hbs = require('hbs');
// const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('home.hbs');
});

// const httpsOptions = {
//     key: fs.readFileSync('./security/rootCA.key'),
//     cert: fs.readFileSync('./securtiy/rootSSL.pem')
// }

// const server = https.createServer(httpsOptions, app)
//     .listen(port, () => {
//         console.log(`server is up on port: ${port}`);
//     });

app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});

