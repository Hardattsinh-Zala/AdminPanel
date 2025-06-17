require("dotenv").config();
const express = require("express");
const router = require("./router/auth");
const contactRouter = require("./router/contact.js");
const adminRoute = require("./router/admin.js");
const connectDB = require("./utilities/db");
const errorFunction = require("./middlewares/error-func.js");
const app = express();
const cors = require("cors");

const corsOption =  {
    origin: "https://ghostpanel.onrender.com",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOption))

app.use("/api/auth", router);
app.use("/api/form", contactRouter);
app.use("/api/admin", adminRoute);

app.use(errorFunction);

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening....");
    });
})
