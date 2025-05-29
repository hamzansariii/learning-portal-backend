require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
require('./models/index')
app.use(express.json())
app.use('/api', require('./routes'))
app.use(cors({
    origin: ['http://localhost:5173', 'https://learning-portal-frontend.vercel.app']
}));




app.listen(port, () => {
    console.log(`App listening at port : ${port}`)
})