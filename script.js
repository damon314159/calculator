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
  switch (operation.toString()) {
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

let num1;
let num2;
let operation;
