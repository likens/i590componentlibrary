import { useState } from "react";
import SegmentedButton from "./SegmentedButton";

export default function SegmentedButtonGroup(props) {

    const { 
        name,
        buttons,
        labelRight = true,
        color = "#671fda"
    } = props;

    const [value, setValue] = useState("");

    const buttonChanged = (id) => {
        setValue(id);
    }

    return (
        <div className="seg-btn-group">
            <div className="seg-btn-group__contain">
                {buttons.map((btn,i) =>
                    <SegmentedButton 
                        color={color}
                        buttonChanged={(id) => buttonChanged(id)}
                        id={btn.id ? btn.id : btn.value} 
                        key={i} 
                        name={name} 
                        checked={value === btn.value}
                        {...btn} />
                    )}
            </div>
        </div>
  );
}
