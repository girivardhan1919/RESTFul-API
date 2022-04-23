const express = require("express");
require("./db/conn");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// You DO NOT NEED express.json() and express.urlencoded() 
// for GET Requests or DELETE Requests. We only need it for 
// post and put req.

// express.json() is a method inbuilt in express to recognize the incoming 
// Request Object as a JSON Object. This method is called as a middleware 
// in your application using the code: app.use(express.json());
// app.use(express.json());

// registered the user using post method
app.post("/users", (req, res) => {

    const user = new User(req.body);

    console.log(req.body);
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e);
    })
})

// read the data of registered users
// we no need to write to set operator, mongoose will take care of it
app.get("/users", async (req, res) => {

    try {
        const usersData = await User.find({});
        res.send(usersData);
    } catch (e) {
        res.status(500).send();
    }

})

// get the individual user data using id
app.get("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const userData = await User.findById(_id);

        if (!userData) return res.status(404).send();
        else res.send(userData);

    } catch (e) {
        res.status(500).send();
    }
})

// update the users by its id
app.patch("/users/:id", async (req, res) => {

    try {
        const id = req.params.id;

        const updateUser = await User.findByIdAndUpdate({
            _id: id
        }, req.body, {
            new: true
        });
        res.send(updateUser);

    } catch (e) {
        res.status(400).send(e);
    }
})

// Delete the users by its id
app.delete("/users/:id", async (req, res) => {
    try {

        const deleteUser = await User.findByIdAndDelete(req.params.id);

        if (!req.params.id) {
            return res.send(400), send();
        }

        res.send(deleteUser);

    } catch (e) {
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})