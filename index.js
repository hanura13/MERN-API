const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
const productRouter = require('./src/routes/product');

app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTION');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})


app.use('/', productRouter);
app.listen(4000);