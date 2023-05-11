const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/review_app')
.then(()=>{
    console.log("DB is connected");
})
.catch((ex)=>{
    console.log("DB connection failed :", ex);
})