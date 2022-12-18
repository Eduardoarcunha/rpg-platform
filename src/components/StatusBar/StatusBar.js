import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "./StatusBar.css";

import { FiMinus, FiPlus, FiEdit } from "react-icons/fi";

export default function StatusBar(props) {
    let color;
    if (props.name === "lifebar") {
        color = "#C2185B";
    } else if (props.name === "sanitybar") {
        color = "#276BB0";
    } else if (props.name === "staminabar") {
        color = "#60C689";
    }

    const stylesP = {
        color: props.bgColor,
    };

    const stylesB = {
        backgroundColor: "transparent",
        color: props.bgColor,
        border: "none",
    };
    function reduceStatus() {
        props.handleStatus(props.name, props.actualStatus - 1);
    }

    function addStatus() {
        props.handleStatus(props.name, props.actualStatus + 1);
    }

    return (
        <div className="status-container">
            <p style={stylesP}>
                {props.text} {`${props.actualStatus}/${props.maxStatus}`}
            </p>

            <div className="bar-container">
                <button onClick={reduceStatus} style={stylesB}>
                    <FiMinus size={15} />
                </button>
                <ProgressBar
                    className={`progress-bar ${props.name}`}
                    completed={props.actualStatus}
                    maxCompleted={props.maxStatus}
                    bgColor={props.bgColor}
                    baseBgColor={"#1e1e1e"}
                    customLabel={" "}
                    borderRadius="0px"
                />
                <button onClick={addStatus} style={stylesB}>
                    <FiPlus size={15} />
                </button>
                <FiEdit
                    style={{ cursor: "pointer" }}
                    onClick={(evt) => props.handlePopup(props.name)}
                    size={15}
                    color={color}
                />
            </div>
        </div>
    );
}
