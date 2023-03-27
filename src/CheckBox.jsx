import { useState } from "react";
import "./CheckBox.css";

const doneIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M378 834 130 586l68-68 180 180 383-383 68 68-451 451Z"/></svg>;
const removeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M183 623v-94h594v94H183Z"/></svg>;

export default function CheckBox(props) {

    const { 
        checked = false, 
        labelText = "", 
        labelRight = false,
        disabled,
        indeterminate,
        color = "#6750a4"
    } = props;
    
    const [inputChecked, setInputChecked] = useState(checked);
    const [inputIndeterminate, setInputIndeterminate] = useState(indeterminate);
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
            if (inputIndeterminate) {
                clazz = clazz + ` ${label}--indeterminate`;
            }
        }
        if (inputDisabled) {
            clazz = clazz + ` ${label}--disabled`;
        }
        return clazz;
    }

    return (
        <div className="checkbox">
            <div className="checkbox__contain">
                <label className={checkBoxClass()} style={{color: color}}>
                    {labelText ? <div className="checkbox__text">{labelText}</div> : ``}
                    <div className="checkbox__control">
                        <span className="checkbox__icon checkbox__icon--check">
                            {doneIcon}
                        </span>
                        <span className="checkbox__icon checkbox__icon--indeterminate">
                            {removeIcon}
                        </span>
                    </div>
                    <div className="checkbox__circle"></div>
                    <input onChange={(e) => onChange(e)} disabled={inputDisabled} checked={inputChecked} type="checkbox" className="checkbox__input" />
                </label>
            </div>
        </div>
  );
}
