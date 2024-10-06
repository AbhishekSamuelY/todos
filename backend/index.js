// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
const mongoose = require('mongoose');


const allowedOrigins = 'http://localhost:3002';
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

//change Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

//change database here
mongoose.connect('mongodb://localhost:27017/todos')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// user api calls
app.get("/", (req, resp) => {
    resp.send("server running on 5000");
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        console.log(result);

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
app.listen(5000);