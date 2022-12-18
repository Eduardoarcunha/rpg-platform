import React from "react";
import "./FixedDices.css";

export default function FixedDices(props) {
    return (
        <div className="fixed-dices">
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(2)}
            >
                <span className="dice-span">D2</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(3)}
            >
                <span className="dice-span">D3</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(4)}
            >
                <span className="dice-span">D4</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(6)}
            >
                <span className="dice-span">D6</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(8)}
            >
                <span className="dice-span">D8</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(10)}
            >
                <span className="dice-span">D10</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(12)}
            >
                <span className="dice-span">D12</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(20)}
            >
                <span className="dice-span">D20</span>
            </div>
            <div
                className="dice-circle"
                onClick={() => props.rollSingleDice(100)}
            >
                <span className="dice-span">D100</span>
            </div>
        </div>
    );
}
