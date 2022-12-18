import React, { useState } from "react";
import "./Character.css";
import avatar from "./avatar-img.png";
import StatusBar from "../StatusBar/StatusBar";
import { FiEdit, FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

export default function Character(props) {
    const [tempDefenses, setTempDefenses] = useState(props.character.defesas);
    const [tempResistances, setTempResistances] = useState(
        props.character.resistências
    );
    const [tempOthers, setTempOthers] = useState(props.character.outros);
    const [editDefenses, setEditDefenses] = useState(false);
    const [editResistances, setEditResistances] = useState(false);
    const [editOthers, setEditOthers] = useState(false);

    let trail = props.character.trilha ? ` - ${props.character.trilha}` : "";
    const colors = {
        morte: "#000000",
        conhecimento: "#bf9100",
        energia: "#9a00fd",
        sangue: "#b1161a",
        medo: "#eeeeed",
    };

    const color = props.character.afinidade
        ? colors[props.character.afinidade]
        : "white";

    const topRightText = (
        <p>
            {`${props.character.patente
                .charAt(0)
                .toUpperCase()}${props.character.patente.slice(1)} - NEX: ${
                props.character.NEX
            }%`}
            {props.character.afinidade && " - Afinidade: "}
            {props.character.afinidade && (
                <span
                    style={{
                        backgroundColor: color,
                        fontSize: "small",
                        padding: "0 .1rem 0 .1rem",
                    }}
                >
                    {`${
                        props.character.afinidade &&
                        props.character.afinidade.toUpperCase()
                    }`}
                </span>
            )}
        </p>
    );

    function handleDefensesChanges(event) {
        const { name, value } = event.target;
        setTempDefenses({ ...tempDefenses, [name]: value });
    }
    function handleResistancesChanges(event) {
        const { name, value } = event.target;
        setTempResistances({ ...tempResistances, [name]: value });
    }
    function handleOthersChanges(event) {
        const { name, value } = event.target;
        setTempOthers({ ...tempOthers, [name]: value });
    }

    return (
        <div className="character">
            <div className="character-top">
                <div className="top-info class">
                    {`${props.character.origem} - ${props.character.classe}` +
                        trail}
                </div>
                <div className="top-info name">{props.character.nome}</div>
                <div className="top-info level">{topRightText}</div>
            </div>
            <div className="character-middle">
                <img src={avatar} />
                <div className="progress-bars">
                    <StatusBar
                        bgColor={"#C2185B"}
                        name={"lifebar"}
                        text={"PONTOS DE VIDA"}
                        maxStatus={props.status.vidaMaxima}
                        actualStatus={props.status.vidaAtual}
                        handleStatus={props.handleStatus}
                        handlePopup={props.handlePopup}
                    />
                    <StatusBar
                        bgColor={"#276BB0"}
                        name={"sanitybar"}
                        text={"SANIDADE"}
                        maxStatus={props.status.sanidadeMaxima}
                        actualStatus={props.status.sanidadeAtual}
                        handleStatus={props.handleStatus}
                        handlePopup={props.handlePopup}
                    />
                    <StatusBar
                        bgColor={"#60C689"}
                        name={"staminabar"}
                        text={"PONTOS DE ESFORÇO"}
                        maxStatus={props.status.esforçoMaximo}
                        actualStatus={props.status.esforçoAtual}
                        handleStatus={props.handleStatus}
                        handlePopup={props.handlePopup}
                    />
                </div>
            </div>
            <div className="character-bottom">
                <div className="bottom-info defenses-container">
                    <div className="defense-info">
                        <h4 className="defense-title">DEFESAS</h4>
                        <p>Defesa</p>
                        {editDefenses ? (
                            <div className="edit-icons-container">
                                <FiCheck
                                    className="confirm-icon"
                                    size={15}
                                    onClick={(evt) => {
                                        props.handleDRO(
                                            tempDefenses,
                                            "defesas"
                                        );
                                        setEditDefenses(false);
                                    }}
                                />
                                <IoMdClose
                                    className="close-icon"
                                    size={15}
                                    onClick={(evt) => {
                                        setEditDefenses(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <FiEdit
                                className="edit-icon"
                                size={13}
                                onClick={() => setEditDefenses(true)}
                            />
                        )}

                        <p className="value">
                            {editDefenses ? (
                                <input
                                    className="character-bottom-input"
                                    name="defesa"
                                    type="number"
                                    value={tempDefenses.defesa}
                                    onChange={handleDefensesChanges}
                                />
                            ) : (
                                props.character.defesas.defesa
                            )}
                        </p>
                        <p>Esquiva</p>

                        <p className="value">
                            {editDefenses ? (
                                <input
                                    className="character-bottom-input"
                                    name="esquiva"
                                    type="number"
                                    value={tempDefenses.esquiva}
                                    onChange={handleDefensesChanges}
                                />
                            ) : (
                                props.character.defesas.esquiva
                            )}
                        </p>
                        <p>Bloqueio</p>

                        <p className="value">
                            {editDefenses ? (
                                <input
                                    className="character-bottom-input"
                                    name="bloqueio"
                                    type="number"
                                    value={tempDefenses.bloqueio}
                                    onChange={handleDefensesChanges}
                                />
                            ) : (
                                props.character.defesas.bloqueio
                            )}
                        </p>
                    </div>
                </div>
                <div className="bottom-info resistances-container">
                    <div className="resistance-info">
                        <h4 className="resistance-title">RESISTÊNCIAS</h4>
                        <p>Física</p>
                        {editResistances ? (
                            <div className="edit-icons-container">
                                <FiCheck
                                    className="confirm-icon"
                                    size={15}
                                    onClick={(evt) => {
                                        props.handleDRO(
                                            tempResistances,
                                            "resistências"
                                        );
                                        setEditResistances(false);
                                    }}
                                />
                                <IoMdClose
                                    className="close-icon"
                                    size={15}
                                    onClick={(evt) => {
                                        setEditResistances(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <FiEdit
                                className="edit-icon"
                                size={13}
                                onClick={() => setEditResistances(true)}
                            />
                        )}

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="física"
                                    type="number"
                                    value={tempResistances.física}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.física
                            )}
                        </p>
                        <p>Balística</p>

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="balística"
                                    type="number"
                                    value={tempResistances.balística}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.balística
                            )}
                        </p>
                        <p>Mental</p>

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="mental"
                                    type="number"
                                    value={tempResistances.mental}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.mental
                            )}
                        </p>
                        <p>Sangue</p>

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="sangue"
                                    type="number"
                                    value={tempResistances.sangue}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.sangue
                            )}
                        </p>
                        <p>Morte</p>

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="morte"
                                    type="number"
                                    value={tempResistances.morte}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.morte
                            )}
                        </p>
                        <p>Energia</p>

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="energia"
                                    type="number"
                                    value={tempResistances.energia}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.energia
                            )}
                        </p>
                        <p>Conhecimento</p>

                        <p className="value">
                            {editResistances ? (
                                <input
                                    className="character-bottom-input"
                                    name="conhecimento"
                                    type="number"
                                    value={tempResistances.conhecimento}
                                    onChange={handleResistancesChanges}
                                />
                            ) : (
                                props.character.resistências.conhecimento
                            )}
                        </p>
                    </div>
                </div>
                <div className="bottom-info others-container">
                    <div className="other-info">
                        <h4 className="other-title">OUTROS</h4>
                        <p>Deslocamento</p>
                        {editOthers ? (
                            <div className="edit-icons-container">
                                <FiCheck
                                    className="confirm-icon"
                                    size={15}
                                    onClick={(evt) => {
                                        props.handleDRO(tempOthers, "outros");
                                        setEditOthers(false);
                                    }}
                                />
                                <IoMdClose
                                    className="close-icon"
                                    size={15}
                                    onClick={(evt) => {
                                        setEditOthers(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <FiEdit
                                className="edit-icon"
                                size={13}
                                onClick={() => setEditOthers(true)}
                            />
                        )}

                        <p className="value">
                            {editOthers ? (
                                <input
                                    className="character-bottom-input"
                                    name="deslocamento"
                                    type="number"
                                    value={tempOthers.deslocamento}
                                    onChange={handleOthersChanges}
                                />
                            ) : (
                                props.character.outros.deslocamento
                            )}
                        </p>
                        <p>DT Rituais</p>

                        <p className="value">
                            {editOthers ? (
                                <input
                                    className="character-bottom-input"
                                    name="dt"
                                    type="number"
                                    value={tempOthers.dt}
                                    onChange={handleOthersChanges}
                                />
                            ) : (
                                props.character.outros.dt
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
