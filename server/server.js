const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
})
