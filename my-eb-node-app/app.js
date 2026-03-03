require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();



// Middleware
app.use(express.json()); // For fetch JSON data
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// Temporary in-memory storage (replace with DB in real project)
let users = [];
let notes = [];

/* ==============================
   USER REGISTER ROUTE
============================== */
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ==============================
   USER LOGIN ROUTE
============================== */
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ==============================
   UI ROUTES
============================== */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/logout", (req, res) => {
    res.redirect('/login');
});

/* ==============================
   ADD NOTE ROUTE
============================== */
app.post("/notes", (req, res) => {
    try {
        const { note } = req.body;

        if (!note || note.trim() === "") {
            return res.status(400).json({ message: "Note cannot be empty" });
        }

        const newNote = {
            id: Date.now(),
            text: note
        };

        notes.push(newNote);

        res.status(201).json({
            message: "Note added successfully",
            note: newNote
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ==============================
   GET ALL NOTES
============================== */
app.get("/notes", (req, res) => {
    res.status(200).json(notes);
});

/* ==============================
   GLOBAL ERROR HANDLER
============================== */
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});