import { useState } from "react";
import "./RadioButton.css";

export default function RadioButton(props) {

    const { 
        checked = false, 
        labelText = "", 
        labelRight = false,
        disabled,
        value,
        name,
        id,
        radioChanged,
        color = "#671fda"
    } = props;
    
    const [inputChecked, setInputChecked] = useState(checked);
    const [inputDisabled, setInputDisabled] = useState(disabled);

    const onChange = (e) => {
        if (radioChanged) {
            radioChanged(value);
        } else {
            setInputChecked(e.target.checked);
        }
    }

    const radioButtonClass = () => {
        const label = "radio__label"
        let clazz = label;
        if (labelRight) {
            clazz = clazz + ` ${label}--right`;
        }
        if (inputChecked || checked) {
            clazz = clazz + ` ${label}--checked`;
        }
        if (inputDisabled) {
            clazz = clazz + ` ${label}--disabled`;
        }
        return clazz;
    }

    return (
        <div className="radio">
            <div className="radio__contain">
                <label htmlFor={id} className={radioButtonClass()} style={{color: color}}>
                    {labelText ? <div className="radio__text">{labelText}</div> : ``}
                    <div className="radio__control">
                        <span className="radio__icon"></span>
                    </div>
                    <div className="radio__circle"></div>
                    <input onChange={(e) => onChange(e)}
                        id={id}
                        name={name}
                        value={value ? value : id}
                        disabled={inputDisabled}
                        checked={inputChecked}
                        type="radio" 
                        className="radio__input" />
                </label>
            </div>
        </div>
  );
}
