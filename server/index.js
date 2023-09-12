const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const colors = require('colors')
const multer = require('multer')
const upload = multer();
const port = process.env.PORT || 5000

connectDB()

const app = express()

// app.use(cors())
app.use("*", cors({
    origin: true,
    credentials: true
}))

app.use(upload.any())
app.use(express.static('public'));
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))

// serve frontend
// if (process.env.NODE_ENV !== 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')))

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errorHandler)

app.listen(port, () => console.log(`Starting server on port ${port}`))