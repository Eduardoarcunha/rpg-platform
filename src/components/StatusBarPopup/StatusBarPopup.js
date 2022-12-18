import React, { useState } from "react";
import "./StatusBarPopup.css";

export default function StatusBarPopup(props) {
    const [tempStatus, setTempStatus] = useState(props.status);

    let propsActualStatus;
    let propsMaxStatus;
    let actualName;
    let maxName;
    let color;
    if (props.type === "lifebar") {
        propsActualStatus = "vidaAtual";
        propsMaxStatus = "vidaMaxima";
        actualName = "Vida atual";
        maxName = "Vida máxima";
        color = "#C2185B";
    } else if (props.type === "sanitybar") {
        propsActualStatus = "sanidadeAtual";
        propsMaxStatus = "sanidadeMaxima";
        actualName = "Sanidade atual";
        maxName = "Sanidade máxima";
        color = "#276BB0";
    } else if (props.type === "staminabar") {
        propsActualStatus = "esforçoAtual";
        propsMaxStatus = "esforçoMaximo";
        actualName = "Pontos de esforço atuais";
        maxName = "Pontos de esforço máximo";
        color = "#60C689";
    }

    function handlePopupChanges(event) {
        const { name, value } = event.target;
        setTempStatus({ ...tempStatus, [name]: value });
    }

    return (
        <div className="overlay">
            <div className="status-bar-popup">
                <a
                    className="close"
                    onClick={(evt) => props.handlePopup(props.type)}
                >
                    &times;
                </a>

                <div className="actual-container">
                    <p>{actualName}</p>
                    <input
                        style={{
                            color: color,
                            borderBottom: `1px solid ${color}`,
                            fontStyle: "italic",
                        }}
                        name={propsActualStatus}
                        onChange={handlePopupChanges}
                        type="number"
                        value={tempStatus[propsActualStatus]}
                        min="0"
                    />
                </div>
                <div className="max-container">
                    <p>{maxName}</p>
                    <input
                        style={{
                            color: color,
                            borderBottom: `1px solid ${color}`,
                            fontStyle: "italic",
                        }}
                        name={propsMaxStatus}
                        onChange={handlePopupChanges}
                        type="number"
                        value={tempStatus[propsMaxStatus]}
                        min="0"
                    />
                </div>

                <button
                    className={`update-status update-${props.type}`}
                    onClick={(evt) => {
                        props.handleStatusPopup(tempStatus);
                        props.handlePopup(props.type);
                    }}
                >
                    ATUALIZAR
                </button>
            </div>
        </div>
    );
}
