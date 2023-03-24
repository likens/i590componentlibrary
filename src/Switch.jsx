import { useState } from "react";

export default function Switch(props) {

    const { 
        checked = false, 
        label = "Label goes here", 
        labelRight = false,
        disabled,
        required,
        color = "#671fda"
    } = props;
    
    const [inputChecked, setInputChecked] = useState(checked);

    return (
        <div className="switch">
            <div className="switch__contain" style={{color: color}}>
                <label className={`switch__label${labelRight ? ` switch__label--right` : ``}`}>
                    <div className="switch__text">{label}</div>
                    <div className="switch__control">
                        <div className="switch__track"></div>
                        <div className="switch__thumb"></div>
                    </div>
                    <input checked={inputChecked} type="checkbox" className="switch__input" />
                </label>
            </div>
        </div>
  );
}
