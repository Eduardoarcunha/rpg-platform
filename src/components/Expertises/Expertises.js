import React from "react";
import "./Expertises.css";
import { FiEdit } from "react-icons/fi";

export default function Expertises(props) {
    const expertisesElements = props.expertises.map((expertise) => {
        let expertiseConditions;
        let characterKnowledge;

        if (props.characterExpertises[expertise.nome] === "treinado") {
            characterKnowledge = (
                <p style={{ color: "#7fffd4", fontStyle: "italic" }}>+5(T)</p>
            );
        } else if (props.characterExpertises[expertise.nome] === "veterano") {
            characterKnowledge = (
                <p style={{ color: "#57DCBE", fontStyle: "italic" }}>+10(V)</p>
            );
        } else if (props.characterExpertises[expertise.nome] === "expert") {
            characterKnowledge = (
                <p style={{ color: "#57ACDC", fontStyle: "italic" }}>+15(E)</p>
            );
        }

        expertiseConditions = (
            <p
                style={{
                    color: "#999999",
                    display: "flex",
                    justifyContent: "end",
                    paddingRight: "0.2rem",
                }}
            >
                {expertise.carga && "C"}
                {expertise.treinada && "T"}
            </p>
        );

        return (
            <div className="expertise" key={expertise.nome}>
                {expertiseConditions}
                <p style={{ color: "white" }}>{expertise.nome}</p>
                {characterKnowledge}
            </div>
        );
    });

    return (
        <div className="expertises">
            <FiEdit
                size={15}
                className="edit-expertises"
                onClick={props.handleExpertisesPopup}
            />
            <div className="expertises-top">
                <div className="expertises-conditions-container">
                    <p style={{ color: "#999999" }}>CONDIÇÕES DE USO</p>
                    <p style={{ color: "#999999" }}>TREINADO T (T)</p>
                    <p style={{ color: "#999999" }}>CARGA C (C)</p>
                </div>
                <h3 style={{ color: "white" }}>PERÍCIAS</h3>
                <div className="expertises-info-container">
                    <p style={{ color: "#7fffd4" }}>TREINADO (T)</p>
                    <p style={{ color: "#57DCBE" }}>VETERANO (V)</p>
                    <p style={{ color: "#57ACDC" }}>EXPERT (E)</p>
                </div>
            </div>
            <div className="expertises-list">{expertisesElements}</div>
        </div>
    );
}
