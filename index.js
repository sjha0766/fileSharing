const express=require('express');
const filesRouter=require('./routes/files');
const showRouter=require('./routes/show');
const downloadRouter=require('./routes/download');
const connectDB=require('./config/db');
const ejs = require('ejs');

const app=express();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/api/files',filesRouter);
app.use('/files',showRouter);
app.use('/files/download',downloadRouter);

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT,()=>{
    console.log(`Listing at port ${PORT}`);
})
