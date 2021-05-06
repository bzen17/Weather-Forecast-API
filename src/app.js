const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

const port = process.env.PORT || 3000

// Setup handlebar and path config
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

// Setup static dir to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather Forecast",
        name: "Ayan Banerjee"})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful text.",
        title:"Help",
        name: "Ayan Banerjee"})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        error: "Help article Not Found!",
        name: "Ayan Banerjee"})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name: "Ayan Banerjee"})
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        res.send({
            error: "You must provide an address as query."
        })
    }
    else {
        const address = req.query.address

        geocode(address,(error,{lat,lon,loc}={})=>{
            if (error){
                return res.send({error})
            }
            weather(lat,lon,(error,{image,message,wind_speed,humidity,cloudcover}={})=>{
                if (error){
                    return res.send({error})
             
                }
            res.send({
                location:loc,
                forecast:message,
                image,
                wind_speed,
                humidity,
                cloudcover
            })
        })
        })

        
    }
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        error: "Page Not Found!",
        name: "Ayan Banerjee"})
})

app.listen(port,()=>{
    console.log("Server is UP on port 3000!")
})