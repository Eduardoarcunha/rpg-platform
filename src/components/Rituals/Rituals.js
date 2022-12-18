import React from "react";
import "./Rituals.css";

import Ritual from "../Ritual/Ritual";
import AddRitual from "../AddRitual/AddRitual";

export default function Rituals(props) {
    const ritualsElements = props.rituals.map((ritual, idx) => {
        return (
            <Ritual
                key={idx}
                ritual={ritual}
                deleteRitual={props.deleteRitual}
            />
        );
    });
    return (
        <div className="skills">
            <h3>RITUAIS</h3>
            <div className="skills-container">
                {ritualsElements}
                <AddRitual
                    newRitual={props.newRitual}
                    handleInputsChange={props.handleInputsChange}
                    addRitual={props.addRitual}
                />
            </div>
        </div>
    );
}
