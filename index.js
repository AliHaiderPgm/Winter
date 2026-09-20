const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const compression = require('compression')
const colors = require('colors')
const multer = require('multer')
const upload = multer();
const port = process.env.PORT || 9000


connectDB()

const app = express()

// app.use(cors())
app.use("*", cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

// Product lists are repetitive JSON, so they compress roughly ten to one.
app.use(compression())

app.use(upload.any())
app.use(express.static('public', { maxAge: '7d' }));
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/checkout', require('./routes/checkoutRoute'))
app.use('/api/contact', require('./routes/contactRoute'))
app.use('/api/subscribe', require('./routes/subscriberRoute'))

// server frontend
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, './frontend/build')

    app.use(express.static(buildPath, {
        // Vite fingerprints every file under /assets, so those can be cached
        // for good: a new build always produces new names.
        setHeaders: (res, filePath) => {
            if (filePath.includes(`${path.sep}assets${path.sep}`)) {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
            }
        }
    }))

    // index.html itself stays revalidated, so a deploy is picked up at once.
    app.get('*', (req, res) => {
        res.setHeader('Cache-Control', 'no-cache')
        res.sendFile(path.resolve(buildPath, 'index.html'))
    })
} else {
    app.get('/', (req, res) => res.send('Please set env to production'))
}


app.use(errorHandler)

app.listen(port, () => console.log(`Starting server on port ${port}`))