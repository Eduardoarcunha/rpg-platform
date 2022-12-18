import React from "react";
import "./Snackbar.css";
import { TbSword } from "react-icons/tb";
import { FaDiceD20 } from "react-icons/fa";
import { GiRollingDices } from "react-icons/gi";

export default function Snackbar(props) {
    return (
        <div
            style={{
                backgroundColor:
                    props.type === "atribute"
                        ? "#57dcbe"
                        : props.type === "skill"
                        ? "#E91E63"
                        : "#57ACDC",
            }}
            className="snackbar"
            id={props.showSnackbar ? "show" : "hide"}
        >
            <a
                className="close-snack"
                onClick={(evt) => props.setShowSnackbar(false)}
            >
                &times;
            </a>
            <div className="symbol">
                {props.type === "atribute" ? (
                    <FaDiceD20 size={30} />
                ) : props.type === "skill" ? (
                    <TbSword size={30} />
                ) : (
                    <GiRollingDices size={30} />
                )}
            </div>
            <div className="message">{props.message}</div>
        </div>
    );
}
