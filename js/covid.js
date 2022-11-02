const btn = document.querySelector(".btn");
const inputElement = document.querySelector(".inputElement");

const countryName = document.getElementById("countryName");

// function driveGetData(){
    //     setInterval(getData(),1000);
    // }
const api_url = "https://disease.sh/v3/covid-19/countries";

async function getData(){
    let country = inputElement.value;
    let countryTolower = country.toLowerCase();
    
    // console.log(`You typed Country = ${country} which is a ${typeof(country)} type`);
    
    const stringData =  await fetch(api_url).then(response => response.text());
    const jsonData = JSON.parse(stringData);
    // console.log(typeof(stringData));
    console.log(jsonData);

    var index = 0; var flag = true;
    //First way to do but all the object will iterate no matter we get the value
    // jsonData.forEach(obj => {
    //     let target = (obj.country).toLowerCase();
    //     if(Object.is(target, countryTolower) && flag){
    //         flag = false;
    //     }

    //     else if(flag){
    //         index++;
    //         // console.log(obj.country);
    //     }
    // });
    

    //the given search is valid or not
    var checkValidSearch = false;
    //Second way using every, it behave exactly like foreach , true = continue, false = break;
    jsonData.every(obj => {
        let target = (obj.country).toLowerCase();
        if(Object.is(target, countryTolower)){ ///Object.is(value1, value2) solved my long problem using mdn docs
            checkValidSearch = true;
            return false;
        }
        index++;
        return true;
    });


    //if not a valid search show an error then and there
    if(!checkValidSearch){
        document.querySelector(".error").innerHTML = "Not a valid country"; 
    }

    //else remove the error and show the data on the front 
    else{
        document.querySelector(".error").innerHTML = ""; 
        countryName.innerHTML = country.toUpperCase();
        console.log(jsonData[index]);
        
        document.querySelector(".activeCases").innerHTML = jsonData[index].active;
        document.querySelector(".newCases").innerHTML = jsonData[index].todayCases;
        document.querySelector(".recoveredCases").innerHTML = jsonData[index].recovered;
        document.querySelector(".totalCases").innerHTML = jsonData[index].cases;
        document.querySelector(".totalDeaths").innerHTML = jsonData[index].deaths;
        document.querySelector(".totalTests").innerHTML = jsonData[index].tests;
    }
    
}        
btn.addEventListener("click", getData);