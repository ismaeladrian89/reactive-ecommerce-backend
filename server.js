const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utiles/db');


require('dotenv').config()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', require('./routes/authRoutes'))

app.get('/api', (req,res) => res.send('My Backend'))
const port = process.env.PORT 
dbConnect() 
//app.listen(port, () => console.log(`Server is running on port ${port}`))
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
