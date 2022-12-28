class Calculator {
  constructor(previousOpElement, currentOpElement) {
    this.previousOpElement = previousOpElement;
    this.currentOpElement = currentOpElement;

    this.previousOp = "";
    this.currentOp = "";
    this.operation = undefined;

    this.clear();
  }
  clear() {
    this.previousOp = "";
    this.currentOp = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOp = this.currentOp.slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOp === "") return;
    if (this.previousOp !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOp = this.currentOp;
    this.currentOp = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOp);
    const current = parseFloat(this.currentOp);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOp = computation;
    this.previousOp = "";
    this.operation = undefined;
  }

  getNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let finalNumber;

    if (isNaN(integerDigits)) {
      finalNumber = "";
    } else {
      finalNumber = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDigits}.${decimalDigits}`;
    } else {
      return finalNumber;
    }
  }

  updateDisplay() {
    this.currentOpElement.innerText = this.getNumber(this.currentOp);
    if (this.operation != null) {
      this.previousOpElement.innerText = `${this.getNumber(this.previousOp)} ${
        this.operation
      }`;
    } else {
      this.previousOpElement.innerText = "";
    }
  }
}

const operationButtons = document.querySelectorAll(`[data-operation]`);
const numberButtons = document.querySelectorAll(`[data-number]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deletionButton = document.querySelector(`[data-deletion]`);
const allClearButton = document.querySelector(`[data-clearAll]`);
const previousOperandElement = document.querySelector(
  `[data-previous-operand]`
);
const currentOperandElement = document.querySelector(`[data-current-operand]`);

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deletionButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
