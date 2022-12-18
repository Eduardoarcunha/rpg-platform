import React from "react";
import "./ProficiencyPopup.css";

export default function Proficiency(props) {
    const proficienciesInputs = props.proficiencies.map((proficiency, idx) => {
        return (
            <div key={idx} className="proficiency-input">
                <p>{proficiency}</p>
                <select
                    value={props.character.proficiências[proficiency]}
                    // onChange={props.handleExpertisesChange}
                    name={proficiency}
                    onChange={props.handleProficienciesChange}
                >
                    <option value={false}>Não proficiente</option>
                    <option value={true}>Proficiente</option>
                </select>
            </div>
        );
    });

    return (
        <div className="overlay">
            <div className="proficiency-popup">
                <a className="close" onClick={props.handleProficienciesPopup}>
                    &times;
                </a>
                <h3>PROFICIÊNCIAS</h3>
                <div className="proficiency-popup-container">
                    {proficienciesInputs}
                </div>
            </div>
        </div>
    );
}
