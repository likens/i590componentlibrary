import { useState } from "react";
import RadioButton from "./RadioButton";

export default function RadioButtonGroup(props) {

    const { 
        name,
        radios,
        labelRight = true,
        color = "#671fda"
    } = props;

    const [value, setValue] = useState("");

    const radioChanged = (val) => {
        setValue(val);
    }

    return (
        <div className="radio-group">
            <div className="radio-group__contain">
                {radios.map((rb,i) => 
                    <RadioButton 
                        radioChanged={(id) => radioChanged(id)}
                        id={rb.id ? rb.id : rb.value} 
                        key={i} 
                        name={name} 
                        labelRight={labelRight}
                        checked={value === rb.value}
                        {...rb} />)}
            </div>
        </div>
  );
}
