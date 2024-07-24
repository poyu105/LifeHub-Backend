const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./api/userRoutes')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/lifehub');

app.listen(3001, ()=>{
    console.log('Server is running')
});