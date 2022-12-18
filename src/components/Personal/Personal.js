import React from "react";
import "./Personal.css";

export default function Personal(props) {
    return (
        <div className="personal">
            <div className="appearance-background">
                <div className="appearance">
                    <h3>APARÊNCIA</h3>
                    <div className="appearance-box">
                        <textarea
                            className="personal-input"
                            onChange={(evt) => {
                                props.handlePersonalChange(evt);
                            }}
                            placeholder="Ex: Olhos pretos, cabelos castanhos, 1.80m ,etc."
                            name="aparência"
                            value={props.personal.aparência}
                        />
                    </div>
                </div>
                <div className="background">
                    <h3>BACKGROUND</h3>
                    <div className="background-box">
                        <textarea
                            className="personal-input"
                            onChange={(evt) => {
                                props.handlePersonalChange(evt);
                            }}
                            placeholder="Ex: Joãozinho tinha X anos quando se deparou com o paranormal..."
                            name="background"
                            value={props.personal.background}
                        />
                    </div>
                </div>
            </div>
            <div className="notes">
                <h3>NOTAS PESSOAIS</h3>
                <div className="notes-box">
                    <textarea
                        className="personal-input"
                        onChange={(evt) => {
                            props.handlePersonalChange(evt);
                        }}
                        placeholder="Ex: Acredito que o paranormal é um poderoso guia..."
                        name="notas"
                        value={props.personal.notas}
                    />
                </div>
            </div>
        </div>
    );
}
