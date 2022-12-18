import React from "react";
import "./AddSkill.css";

export default function AddSkill(props) {
    return (
        <div className="addskill">
            <h4
                style={{
                    alignSelf: "center",
                    color: "white",
                    margin: "0.5rem",
                    marginBottom: "1rem",
                }}
            >
                NOVA HABILIDADE
            </h4>
            <div className="name-input-container">
                <p className="name-title">Nome:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Nome"
                    name="name"
                    value={props.newSkill.name}
                />
            </div>
            <div className="cost-input-container">
                <p className="cost-title">Custo:</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="PE"
                    type="number"
                    name="cost"
                    min="0"
                    value={props.newSkill.cost}
                />
                <p className="cost-p-add">+</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Adicional"
                    type="number"
                    name="costadd"
                    min="0"
                    value={props.newSkill.costadd}
                />
            </div>
            <p
                className="damage-title"
                style={{
                    alignSelf: "center",
                    color: "white",
                    margin: "0.5rem",
                }}
            >
                Dano:
            </p>
            <div className="damage-input-container">
                <p className="damage-subtitle">Dados</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Dados"
                    type="number"
                    name="nDices1"
                    min="0"
                    value={props.newSkill.nDices1}
                />
                <p className="damage-p-d">d</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Lados"
                    type="number"
                    name="nSides1"
                    min="0"
                    value={props.newSkill.nSides1}
                />
                <p className="damage-p-add">+</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Dados"
                    type="number"
                    name="nDices2"
                    min="0"
                    value={props.newSkill.nDices2}
                />
                <p className="damage-p-d">d</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Lados"
                    type="number"
                    name="nSides2"
                    min="0"
                    value={props.newSkill.nSides2}
                />
            </div>
            <div className="damage-input-container-2">
                <p className="damage-subtitle">Fixo</p>
                <p className="damage-p-d">+</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Dano fixo"
                    type="number"
                    name="fixedDamage1"
                    min="0"
                    value={props.newSkill.fixedDamage1}
                />
                <p className="damage-p-d">+</p>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Dano fixo"
                    type="number"
                    name="fixedDamage2"
                    min="0"
                    value={props.newSkill.fixedDamage2}
                />
            </div>
            <div className="description-input-container">
                <p className="description-title">Descrição:</p>
                <textarea
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "skill");
                    }}
                    placeholder="Descrição"
                    name="description"
                    value={props.newSkill.description}
                />
            </div>
            <button className="add-button" onClick={props.addSkill}>
                ADICIONAR
            </button>
        </div>
    );
}
