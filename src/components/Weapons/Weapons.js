import React from "react";
import "./Weapons.css";
import "../AddWeapon/AddWeapon";
import { BiMinus } from "react-icons/bi/";
import AddWeapon from "../AddWeapon/AddWeapon";
export default function Weapons(props) {
    const weaponsElements = props.weapons.map((weapon) => {
        let dicTemporario = {
            arma: weapon.arma,
            categoria: weapon.categoria,
            dano: weapon.dano,
            crítico: weapon.crítico,
            alcance: weapon.alcance,
            tipo: weapon.tipo,
            espaços: weapon.espaços,
            id: weapon.id,
        };

        return Object.keys(dicTemporario).map((key, idx) => {
            return (
                key !== "id" && (
                    <div
                        className="weapons-text"
                        key={idx}
                        style={{
                            borderTop: "dashed white 1px",
                            position: key === "espaços" ? "relative" : "static",
                        }}
                    >
                        {dicTemporario[key]}
                        {key === "espaços" && (
                            <div
                                className="delete-weapon"
                                onClick={() =>
                                    props.deleteWeapon(dicTemporario.id)
                                }
                            >
                                <BiMinus size={15} />
                            </div>
                        )}
                    </div>
                )
            );
        });
    });

    return (
        <div className="weapons">
            <h3>ARMAS</h3>
            <div className="weapons-container">
                <div className="weapons-text">ARMA</div>
                <div className="weapons-text">CATEGORIA</div>
                <div className="weapons-text">DANO</div>
                <div className="weapons-text">CRÍTICO</div>
                <div className="weapons-text">ALCANCE</div>
                <div className="weapons-text">TIPO</div>
                <div className="weapons-text">ESPAÇOS</div>
                {weaponsElements}
            </div>
            <AddWeapon
                newWeapon={props.newWeapon}
                handleInputsChange={props.handleInputsChange}
                addWeapon={props.addWeapon}
            />
        </div>
    );
}
