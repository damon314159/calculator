"use strict";

function add(num1, num2) {
  return num1 + num2;
};

function subtract(num1, num2) {
  return num1 - num2;
};

function multiply(num1, num2) {
  return num1 * num2;
};

function divide(num1, num2) {
  return num1 / num2;
};

function operate(num1, num2, operation) {
  let result;
  switch (operation) {
    case "add" :
      result = add(num1, num2);
      break;
    case "subtract" :
      result = subtract(num1, num2);
      break;
    case "multiply" :
      result = multiply(num1, num2);
      break;
    case "divide" :
      if (num2 === 0) {
        return "Maths Error";
      };
      result = divide(num1, num2);
  };
  return result;
};

function reset() {
let num1 = 0;
let num2 = 0;
let operation = '';
display.textContent = 0;
displayValue = display.textContent;
const point = document.querySelector(".point");
point.disabled = false;
toggleOpsButtons(true); //sets back to defaults
};

function toggleOpsButtons(toDefault = null) { 
  //argument can force state, otherwise state is calculated
  const opsButtons = document.querySelectorAll(".operator");
  const equalsBtn = document.querySelector(".equals");
  if (toDefault === null) {
    toDefault = equalsBtn.disabled == false ? true : false; 
    //determines current state, prepares correct changes
  };
  if (toDefault == true) {
    equalsBtn.disabled = true;
    opsButtons.forEach(node => node.disabled = false);
  } 
  else if (toDefault == false) {
    equalsBtn.disabled = false;
    opsButtons.forEach(node => node.disabled = true);
  };
};

function switchToNum2() { //called when operation selected
  num1 = displayValue;
  display.textContent = '';
  displayValue = display.textContent;
  toggleOpsButtons();
  const point = document.querySelector(".point");
  point.disabled = false; //allows num2 to have a decimal point if num1 did
}; 

function performButton(target) {
  const btnClass = target.className;
  if (display.textContent == "Maths Error") {
    display.textContent='';
    displayValue = display.textContent; 
    //clear box if an error screen when user types next calc in
  };
  if (btnClass.slice(0,3)=="num"){
    if (displayValue==="0") {
      display.textContent = btnClass.slice(3,4);
      displayValue = display.textContent;
    } else {
      display.textContent = displayValue + btnClass.slice(3,4);
      displayValue = display.textContent;
    };
  }
  else if (btnClass=="point") {
    display.textContent = displayValue + ".";
    displayValue = display.textContent;
    const point = document.querySelector(".point");
    point.disabled = true;
  }
  else if (btnClass.slice(0,8)=="operator") {

    if (btnClass.slice(9)=="add") {
      operation = "add";
      switchToNum2();
    }
    else if (btnClass.slice(9)=="subtract") {
      operation = "subtract";
      switchToNum2();
    }
    else if (btnClass.slice(9)=="multiply") {
      operation = "multiply";
      switchToNum2();
    }
    else if (btnClass.slice(9)=="divide") {
      operation = "divide";
      switchToNum2();
    };
  }
  else if (btnClass=="equals") {
    num2 = displayValue;
    let result = operate(Number(num1), Number(num2), operation);
    if (typeof(result)=="string") {}
    else {
      result = Math.round(result*"1e8")*"1e-8";
      if (result > Number.MAX_SAFE_INTEGER) {
        result = result.toExponential(8);
      };
      //round to 8dp -- represent exponential if too large to be accurate
    };
    display.textContent = result;
    displayValue = display.textContent;
    toggleOpsButtons();
  }
  else if (btnClass=="del") {
    display.textContent = displayValue.slice(0,-1);
    displayValue = display.textContent;
  }
  else if (btnClass=="clear") {
    reset();
  };
};

function addListeners() {
  const btnList = document.querySelectorAll("button");
  btnList.forEach(node => {
    node.addEventListener("click", evnt => performButton(evnt.target))
  });
};


const display = document.querySelector(".display>span");
let displayValue = display.textContent;
let num1;
let num2;
let operation;
reset();
addListeners();
toggleOpsButtons(true);