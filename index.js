const daily = document.querySelector(".daily")
// const weekly = document.querySelector(".weekly")
// const monthly = document.querySelector(".monthly")
const last = document.querySelectorAll(".last")
const reportSelection = document.querySelectorAll(".reports");
const period = document.querySelectorAll(".period")

const hours = document.querySelectorAll(".hours")
const previousHours = document.querySelectorAll(".p-hours")
document.body.onload = function(){
    daily.click()
    daily.classList.add("selected")
}


reportSelection.forEach(function(e){
    e.addEventListener('click', function(){
            reportSelection.forEach(function(r){
                r.classList.remove("selected")
            })
            e.classList.add("selected")
            fetch("data.json")
                .then(response => response.json())
                .then(data=> {
                    i=0
                    while(i<data.length){
                        try{

                            if(hours[i].classList.contains(data[i].title)){
                                if(this.innerHTML=="Daily"){
                                    hours[i].innerHTML = data[i].timeframes.daily.current
                                    last.forEach(function(e){
                                        e.innerHTML = ""
                                    })
                                    period.forEach(function(e){
                                        e.innerHTML = "Yesterday"
                                    })

                                    previousHours[i].innerHTML = data[i].timeframes.daily.previous
                                }
                                else if(this.innerHTML=="Weekly"){
                                    hours[i].innerHTML = data[i].timeframes.weekly.current

                                    period.forEach(function(e){
                                        e.innerHTML = "Week"
                                    })

                                    previousHours[i].innerHTML = data[i].timeframes.weekly.previous
                                }
                                else if(this.innerHTML=="Monthly"){
                                    hours[i].innerHTML = data[i].timeframes.monthly.current

                                    period.forEach(function(e){
                                        e.innerHTML = "Month"
                                    })

                                    previousHours[i].innerHTML = data[i].timeframes.monthly.previous
                                }
                            }
                            else{
                                console.log('error');
                            }
                        }
                        catch(err){
                            if(err.message == 'hours[i] is undefined'){
                                console.log(`The length of Data is more than the lenght of Activities`);
                                break
                            }
                            else{
                                console.log(err.message);
                                break
                            }
                        }
                        i++
                    }
                })
    })
})
