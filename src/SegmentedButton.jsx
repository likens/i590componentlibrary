import { useState } from "react";
import "./SegmentedButton.css";

const doneIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M378 834 130 586l68-68 180 180 383-383 68 68-451 451Z"/></svg>;

export default function SegmentedButton(props) {

    const { 
        checked = false, 
        labelText = "", 
        labelRight = false,
        disabled,
        value,
        name,
        id,
        buttonChanged,
        color = "#671fda"
    } = props;
    
    const [inputChecked, setInputChecked] = useState(checked);
    const [inputDisabled, setInputDisabled] = useState(disabled);

    const onChange = (e) => {
        if (buttonChanged) {
            buttonChanged(value);
        } else {
            setInputChecked(e.target.checked);
        }
    }

    const segmentedButtonClass = () => {
        const label = "seg-btn__label"
        let clazz = label;
        if (inputChecked || checked) {
            clazz = clazz + ` ${label}--checked`;
        }
        if (inputDisabled) {
            clazz = clazz + ` ${label}--disabled`;
        }
        return clazz;
    }

    return (
        <label htmlFor={id} className={segmentedButtonClass()} style={{color:color}}>
            <div className="seg-btn__icon">{doneIcon}</div>
            {labelText ? <div className="seg-btn__text">{labelText}</div> : ``}
            <input onChange={(e) => onChange(e)}
                id={id}
                name={name}
                value={value ? value : id}
                disabled={inputDisabled}
                checked={inputChecked}
                type="radio" 
                className="seg-btn__input" />
        </label>
  );
}
