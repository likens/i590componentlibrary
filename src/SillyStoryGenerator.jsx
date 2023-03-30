import { useState } from "react"
import TextBox from "./TextBox";
import RadioButtonGroup from "./RadioButtonGroup";
import Button from "./Button";

const defaultFormat = "fahrenheit";
const defaultName = "Bob";
const storyChars = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const storyLocs = ["the soup kitchen", "Disneyland", "the White House"];
const storyActions = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

const selectRandomFromList = (arr) => arr[Math.floor(Math.random() * arr.length)]

export default function SillyStoryGenerator() {

    const [name, setName] = useState(defaultName);
    const [format, setFormat] = useState(defaultFormat)
    const [story, setStory] = useState("");

    const handleClick = () => {
        setStory(generateStory())
    }

    const handleTextBoxChange = (e) => {
        setName(e);
    }

    const handleRadioButtonChange = (e) => {
        setFormat(e);
    }

    const generateStory = () => {
        const temp = `${format === "fahrenheit" ? 94 : 32} ${format}`;
        const weight = format === "fahrenheit" ? "300 pounds" : "21 stone";
        const char = selectRandomFromList(storyChars)
        return (
            <span>
                It was <strong>{temp}</strong> outside, so <strong>{char}</strong> went for a walk. When they got to <strong>{selectRandomFromList(storyLocs)}</strong>, they stared in horror for a few moments, then <strong>{selectRandomFromList(storyActions)}</strong>. <strong>{name}</strong> saw the whole thing, but was not surprised — <strong>{char}</strong> weighs <strong>{weight}</strong>, and it was a hot day.
            </span>
        );
    }

    return (
        <div className="silly-story" style={{display: "grid", gridTemplateColumns: "300px 1fr", gap: 40}}>
            <div>
                <h1>Silly Story Generator</h1>
                <p>To generate a silly story, simply provide your name, select a format of 'US' or 'UK', and click the 'Generate Story' button.</p>
                <TextBox handleChange={handleTextBoxChange} label="Your Name" placeholder="" width={300} />
                <div style={{padding: "15px 0 30px", width: 300}}>
                    <RadioButtonGroup
                        name="format" 
                        alignRight={true}
                        horizontal={true}
                        handleChange={handleRadioButtonChange}
                        radios={[{ value: "fahrenheit", labelText: "US", default: true }, { value: "centigrade", labelText: "UK" }]} />
                </div>
                <Button handleClick={handleClick} buttonText="Generate Random Story" width={300} />
            </div>
            {story ? <div style={{margin: "30px 0", 
                maxWidth: 450, 
                background: "#eee", 
                border: "1px solid #aaa", 
                borderRadius: 10, 
                padding: 20, 
                alignSelf: "flex-start", 
                display: "grid", 
                lineHeight: 1.35,
                gap: 20}}>
                <h3 style={{margin: 0}}>A Silly Story</h3>
                <p style={{margin: 0}}>{story}</p>
            </div> : undefined }
        </div>
    );
}
