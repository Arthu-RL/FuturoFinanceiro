import { CSSProperties } from "react";
import "./Box.css";

type InvestType = {
    text: string;
    lineColor?: string;
    lineWidth?: string; 
    textAlign?: "left" | "center" | "right"; 
    textColor?: string;
};

function Box({
    text,
    lineColor = "rgba(0, 0, 0, 0.8)",
    lineWidth = "2px",
    textAlign = "center",
    textColor = "#333"
}: InvestType) {
    const lineStyle = {
        "--line-color": lineColor,
        "--line-border-width": lineWidth,
        "--line-hover-color": lineColor,
    } as CSSProperties;

    const textStyle = {
        textAlign,
        color: textColor,
    } as CSSProperties;

    return (
        <div className="box">
            <div className="line" style={lineStyle}></div>
            <div>
                <p style={textStyle}>{text}</p>
            </div>
            <div className="line" style={lineStyle}></div>
        </div>
    );
};

export default Box;
