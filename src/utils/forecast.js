const request = require('request')

const forecast = (latitude,longitude,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=c10b585d17f614a3c51ab4d0187fe197&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({ url , json:true } , (error, { body }) => {
        if(error)
        {
            callback('Unable to connect to weather services!',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location!',undefined)
        }
        else
        {
            console.log(body) 
            callback(undefined, ' Today is ' + body.current.weather_descriptions[0] + ' .And it is currently ' + body.current.temperature + ' Celsius out there feelslike ' + body.current.feelslike + ' . And wind speed is ' + body.current.wind_speed + ' . There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast