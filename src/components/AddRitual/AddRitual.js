import React from "react";
import "./AddRitual.css";

export default function AddRitual(props) {
    return (
        <div className="add-ritual">
            <h4
                style={{
                    alignSelf: "center",
                    color: "white",
                    margin: "0.5rem",
                    marginBottom: "1rem",
                }}
            >
                NOVO RITUAL
            </h4>
            <div className="name-input-container ritual-add-container">
                <p className="name-title ritual-add-title">Nome:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Nome"
                    name="name"
                    value={props.newRitual.name}
                />
            </div>
            <div className="element-input-container ritual-add-container">
                <p className="element-title ritual-add-title">Elemento:</p>
                <select
                    style={{ color: props.newRitual.element !== "" && "white" }}
                    value={props.newRitual.element}
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    name="element"
                >
                    <option disabled={true} value="">
                        Elemento
                    </option>
                    <option value="conhecimento">Conhecimento</option>
                    <option value="energia">Energia</option>
                    <option value="medo">Medo</option>
                    <option value="morte">Morte</option>
                    <option value="sangue">Sangue</option>
                </select>
            </div>
            <div className="circle-input-container ritual-add-container">
                <p className="circle-title ritual-add-title">Círculo:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Círculo"
                    type="number"
                    name="circle"
                    min="0"
                    value={props.newRitual.circle}
                />
            </div>

            <div className="execution-input-container ritual-add-container">
                <p className="execution-title ritual-add-title">Execução:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Execução"
                    name="execution"
                    min="0"
                    value={props.newRitual.execution}
                />
            </div>
            <div className="range-input-container ritual-add-container">
                <p className="range-title ritual-add-title">Alcance:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Alcance"
                    name="range"
                    min="0"
                    value={props.newRitual.range}
                />
            </div>
            <div className="target-input-container ritual-add-container">
                <p className="target-title ritual-add-title">Alvo:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Alvo"
                    name="target"
                    min="0"
                    value={props.newRitual.target}
                />
            </div>
            <div className="duration-input-container ritual-add-container">
                <p className="duration-title ritual-add-title">Duração:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Duração"
                    name="duration"
                    min="0"
                    value={props.newRitual.duration}
                />
            </div>

            <div className="description-input-container ">
                <p className="description-title ">Descrição:</p>
                <textarea
                    style={{ paddingLeft: ".3rem" }}
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "ritual");
                    }}
                    placeholder="Descrição"
                    name="description"
                    value={props.newRitual.description}
                />
            </div>
            <button className="add-button" onClick={props.addRitual}>
                ADICIONAR
            </button>
        </div>
    );
}
