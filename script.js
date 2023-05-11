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
      result = divide(num1, num2);
  };
  return result;
};

function reset() {
let num1 = 0;
let num2 = 0;
let operation = '';
display.textContent = 0;
let displayValue = display.textContent;
const point = document.querySelector(".point");
point.disabled = false;
toggleOpsButtons(true); //sets back to defaults
};

function toggleOpsButtons(toDefault = false) {
  //start with equals off, other ops on
  //switch to other ops off, equals on
  //if argument true, set to defaults, 
  //otherwise simply toggle
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
  if (btnClass.slice(0,3)=="num"){
    if (displayValue==0) {
      display.textContent = btnClass.slice(3,4);
      displayValue = display.textContent;
    } else {
      display.textContent = displayValue + btnClass.slice(3,4);
      displayValue = display.textContent;
    };
  }
  else if (btnClass=="point") {
    //fill in here
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
    //fill in here
  }
  else if (btnClass=="del") {
    //fill in here
  }
  else if (btnClass=="clear") {
    //fill in here
  };
};

function addListeners() {
  const btnList = document.querySelectorAll("button");
  btnList.forEach(node => {
    node.addEventListener("click", evnt => performButton(evnt.target))
  });
};


const display = document.querySelector(".display>span");
let num1;
let num2;
let operation;
let displayValue = display.textContent;
reset();
addListeners();