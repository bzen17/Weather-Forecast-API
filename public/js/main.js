const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const h3 = document.querySelector('h3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msg1.innerHTML = "Loading..."
    h3.innerHTML = ""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            msg1.innerHTML = data.error
        }
        else {
            msg1.innerHTML = data.forecast
            h3.innerHTML = data.location
        }
    })
})
})