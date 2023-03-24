import { useState } from "react";

const TextBoxTypes = {
    text: "text",
    email: "email",
    password: "password"
}

export default function TextBox(props) {

  const { 
        type = TextBoxTypes.text, 
        value, 
        label = "Label", 
        placeholder = "Placeholder", 
        helperMsg,
        errorMsg, 
        disabled,
        required,
        color = "#671fda"
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
    setInputValue(e.target.value);
    if (e.target.value) {
        setInputActivated(true);
    } else {
        setInputActivated(false)
    }
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
        <div className="textbox__contain" style={{color: color}}>
            <label className={textBoxClass()}>
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
            </label>
            <div className="textbox__helper">
                {textBoxHelper()}
            </div>
        </div>
    </div>
  );
}
