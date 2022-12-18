import React from "react";
import "./CreateCharacterAtribute.css";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function CreateCharacterAtribute(props) {
    return (
        <div className="create-atribute-container">
            <p>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
            <div
                style={{
                    cursor: "default",
                }}
                className="circle-att"
            >
                {props.newCharacter.atributos[props.name]}
            </div>
            <div className="plus-minus">
                <button
                    onClick={(evt) => {
                        props.handleChangeCreateAtributes(props.name, -1);
                    }}
                >
                    <FiMinus />
                </button>
                <button
                    onClick={(evt) => {
                        props.handleChangeCreateAtributes(props.name, 1);
                    }}
                >
                    <FiPlus />
                </button>
            </div>
        </div>
    );
}
