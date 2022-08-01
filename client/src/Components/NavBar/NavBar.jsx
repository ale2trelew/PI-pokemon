import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.css";
import image from "../../resources/pokemonLogo.png";
import Form from "../Form/Form";

export const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.NavBar}>
            <nav className={style.header}>
                <Link to="/pokemons" className={style.logo}>
                    <img src={image} alt="" />
                </Link>
                <ul>
                    <li>
                        <a href={null} onClick={() => setOpen(!open)} onBlur={() => {
                            setTimeout(() => setOpen(!open), 200)
                        }}>
                            Crear un pokemon
                        </a>
                        {open && <Form />}
                    </li>
                </ul>
            </nav>
        </div>
    );
};