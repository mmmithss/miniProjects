const BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
{/* <img src="https://flagsapi.com/:country_code/:style/:size.png">; */}

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "form" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlags(evt.target);
    });
}

const updateFlags = (element) => {
    const currCode = element.value;
    console.log(currCode);
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    
    
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue ===""||amountValue <1){
        amountValue = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    finalAmount = (amountValue * rate).toFixed(2);
    convertedAmt(amountValue,finalAmount);
});

const convertedAmt = (amount,finalAmount) => {
    let msg = document.querySelector(".msg p");
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
