import React from "react";
import "./Skills.css";

import Skill from "../Skill/Skill";
import AddSkill from "../AddSkill/AddSkill";

export default function Skills(props) {
    const skillsElements = props.skills.map((skill, idx) => {
        return (
            <Skill
                key={idx}
                skill={skill}
                rollSkill={props.rollSkill}
                deleteSkill={props.deleteSkill}
            />
        );
    });
    return (
        <div className="skills">
            <h3>HABILIDADES</h3>
            <div className="skills-container">
                {skillsElements}
                <AddSkill
                    newSkill={props.newSkill}
                    handleInputsChange={props.handleInputsChange}
                    addSkill={props.addSkill}
                />
            </div>
        </div>
    );
}
