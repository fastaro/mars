require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

app.get('/curiosity', async (req, res) => {
    try {
        const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
        
    } catch (err) {
       console.log('error:', err);
    }
})

app.get('/opportunity', async (req, res) => {
    try {
        const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=2018-06-04&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
       console.log('error:', err);
    }
})

app.get('/spirit', async (req, res) => {
    try {
        const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=2010-02-01&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
       console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))