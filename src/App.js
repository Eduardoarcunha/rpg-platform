import React, { useEffect, useState } from "react";
import "./App.css";

import { BiLogIn } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdKeyboardReturn } from "react-icons/md";

import data from "./data.js";

import Header from "./components/Header/Header.js";
import CharacterPage from "./components/CharacterPage/CharacterPage";
import CreateCharacterPage from "./components/CreateCharacterPage/CreateCharacterPage";

import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
    const usersCollectionRef = collection(db, "personagens");
    const dicesCollectionRef = collection(db, "rolagens");

    const [login, setLogin] = useState("");
    const [wrongLogin, setWrongLogin] = useState(false);
    const [characters, setCharacters] = useState(null);
    const [character, setCharacter] = useState(null);
    const [expertises, setExpertises] = useState(data.pericias);
    const [origins, setOrigins] = useState(data.origens);
    const [trails, setTrails] = useState(data.trilhas);
    const [proficiencies, setProficiencies] = useState(data.proficiências);
    const [createCharacter, setNewCharacter] = useState(false);

    useEffect(() => {
        getDocs(usersCollectionRef).then((data) => {
            let charactersArray = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setCharacters(charactersArray);
        });
    }, []);

    function loginCharacter() {
        let temp = characters.find((character) => character.senha === login);
        temp ? setWrongLogin(false) : setWrongLogin(true);
        setCharacter(temp);
    }

    // HANDLE FUNCTIONS

    function handleLogin(event) {
        const { value } = event.target;
        setLogin(value);
        if (value.length === 0) {
            setWrongLogin(false);
        }
    }
    function handleCreateCharacter(newCharacter) {
        setNewCharacter((prevNewCharacter) => !prevNewCharacter);
    }

    function enterNewCharacterPage(newCharacter) {
        setCharacter(newCharacter);
    }

    return (
        <div className="App">
            {character ? (
                <>
                    <Header />
                    <CharacterPage
                        dicesCollectionRef={dicesCollectionRef}
                        usersCollectionRef={usersCollectionRef}
                        character={character}
                        setCharacter={setCharacter}
                        expertises={expertises}
                        proficiencies={proficiencies}
                    />
                </>
            ) : createCharacter ? (
                <>
                    <Header />
                    <CreateCharacterPage
                        origins={origins}
                        trails={trails}
                        usersCollectionRef={usersCollectionRef}
                        handleCreateCharacter={handleCreateCharacter}
                        enterNewCharacterPage={enterNewCharacterPage}
                    />
                </>
            ) : (
                <>
                    <Header />
                    <div className="login-container">
                        <div className="login">
                            <input
                                onChange={handleLogin}
                                placeholder="Login"
                                name="login"
                                value={login}
                            />
                            <BiLogIn
                                className="login-button"
                                size={30}
                                onClick={() => loginCharacter()}
                            />
                        </div>
                        {wrongLogin && <p>login incorreto</p>}
                        <button
                            className="create-character-button"
                            onClick={handleCreateCharacter}
                        >
                            +
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
