const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const authRoute = require('./src/routes/auth');
const blogRoute = require('./src/routes/blog');

app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTION');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})


app.use('/v1/auth', authRoute);
app.use('/v1/blog', blogRoute);

app.use((error, req, res, next)=> {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});

mongoose.connect('mongodb+srv://hanura13:XB6JC-44GCD@cluster0.hbt8sov.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    app.listen(4000, ()=> console.log('Conection Success'));
})
.catch(err => console.log(err));
