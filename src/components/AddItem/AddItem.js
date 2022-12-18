import React from "react";
import "./AddItem.css";
import { FiPlus } from "react-icons/fi/";

export default function AddItem(props) {
    return (
        <div className="add-item">
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "item");
                }}
                placeholder="Item"
                name="item"
                value={props.newItem.item}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "item");
                }}
                placeholder="Detalhes"
                name="details"
                value={props.newItem.details}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "item");
                }}
                placeholder="Espaços"
                name="spaces"
                value={props.newItem.spaces}
            />

            <div className="item-last-input" style={{ position: "relative" }}>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "item");
                    }}
                    placeholder="Prestígio"
                    name="prestige"
                    value={props.newItem.prestige}
                />
                <div className="add-item-button" onClick={props.addItem}>
                    <FiPlus />
                </div>
            </div>
        </div>
    );
}
