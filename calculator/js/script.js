'use strict';

const buttons = document.querySelectorAll('.button');
const result = document.querySelector('.result');
const clearB = document.querySelector('.clear-button');
const operator = document.querySelector('.sign');
let op = '';
let initialV = '';
let currV = '';
let decimalUsed = false;
operator.style.display = 'none';
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (!isNaN(button.textContent) || button.textContent === '.') {
      if (button.textContent === '.') {
        if (decimalUsed) {
          return; // Skip adding the decimal if it's already used
        }
        decimalUsed = true;
      }
      currV += button.textContent;
      result.value = currV;
    }

    if (
      isNaN(button.textContent) &&
      button.textContent !== '=' &&
      button.textContent !== '.' &&
      button.textContent !== 'C'
    ) {
      op = button.textContent;
      initialV = result.value;
      operator.style.display = 'block';
      operator.innerHTML = button.textContent;
      currV = '';
    } else if (
      button.textContent === '=' &&
      button.textContent !== '.' &&
      initialV !== '' &&
      currV !== ''
    ) {
      const resultOp = operations(op, Number(initialV), Number(currV));

      result.value = resultOp;
      initialV = resultOp;
      op = '';
    }

    if (button.textContent === 'C') {
      result.value = 0;
      initialV = '';
      currV = '';
      op = '';
    }
  });
});

const operation_add = function (initialV, currV) {
  currV = initialV + currV;
  return currV;
};

const operation_sub = function (initialV, currV) {
  currV = initialV - currV;
  return currV;
};

const operation_mul = function (initialV, currV) {
  currV = initialV * currV;
  return currV;
};

const operation_div = function (initialV, currV) {
  currV = initialV / currV;
  return currV;
};

const operations = function (op, initialV, currV) {
  switch (op) {
    case '+':
      return operation_add(initialV, currV);
    case '-':
      return operation_sub(initialV, currV);
    case '*':
      return operation_mul(initialV, currV);
    case '/':
      return operation_div(initialV, currV);
  }
};
