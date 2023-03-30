import { useState, useEffect } from "react";
import RadioButton from "./RadioButton";

export default function RadioButtonGroup(props) {

    const { 
        name,
        radios,
        alignRight = false,
        horizontal = false,
        labelRight = true,
        color = "#671fda",
        handleChange
    } = props;

    const [value, setValue] = useState("");

    useEffect(() => {
        radios.forEach(rdo => rdo.default ? setValue(rdo.value) : undefined);
    }, [])

    const radioChanged = (val) => {
        setValue(val);
        handleChange(val);
    }

    const radioGroupClass = () => {
        const group = "radio-group"
        let clazz = group;
        if (alignRight) {
            clazz = clazz + ` ${group}--right`;
        }
        if (horizontal) {
            clazz = clazz + ` ${group}--horizontal`;
        }
        return clazz;
    }

    return (
        <div className={radioGroupClass()}>
            <div className="radio-group__contain">
                {radios.map((rb,i) => 
                    <RadioButton 
                        color={color}
                        radioChanged={(id) => radioChanged(id)}
                        id={rb.id ? rb.id : rb.value} 
                        key={i} 
                        name={name} 
                        labelRight={labelRight}
                        checked={value === rb.value}
                        {...rb} />
                    )}
            </div>
        </div>
  );
}
