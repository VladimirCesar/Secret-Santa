require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const apiman = require('./apiman');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 80;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));
app.listen(port, () => {
  console.log(`Node serv is listening on port ${port}`);
});

apiman(app);