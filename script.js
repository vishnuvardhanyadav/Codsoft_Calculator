document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const num = button.getAttribute('data-num');
            const op = button.getAttribute('data-operator');

            if (num) {
                handleNumber(num);
            } else if (op) {
                handleOperator(op);
            } else if (button.id === 'equals') {
                handleEquals();
            } else if (button.id === 'clear') {
                handleClear();
            }
        });
    });

    function handleNumber(num) {
        if (operator && !firstValue) {
            firstValue = currentInput;
            currentInput = '';
        }
        currentInput += num;
        display.textContent = currentInput;
    }

    function handleOperator(op) {
        if (!operator) {
            operator = op;
            firstValue = currentInput;
            currentInput = '';
        } else {
            handleEquals();
            operator = op;
            currentInput = '';
        }
    }

    function handleEquals() {
        if (operator && currentInput) {
            secondValue = currentInput;
            currentInput = calculate(firstValue, secondValue, operator);
            display.textContent = currentInput;
            firstValue = currentInput;
            secondValue = '';
            operator = '';
        }
    }

    function handleClear() {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        display.textContent = '0';
    }

    function calculate(first, second, operator) {
        const a = parseFloat(first);
        const b = parseFloat(second);
        switch (operator) {
            case 'add':
                return (a + b).toString();
            case 'subtract':
                return (a - b).toString();
            case 'multiply':
                return (a * b).toString();
            case 'divide':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
