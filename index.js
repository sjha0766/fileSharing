const express = require('express');
const filesRouter = require('./routes/files');
const showRouter = require('./routes/show');
const downloadRouter = require('./routes/download');
const connectDB = require('./config/db');
const ejs = require('ejs');

const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/api/files', filesRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);

const PORT = process.env.PORT || 3000;

connectDB();

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS ? process.env.ALLOWED_CLIENTS.split(",") : '*',
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
