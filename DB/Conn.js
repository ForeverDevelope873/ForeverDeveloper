const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined. Check your .env file.");
        }

        await mongoose.connect(uri)

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
