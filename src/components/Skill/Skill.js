import React from "react";
import "./Skill.css";

export default function Skill(props) {
    return (
        <div className="skill">
            <h4 style={{ alignSelf: "center" }}>{props.skill.nome}</h4>
            <a
                className="skill-delete"
                onClick={() => props.deleteSkill(props.skill.id)}
            >
                &times;
            </a>

            <p>
                Dano:{" "}
                <span style={{ color: "#999999" }}>{props.skill.dano}</span>
            </p>

            <p>
                Custo:{" "}
                <span style={{ color: "#999999" }}>{props.skill.custo}</span>
            </p>

            <p>Descrição:</p>
            <p style={{ paddingLeft: ".5rem", color: "#999999" }}>
                {props.skill.descrição}
            </p>
            {props.skill.dano !== "0" && props.skill.dano !== "" && (
                <button
                    className="roll-damage"
                    onClick={() => {
                        props.rollSkill(props.skill.dano);
                    }}
                >
                    ROLAR DANO
                </button>
            )}
        </div>
    );
}
