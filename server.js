const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv').config()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use('/api', require('./routes/authRoutes'))

app.get('/', (req,res) => res.send('My Backend'))
const port = process.env.PORT 
app.listen(port, () => console.log(`Server is running on port ${port}`))
