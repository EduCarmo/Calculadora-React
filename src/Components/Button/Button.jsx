import React from 'react'
import './Button.css'

const Button = ({ label, onClick }) => {

    const classNames =
        `
            button 
            ${["/", "*", "-", "+", "="].includes(label) ? 'operation' : ''}
            ${label === "AC" ? 'triple' : ''}
            ${label === "0" ? 'double' : ''} 
        `

    return (
        <>
            <button
                className={classNames}
                onClick={onClick}
            >
                {label}
            </button>
        </>
    );
};

export default Button;