const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express congfig

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location

app.set('view engine','hbs')  // set is used to change the property of express
app.set('views', viewsPath)   // by default hbs searches in to web-server/views to change this into web-server/tamplates we have done this
hbs.registerPartials(partialsPath)

//Setup static directory to serve

app.use(express.static(publicDirectoryPath))

//app.com              (ROUTS)
//app.com/help
//app.com/about

// app.get('', (req,res) => {
//     // res.send('Hello Express!')
//     res.send('<h1>WEATHER</h1>')
// })

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'D.K.'
    })

})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Page',
        name:'D.K.'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Page',
        name:'D.K.'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>
    {
        if(error)
        {
            return res.send({ error })
        }

        forecast( latitude, longitude, ( error, forecastData) => 
        {
            if(error)
            {
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })

    // res.send({
    //     address: req.query.address,
    //     forcast: 'it is cool',
    //     location: 'india'
    // })
})

app.get('/help/*',(req,res) => {
    // res.send('Help artical not found')
    res.render('404',{
        title:'404',
        name:'D.K.',
        errorMessage:'Help artical not found'
    })
})

app.get('*',(req,res) => {
    // res.send('My 404 Page')
    res.render('404',{
        title:'404',
        name:'D.K.',
        errorMessage:'My 404 Page'
    })
})


// app.get('/help', (req,res) => {
//     // res.send('This is help page.')
//     // res.send({
//     //     name:'DEV',
//     //     age: 21
//     // })
//     res.send([{
//         name: 'DEV-1'
//     },
//     {
//         name: 'DEV-2'
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('This is about page.')
// })

app.get('/weather', (req,res) => {
    res.send('Weather is AWSOME!!')
})

// Start server

app.listen(port, () => {                                    // arg(port,callback function)
    console.log('Server is up on port ' + port)
})          