import React, { useState } from "react";
import "./Atribute.css";

import { FiMinus, FiPlus } from "react-icons/fi";

export default function Atribute(props) {
    if (props.atributesChange) {
        return (
            <div className="atribute-input">
                <h3>{props.name}</h3>
                <div className="circle-input">
                    <FiMinus
                        style={{ cursor: "pointer" }}
                        onClick={(evt) => {
                            props.handleAtributesChange(
                                props.fullName,
                                parseInt(props.value) - 1
                            );
                        }}
                    />
                    <span style={{ cursor: "default" }}>{props.value}</span>
                    <FiPlus
                        style={{ cursor: "pointer" }}
                        onClick={(evt) => {
                            props.handleAtributesChange(
                                props.fullName,
                                parseInt(props.value) + 1
                            );
                        }}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="atribute">
                <h3>{props.name}</h3>
                <div
                    onClick={() => props.rollAtribute(props.value)}
                    className="circle"
                >
                    <span className="atribute-span">{props.value}</span>
                </div>
            </div>
        );
    }
}
