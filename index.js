const express = require ('express');

const app = express();

app.use(()=> {
    console.log('hello server...');
    console.log('Helo cuk');
})
app.listen(4000);