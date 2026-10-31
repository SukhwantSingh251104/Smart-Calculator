/* =========================================
   SMART CALCULATOR
   STEP 3 — JAVASCRIPT
   ========================================= */


/* =========================================
   1. GET HTML ELEMENTS
   ========================================= */

const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

const clearButton = document.getElementById("clear-button");
const equalsButton = document.getElementById("equals-button");

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

const actionButtons = document.querySelectorAll("[data-action]");


/* =========================================
   2. CALCULATOR VARIABLES
   ========================================= */

let currentValue = "0";
let previousValue = "";
let operation = null;
let shouldResetDisplay = false;


/* =========================================
   3. UPDATE DISPLAY
   ========================================= */

function updateDisplay() {

    currentDisplay.textContent = currentValue;

    if (previousValue && operation) {

        previousDisplay.textContent =
            `${previousValue} ${getOperationSymbol(operation)}`;

    } else {

        previousDisplay.textContent = "";

    }
}


/* =========================================
   4. OPERATION SYMBOLS
   ========================================= */

function getOperationSymbol(operation) {

    switch (operation) {

        case "add":
            return "+";

        case "subtract":
            return "−";

        case "multiply":
            return "×";

        case "divide":
            return "÷";

        default:
            return "";

    }
}


/* =========================================
   5. ENTER NUMBER
   ========================================= */

function enterNumber(number) {

    if (currentValue === "Error") {
        clearCalculator();
    }


    if (shouldResetDisplay) {

        currentValue = number;

        shouldResetDisplay = false;

    } else {

        if (number === "." && currentValue.includes(".")) {
            return;
        }


        if (currentValue === "0" && number !== ".") {

            currentValue = number;

        } else {

            currentValue += number;

        }

    }


    updateDisplay();
}


/* =========================================
   6. CHOOSE OPERATION
   ========================================= */

function chooseOperation(selectedOperation) {

    if (currentValue === "Error") {
        return;
    }


    if (operation !== null && !shouldResetDisplay) {

        calculate();

    }


    previousValue = currentValue;

    operation = selectedOperation;

    shouldResetDisplay = true;

    updateDisplay();
}


/* =========================================
   7. CALCULATE RESULT
   ========================================= */

function calculate() {

    if (
        operation === null ||
        previousValue === "" ||
        currentValue === "Error"
    ) {
        return;
    }


    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;


    switch (operation) {

        case "add":

            result = firstNumber + secondNumber;

            break;


        case "subtract":

            result = firstNumber - secondNumber;

            break;


        case "multiply":

            result = firstNumber * secondNumber;

            break;


        case "divide":

            if (secondNumber === 0) {

                currentValue = "Error";

                previousValue = "";

                operation = null;

                updateDisplay();

                return;

            }

            result = firstNumber / secondNumber;

            break;

    }


    /* Prevent extremely long decimal results */

    result = parseFloat(result.toFixed(10));


    currentValue = String(result);

    previousValue = "";

    operation = null;

    shouldResetDisplay = true;

    updateDisplay();
}


/* =========================================
   8. CLEAR CALCULATOR
   ========================================= */

function clearCalculator() {

    currentValue = "0";

    previousValue = "";

    operation = null;

    shouldResetDisplay = false;

    updateDisplay();
}


/* =========================================
   9. BACKSPACE
   ========================================= */

function backspace() {

    if (currentValue === "Error") {

        clearCalculator();

        return;

    }


    if (shouldResetDisplay) {
        return;
    }


    if (currentValue.length === 1) {

        currentValue = "0";

    } else {

        currentValue =
            currentValue.slice(0, -1);

    }


    updateDisplay();
}


/* =========================================
   10. PERCENTAGE
   ========================================= */

function percentage() {

    if (currentValue === "Error") {
        return;
    }


    const number = parseFloat(currentValue);

    currentValue = String(number / 100);

    updateDisplay();
}


/* =========================================
   11. NUMBER BUTTON EVENTS
   ========================================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        enterNumber(number);

    });

});


/* =========================================
   12. OPERATION BUTTON EVENTS
   ========================================= */

operationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedOperation =
            button.dataset.operation;

        chooseOperation(selectedOperation);

    });

});


/* =========================================
   13. CLEAR BUTTON
   ========================================= */

clearButton.addEventListener("click", () => {

    clearCalculator();

});


/* =========================================
   14. EQUALS BUTTON
   ========================================= */

equalsButton.addEventListener("click", () => {

    calculate();

});


/* =========================================
   15. OTHER ACTION BUTTONS
   ========================================= */

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;


        if (action === "backspace") {

            backspace();

        }


        if (action === "percentage") {

            percentage();

        }

    });

});


/* =========================================
   16. KEYBOARD SUPPORT
   ========================================= */

document.addEventListener("keydown", (event) => {

    const key = event.key;


    /* Numbers */

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        enterNumber(key);

        return;

    }


    /* Addition */

    if (key === "+") {

        chooseOperation("add");

        return;

    }


    /* Subtraction */

    if (key === "-") {

        chooseOperation("subtract");

        return;

    }


    /* Multiplication */

    if (key === "*") {

        chooseOperation("multiply");

        return;

    }


    /* Division */

    if (key === "/") {

        event.preventDefault();

        chooseOperation("divide");

        return;

    }


    /* Equals */

    if (key === "Enter" || key === "=") {

        calculate();

        return;

    }


    /* Backspace */

    if (key === "Backspace") {

        backspace();

        return;

    }


    /* Escape = Clear */

    if (key === "Escape") {

        clearCalculator();

        return;

    }


    /* Percentage */

    if (key === "%") {

        percentage();

        return;

    }

});


/* =========================================
   17. INITIAL DISPLAY
   ========================================= */

updateDisplay();