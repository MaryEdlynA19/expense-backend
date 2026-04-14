const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ CORS FIX (THIS IS THE CORRECT ONE)
app.use(cors());

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server is working");
});

// 🔗 Connect to MongoDB
mongoose.connect("mongodb+srv://maryedlyn007_db_user:0ezLRn3r8E0uLDtx@cluster0.krzv5ct.mongodb.net/expenseDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const expenseSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    date: String
});

const Expense = mongoose.model("Expense", expenseSchema);

// Add expense
app.post("/add-expense", async (req, res) => {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.json({ message: "Expense saved" });
});

// Get expenses
app.get("/expenses", async (req, res) => {
    const data = await Expense.find();
    res.json(data);
});
// Delete expense
app.delete("/delete-expense/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});
// Start server
app.listen(5001, () => {
    console.log("Server running on port 5001");
});