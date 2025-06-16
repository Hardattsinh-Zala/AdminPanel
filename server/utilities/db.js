const mongoose = require("mongoose");

const URI = process.env.MONGO;
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("mongoose connnected...")
    } catch (error) {
        console.log(error);
        console.error("DB refuses to connect..");
        process.exit(0);
    }
}

module.exports = connectDB;