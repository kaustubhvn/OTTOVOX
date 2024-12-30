const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/otto", { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String }
});
const User = mongoose.model("User", userSchema);

// Email-password login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Google login
app.post("/api/google-login", async (req, res) => {
    const { email, name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, name });
            await user.save();
        }
        res.json({ message: "Google login successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
