const express = require ('express');
require('./db');
const userRouter = require('./routes/user');
const app = express();
app.use(express.json());

app.use('/api/user',userRouter);

app.get('/about', (req,res) =>{
    res.send('<h1>Hello i am from your About</h1>');
    });
app.listen(8002,() =>{
    console.log('port is listening on 8080');
});
