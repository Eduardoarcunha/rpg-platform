import React from "react";
import "./Inventory.css";
import "../AddItem/AddItem";
import { BiMinus } from "react-icons/bi/";
import AddItem from "../AddItem/AddItem";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function Inventory(props) {
    const inventoryElements = props.inventory.map((itemInventario) => {
        let dicTemporario = {
            item: itemInventario.item,
            detalhes: itemInventario.detalhes,
            espaços: itemInventario.espaços,
            prestígio: itemInventario.prestígio,
            id: itemInventario.id,
        };

        return Object.keys(dicTemporario).map((key, idx) => {
            return (
                key !== "id" && (
                    <p
                        className="item-text"
                        key={idx}
                        style={{
                            borderTop: "dashed white 1px",
                            position:
                                key === "prestígio" ? "relative" : "static",
                        }}
                    >
                        {itemInventario[key]}
                        {key === "prestígio" && (
                            <span
                                className="delete-weapon"
                                onClick={() =>
                                    props.deleteItem(dicTemporario.id)
                                }
                            >
                                <BiMinus size={15} />
                            </span>
                        )}
                    </p>
                )
            );
        });
    });

    return (
        <div className="inventory">
            <h3>INVENTÁRIO</h3>
            <div className="inventory-container">
                <h4 style={{ fontWeight: "100" }} className="item-text">
                    NOME
                </h4>
                <h4 style={{ fontWeight: "100" }} className="item-text">
                    DETALHES
                </h4>
                <h4
                    style={{ fontWeight: "100" }}
                    className="item-text"
                    id="item-space"
                >
                    <button
                        onClick={(evt) => {
                            props.handleActualLoad(-1);
                        }}
                    >
                        <FiMinus size={15} />
                    </button>
                    {`ESPAÇOS (${props.actualLoad}/${props.maxLoad})`}

                    <button
                        onClick={(evt) => {
                            props.handleActualLoad(1);
                        }}
                    >
                        <FiPlus size={15} />
                    </button>
                </h4>
                <h4 style={{ fontWeight: "100" }} className="item-text">
                    CATEGORIA
                </h4>
                {inventoryElements}
            </div>
            <AddItem
                newItem={props.newItem}
                handleInputsChange={props.handleInputsChange}
                addItem={props.addItem}
            />
        </div>
    );
}
