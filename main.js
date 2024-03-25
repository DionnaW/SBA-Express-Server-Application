const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my Express Server Application')
});

app.get('/', (req, res) => {  //homepage
    res.send('Welcome to my Express Server Application')
});

app.get('/about', (req, res) => {   //about section on website
    res.send('Thanks for wanting to see what we are about')
});

app.listen(4000);