import { useState } from "react"
import "./Button.css";

export default function Button(props) {
    const {
        buttonText = "Text",
        buttonColor = "#6750a4",
        textColor = "#ffffff",
        disabled,
        width,
        handleClick
    } = props

    const buttonClass = () => {
        const button = "button"
        let clazz = button
        if (disabled) {
            clazz = clazz + ` ${button}--disabled`
        }
        return clazz
    }

    return (
        <div className={buttonClass()} style={{ width: width }}>
            <button
                type="button"
                className="button__button"
                style={{ color: buttonColor }}
                onClick={(e) => handleClick(e)}>
                <span className="button__text" style={{ color: textColor }}>
                    {buttonText}
                </span>
            </button>
        </div>
    )
}