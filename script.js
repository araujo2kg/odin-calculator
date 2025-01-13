let operand1 = 0;
let operand2 = 0;
let operator = "+";

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
            add(x, y);
            break;

        case "-":
            subtract(x, y);
            break;

        case "*":
            multiply(x, y);
            break;

        case "/":
            divide(x, y);
            break;

        default:
            console.log("Invalid operator");
    }
}
