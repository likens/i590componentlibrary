import { useState } from "react";
import "./Switch.css";

export default function Switch(props) {

    const { 
        checked = false, 
        labelText = "", 
        labelRight = false,
        disabled,
        iconOn,
        iconOff,
        color = "#671fda"
    } = props;
    
    const [inputChecked, setInputChecked] = useState(checked);
    const [inputDisabled, setInputDisabled] = useState(disabled);

    const onChange = (e) => {
        setInputChecked(e.target.checked);
    }

    const switchClass = () => {
        const label = "switch__label"
        let clazz = label;
        if (labelRight) {
            clazz = clazz + ` ${label}--right`;
        }
        if (inputChecked) {
            clazz = clazz + ` ${label}--checked`;
        }
        if (inputDisabled) {
            clazz = clazz + ` ${label}--disabled`;
        }
        if (iconOff) {
            clazz = clazz + ` ${label}--icon-off`;
        }
        if (iconOn) {
            clazz = clazz + ` ${label}--icon-on`;
        }
        return clazz;
    }

    return (
        <div className="switch">
            <div className="switch__contain">
                <label className={switchClass()}>
                    {labelText ? <div className="switch__text">{labelText}</div> : ``}
                    <div className="switch__control">
                        <div className="switch__track"></div>
                        <div className="switch__thumb">
                            {iconOff ? <span className="switch__icon switch__icon--off">{iconOff}</span> : ``}
                            {iconOn ? <span className="switch__icon switch__icon--on">{iconOn}</span> : ``}
                        </div>
                    </div>
                    <input onChange={(e) => onChange(e)} disabled={inputDisabled} checked={inputChecked} type="checkbox" className="switch__input" />
                </label>
            </div>
        </div>
  );
}
