const express = require("express");
const mongoose = require("mongoose");
const app = express()

const mongoDB = "mongodb://127.0.0.1:27017/Darry";
mongoose.set('strictQuery', false);
const bodyParser = require('body-parser');

mongoose.connect(mongoDB, (err) => {
    if (err) {
        console.log(`Unable to connect : ${err}`);
    } else {
        console.log("successfully coonnected")
    }
});
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });

    user.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('User created successfully!');
        }
    });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});