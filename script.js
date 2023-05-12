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
      break;
    default :
      result = num2; //returns current display if no operator clicked, x==x
  };
  return result;
};

function produceOutput() {
  num2 = displayValue;
  let result = operate(Number(num1), Number(num2), operation);
  if (typeof(result)!="string") {//if Error thrown don't try to round it
    result = Math.round(result*"1e8")*"1e-8";
    if (result > Number.MAX_SAFE_INTEGER) {
      result = result.toExponential(8);
    };
    //round to 8dp -- represent as exponential if too large to be accurate
  };
  display.textContent = result;
  displayValue = display.textContent;
  operation = "";
  isOpSelected = false;
};

function reset() {
num1 = "0";
num2 = "0";
operation = "";
isOpSelected = false;
display.textContent = "0";
displayValue = display.textContent;
};

function switchToNum2() { //called when operation selected
  isOpSelected = true;
  num1 = displayValue;
  display.textContent = 0;
  displayValue = display.textContent;
}; 

function performButton(target) {
  const btnClass = target.className;
  if (display.textContent == "Maths Error") {
    display.textContent="0";
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
    if (!displayValue.includes(".")) { //if number is not already a decimal
      display.textContent = displayValue + ".";
      displayValue = display.textContent;
    };
  }
  else if (btnClass.slice(0,8)=="operator") {
    if (isOpSelected===true) { 
      //2 numbers chosen already - firstly implicitly calculate result
      //then below select the operator and take previous result as num1
      produceOutput();
    };
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
    produceOutput();
    isOpSelected = false;
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
let isOpSelected = false;
reset();
addListeners();