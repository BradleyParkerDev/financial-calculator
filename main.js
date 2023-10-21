const rate = (presentValue, futureValue, numberOfPeriods, payment) => {
    if (numberOfPeriods === 0) {
      return 0; // Avoid division by zero.
    }
  
    // Use an iterative approach or a financial library like the Newton-Raphson method to calculate the rate.
    const maxIterations = 10000;
    let guess = 0.1; // Initial guess for the rate (you can start with any reasonable value).
  
    for (let i = 0; i < maxIterations; i++) {
      const numerator = presentValue - payment * ((1 - Math.pow(1 + guess, -numberOfPeriods)) / guess);
      const denominator = futureValue;
  
      const f = numerator / denominator;
  
      if (Math.abs(f) < 0.00001) {
        return guess; // If the difference is small enough, return the rate as an approximation.
      }
  
      const fPrime = ((payment * numberOfPeriods * Math.pow(1 + guess, -numberOfPeriods - 1)) - payment * (1 - Math.pow(1 + guess, -numberOfPeriods)) / (guess * guess)) / denominator;
  
      guess = guess - f / fPrime;
    }
  
    // If the iteration does not converge, you can return NaN or handle it differently.
    return NaN;
}
  


const futureValue = (presentValue, interestRate, numberOfPeriods, payment) => {
    let futureValue = presentValue;
    for (let i = 0; i < numberOfPeriods; i++) {
        futureValue = (futureValue + payment) * (1 + interestRate);
    }
    return futureValue;
}
  

const presentValue = (futureValue, interestRate, numberOfPeriods) => {
    return futureValue / Math.pow(1 + interestRate, numberOfPeriods);
}
  

const payment = (presentValue,futureValue, interestRate, numberOfPeriods) => {
    if (interestRate === 0) {
      return (futureValue - presentValue) / numberOfPeriods;
    } else {
      const discountFactor = (1 - Math.pow(1 + interestRate, -numberOfPeriods)) / interestRate;
      return (futureValue - presentValue) / discountFactor;
    }
  }
  
  

const numberOfPeriods = (presentValue, futureValue, interestRate, payment) => {
    if (interestRate === 0) {
      return (futureValue - presentValue) / payment;
    } else {
      return Math.log((payment / (payment - interestRate * (futureValue - presentValue)))) / Math.log(1 + interestRate);
    }
}
  



//////////////////////////////////////////////////////////////
// Variables
//////////////////////////////////////////////////////////////

let n = undefined;
let r = undefined;
let pv = undefined;
let pmt = undefined;
let fv = undefined;
let result = 0;


//////////////////////////////////////////////////////////////
//Buttons and Screens
//////////////////////////////////////////////////////////////

//Screens
let screenview = document.querySelector('#screenview');
let inputText = document.querySelector('#inputText');
let totalOutput = document.querySelector('#totalOutput');

//number-buttons
let numberButton = document.querySelectorAll("#calculator .number-button")

//Financial Buttons
let nButton = document.querySelector('#button-n');
let iyButton = document.querySelector('#button-iy');
let pvButton = document.querySelector('#button-pv');
let pmtButton = document.querySelector('#button-pmt');
let fvButton = document.querySelector('#button-fv');
let cptButton = document.querySelector('#button-cpt');
let leftPButton = document.querySelector('#button-left-p');
let rightPButton = document.querySelector('#button-right-p');
let deleteButton = document.querySelector('#button-delete');
let clearButton = document.querySelector('#button-clear');

//Operator Buttons
let negButton = document.querySelector('#button-neg');
let decButton = document.querySelector('#button-dec');
let divButton = document.querySelector('#button-div');
let mulButton = document.querySelector('#button-mul');
let minButton = document.querySelector('#button-min');
let plsButton = document.querySelector('#button-pls');
let eqlButton = document.querySelector('#button-eql');


//////////////////////////////////////////////////////////////
//Event Handlers
//////////////////////////////////////////////////////////////

// Number button values added to screen
for(let i = 0; i < numberButton.length; i++){
    numberButton[i].addEventListener('click', function(){
        let cursorPosition = inputText.selectionStart;
        inputText.value = inputText.value.substring(0,cursorPosition) + numberButton[i].innerText + inputText.value.substring(cursorPosition);
        
        result = eval(inputText.value);
        totalOutput.innerText = eval(inputText.value);
    });
}

// Delete Button
deleteButton.addEventListener('click',function(){
    let cursorPosition = inputText.selectionStart;
    inputText.value = inputText.value.substring(0,cursorPosition-1) + inputText.value.substring(cursorPosition);
    inputText.focus()
    inputText.setSelectionRange(cursorPosition-1, cursorPosition-1)
    totalOutput.innerText = eval(inputText.value);
    if(inputText.value === undefined){
        totalOutput.innerText = "";
    }
});

// Clear Button
clearButton.addEventListener('click',function(){
    result = 0;
    inputText.value = "";
    totalOutput.innerText = "";
});

// = Button
eqlButton.addEventListener('click',function(){
    inputText.value = result;
});

// +/- Button
negButton.addEventListener('click',function(){
    
    if(inputText.value.includes('-')){
        inputText.value = inputText.value.replace("-","");
        totalOutput.innerText = eval(inputText.value);
    }
    else{
        inputText.value = `-${inputText.value}`;
        totalOutput.innerText = eval(inputText.value);
    } 
})

// N Button
nButton.addEventListener('click',function(){
    n = eval(inputText.value);
    if(n !== undefined){
        nButton.style.background = "#98fb98";
    }
    else{
        nButton.style.background = "";
    }
    console.log(`N: ${n}`);
});

// I/Y Button
iyButton.addEventListener('click',function(){
    r = eval(inputText.value);
    if(r !== undefined){
        iyButton.style.background = "#98fb98";
    }
    else{
        iyButton.style.background = "";
    }
    console.log(`I/Y: ${r}`);
});

// PV Button
pvButton.addEventListener('click',function(){
    pv = eval(inputText.value);
    if(pv !== undefined){
        pvButton.style.background = "#98fb98";
    }
    else{
        pvButton.style.background = "";
    }
    console.log(`PV: ${pv}`);
});

// PMT Button
pmtButton.addEventListener('click',function(){
    pmt = eval(inputText.value);
    if(pmt !== undefined){
        pmtButton.style.background = "#98fb98";
    }
    else{
        pmtButton.style.background = "";
    }
    console.log(`PMT: ${pmt}`);
});

// FV Button
fvButton.addEventListener('click',function(){
    fv = eval(inputText.value);
    if(fv !== undefined){
        fvButton.style.background = "#98fb98";
    }
    else{
        fvButton.style.background = "";
    }
    console.log(`FV: ${fv}`);

});

// CPT Button
cptButton.addEventListener('click', function(){
    console.log("CPT Button Clicked!")
    if(n === undefined){
        n = numberOfPeriods(pv,fv,r,pmt);
        inputText.value = n;
        totalOutput.innerText = "";
        nButton.style.background = "#98fb98";
        console.log(`N: ${n}`);
        console.log(`I/Y: ${r}`);
        console.log(`PV: ${pv}`);
        console.log(`PMT: ${pmt}`);
        console.log(`FV: ${fv}`);

    }
    else if(r === undefined){
        r = rate(pv,fv,n,pmt)
        inputText.value = r;
        totalOutput.innerText = "";
        iyButton.style.background = "#98fb98";
        console.log(`N: ${n}`);
        console.log(`I/Y: ${r}`);
        console.log(`PV: ${pv}`);
        console.log(`PMT: ${pmt}`);
        console.log(`FV: ${fv}`);
    }
    else if(pv === undefined){
        pv = presentValue(r,n,pmt,fv,false)
        inputText.value = pv;
        totalOutput.innerText = "";
        pvButton.style.background = "#98fb98";
        console.log(`N: ${n}`);
        console.log(`I/Y: ${r}`);
        console.log(`PV: ${pv}`);
        console.log(`PMT: ${pmt}`);
        console.log(`FV: ${fv}`);
    }
    else if(pmt === undefined){
        pmt = payment(pv,fv,r,n);
        inputText.value = pmt;
        totalOutput.innerText = "";
        pmtButton.style.background = "#98fb98";
        console.log(`N: ${n}`);
        console.log(`I/Y: ${r}`);
        console.log(`PV: ${pv}`);
        console.log(`PMT: ${pmt}`);
        console.log(`FV: ${fv}`);
    }
    else if(fv === undefined){
        fv = futureValue(pv, r, n, pmt);
        inputText.value = fv;
        totalOutput.innerText = "";
        fvButton.style.background = "#98fb98";
        console.log(`N: ${n}`);
        console.log(`I/Y: ${r}`);
        console.log(`PV: ${pv}`);
        console.log(`PMT: ${pmt}`);
        console.log(`FV: ${fv}`);
    }
});


//////////////////////////////////////////////////////////////
//Financial Facts
//////////////////////////////////////////////////////////////
//Facts Source - https://investinganswers.com/articles/99-surprising-financial-facts-most-investors-dont-know

let financialFact = document.querySelector("#financial-fact");
let financialFactText = document.querySelector("#financial-fact-text");
let financialFactCloseButton = document.querySelector("#financial-fact-close-button")
financialFactCloseButton.addEventListener('click',function(){
    financialFact.remove();
})
function readFinFacts(){
    fetch('financialFacts.json')           
    .then(response => response.json())
    .then(data => {
        let randomFact = Math.floor((Math.random() * data.length) + 0);
        financialFactText.innerText = data[randomFact].Fact;
    });
}
readFinFacts();

