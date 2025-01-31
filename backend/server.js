const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('', (req, res) => {
  res.send('home page');
});



app.listen(PORT, ()=> console.log(`server running http://localhost:${PORT}/`));