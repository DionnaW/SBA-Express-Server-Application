const express = require('express');
const app = express();
const path = require('path')

//global middleware that would apply 2 all routes = a function to access and modify a req and res objects
app.use(express.urlencoded({extended: false})) 
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

//route w/GET request     //parameters (req & res)
app.get("/", (req, res) => {  //homepage
    res.render("home")
});

//route
app.get('/about', (req, res) => {   //this will be for the about section on the page
    res.send("Thanks for loving our candy!")
}); 

//route w/POST request; to get a response url from a form submission that ask any question
app.post("/result", (req, res) => {
    if (req.body.day.trim().toUpperCase() === "EVERYDAY") {
        res.send("YAY, that is a great answer.")
    } else {
        res.send("Incorrect, please try again")
    }
})

 //allows us access to what the user actually typed in to throw a true or false ststement
 //(trim removes any whitespace & upper keeps it ture if capital or lower case)

//route w/get request; to get a response url from a form submission
app.get("/result", (req, res) => {
    res.send("You made it to the wrong page; go back?")
})



app.listen(4000);