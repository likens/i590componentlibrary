import { useState } from "react";
import "./TextBox.css";

const TextBoxTypes = {
    text: "text",
    email: "email",
    password: "password"
}

export default function TextBox(props) {

  const { 
        type = TextBoxTypes.text, 
        value = "", 
        label = "Label", 
        placeholder = "Placeholder", 
        helperMsg,
        errorMsg, 
        disabled,
        required,
        iconLeft,
        iconRight,
        width,
        color = "#6750a4",
        handleChange
    } = props;

    const [inputFocused, setInputFocused] = useState(false);
    const [inputActivated, setInputActivated] = useState(value ? true : false);
    const [inputDisabled, setInputDisabled] = useState(disabled);
    const [inputValue, setInputValue] = useState(value);

    const onFocus = () => {
        setInputFocused(true);
    };

    const onBlur = () => {
        setInputFocused(false);
    };

    const onChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value) {
            setInputActivated(true);
        } else {
            setInputActivated(false)
        }
        handleChange(value);
    }

    const textBoxClass = () => {
        const box = "textbox__box"
        let clazz = box
        if (inputFocused) {
            clazz = clazz + ` ${box}--focused`;
        }
        if (inputActivated) {
            clazz = clazz + ` ${box}--activated`;
        }
        if (inputDisabled) {
            clazz = clazz + ` ${box}--disabled`;
        }
        if (iconLeft) {
            clazz = clazz + ` ${box}--icon-left`
        }
        if (iconRight) {
            clazz = clazz + ` ${box}--icon-right`
        }
        if (errorMsg) {
            clazz = clazz + ` ${box}--error`;
        }
        return clazz;
    }

    const textBoxHelper = () => {
        let helper = "";
        if (required) {
            helper = "*required"
        } else if (helperMsg) {
            helper = helperMsg;
        } else if (errorMsg) {
            helper = errorMsg;
        }
        return helper;
    }

  return (
    <div className="textbox">
        <div className="textbox__contain" style={{color: color, width: width}}>
            <label className={textBoxClass()}>
                {iconLeft ? <span className="textbox__icon textbox__icon--left">{iconLeft}</span> : ``}
                <input
                    disabled={disabled}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e)}
                    className="textbox__input"
                    placeholder={placeholder}
                    value={inputValue}
                    type={type} />
                <span className="textbox__label">
                    {label}{required ? `*` : ``}
                </span>
                <span className="textbox__border"></span>
                {iconRight ? <span className="textbox__icon textbox__icon--right">{iconRight}</span> : ``}
            </label>
            {textBoxHelper() && <div className="textbox__helper">
                {textBoxHelper()}
            </div>}
        </div>
    </div>
  );
}
