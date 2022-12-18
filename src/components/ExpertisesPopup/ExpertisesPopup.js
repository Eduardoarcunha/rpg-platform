import React from "react";
import "./ExpertisesPopup.css";

export default function ExpertisesPopup(props) {
    const expertisesInputs = props.expertises.map((expertise, idx) => {
        return (
            <div key={idx} className="expertise-popup">
                <p>{expertise.nome}</p>
                <select
                    value={props.characterExpertises[expertise.nome]}
                    onChange={props.handleExpertisesChange}
                    name={expertise.nome}
                >
                    <option value="destreinado">Destreinado</option>
                    <option value="treinado">Treinado</option>
                    <option value="veterano">Veterano</option>
                    <option value="expert">Expert</option>
                </select>
            </div>
        );
    });

    return (
        <div className="overlay">
            <div className="expertises-popup">
                <a
                    className="close"
                    onClick={(evt) => props.handleExpertisesPopup(props.type)}
                >
                    &times;
                </a>
                <h3>PERÍCIAS</h3>

                <div className="expertises-popup-container">
                    {expertisesInputs}
                </div>
            </div>
        </div>
    );
}
