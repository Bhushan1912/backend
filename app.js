const express = require ('express');
require('./db');
require('dotenv').config();
const userRouter = require('./routes/user');
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
app.use('/api/user',userRouter);

app.get('/about', (req,res) =>{
    res.send('<h1>Hello i am from your About</h1>');
    });
app.listen(8000,() =>{
    console.log('port is listening on', {PORT});
});
