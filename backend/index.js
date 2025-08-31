const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('.//routes/auth')
const empRoute = require('.//routes/employee');
const connectDb = require('.//config/db')


const app = express();
app.use(cors({
  origin: "http://localhost:3000", // frontend ka port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb();

app.use('/api/auth' , authRoute);
// app.use('/api/employees', empRoute);
 app.use('/api/emp' , empRoute);

const PORT = process.env.PORT || 8000
app.listen(PORT , ()=> {
    console.log(`Server running at ${PORT}`);
})