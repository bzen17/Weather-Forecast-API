const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const h4 = document.querySelector('h4')
const img = document.querySelector('#weather-icon')
const humidity = document.querySelector('#humidity')
const cloudcover = document.querySelector('#cloudcover')
const windspeed = document.querySelector('#windspeed')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msg1.innerHTML = "Loading..."
    h4.innerHTML = humidity.innerHTML = cloudcover.innerHTML = windspeed.innerHTML = img.src = ""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            msg1.innerHTML = data.error
        }
        else {
            img.src = data.image
            msg1.innerHTML = data.forecast
            h4.innerHTML = data.location
            humidity.innerHTML = "<strong>Humidity : </strong>"+data.humidity+" %"
            cloudcover.innerHTML = "<strong>Cloud-cover : </strong>"+data.cloudcover+" %"
            windspeed.innerHTML = "<strong>Wind Speed : </strong>"+data.wind_speed+" m/sec"
        }
    })
})
})