import React, { useState, useEffect } from "react";
import "./CreateCharacterPage.css";

import CreateCharacterAtribute from "../CreateCharacterAtribute/CreateCharacterAtribute";
import { addDoc } from "firebase/firestore";
import { MdKeyboardReturn } from "react-icons/md";

export default function CreateCharacterPage(props) {
    // Estados das trilhas e do novo personagem
    const [trailsElement, setTrailsElement] = useState();
    const [trailsOptions, setTrailsOptions] = useState([]);
    const [remainingAtributesPoints, setRemainingAtributesPoints] = useState(4);
    const [alreadyZero, setAlreadyZero] = useState(false);
    const [currentAtributes, setCurrentAtributes] = useState({
        agilidade: 1,
        força: 1,
        inteligência: 1,
        presença: 1,
        vigor: 1,
    });
    const [newCharacter, setNewCharacter] = useState({
        nome: "",
        senha: "",
        origem: "",
        classe: "",
        trilha: "",
        NEX: "5",
        patente: "recruta",
        afinidade: "",
        atributos: {
            agilidade: 1,
            força: 1,
            inteligência: 1,
            presença: 1,
            vigor: 1,
        },
        status: {
            vidaMaxima: 0,
            vidaAtual: 0,
            sanidadeMaxima: 0,
            sanidadeAtual: 0,
            esforçoMaximo: 0,
            esforçoAtual: 0,
        },
        defesas: {
            defesa: 0,
            esquiva: 0,
            bloqueio: 0,
        },
        resistências: {
            física: 0,
            balística: 0,
            mental: 0,
            conhecimento: 0,
            energia: 0,
            sangue: 0,
            morte: 0,
        },
        outros: {
            deslocamento: 9,
            dt: 0,
        },
        pericias: {
            Acrobacia: "destreinado",
            Adestramento: "destreinado",
            Artes: "destreinado",
            Atletismo: "destreinado",
            Atualidades: "destreinado",
            Ciências: "destreinado",
            Crime: "destreinado",
            Diplomacia: "destreinado",
            Enganação: "destreinado",
            Fortitude: "destreinado",
            Furtividade: "destreinado",
            Iniciativa: "destreinado",
            Intimidação: "destreinado",
            Intuição: "destreinado",
            Investigação: "destreinado",
            Luta: "destreinado",
            Medicina: "destreinado",
            Ocultismo: "destreinado",
            Percepção: "destreinado",
            Pitolagem: "destreinado",
            Pontaria: "destreinado",
            Profissão: "destreinado",
            Reflexos: "destreinado",
            Religião: "destreinado",
            Sobrevivência: "destreinado",
            Tecnologia: "destreinado",
            Tática: "destreinado",
            Vontade: "destreinado",
        },
        habilidades: [],
        rituais: [],
        proficiências: [],
        proteção: {
            categoria: "nenhum",
            defesa: "nenhum",
            espaço: "nenhum",
            tipo: "nenhum",
        },
        armas: [],
        inventário: [],
        cargaAtual: 0,
        cargaMáxima: 0,
        skillsArray: [],
        pessoal: {
            aparência: "",
            background: "",
            notas: "",
        },
        rolagem: 1,
    });

    // Elementos das origens e dos atributos
    let originsOptions = props.origins.map((origin, idx) => {
        return (
            <option key={idx} value={origin}>
                {origin}
            </option>
        );
    });

    let atributesCreators = Object.keys(newCharacter.atributos).map(
        (atribute, idx) => {
            return (
                <CreateCharacterAtribute
                    key={idx}
                    name={atribute}
                    newCharacter={newCharacter}
                    handleChangeCreateAtributes={handleChangeCreateAtributes}
                />
            );
        }
    );

    // Elementos das trilhas conforme a classe
    useEffect(() => {
        if (newCharacter.classe === "Combatente") {
            setTrailsOptions(() => {
                return props.trails.combatente.map((trail, idx) => {
                    return (
                        <option key={idx} value={trail}>
                            {trail}
                        </option>
                    );
                });
            });
        } else if (newCharacter.classe === "Especialista") {
            setTrailsOptions(() => {
                return props.trails.especialista.map((trail, idx) => {
                    return (
                        <option key={idx} value={trail}>
                            {trail}
                        </option>
                    );
                });
            });
        } else if (newCharacter.classe === "Ocultista") {
            setTrailsOptions(() => {
                return props.trails.ocultista.map((trail, idx) => {
                    return (
                        <option key={idx} value={trail}>
                            {trail}
                        </option>
                    );
                });
            });
        }
        setNewCharacter((prevNewCharacter) => {
            return {
                ...prevNewCharacter,
                trilha: "",
            };
        });

        setTrailsElement(() => {
            if (newCharacter.classe !== "" && newCharacter.NEX !== "5") {
                return (
                    <select
                        style={{ color: newCharacter.trilha !== "" && "white" }}
                        value={newCharacter.trilha}
                        onChange={handleChangeCreate}
                        name="trilha"
                    >
                        <option disabled={true} value="">
                            Trilha
                        </option>
                        {trailsOptions}
                    </select>
                );
            } else {
                return (
                    <p
                        style={{
                            color: "grey",
                            fontStyle: "italic",
                            fontSize: "large",
                        }}
                    >
                        Apenas com 10% de NEX pode se escolher uma trilha!
                    </p>
                );
            }
        });
    }, [newCharacter.classe]);

    // Função para postar o novo personagem
    function createCharacter() {
        addDoc(props.usersCollectionRef, newCharacter).then(() => {
            props.handleCreateCharacter(newCharacter);
            props.enterNewCharacterPage(newCharacter);
        });
    }

    // Função dos inputs do novo jogador
    function handleChangeCreate(event) {
        const { name, value, type, checked } = event.target;
        setNewCharacter((prevNewCharacter) => {
            return {
                ...prevNewCharacter,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    // Função dos inputs dos status
    function handleChangeCreateStatus(event) {
        const { name, value } = event.target;
        if (name === "lifestatus") {
            setNewCharacter((prevNewCharacter) => {
                return {
                    ...prevNewCharacter,
                    status: {
                        ...prevNewCharacter.status,
                        vidaAtual: parseInt(value),
                        vidaMaxima: parseInt(value),
                    },
                };
            });
        } else if (name === "sanitystatus") {
            setNewCharacter((prevNewCharacter) => {
                return {
                    ...prevNewCharacter,
                    status: {
                        ...prevNewCharacter.status,
                        sanidadeAtual: parseInt(value),
                        sanidadeMaxima: parseInt(value),
                    },
                };
            });
        } else if (name === "staminastatus") {
            setNewCharacter((prevNewCharacter) => {
                return {
                    ...prevNewCharacter,
                    status: {
                        ...prevNewCharacter.status,
                        esforçoAtual: parseInt(value),
                        esforçoMaximo: parseInt(value),
                    },
                };
            });
        }
    }

    // Função dos inputs dos atributos
    function handleChangeCreateAtributes(name, value) {
        if (
            (newCharacter.atributos[name] < 3 &&
                value > 0 &&
                remainingAtributesPoints > 0) ||
            (newCharacter.atributos[name] > 0 && value < 0 && !alreadyZero) ||
            (newCharacter.atributos[name] > 1 && value < 0)
        ) {
            setRemainingAtributesPoints((prevRemainingAtributesPoints) => {
                return prevRemainingAtributesPoints - value;
            });
            setNewCharacter((prevState) => {
                prevState.atributos[name] + value === 0 && setAlreadyZero(true);
                if (
                    prevState.atributos[name] === 0 &&
                    prevState.atributos[name] + value !== 0
                ) {
                    setAlreadyZero(false);
                }
                return {
                    ...prevState,
                    atributos: {
                        ...prevState.atributos,
                        [name]: prevState.atributos[name] + value,
                    },
                };
            });
        }
    }

    return (
        <main>
            <h1 className="create-title">Novo Personagem</h1>
            <div className="create-container">
                <p>Nome:</p>
                <input
                    placeholder="Nome"
                    onChange={handleChangeCreate}
                    name="nome"
                    value={newCharacter.nome}
                />
            </div>
            <div className="create-container">
                <p>Login:</p>
                <input
                    placeholder="Login"
                    onChange={handleChangeCreate}
                    name="senha"
                    value={newCharacter.senha}
                />
            </div>
            <div className="create-container">
                <p>Origem:</p>

                <select
                    style={{ color: newCharacter.origem !== "" && "white" }}
                    value={newCharacter.origem}
                    onChange={handleChangeCreate}
                    name="origem"
                >
                    <option disabled={true} value="">
                        Origem
                    </option>
                    {originsOptions}
                </select>
            </div>
            <div className="create-container">
                <p>Classe:</p>
                <select
                    style={{ color: newCharacter.classe !== "" && "white" }}
                    value={newCharacter.classe}
                    onChange={handleChangeCreate}
                    name="classe"
                >
                    <option disabled={true} value="">
                        Classe
                    </option>
                    <option value="Combatente">Combatente</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Ocultista">Ocultista</option>
                </select>
            </div>
            <div className="create-container">
                <p>Trilha:</p>

                {trailsElement}
            </div>

            <h2 className="create-subtitle">Status</h2>
            <div className="create-container-status">
                <div className="create-status-container">
                    <p
                        style={{
                            color: "#C2185B",
                        }}
                    >
                        Pontos de Vida
                    </p>
                    <input
                        style={{
                            color: "#C2185B",
                            borderBottom: `1px solid #C2185B`,
                            fontStyle: "italic",
                        }}
                        name="lifestatus"
                        onChange={handleChangeCreateStatus}
                        type="number"
                        value={newCharacter.status.vidaAtual}
                        min="0"
                    />
                </div>
                <div className="create-status-container">
                    <p
                        style={{
                            color: "#276BB0",
                        }}
                    >
                        Pontos de Sanidade
                    </p>
                    <input
                        style={{
                            color: "#276BB0",
                            borderBottom: `1px solid #276BB0`,
                            fontStyle: "italic",
                        }}
                        name="sanitystatus"
                        onChange={handleChangeCreateStatus}
                        type="number"
                        value={newCharacter.status.sanidadeAtual}
                        min="0"
                    />
                </div>
                <div className="create-status-container">
                    <p
                        style={{
                            color: "#60C689",
                        }}
                    >
                        Pontos de Esforço
                    </p>
                    <input
                        style={{
                            color: "#60C689",
                            borderBottom: `1px solid #60C689`,
                            fontStyle: "italic",
                        }}
                        name="staminastatus"
                        onChange={handleChangeCreateStatus}
                        type="number"
                        value={newCharacter.status.esforçoAtual}
                        min="0"
                    />
                </div>
            </div>
            <h2 className="create-subtitle">Atributos</h2>
            <h4 style={{ fontStyle: "italic", color: "gray" }}>
                {remainingAtributesPoints} pontos restantes!
            </h4>
            <div className="create-container-atributes">
                {atributesCreators}
            </div>
            <button
                onClick={(evt) => {
                    createCharacter(newCharacter);
                }}
                className="create-button"
            >
                Criar
            </button>
            <MdKeyboardReturn
                className="home-btn"
                onClick={props.handleCreateCharacter}
            />
        </main>
    );
}
