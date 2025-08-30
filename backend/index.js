const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('.//routes/auth')
const empRoute = require('.//routes/employee');
const connectDb = require('.//config/db')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb();

app.use('/api/auth' , authRoute);
app.use('/api/emp' , empRoute);

const PORT = process.env.PORT || 8000
app.listen(PORT , ()=> {
    console.log(`Server running at ${PORT}`);
})