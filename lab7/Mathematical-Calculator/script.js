/* ========================================================
   Lab 7 – Mathematical Calculator Script (script.js)
   ======================================================== */

// --- 1. DOM Element References ---
// Input fields
const firstNumberInput = document.getElementById('firstNumber');
const secondNumberInput = document.getElementById('secondNumber');

// Operation Buttons
const btnAdd = document.getElementById('btnAdd');
const btnSubtract = document.getElementById('btnSubtract');
const btnMultiply = document.getElementById('btnMultiply');
const btnDivide = document.getElementById('btnDivide');
const btnReset = document.getElementById('btnReset');

// Result and Error display elements
const resultBox = document.getElementById('resultBox');
const resFirstNumber = document.getElementById('resFirstNumber');
const resSecondNumber = document.getElementById('resSecondNumber');
const resOperation = document.getElementById('resOperation');
const finalResult = document.getElementById('finalResult');

const errorBox = document.getElementById('errorBox');
const errorMessage = document.getElementById('errorMessage');


// --- 2. Helper Functions ---

/**
 * Validates and retrieves the values from the input fields.
 * Returns an object { num1, num2 } if valid, or null if invalid.
 */
function getInputValues() {
    const val1 = firstNumberInput.value.trim();
    const val2 = secondNumberInput.value.trim();

    // Validation 1: Check for empty input fields
    if (val1 === '' || val2 === '') {
        showError('Please enter numbers in both input fields.');
        return null;
    }

    // Convert string inputs to floating-point numbers
    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);

    // Validation 2: Ensure both parsed values are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        showError('Invalid input! Please enter valid numerical values.');
        return null;
    }

    return { num1, num2 };
}

/**
 * Formats numbers to avoid JavaScript floating-point precision issues
 * (e.g., 0.1 + 0.2 = 0.30000000000000004 -> 0.3).
 */
function formatNumber(num) {
    // Round to maximum 8 decimal places and remove trailing zeros
    return parseFloat(num.toFixed(8));
}

/**
 * Updates and reveals the result section.
 */
function displayResult(num1, num2, operationName, result) {
    // Hide any previous error message
    hideError();

    // Set text values in the summary
    resFirstNumber.textContent = num1;
    resSecondNumber.textContent = num2;
    resOperation.textContent = operationName;
    finalResult.textContent = formatNumber(result);

    // Make the result box visible
    resultBox.classList.remove('hidden');
}

/**
 * Displays an error message and hides the result box.
 */
function showError(message) {
    // Hide result box when there is an error
    resultBox.classList.add('hidden');

    // Display the error text and make error container visible
    errorMessage.textContent = message;
    errorBox.classList.remove('hidden');
}

/**
 * Hides the error message box.
 */
function hideError() {
    errorBox.classList.add('hidden');
    errorMessage.textContent = '';
}


// --- 3. Mathematical Operation Functions ---

/**
 * Performs Addition (+)
 */
function performAddition() {
    const data = getInputValues();
    if (!data) return; // Stop if validation failed

    const sum = data.num1 + data.num2;
    displayResult(data.num1, data.num2, 'Addition (+)', sum);
}

/**
 * Performs Subtraction (-)
 */
function performSubtraction() {
    const data = getInputValues();
    if (!data) return;

    const difference = data.num1 - data.num2;
    displayResult(data.num1, data.num2, 'Subtraction (-)', difference);
}

/**
 * Performs Multiplication (×)
 */
function performMultiplication() {
    const data = getInputValues();
    if (!data) return;

    const product = data.num1 * data.num2;
    displayResult(data.num1, data.num2, 'Multiplication (×)', product);
}

/**
 * Performs Division (÷)
 */
function performDivision() {
    const data = getInputValues();
    if (!data) return;

    // Validation 3: Prevent division by zero
    if (data.num2 === 0) {
        showError('Cannot divide by zero!');
        return;
    }

    const quotient = data.num1 / data.num2;
    displayResult(data.num1, data.num2, 'Division (÷)', quotient);
}

/**
 * Resets the calculator form and hides all results/errors.
 */
function resetCalculator() {
    firstNumberInput.value = '';
    secondNumberInput.value = '';
    resultBox.classList.add('hidden');
    hideError();
    firstNumberInput.focus();
}


// --- 4. Event Listeners ---
// Attaching click event listeners to buttons
btnAdd.addEventListener('click', performAddition);
btnSubtract.addEventListener('click', performSubtraction);
btnMultiply.addEventListener('click', performMultiplication);
btnDivide.addEventListener('click', performDivision);
btnReset.addEventListener('click', resetCalculator);

