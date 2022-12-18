import React, { useState } from "react";
import "./EquipmentInfo.css";
import { FiEdit } from "react-icons/fi";

export default function EquipmentInfo(props) {
    const [edit, setEdit] = useState(false);

    const proficiencies = props.proficiencies.map((proficiency, idx) => {
        if (props.character.proficiências[proficiency] === "true") {
            return <li key={idx}>{proficiency}</li>;
        }
    });

    const armorElements = (
        <>
            {!edit ? (
                <p>{props.character.proteção.tipo}</p>
            ) : (
                <input
                    className="protection-input"
                    name="tipo"
                    value={props.character.proteção.tipo}
                    onChange={props.handleProtectionChange}
                />
            )}
            {!edit ? (
                <p>{props.character.proteção.defesa}</p>
            ) : (
                <input
                    className="protection-input"
                    name="defesa"
                    value={props.character.proteção.defesa}
                    onChange={props.handleProtectionChange}
                />
            )}
            {!edit ? (
                <p>{props.character.proteção.categoria}</p>
            ) : (
                <input
                    className="protection-input"
                    name="categoria"
                    value={props.character.proteção.categoria}
                    onChange={props.handleProtectionChange}
                />
            )}
            {!edit ? (
                <p>{props.character.proteção.espaço}</p>
            ) : (
                <input
                    className="protection-input"
                    name="espaço"
                    value={props.character.proteção.espaço}
                    onChange={props.handleProtectionChange}
                />
            )}
        </>
    );

    return (
        <div className="equipment-info">
            <div className="proficiency-container">
                <FiEdit
                    size={12}
                    className="edit-proficiency"
                    onClick={props.handleProficienciesPopup}
                />
                <h4>PROFICIÊNCIAS</h4>
                <ul className="proficiencies">{proficiencies}</ul>
            </div>
            <div className="armor-container">
                <FiEdit
                    size={12}
                    className="edit-proficiency"
                    onClick={(evt) => {
                        setEdit((prevEdit) => {
                            return !prevEdit;
                        });
                    }}
                />
                <h4>ARMADURAS </h4>
                <div className="armors">
                    <p className="armors-labels">PROTEÇÂO</p>
                    <p className="armors-labels">DEFESA</p>
                    <p className="armors-labels">CATEGORIA</p>
                    <p className="armors-labels">ESPAÇO</p>
                    {armorElements}
                </div>
            </div>
        </div>
    );
}
