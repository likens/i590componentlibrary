import { useState } from "react";

export default function CheckBox(props) {

    const { 
        checked = false, 
        labelText = "", 
        labelRight = false,
        disabled,
        color = "#671fda"
    } = props;
    
    const [inputChecked, setInputChecked] = useState(checked);
    const [inputDisabled, setInputDisabled] = useState(disabled);

    const onChange = (e) => {
        setInputChecked(e.target.checked);
    }

    const checkBoxClass = () => {
        const label = "checkbox__label"
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
        return clazz;
    }

    return (
        <div className="checkbox">
            <div className="checkbox__contain">
                <label className={checkBoxClass()}>
                    {labelText ? <div className="checkbox__text">{labelText}</div> : ``}
                    <div className="checkbox__control">
                        <span className="checkbox__icon checkbox__icon--check"></span>
                        <span className="checkbox__icon checkbox__icon--indeterminate"></span>
                    </div>
                    <input onChange={(e) => onChange(e)} disabled={inputDisabled} checked={inputChecked} type="checkbox" className="checkbox__input" />
                </label>
            </div>
        </div>
  );
}
