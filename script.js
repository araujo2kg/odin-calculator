let operand1 = "";
let operand2 = "";
let operator = "";
let result = "";

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    switch (operator) {
        case "+":
            return add(x, y);

        case "-":
            return subtract(x, y);

        case "*":
            return multiply(x, y);

        case "/":
            return divide(x, y);

        default:
            console.log("Invalid operator");
            return "";
    }
}

function updateDisplay() {
    const displayResult = document.querySelector(".display .result");
    const displayOperation = document.querySelector(".display .operation");

    operator
        ? (displayResult.textContent = operand2)
        : (displayResult.textContent = operand1);

    operator
        ? (displayOperation.textContent = `${operand1} ${operator}`)
        : (displayOperation.textContent = operand1);

    if (result || result === 0) {
        displayOperation.textContent = `${operand1} ${operator} ${operand2}`;
        displayResult.textContent = result;
    }
}

function clearAll(chain = false) {
    if (!chain) operand1 = "";
    operand2 = "";
    operator = "";
    result = "";
}

// Operands
const operandsElements = document.querySelectorAll(".operand");
operandsElements.forEach((element) => {
    element.addEventListener("click", (event) => {
        // If operator is set, update operand2
        if (operator) {
            operand2 += event.target.value;
        } else {
            // If operator is not set, update operand1
            operand1 += event.target.value;
        }
        updateDisplay();
    });
});

// Operators
const operatorsElements = document.querySelectorAll(".operator");
operatorsElements.forEach((element) => {
    element.addEventListener("click", (event) => {
        if (!operator) operator = event.target.value;
        updateDisplay();
    });
});

// Equals
const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", (event) => {
    // If operator not set, ignore equal operation
    if (!operator) return 1;
    result = operate(+operand1, operator, +operand2);
    updateDisplay();
    // Set operand1 to the result, for possible chain operation
    operand1 = result;
    clearAll(true);
});

// Clear button
const clearElement = document.querySelector(".clear");
clearElement.addEventListener("click", (event) => {
    clearAll();
    updateDisplay();
});
