const express = require('express')
const router = require('./routes/index')
const cors = require('cors')
require('dotenv').config()
const errorHandler = require('./middleware/errorHandleMiddleware')


const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Started on: http://localhost:${PORT}`))

