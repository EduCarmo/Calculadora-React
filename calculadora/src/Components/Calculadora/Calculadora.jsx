import React, { useState } from 'react';
import './Calculadora.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

const Calculadora = () => {
    const buttonLabels = [
        "AC", "/", "7", "8", "9", "*",
        "4", "5", "6", "-", "1", "2",
        "3", "+", "0", ".", "="
    ];

    const [displayValue, setDisplayValue] = useState("0");
    const [operation, setOperation] = useState(null);
    const [values, setValues] = useState([0, 0]);
    const [current, setCurrent] = useState(0);
    const [clearDisplay, setClearDisplay] = useState(false);

    const handleAddDigit = (digit) => {
        if (digit === "." && displayValue.includes(".")) return;

        const shouldClearDisplay = displayValue === "0" || clearDisplay;
        const currentValue = shouldClearDisplay ? "" : displayValue;
        const newDisplayValue = currentValue + digit;

        setDisplayValue(newDisplayValue);
        setClearDisplay(false);

        const newValue = parseFloat(newDisplayValue);
        const updatedValues = [...values];
        updatedValues[current] = newValue;
        setValues(updatedValues);
    };

    const handleClearMemory = () => {
        setDisplayValue("0");
        setOperation(null);
        setValues([0, 0]);
        setCurrent(0);
        setClearDisplay(false);
    };

    const calculate = (value1, value2, operation) => {
        switch (operation) {
            case "+": return value1 + value2;
            case "-": return value1 - value2;
            case "*": return value1 * value2;
            case "/": return value2 !== 0 ? value1 / value2 : "Erro";
            default: return value1;
        }
    };

    const handleSetOperation = (nextOperation) => {
        if (current === 0) {
            setOperation(nextOperation);
            setCurrent(1);
            setClearDisplay(true);
        } else {
            const result = calculate(values[0], values[1], operation);
            setDisplayValue(result.toString());
            setValues([result, 0]);
            setOperation(nextOperation);
            setCurrent(1);
            setClearDisplay(true);
        }
    };

    return (
        <div className='calculator'>
            <Display value={displayValue} />
            {buttonLabels.map((label, index) => (
                <Button
                    key={index}
                    label={label}
                    onClick={
                        label === "AC" ? handleClearMemory :
                        !isNaN(label) || label === "." ? () => handleAddDigit(label) :
                        ["+", "-", "*", "/", "="].includes(label) ? () => handleSetOperation(label) :
                        undefined
                    }
                />
            ))}
        </div>
    );
};

export default Calculadora;
