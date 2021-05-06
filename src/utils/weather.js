const request = require('postman-request')

const weather_api_key = "09359111a7c1123d9560ca43deb02afc"

var weather_url = "http://api.weatherstack.com/current?access_key="+weather_api_key+"&query="

const weather = (lat,lon,callback) =>{
    var url = weather_url+lat+','+lon
    request({url,json:true},(error,{body})=>{
        if (body.error){
            callback(body.error.info,undefined)
        }
        else if (error){
            callback("Unable to connect to weatherstack API",undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out.")
            
        }
    })
}

module.exports = weather