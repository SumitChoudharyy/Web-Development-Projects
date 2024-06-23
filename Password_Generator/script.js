const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lenghtNum]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '-~`<>?/[]\|-_=+*&^%$#@!()'; 

let password = "";
let passwordLenght = 10;
let checkCount = 0;
handleSlider();
// Set circle Color grey
setIndicator("#ccc")

// Set PassWord Length
function handleSlider(){
  inputSlider.value = passwordLenght;
  lenghtDisplay.innerText = passwordLenght;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordLenght-min)*100/(max-min))+"% 100%";
}

function setIndicator(color){
  indicator.style.backgroundColor = color;
  // Shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
  return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber()
{
  return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
  return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbole(){
  const randNum = getRndInteger(0,symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength(){
   let hasUpper = false;
   let hasLower = false;
   let hasNum = false;
   let hasSym = false;

   if(uppercaseCheck.checked) hasUpper = true;
   if(lowercaseCheck.checked) hasLower = true;
   if(numberCheck.checked) hasNum = true;
   if(symbolsCheck.checked) hasSym = true;

   if(hasUpper && hasLower && (hasNum || hasSym) && passwordLenght >= 8){
    setIndicator("#0f0");
   }else if(
    (hasLower || hasUpper) && 
    (hasNum || hasSym) && 
    passwordLenght >= 6
   ){
    setIndicator("#ff0");
   }else {
    setIndicator("#f00");
   }
}

async function copyContent(){
   try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerHTML = "copied";
   }catch(e){
    copyMsg.innerHTML = "Failed";
   }
  //  To make copy span visible
   copyMsg.classList.add("active");

   setTimeout(() =>{
      copyMsg.classList.remove("active");
   },2000);
}

function shufflepassword(){
  // There is the algorithm for suffling -> Fisher Yates Method
}

function handleCheckBoxChange(){
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if(checkbox.checked)
      checkCount++;
  });

  // Special Condition
  if(passwordLenght < checkCount){
    passwordLenght = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input',(e) =>{
   passwordLenght = e.target.value;
   handleSlider();
})

copybtn.addEventListener('click',()=>{
  if(passwordDisplay.value){
    copyContent();
  }
})

generateBtn.addEventListener('click', ()=>{
  //  None of the checkbox is checked
  if(checkCount == 0)
    {
      return;
    }
  
  if(passwordLenght < checkCount)
    {
      passwordLenght = checkCount;
      handleSlider();
    }

    // let's start to find the new password
    password="";

    // Let's makes the password based on the checkbox

    // if(uppercaseCheck.checked){
    //   password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //   password += generateLowerCase();
    // }
    // if(numberCheck.checked){
    //   password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //   password += generateSymbole();
    // }

    let funArr = [];

    if(uppercaseCheck.checked){
      funArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
      funArr.push(generateLowerCase);
    }
    if(numberCheck.checked){
      funArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
      funArr.push(generateSymbole);
    }

    // for Compulsory addition
    for(let i=0;i<funArr.length;i++)
      {
        password += funArr[i]();
      }

    // for remaining addition 
    for(let i=0;i<(passwordLenght-funArr.length);i++)
      {
        let ranidx = getRndInteger(0,funArr.length);
        password += funArr[ranidx]();
      }
    
      // Suffle the password
      // password = shufflepassword(Array.from(password));

      // Showing password in the Password field
      passwordDisplay.value = password;

      // Updating the strenght
      calcStrength();

})
