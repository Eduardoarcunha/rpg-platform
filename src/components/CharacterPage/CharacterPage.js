import React, { useState } from "react";
import "./CharacterPage.css";

import { nanoid } from "nanoid";

import Character from "../Character/Character";
import Atribute from "../Atribute/Atribute";
import Expertises from "../Expertises/Expertises";
import EquipmentInfo from "../EquipmentInfo/EquipmentInfo";
import Weapons from "../Weapons/Weapons";
import Inventory from "../Inventory/Inventory";
import Skills from "../Skills/Skills";
import Rituals from "../Rituals/Rituals";
import Snackbar from "../Snackbar/Snackbar";
import StatusBarPopup from "../StatusBarPopup/StatusBarPopup";
import FixedDices from "../FixedDices/FixedDices";
import Personal from "../Personal/Personal";
import ExpertisesPopup from "../ExpertisesPopup/ExpertisesPopup";
import ProficiencyPopup from "../ProficiencyPopup/ProficiencyPopup";

import { db } from "../../firebase";
import { doc, updateDoc, addDoc } from "firebase/firestore";
import { FiEdit } from "react-icons/fi";

export default function CharacterPage(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("atribute");
    const [status, setStatus] = useState(props.character.status);

    const [showExpertisesPopup, setShowExpertisesPopup] = useState(false);
    const [atributesChange, setAtributesChange] = useState(false);

    const [showProficienciesPopup, setShowProficienciesPopup] = useState(false);

    const [newWeapon, setNewWeapon] = useState({
        weapon: "",
        category: "",
        damage: "",
        critical: "",
        range: "",
        type: "",
        spaces: "",
    });
    const [newItem, setNewItem] = useState({
        item: "",
        details: "",
        spaces: "",
        prestige: "",
    });
    const [actualLoad, setActualLoad] = React.useState(
        props.character.cargaAtual
    );

    const [newSkill, setNewSkill] = useState({
        name: "",
        cost: "",
        costadd: "",
        nDices1: "",
        nSides1: "",
        nDices2: "",
        nSides2: "",
        fixedDamage1: "",
        fixedDamage2: "",
        description: "",
    });
    const [newRitual, setNewRitual] = useState({
        name: "",
        element: "",
        circle: "",
        range: "",
        target: "",
        execution: "",
        duration: "",
        description: "",
    });

    const [newPersonal, setNewPersonal] = useState(props.character.pessoal);

    // HANDLE FUNCTIONS
    // Função que cuida das mudanças de status nas barras!
    function handleStatus(name, value) {
        let barName;
        if (name === "lifebar") {
            barName = "vidaAtual";
        } else if (name === "sanitybar") {
            barName = "sanidadeAtual";
        } else if (name === "staminabar") {
            barName = "esforçoAtual";
        }

        let newStatus = status;

        Object.keys(newStatus).map((key) => {
            if (key === barName) {
                newStatus[key] = value;
            }
        });

        setStatus(newStatus);

        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                status: newStatus,
            };
        });

        updateCharacter(props.character.id, { status: newStatus });
    }
    // Função que cuida do Popup!
    function handlePopup(name) {
        setPopupType(name);
        setShowPopup((prevShowPopup) => !prevShowPopup);
    }
    function handleExpertisesPopup() {
        setShowExpertisesPopup(
            (prevShowExpertisesPopup) => !prevShowExpertisesPopup
        );
    }
    function handleProficienciesPopup() {
        setShowProficienciesPopup(
            (prevShowProficienciesPopup) => !prevShowProficienciesPopup
        );
    }

    // Função que cuida dos Popus
    function handleStatusPopup(newStatus) {
        Object.keys(newStatus).map((key) => {
            newStatus[key] = parseInt(newStatus[key]);
        });

        setStatus(newStatus);
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                status: newStatus,
            };
        });

        updateCharacter(props.character.id, { status: newStatus });
    }

    function handleDRO(newValues, name) {
        Object.keys(newValues).map((key) => {
            newValues[key] = parseInt(newValues[key]);
        });
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                [name]: newValues,
            };
        });
        updateCharacter(props.character.id, { [name]: newValues });
    }

    // Função que cuida do Snackbar
    function handleSnackbar(valueSplited, addition) {
        let message;
        if (addition) {
            message = valueSplited.join(" + ");
            message = message + " = " + valueSplited.reduce((a, b) => a + b);
        } else {
            message = valueSplited.join("\xa0\xa0\xa0\xa0\xa0\xa0\xa0");
        }
        setSnackMessage(message);
        setShowSnackbar(true);
    }

    // Função que cuida das mudanças de inputs
    function handleInputsChange(event, type) {
        const { name, value } = event.target;
        if (type === "weapon") {
            setNewWeapon((prevWeapon) => {
                return {
                    ...prevWeapon,
                    [name]: value,
                };
            });
        } else if (type === "item") {
            setNewItem((prevItem) => {
                return {
                    ...prevItem,
                    [name]: value,
                };
            });
        } else if (type === "skill") {
            setNewSkill((prevSkill) => {
                return {
                    ...prevSkill,
                    [name]: value,
                };
            });
        } else if (type === "ritual") {
            setNewRitual((prevRitual) => {
                return {
                    ...prevRitual,
                    [name]: value,
                };
            });
        }
    }

    function handleAtributesChange(name, value) {
        if (value >= 0) {
            props.setCharacter((prevCharacter) => {
                return {
                    ...prevCharacter,
                    atributos: {
                        ...prevCharacter.atributos,
                        [name]: value,
                    },
                };
            });

            updateCharacter(props.character.id, {
                atributos: {
                    ...props.character.atributos,
                    [name]: value,
                },
            });
        }
    }

    function handleExpertisesChange(event) {
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                pericias: {
                    ...prevCharacter.pericias,
                    [event.target.name]: event.target.value,
                },
            };
        });

        updateCharacter(props.character.id, {
            pericias: {
                ...props.character.pericias,
                [event.target.name]: event.target.value,
            },
        });
    }

    function handleActualLoad(value) {
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                cargaAtual: props.character.cargaAtual + value,
            };
        });

        updateCharacter(props.character.id, {
            cargaAtual: props.character.cargaAtual + value,
        });
    }

    function handleProficienciesChange(event) {
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                proficiências: {
                    ...prevCharacter.proficiências,
                    [event.target.name]: event.target.value,
                },
            };
        });

        updateCharacter(props.character.id, {
            proficiências: {
                ...props.character.proficiências,
                [event.target.name]: event.target.value,
            },
        });
    }

    function handleProtectionChange(event) {
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                proteção: {
                    ...prevCharacter.proteção,
                    [event.target.name]: event.target.value,
                },
            };
        });
        updateCharacter(props.character.id, {
            proteção: {
                ...props.character.proteção,
                [event.target.name]: event.target.value,
            },
        });
    }

    function handlePersonalChange(event) {
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                pessoal: {
                    ...prevCharacter.pessoal,
                    [event.target.name]: event.target.value,
                },
            };
        });

        updateCharacter(props.character.id, {
            pessoal: {
                ...props.character.pessoal,
                [event.target.name]: event.target.value,
            },
        });
    }

    // DICE ROLLS FUNCTIONS
    // Função que rola um dado
    function diceRoll(max) {
        return Math.floor(Math.random() * max + 1);
    }

    // Função que rola um dado único
    function rollSingleDice(value) {
        let diceArray = [];
        diceArray.push(diceRoll(value));

        if (!showSnackbar) {
            setSnackType("singleDice");
            handleSnackbar(diceArray, false);
            postDiceRoll(diceArray, "dado único");
        }
    }

    // Função que rola dados de atributo
    function rollAtribute(value) {
        let dicesArray = [];
        let rolls = value == 0 ? 2 : value;
        for (let i = 0; i < rolls; i++) {
            dicesArray.push(diceRoll(20));
        }

        if (!showSnackbar) {
            setSnackType("atribute");
            handleSnackbar(dicesArray, false);
            postDiceRoll(dicesArray, "atributos");
        }
    }

    // Função que rola dados de skills
    function rollSkill(damage) {
        let damagesArray = damage.split(" ");
        let damagesSplited = [];
        let finalDamage = 0;

        damagesArray.forEach((damage) => {
            if (damage.includes("d")) {
                let index = damage.indexOf("d");
                let nDices = damage.slice(0, index);
                let nSides = damage.slice(index + 1, damage.length);

                for (let i = 0; i < nDices; i++) {
                    let singleDiceDamage = diceRoll(nSides);
                    damagesSplited.push(singleDiceDamage);
                    finalDamage += singleDiceDamage;
                }
            } else if (!damage.includes("+")) {
                damagesSplited.push(parseInt(damage));
                finalDamage += parseInt(damage);
            }
        });

        let addition;
        damagesSplited.length > 1 ? (addition = true) : (addition = false);

        if (!showSnackbar) {
            setSnackType("skill");
            handleSnackbar(damagesSplited, addition);
            postDiceRoll(damagesSplited, "danos");
        }
    }

    // Função que posta as rolagens de dados
    function postDiceRoll(valuesArray, type) {
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                rolagem: props.character.rolagem + 1,
            };
        });
        addDoc(props.dicesCollectionRef, {
            id: props.character.nome + props.character.rolagem,
            tipo: type,
            valores: valuesArray,
        });
        updateRolls(props.character.id);
    }

    // Função que atualiza número de rolagens
    function updateRolls(id) {
        const charDoc = doc(db, "personagens", id);
        const newFields = { rolagem: props.character.rolagem + 1 };
        updateDoc(charDoc, newFields);
    }

    // WEAPON FUNCTIONS
    // Função que adiciona uma arma
    function addWeapon() {
        let newWeaponFormated = {
            arma: newWeapon.weapon,
            categoria: newWeapon.category,
            dano: newWeapon.damage,
            crítico: newWeapon.critical,
            alcance: newWeapon.range,
            tipo: newWeapon.type,
            espaços: newWeapon.spaces,
            id: nanoid(),
        };
        // console.log(newWeaponFormated);
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                armas: [...prevCharacter.armas, newWeaponFormated],
            };
        });

        updateCharacter(props.character.id, {
            armas: [...props.character.armas, newWeaponFormated],
        });

        setNewWeapon({
            weapon: "",
            category: "",
            damage: "",
            critical: "",
            range: "",
            type: "",
            spaces: "",
        });
    }

    // Função que remove uma arma
    function deleteWeapon(id) {
        let weaponsArray = props.character.armas.filter(
            (weapon) => weapon.id !== id
        );

        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                armas: weaponsArray,
            };
        });

        updateCharacter(props.character.id, { armas: weaponsArray });
    }

    // INVENTORY FUNCTIONS
    // Função que adiciona um item
    function addItem() {
        let newItemFormated = {
            item: newItem.item,
            detalhes: newItem.details,
            espaços: newItem.spaces,
            prestígio: newItem.prestige,
            id: nanoid(),
        };
        // console.log(newItemFormated);
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                inventário: [...prevCharacter.inventário, newItemFormated],
            };
        });

        updateCharacter(props.character.id, {
            inventário: [...props.character.inventário, newItemFormated],
        });

        setNewItem({
            item: "",
            details: "",
            spaces: "",
            prestige: "",
        });
    }

    // Função que remove um item
    function deleteItem(id) {
        let itemsArray = props.character.inventário.filter(
            (item) => item.id !== id
        );

        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                inventário: itemsArray,
            };
        });

        updateCharacter(props.character.id, { inventário: itemsArray });
    }

    // SKILL FUNCTIONS
    // Função que adiciona uma habilidade
    function addSkill() {
        let dano;
        if (newSkill.nDices1 !== "" && newSkill.nDices1 !== "0") {
            if (newSkill.nDices2 !== "" && newSkill.nDices2 !== "0") {
                //TEM DOIS DADOS
                if (
                    newSkill.fixedDamage1 !== "" &&
                    newSkill.fixedDamage1 !== "0"
                ) {
                    //TEM DOIS DADOS E PELO MENOS UM DANO FIXO
                    if (
                        newSkill.fixedDamage2 !== "" &&
                        newSkill.fixedDamage2 !== "0"
                    ) {
                        //TEM DOIS DADOS E DOIS DANOS FIXOS
                        dano = `${newSkill.nDices1}d${newSkill.nSides1} + ${newSkill.nDices2}d${newSkill.nSides2} + ${newSkill.fixedDamage1} + ${newSkill.fixedDamage2}`;
                    } else {
                        //TEM DOIS DADOS E UM DANO FIXO
                        dano = `${newSkill.nDices1}d${newSkill.nSides1} + ${newSkill.nDices2}d${newSkill.nSides2} + ${newSkill.fixedDamage1}`;
                    }
                } else {
                    //TEM APENAS DOIS DADOS
                    dano = `${newSkill.nDices1}d${newSkill.nSides1} + ${newSkill.nDices2}d${newSkill.nSides2}`;
                }
            } else if (
                newSkill.fixedDamage1 !== "" &&
                newSkill.fixedDamage1 !== "0"
            ) {
                //TEM 1 DADO E PELO MENOS 1 DANO FIXO
                if (
                    newSkill.fixedDamage2 !== "" &&
                    newSkill.fixedDamage2 !== "0"
                ) {
                    //TEM 1 DADO E PELO 2 DANO FIXO
                    dano = `${newSkill.nDices1}d${newSkill.nSides1} + ${newSkill.fixedDamage1} + ${newSkill.fixedDamage2}`;
                } else {
                    //TEM 1 DADO E 1 DANO FIXO
                    dano = `${newSkill.nDices1}d${newSkill.nSides1} + ${newSkill.fixedDamage1}`;
                }
            } else {
                //TEM SÓ 1 DADO
                dano = `${newSkill.nDices1}d${newSkill.nSides1}`;
            }
        } else {
            //Não tem dano
            dano = "0";
        }
        let custo;
        if (newSkill.cost !== "" && newSkill.cost !== "0") {
            if (newSkill.costadd !== "" && newSkill.costadd !== "0") {
                //TEM COST ADD
                custo = `${newSkill.cost}PE + ${newSkill.costadd}`;
            } else {
                //TEM COST
                custo = `${newSkill.cost}PE`;
            }
        } else {
            custo = "0";
        }

        let newSkillFormated = {
            id: nanoid(),
            nome: newSkill.name,
            dano: dano,
            custo: custo,
            descrição: newSkill.description,
        };
        setNewSkill({
            name: "",
            cost: "",
            costadd: "",
            nDices1: "",
            nSides1: "",
            nDices2: "",
            nSides2: "",
            fixedDamage1: "",
            fixedDamage2: "",
            description: "",
        });
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                habilidades: [...prevCharacter.habilidades, newSkillFormated],
            };
        });

        updateCharacter(props.character.id, {
            habilidades: [...props.character.habilidades, newSkillFormated],
        });
    }

    // Função que remove uma habilidade
    function deleteSkill(id) {
        let skillsArray = props.character.habilidades.filter(
            (skill) => skill.id !== id
        );

        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                habilidades: skillsArray,
            };
        });

        updateCharacter(props.character.id, { habilidades: skillsArray });
    }

    // RITUAL FUNCTIONS
    // Função que adiciona um ritual
    function addRitual() {
        let newRitualFormated = {
            id: nanoid(),
            nome: newRitual.name,
            elemento: newRitual.element,
            círculo: newRitual.circle,
            alcance: newRitual.range,
            alvo: newRitual.target,
            duração: newRitual.duration,
            execução: newRitual.execution,
            descrição: newRitual.description,
        };
        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                rituais: [...prevCharacter.rituais, newRitualFormated],
            };
        });

        updateCharacter(props.character.id, {
            rituais: [...props.character.rituais, newRitualFormated],
        });

        setNewRitual({
            name: "",
            element: "",
            circle: "",
            range: "",
            target: "",
            execution: "",
            duration: "",
            description: "",
        });
    }

    // Função que remove um ritual
    function deleteRitual(id) {
        let ritualsArray = props.character.rituais.filter(
            (ritual) => ritual.id !== id
        );

        props.setCharacter((prevCharacter) => {
            return {
                ...prevCharacter,
                rituais: ritualsArray,
            };
        });

        updateCharacter(props.character.id, { rituais: ritualsArray });
    }
    // Função que atualiza um item
    function updateCharacter(id, newField) {
        const charDoc = doc(db, "personagens", id);
        updateDoc(charDoc, newField);
    }

    return (
        <main>
            {showPopup && (
                <StatusBarPopup
                    type={popupType}
                    status={status}
                    handleStatusPopup={handleStatusPopup}
                    handlePopup={handlePopup}
                />
            )}
            {showExpertisesPopup && (
                <ExpertisesPopup
                    handleExpertisesPopup={handleExpertisesPopup}
                    handleExpertisesChange={handleExpertisesChange}
                    characterExpertises={props.character.pericias}
                    expertises={props.expertises}
                />
            )}
            {showProficienciesPopup && (
                <ProficiencyPopup
                    character={props.character}
                    proficiencies={props.proficiencies}
                    handleProficienciesPopup={handleProficienciesPopup}
                    handleProficienciesChange={handleProficienciesChange}
                />
            )}
            <Character
                character={props.character}
                status={status}
                handleStatus={handleStatus}
                handlePopup={handlePopup}
                handleDRO={handleDRO}
            />
            <hr className="hr" />
            <div className="atributes">
                <h3 style={{ color: "white", marginBottom: "1rem" }}>
                    ATRIBUTOS
                </h3>
                <FiEdit
                    size={15}
                    className="edit-expertises"
                    onClick={(evt) =>
                        setAtributesChange((prev) => {
                            return !prev;
                        })
                    }
                />
                <div className="atributes-container">
                    <Atribute
                        name={"AGI"}
                        fullName={"agilidade"}
                        value={props.character.atributos.agilidade}
                        rollAtribute={rollAtribute}
                        atributesChange={atributesChange}
                        handleAtributesChange={handleAtributesChange}
                    />

                    <Atribute
                        name={"FOR"}
                        fullName={"força"}
                        value={props.character.atributos.força}
                        rollAtribute={rollAtribute}
                        atributesChange={atributesChange}
                        handleAtributesChange={handleAtributesChange}
                    />
                    <Atribute
                        name={"INT"}
                        fullName={"inteligência"}
                        value={props.character.atributos.inteligência}
                        rollAtribute={rollAtribute}
                        atributesChange={atributesChange}
                        handleAtributesChange={handleAtributesChange}
                    />
                    <Atribute
                        name={"PRE"}
                        fullName={"presença"}
                        value={props.character.atributos.presença}
                        rollAtribute={rollAtribute}
                        atributesChange={atributesChange}
                        handleAtributesChange={handleAtributesChange}
                    />
                    <Atribute
                        name={"VIG"}
                        fullName={"vigor"}
                        value={props.character.atributos.vigor}
                        rollAtribute={rollAtribute}
                        atributesChange={atributesChange}
                        handleAtributesChange={handleAtributesChange}
                    />
                </div>
            </div>

            <hr className="hr" />

            <Expertises
                characterExpertises={props.character.pericias}
                expertises={props.expertises}
                handleExpertisesPopup={handleExpertisesPopup}
            />
            <hr className="hr" />
            <Inventory
                inventory={props.character.inventário}
                actualLoad={props.character.cargaAtual}
                maxLoad={props.character.cargaMáxima}
                handleActualLoad={handleActualLoad}
                handleInputsChange={handleInputsChange}
                newItem={newItem}
                addItem={addItem}
                deleteItem={deleteItem}
            />
            <hr className="hr" />
            <Weapons
                weapons={props.character.armas}
                newWeapon={newWeapon}
                handleInputsChange={handleInputsChange}
                addWeapon={addWeapon}
                deleteWeapon={deleteWeapon}
            />
            <EquipmentInfo
                character={props.character}
                handleProficienciesPopup={handleProficienciesPopup}
                proficiencies={props.proficiencies}
                handleProtectionChange={handleProtectionChange}
            />

            <hr className="hr" />
            <Skills
                skills={props.character.habilidades}
                rollSkill={rollSkill}
                newSkill={newSkill}
                handleInputsChange={handleInputsChange}
                addSkill={addSkill}
                deleteSkill={deleteSkill}
            />
            <hr className="hr" />
            <Rituals
                rituals={props.character.rituais}
                newRitual={newRitual}
                handleInputsChange={handleInputsChange}
                addRitual={addRitual}
                deleteRitual={deleteRitual}
            />
            <hr className="hr" />
            <Personal
                personal={props.character.pessoal}
                handlePersonalChange={handlePersonalChange}
            />
            <hr className="hr" />
            <FixedDices rollSingleDice={rollSingleDice} />
            <Snackbar
                message={snackMessage}
                type={snackType}
                showSnackbar={showSnackbar}
                setShowSnackbar={setShowSnackbar}
            />
        </main>
    );
}