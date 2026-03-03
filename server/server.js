const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
dotenv.config();
connectDB();


const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

const listingRoutes = require("./routes/listingRoutes");
app.use("/api/listings", listingRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);


app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
})
