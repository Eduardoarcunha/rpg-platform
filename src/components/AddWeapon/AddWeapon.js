import React from "react";
import "./AddWeapon.css";

import { FiPlus } from "react-icons/fi/";

export default function AddWeapon(props) {
    return (
        <div className="add-weapon">
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "weapon");
                }}
                placeholder="Arma"
                name="weapon"
                value={props.newWeapon.weapon}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "weapon");
                }}
                placeholder="Categoria"
                name="category"
                value={props.newWeapon.category}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "weapon");
                }}
                placeholder="Dano"
                name="damage"
                value={props.newWeapon.damage}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "weapon");
                }}
                placeholder="Crítico"
                name="critical"
                value={props.newWeapon.critical}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "weapon");
                }}
                placeholder="Alcance"
                name="range"
                value={props.newWeapon.range}
            />
            <input
                onChange={(evt) => {
                    props.handleInputsChange(evt, "weapon");
                }}
                placeholder="Tipo"
                name="type"
                value={props.newWeapon.type}
            />
            <div className="weapon-last-input" style={{ position: "relative" }}>
                <input
                    onChange={(evt) => {
                        props.handleInputsChange(evt, "weapon");
                    }}
                    placeholder="Espaços"
                    name="spaces"
                    value={props.newWeapon.spaces}
                />
                <div className="add-weapon-button" onClick={props.addWeapon}>
                    <FiPlus />
                </div>
            </div>
        </div>
    );
}
