import TextBox from "./TextBox";
import Switch from "./Switch";
import CheckBox from "./CheckBox";
import RadioButton from "./RadioButton";
import RadioButtonGroup from "./RadioButtonGroup";
import "./styles.css";

const lockIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm260.168-200Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96Z"/></svg>;

const visibilityIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Z"/></svg>;

const doneIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"/></svg>;

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>;

export default function App() {
  return (
    <div style={{padding: 20}}>
		TODO:
		<ol>
			<li>textbox - border color animated from middle</li>
			<li>switch - hover feedback</li>
			<li>switch - color support</li>
			<li>checkbox - hover feedback</li>
			<li>checkbox - color support</li>
			<li>radio - hover feedback</li>
			<li>radio - color support</li>
		</ol>
		<div className="components">
			<div className="component">
				<h2>&lt;TextBox /&gt;</h2>
				<div className="textboxes">
					<TextBox />
					<TextBox label="Email" placeholder="name@domain.com" type="email" />
					<TextBox label="Password" type="password" />
					<TextBox label="Required" required={true} value="Default value" />
					<TextBox label="Disabled" disabled={true} />
					<TextBox label="Error" errorMsg={"Error message"} />
					<TextBox label="Icons" iconLeft={lockIcon} iconRight={visibilityIcon} />
					<TextBox label="Gold" placeholder="Gold" color="gold" />
				</div>
			</div>
			<div className="component">
				<h2>&lt;Switch /&gt;</h2>
				<div className="switches">
					<Switch />
					<Switch checked={true} labelRight={true} labelText="Pre-checked" />
					<Switch disabled={true} labelRight={true} labelText="Disabled" />
					<Switch disabled={true} checked={true} labelRight={true} labelText="Pre-checked disabled" />
					<Switch iconOn={doneIcon} iconOff={closeIcon} labelRight={true} labelText="Icons" />
					<Switch labelText="Label on left of switch" />
				</div>
			</div>
			<div className="component">
				<h2>&lt;CheckBox /&gt;</h2>
				<div className="checkboxes">
					<CheckBox />
					<CheckBox checked={true} labelRight={true} labelText="Pre-checked" />
					<CheckBox indeterminate={true} labelRight={true} checked={true} labelText="Indeterminate" />
					<CheckBox disabled={true} labelRight={true} labelText="Disabled" />
					<CheckBox disabled={true} checked={true}  labelRight={true} labelText="Pre-checked disabled" />
					<CheckBox labelText="Label on left of checkbox" />
				</div>
			</div>
			<div className="component">
				<h2>&lt;RadioButton /&gt;</h2>
				<div className="radios">
					<RadioButton />
					<RadioButton checked={true} labelRight={true} labelText="Pre-checked" />
					<RadioButton disabled={true} labelRight={true} labelText="Disabled" />
					<RadioButton disabled={true} checked={true}  labelRight={true} labelText="Pre-checked disabled" />
					<RadioButton labelText="Label on left of radio button" />
				</div>
			</div>
			<div className="component">
				<h2>&lt;RadioButtonGroup /&gt;</h2>
				<div className="radios">
					<RadioButtonGroup 
						name="radioButtonGroup" 
						radios={[
							{ value: 1, labelText: "Radio 1" },
							{ value: 2, labelText: "Radio 2" },
							{ value: 3, labelText: "Radio 3" },
							{ value: 4, disabled: true, labelText: "Disabled" },
							{ value: 5, labelText: "Radio 5" }
						]} />
				</div>
			</div>
			<div className="component">
				<h2>&lt;SegmentedButton /&gt;</h2>
				<div className="segmented">
					{/* <SegmentedButton 
						name="segmentedButton" 
						buttons={[
							{ value: 1, labelText: "Button 1" },
							{ value: 2, labelText: "Button 2" },
							{ value: 3, labelText: "Button 3" },
							{ value: 4, disabled: true, labelText: "Disabled Button" },
							{ value: 5, labelText: "Button 5" }
						]} /> */}
				</div>
			</div>
		</div>
	</div>
  );
}
