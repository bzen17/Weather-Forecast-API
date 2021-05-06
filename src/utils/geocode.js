const request = require('postman-request')


const mapbox_api_key = "pk.eyJ1IjoiYmVuejAxNyIsImEiOiJja29iM3FzbTQwNmxiMm9saHo0N29pNmpxIn0.sgP8Ne_aUvaDRzlpsJtpIg"
const getGeocodeUrl = (address) => "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token="+mapbox_api_key


const geocode = (address,callback) => {
    var url = getGeocodeUrl(address)
    request({url,json:true},(error,{body})=>{
    if (error){
        callback("Unable to connect to mapbox API",undefined)
    }
    else if (body.features.length === 0)
    {
        callback("Query not found. Search again.",undefined)
    }
    else {
    const lat = body.features[0].center[1]
    const lon = body.features[0].center[0]
    const loc = body.features[0].place_name
    callback(undefined,{lat,lon,loc})
    
    }
})
}

module.exports = geocode