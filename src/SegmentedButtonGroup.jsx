import { useState } from "react";

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
        <div className="segmented-button-group">
            <div className="segmented-button-group__contain">
                {buttons.map((btn,i) => {
                    return;
                })}
            </div>
        </div>
  );
}
