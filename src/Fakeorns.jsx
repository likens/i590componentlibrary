import { useEffect, useState } from "react"

const START_AGE = 35;
const END_AGE = 75;
const BORDER = 0;
const GAP = 5;
const BUFFER = 20;

function calcInvested(init, years, amount, freq) {
    const invested = [init];
    for (let i = 1; i <= years; i++) {
        invested.push(init + (amount * freq * i))
    }
    return invested;
}

function calcReturns(init, freq, years, rate, amount) {
    let pFV = init;
    let conFV = 0
    let returns = []
    for (let i = 0; i < (freq * years); i++) {
        pFV = pFV * (1 + rate / freq)
        conFV = conFV * (1 + rate / freq) + amount
        returns.push(Math.round(pFV + conFV - amount * (i + 1) + init))
    }
    returns.unshift(0);
    return returns.filter((e, i) => i % freq === 0);
}

function calcData(init, years, amount, freq, rate) {
    const invested = calcInvested(init, years, amount, freq);
    const returns = calcReturns(init, freq, years, (rate / 100), amount);
    const data = [];
    for (let i = 0; i <= years; i++) {
        data.push({
            invested: invested[i],
            return: returns[i],
            year: i,
            total: invested[i] + returns[i]
        })
    }
    return data;
}

function calcBarAttr(bar) {
    let rect;
    let total;
    if (bar.classList.contains("bar-return")) {
        // draggedover on the return bar
        rect = bar.getBoundingClientRect();
        total = rect.height + bar.parentElement.querySelector(".bar-invest").getBoundingClientRect().height;
    } else if (bar.classList.contains("bar-invest")) {
        // draggedover on the invest bar
        rect = bar.parentElement.querySelector(".bar-return").getBoundingClientRect();
        total = rect.height + bar.getBoundingClientRect().height;
    } else if (bar.classList.contains("bar-full")) {
        // draggedover on empty space
        rect = bar.querySelector(".bar-return").getBoundingClientRect();
        total = rect.height + bar.querySelector(".bar-invest").getBoundingClientRect().height;
    }
    return {
        rect, 
        total
    }
}

function calcDollarAmount(value) {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0 });
}

const Bar = (props) => {

    const {bar, age, index, max, flip, isActive, draggedOver} = props;

    const width = "100%";

    const onDragOver = (e) => {
        const {rect, total} = calcBarAttr(e.target);
        draggedOver(rect,total,index)
    }

    const showNumber = age % 5 === 0;

    return (
        <div id={`bar_${index}`} 
            className="bar-full"    
            style={{
                position: 'relative', 
                zIndex: isActive ? 30 : 20,
                userSelect: "none",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column-reverse",
                alignContent: "flex-end",
                borderWidth: `0 ${BORDER}px`,
                borderStyle: "solid",
                borderColor: "#fff"}} 
                onDragOver={onDragOver}>
            <div className="bar-invest" id={`invested_${index}`}  style={{
                width: width, 
                height: `${(bar.invested / max) * 100}%`, 
                background: "#b89fe1",
                borderRadius: "10px 10px 0 0",
                display: 'flex',
                alignItems: 'flex-end'}}></div>
            <div className="bar-return" id={`return_${index}`} style={{
                width: width, 
                position: 'relative',
                height: `${(bar.return / max) * 100}%`, 
                borderRadius: "10px 10px 0 0",
                background: "#2D2249"}}>
                <div style={{
                    pointerEvents: "none",
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    background: "#fff",
                    padding: 5,
                    color: "#000",
                    whiteSpace: "nowrap",
                    borderRadius: 5,
                    fontSize: 12,
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? "visible" : "hidden",
                    transition: "all .2s ease",
                    transform: `translate(${flip ? `115px` : `-25px`}, calc(-50% + ${flip ? `-50px` : `-15px`}))`}}>
                    <strong>{age} years old</strong>
                    <div style={{display:"flex", alignItems: "center", gap: 5}}>
                        <div style={{borderRadius: 10, width: 10, height: 10, background: "#b89fe1"}}></div>
                        Invested: {calcDollarAmount(bar.invested)}
                    </div>
                    <div style={{display:"flex", alignItems: "center", gap: 5}}>
                        <div style={{borderRadius: 10, width: 10, height: 10, background: "#2D2249"}}></div>
                        Returns: {calcDollarAmount(bar.return)}
                    </div>
                </div>
            </div>
            <div style={{
                textAlign: 'center',
                position: 'absolute', 
                top: "calc(100% + 8px)", 
                left: "50%",
                transform: "translateX(-50%)", 
                fontWeight: 700, 
                fontSize: 12,
                userSelect: 'none',
                pointerEvents: "none",
                opacity: showNumber ? 1 : 0,
                visibility: showNumber ? "visible" : "hidden"
            }}>{age}</div>
        </div>
    )
}

export default function Fakeorns() {
    
    const [contributionAmount, setContributionAmount] = useState(10);
    const [contributionInit, setContributionInit] = useState(contributionAmount * 365);
    const [numberOfYears, setNumberOfYears] = useState(END_AGE - START_AGE);
    const [returnRate, setReturnRate] = useState(5);
    const [dotProps, setDotProps] = useState({top: 0, left: 0, size: 20})
    const [barProps, setBarProps] = useState({top: 0, left: 0})
    const [dragProps, setDragProps] = useState({top: 0, left: 0, size: 20, initial: true});
    const [activeBar, setActiveBar] = useState(undefined);

    const initBar = Math.floor(numberOfYears * .75);

    const onChange = (e) => {
        const { name, value } = e.target;
        const v = Math.abs(parseFloat(value));
        switch (name) {
            case 'initial':
                setContributionInit(v);
                break;
            case 'contribution':
                setContributionAmount(v);
                break;
            case 'rate':
                setReturnRate(v);
                break;
            default:
                // do nothing
                break;
        }
    };

    const onDragOver = (e, total, active) => {
        setActiveBar(active)
        setDotProps({ 
            top: e.top - BUFFER, 
            left: e.left - BUFFER,
            size: e.width + 10
        });
        setBarProps({ 
            top: 0 - BUFFER, 
            left: e.left - BUFFER, 
            width: e.width ? e.width : barProps.width,
            height: total
        });
        setDragProps({ 
            top: 0, 
            left: e.left - BUFFER, 
            size: e.width ? e.width : dragProps.size
        });
    }

    const bars = [];
    const data = calcData(contributionInit, numberOfYears, contributionAmount, 365, returnRate);
    const max = data[data.length - 1].total;

    for (let i = 0; i <= data.length; i++) {
        const bar = data[i];
        if (bar) {
            const age = START_AGE + bar.year;
            bars.push(
                <Bar draggedOver={(e,t,a) => onDragOver(e, t, a)}
                    bar={bar} 
                    age={age} 
                    max={max}
                    flip={bar.year < 10}
                    isActive={activeBar === i || (initBar === i && activeBar === undefined)}
                    key={i} 
                    index={i} />)
        }
    }

    useEffect(() => {
        const {rect, total} = calcBarAttr(document.getElementById(`bar_${initBar}`));
        onDragOver(rect, total);
    }, [returnRate, contributionAmount, contributionInit])

    return (
        <div className="fakeorns" style={{padding: BUFFER}}>

            <div style={{
                position: "relative", 
                overflow: "hidden", 
                background: "#6750A4", 
                maxWidth: 600, 
                padding: `${BUFFER * 4}px ${BUFFER}px ${BUFFER}px`,
                borderRadius: 15}}>

                <div id="infoBox"
                    style={{
                        fontSize: 14,
                        display: "grid",
                        gap: 7,
                        background: "#2D2249",
                        borderRadius: 10,
                        padding: BUFFER / 2,
                        position: 'absolute',
                        top: BUFFER / 2,
                        left: BUFFER / 2,
                        color: "#fff",
                        zIndex: 60,
                        fontWeight: 700
                    }}>
                    <div style={{fontSize: 20}}>Fake-orns (ages 35-75)</div>
                    <div style={{display: "flex", justifyContent: "space-between", gap: 5, alignItems: "center"}}>Start With: <input type="number"
                        name="initial" 
                        value={contributionInit} 
                        onChange={onChange}
                        style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 14,
                            fontFamily: "inherit",
                            padding: "2px 4px",
                            background: 0,
                            border: "2px solid rgba(255,255,255,.25)",
                            width: 75,
                            borderRadius: 10
                        }} /></div>
                    <div style={{display: "flex", justifyContent: "space-between", gap: 5, alignItems: "center"}}>Daily Cont. ($):<input type="number" name="contribution" value={contributionAmount} onChange={onChange} style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 14,
                            fontFamily: "inherit",
                            padding: "2px 4px",
                            background: 0,
                            border: "2px solid rgba(255,255,255,.25)",
                            width: 75,
                            borderRadius: 10
                        }} /></div>
                    <div style={{display: "flex", justifyContent: "space-between", gap: 5, alignItems: "center"}}>Growth Rate (%):<input type="number" name="rate" value={returnRate} onChange={onChange} style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 14,
                            fontFamily: "inherit",
                            padding: "2px 4px",
                            background: 0,
                            border: "2px solid rgba(255,255,255,.25)",
                            width: 75,
                            borderRadius: 10
                        }} /></div>
                </div>

                <div id="selectorDrag"
                    draggable={true}
                    style={{position: 'absolute',
                    zIndex: 50,
                    top: 0,
                    left: 0,
                    height: "100%",
                    color: "transparent",
                    background: "transparent",
                    cursor: "grab",
                    width: dotProps.size,
                    transform: `translate(${dragProps.left - (dotProps.size/4)}px, ${dragProps.top}px)`}}></div>

                <div id="indicator" 
                    style={{
                        position: "absolute", 
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        zIndex: 40,
                        // top: 0, 
                        bottom: 0,
                        left: 0,
                        width: dragProps.size,
                        height: "auto",
                        transition: "all .2s ease",
                        transform: `translate(${dotProps.left}px, -16px)` // ${dotProps.top}
                        }}>

                    <div id="selectorThumb" style={{ 
                            position: "relative",
                            zIndex: 20,
                            borderRadius: "50%", 
                            cursor: "grab",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: dotProps.size,
                            minHeight: dotProps.size,
                            background: "#fff",
                            transition: "all .2s ease",
                            // border: "2px solid #000",
                            transform: `translate(0, -${dotProps.size/2}px)`}}>
                        <div style={{width: "35%", height: "35%", borderRadius: "50%", background: "#2D2249"}}></div>
                    </div>

                    <div id="selectorBar" style={{
                        position: "relative",
                        zIndex: 10,
                        cursor: "grab",
                        minWidth: barProps.width,
                        minHeight: barProps.height,
                        // border: "2px solid #000",
                        transition: "all .2s ease",
                        transform: `translateY(-${dotProps.size}px)`,
                        background: "#fff"}}></div>
                    
                </div>

                <div style={{
                    display: 'grid',
                    alignItems: 'flex-end',
                    gridTemplateColumns: `repeat(${numberOfYears + 1}, 1fr)`,
                    width: "100%",
                    height: 500,
                    gap: GAP,
                    paddingBottom: 15,
                    color: "#fff"}}>{bars}</div>
            </div>
        </div>
    );
}
