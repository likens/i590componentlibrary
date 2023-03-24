import TextBox from "./TextBox";
import Switch from "./Switch";
import "./styles.css";

export default function App() {
  return (
    <div style={{padding: 20}}>
		TODO:
		<ol>
			<li>border color animated from middle</li>
			<li>leading/trailing icons</li>
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
					<TextBox label="Gold" placeholder="Gold" color="gold" />
				</div>
			</div>
			<div className="component">
				<h2>&lt;Switch /&gt;</h2>
				<div className="switches">
					<Switch />
				</div>
			</div>
		</div>
		</div>
  );
}
