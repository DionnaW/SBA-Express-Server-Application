const express = require('express');
const app = express();

app.get('/', (req, res) => {  //homepage
    res.send('Welcome to Candy Land')
});

app.get('/about', (req, res) => {   //about section on website
    res.send('Thanks for wanting to know more!')
});

app.listen(4000);