const express = require('express');

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user')
const PORT  = 2000;
const app = express();


app.use(express.json());

app.use('/admin' , adminRoute);
app.use('/user' , userRoute);








app.listen(PORT , () => {
    console.log(`Successfully run port on ${PORT}`);
})