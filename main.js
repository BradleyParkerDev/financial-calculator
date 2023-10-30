function futureValue(pv, r, n, pmt, end = true) {
    // If there are no payments, calculate the future value based on the compounded present value.
    if (pmt === 0) {
        // Future Value (FV) = Present Value (PV) * (1 + Interest Rate (r))^Number of Periods (n)
        return -pv * Math.pow(1 + r, n);
    }

    if (end) {
        // Compounding at the end of the period (annuity in arrears)
        // Calculate the future value (FV) using the formula:
        // FV = (-PV) * (1 + r)^n - PMT * ((1 + r^n - 1) / r)
        return (-pv) * Math.pow(1 + r, n) - pmt * ((Math.pow(1 + r, n) - 1) / r);
    } else {
        // Compounding at the start of the period (annuity due)
        // Calculate the future value (FV) using the formula:
        // FV = (-PV) * (1 + r)^n - PMT * ((1 + r^n - 1) / r) * (1 + r)
        return (-pv) * Math.pow(1 + r, n) - pmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    }
}

const presentValue = (fv, r, n, pmt, end = true) => {
    // If there are no payments, calculate the present value based on the discounted future value.
    if (pmt === 0) {
        // Present Value (PV) = Future Value (FV) / (1 + Interest Rate (r))^Number of Periods (n)
        return -fv / Math.pow(1 + r, n);
    }

    if (end) {
        // Discounting at the end of the period (annuity in arrears)
        // Calculate the present value (PV) using the formula:
        // PV = -FV / (1 + r)^n - PMT * ((1 - (1 + r)^-n) / r)
        return -fv / Math.pow(1 + r, n) - pmt * ((1 - Math.pow(1 + r, -n)) / r);
    } else {
        // Discounting at the start of the period (annuity due)
        // Calculate the present value (PV) using the formula:
        // PV = -FV / (1 + r)^n - PMT * ((1 - (1 + r)^-n) / r) * (1 + r)
        return -fv / Math.pow(1 + r, n) - pmt * ((1 - Math.pow(1 + r, -n)) / r) * (1 + r);

    }
}


  
function payment(pv, fv, r, n, end = true) {
    // Calculate the payment (PMT) based on the future value (FV), present value (PV),
    // interest rate (r), number of periods (n), and whether it's an ordinary annuity (end=true) or annuity due (end=false).

    if (end) {
        // Payment for an ordinary annuity (compounding at the end of the period).
        // PMT = (-fv - pv * (1 + r)^n) / [((1 + r)^n - 1) / r]
        return (-fv - pv * Math.pow(1 + r, n)) / (((Math.pow(1 + r, n) - 1) / r));
    } else {
        // Payment for an annuity due (compounding at the start of the period).
        // PMT = (PV + ((PV + FV) / ((1 + r)^n - 1)) * (-r / (1 + r))
        let part1 = (pv + ((pv + fv) / (Math.pow(1 + r, n) - 1)));
        let part2 = (-r / (1 + r));
        return part1 * part2;

    }
}

function numberOfPeriods(pv,fv,r,pmt, end = true) {

    if(pmt === 0){
        // No payment
        // n = log(FV / PV) / log(1 + r)
        return Math.log((fv) / (-1*pv)) / Math.log(1 + r);
    }
    if (end) {
        // Regular Annuity
 
    } else {
        // Annuity Due

    }

}

function rate(pv,fv,n,pmt, end = true){
    if(pmt === 0){
        // No payment

    }
    if(end){
        // Regular Annuity        

    } else{
        // Annuity Due



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
let end = true;
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
        n = numberOfPeriods(pv,fv,r,pmt,end);
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
        pv = presentValue(fv, r, n, pmt, end)
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
        pmt = payment(pv, fv, r, n, end);
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
        fv = futureValue(pv, r, n, pmt, end);
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

