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

    if (result === Infinity) displayResult.textContent = "What?";
}

function clearAll(chain = false) {
    if (!chain) operand1 = "";
    operand2 = "";
    operator = "";
    result = "";
}

// Operands
function handleOperands(value) {
    // If operator is set, update operand2
    if (operator) {
        if (value === "." && operand2.includes(".")) return 1;
        operand2 += value;
    } else {
        // If operator is not set, update operand1
        if (value === "." && operand1.includes(".")) return 1;
        operand1 += value;
    }
    updateDisplay();
}
const operandsElements = document.querySelectorAll(".operand");
operandsElements.forEach((element) => {
    element.addEventListener("click", (event) => {
        handleOperands(event.target.value);
    });
});

// Operators
function handleOperators(value) {
    // If operator is not set, set it
    if (!operator) {
        operator = value;
    }
    // If operator is set and operands are ready, manually trigger the equals event listener
    else if (operator && operand1 && operand2) {
        let mouseEvent = new MouseEvent("click");
        document.querySelector(".equal").dispatchEvent(mouseEvent);
        // Set the new operator
        operator = value;
    }
    // If operator is set but operand2 is not, just update the operator
    else if (operator && !operand2) operator = value;
    updateDisplay();
}
const operatorsElements = document.querySelectorAll(".operator");
operatorsElements.forEach((element) => {
    element.addEventListener("click", (event) => {
        handleOperators(event.target.value);
    });
});

// Equals
function handleEquals() {
    // If operator not set, ignore equal operation
    if (!operator) return 1;
    result = operate(+operand1, operator, +operand2);
    updateDisplay();
    // Set operand1 to the result, for possible chain operation, converting back to a string
    operand1 = result === Infinity ? "" : result.toString();
    clearAll(true);
}
const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", handleEquals);

// Clear button
function handleClear() {
    clearAll();
    updateDisplay();
}
const clearElement = document.querySelector(".clear");
clearElement.addEventListener("click", handleClear);

// Delete button
function handleDelete() {
    // If operator is set, delete from operand2
    if (operator) {
        operand2 = operand2.slice(0, -1);
    } else {
        // Otherwise delete from operand1
        operand1 = operand1.slice(0, -1);
    }
    updateDisplay();
}
const delElement = document.querySelector(".del");
delElement.addEventListener("click", handleDelete);

// Keyboard support
document.addEventListener("keydown", (event) => {
    // Operands
    if (Number.isInteger(+event.key) || event.key === ".") {
        handleOperands(event.key);
    }
    // Operators
    else if (["*", "/", "-", "+"].includes(event.key)) {
        handleOperators(event.key);
    }
    // Equals
    else if (event.key === "=" || event.key === "Enter") {
        handleEquals();
    }
    // Delete / Backspace
    else if (event.key === "Backspace") {
        handleDelete();
    }
    // Clear
    else if (event.key === "Delete") {
        handleClear();
    }
});
