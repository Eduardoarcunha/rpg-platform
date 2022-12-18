import React from "react";
import "./Ritual.css";

export default function Ritual(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const colors = {
        morte: "#000000",
        conhecimento: "#bf9100",
        energia: "#9a00fd",
        sangue: "#b1161a",
        medo: "#eeeeed",
    };

    const color = colors[props.ritual.elemento];

    return (
        <div className="ritual">
            <h4 style={{ alignSelf: "center" }}>{props.ritual.nome}</h4>
            <div
                style={{
                    alignSelf: "center",
                    backgroundColor: color,
                    color: props.ritual.elemento === "medo" ? "black" : "white",
                    padding: "0 .2rem 0 .2rem",
                    fontSize: "small",
                }}
            >
                {props.ritual.elemento.toUpperCase()}
            </div>

            <a
                className="ritual-delete"
                onClick={() => props.deleteRitual(props.ritual.id)}
            >
                &times;
            </a>

            <p>
                Círculo:{" "}
                <span style={{ color: "#999999" }}>
                    {props.ritual.círculo + "°"}
                </span>
            </p>

            <p>
                Execução:{" "}
                <span style={{ color: "#999999" }}>
                    {capitalizeFirstLetter(props.ritual.execução)}
                </span>
            </p>
            <p>
                Alcance:{" "}
                <span style={{ color: "#999999" }}>
                    {capitalizeFirstLetter(props.ritual.alcance)}
                </span>
            </p>
            <p>
                Alvo:{" "}
                <span style={{ color: "#999999" }}>
                    {capitalizeFirstLetter(props.ritual.alvo)}
                </span>
            </p>
            <p>
                Duração:{" "}
                <span style={{ color: "#999999" }}>
                    {capitalizeFirstLetter(props.ritual.duração)}
                </span>
            </p>
            <p>Descrição:</p>
            <p style={{ paddingLeft: ".5rem", color: "#999999" }}>
                {props.ritual.descrição}
            </p>
        </div>
    );
}
