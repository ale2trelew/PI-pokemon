import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import TypeIcon from "../Icons/TypeIcon";

export default function Card({ id, name, img, types }) {
    return (
        <div className="card">
            <div className="tittle">
                <p>{name}</p>
            </div>
            <div className="imgContainer">
                <Link to={`/pokemons/${id}`}>
                    <img src={img} alt={`${name}`} className="image" />
                </Link>
            </div>
            <div className="types">
                {types && <TypeIcon name={types[0].name} />}
                {types && types[1] && <TypeIcon name={types[1].name} />}
            </div>
        </div>
    );
}

