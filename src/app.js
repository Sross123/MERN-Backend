const { error } = require("console");
const express = require("express");
const hbs = require("hbs");
const path = require("path");

// call a express
const app = express();
// require database
require("./db/conn")
const Register = require("./models/registers");
// creating a port no.
const port = process.env.PORT || 4500;

// set all paths like static(css, images, etc.), views, partials
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")
// console.log(path.join(__dirname, "../templates"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// express to use static 
app.use(express.static(static_path));
// set views path with dynamically
app.set("view engine", "hbs");
app.set("views", views_path)
// Set partials
hbs.registerPartials(partials_path)

// manage routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});
// create a new user in our database
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if (password == confirmpassword) {

            const registerEmployee = new Register({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password: password,
                confirmpassword: confirmpassword,

            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");

        } else {
            res.send(`Password not matching`);
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({email:email})

        if(useremail.password == password){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid user details")
        }

    }catch(error){
        res.status(400).send("Invalid user details")
    }
})

// create a server and run it
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})