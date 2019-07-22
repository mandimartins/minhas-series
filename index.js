const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const pages = require('./routes/pages')
const series = require('./routes/series')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')

app.use('/',pages)
app.use('/series',series)

mongoose.connect(mongo)
.then(()=>{
    app.listen(port,()=>{console.log('Listening on: '+ port)})
})
.catch( e =>{
    console.log(e)
})
