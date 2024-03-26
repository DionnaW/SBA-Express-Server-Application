//getting started with application
const express = require('express');
const app = express();

//making a path so engine views can be added
const path = require('path');

//global middleware for all routes
app.use(express.urlencoded({extended: false}));

//custom middleware for buyCandy
app.use(buyCandy);

//custom middleware to link css
app.use(express.static(path.join(__dirname, "public")));

//adding ejs view engine file to this doc
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//creating the buyCandy func
function buyCandy(req, res, next) {
  req.visitorShopping = true
  if (req.buyCandy) {
    res.send("So much to choose from, so take your time and look around")
  } else {
    next()
  }
}

//get request route for webpage
app.get("/", (req, res) => {
    res.render("home", {
        isShopping: req.visitorShopping,
        choices: [
            {name: "Hard Candy", types: "all flavors"}, 
            {name: "Soft Candy", types: "all flavors"}, 
            {name: "Chewing Candy", types: "all flavors"}
        ]
    })
})

//get request route for /about section on webpage with exclusive candies
app.get('/about', (req, res) => {  
    const candyType = req.query.type;
    const candies = [
        {id: 1, name: "Chocolate Bar", tpye: "Chocolate"},
        {id: 2, name: "Gummy Bears", type: "Gummy"},
        {id: 3, name: "Lollipop", type: "Sucker"}
    ];

    const filteredCandies = candies.filter(candy => {
        if (candyType) {
            return candy.type === candyType;
        } else {
            return true;
        }
    });

    //making filtered candies a response
    res.json(filteredCandies);
}); 

//creating a delete route for a candy in the exclusive category (gummy bears) & use 204 for successful delete & 404 if not found
app.delete("/candies/:id", (req, res) => {
    const candyId = parseInt(req.params.id);

    const candyIndex = candies.findIndex(candy => candy.id === candyId);

    if (candyIndex !== -1) {
        candies.splice(candyIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({error: "Candy not found"});
    }
});

//creating a put route for the candy in the exclusive category, if it's found
app.put("/candies/:id", (req, res) => {
    const candyId = parseInt(req.params.id);

    const candyIndex = candies.findIndex(candy => candy.id === candyId);

    if (candyIndex !== -1) {
        candies[candyIndex].name = req.body.name;
        res.json(candies[candyIndex]);
    } else {
        res.status(404).json({error: "Candy not found"});
    }
});

//post route for response from get request
app.post("/result", (req, res) => {
    if(req.body.day.trim().toUpperCase() === "EVERYDAY") {
      res.send("Yay, that is the best answer!")
    } else {
      res.send("Wrong answer, try again!")
    }
})

//get request for when localhost:4000/result is visited
app.get("/result", (req, res) => {
    res.send("This page is invalid, go back!")
})

app.listen(4000);


