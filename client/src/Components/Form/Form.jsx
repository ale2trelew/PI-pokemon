import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postPokemon, fetchTypes, findClone } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import TypeIcon from "../Icons/TypeIcon";
import "./index.css"

export default function Form() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();

    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        types: [],
    });
    const [errors, setErrors] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (Object.values(errors).length) {
            let message = '';
            console.log(message);
            let err = Object.values(errors);
            return alert(message = err.map(e => e + '\n'));
        } else {
            const { name, hp, attack, defense, speed, height, weight, sprite, types } = input;

        if (name && hp && attack && defense && speed && height && weight && types.length !== 0) {
                    dispatch(postPokemon(input));
                    alert("Pokemon creado con exito!");
                } else {
                    alert("Te falta completar un campo!");
                }
                setInput({
                    name: "",
                    hp: "",
                    attack: "",
                    defense: "",
                    speed: "",
                    height: "",
                    weight: "",
                    sprite: "",
                    types: [],
                });
            }

            history.push("/pokemons");
        
    }
    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        
        setErrors(
            validate({
                ...input,
                [e.target.name]: [e.target.value],
            })
        );
    }

    function handleClearTypes(event) {
        setInput({
            ...input,
            types: []
        })
    }

    function handleSelect(event) {
        input.types.length < 2 && !input.types.includes(event.target.value) ? setInput({
            ...input,
            types: [...input.types, event.target.value],
        }) : alert("Maximo dos tipos");
    }

    // function handleSelect(e) {
    //     input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
    //         ...input,
    //         types: [...input.types, e.target.value]
    //     }) : alert('Maximo dos tipos!')
    // }

    function tisNumber(n) {
        if (/^\d+$/.test(n)) {
            return true;
        }
        return false;
    }
    
    function tisString(n) {
        if (/^\D+$/.test(n)) {
            return true;
        }
        return false;
    }

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Debe ingresar un nombre";
        } else if (!tisString(input.name)) errors.name = "No es una letra";
        else if (!input.hp) errors.hp = "Debe ingresar un valor para la vida";
        else if (!tisNumber(input.hp)) errors.hp = "No es un número";
        else if (!input.attack) errors.attack = "Debe ingresar un valor para el ataque";
        else if (!tisNumber(input.attack)) errors.attack = "No es un número";
        else if (!input.defense) errors.defense = "Debe ingresar un valor para la defensa";
        else if (!tisNumber(input.defense)) errors.defense = "No es un número";
        else if (!input.speed) errors.speed = "Debe ingresar un valor para la velocidad";
        else if (!tisNumber(input.speed)) errors.speed = "No es un número";
        else if (!input.weight) errors.weight = "Debe ingresar un valor para el peso";
        else if (!tisNumber(input.weight)) errors.weight = "No es un número";
        else if (!input.height) errors.height = "Debe ingresar un valor para la altura";
        else if (!tisNumber(input.height)) errors.height = "No es un número";
        return errors;
    }
    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)} className='form-layout' >
                <div>
                    <input 
                    className="generic-input"
                    required
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleChange(e)} />
                    {errors.name && <p className="errors">{errors.name}</p>}
                </div>

                <div>
                    <input 
                    className="generic-input"
                    type="number"
                    placeholder="Vida"
                    name="hp"
                    value={input.hp}
                    onChange={(e) => handleChange(e)} />
                    {errors.hp && <p className="errors">{errors.hp}</p>}
                </div>

                <div>
                    <input
                    className='generic-input'
                    type="number"
                    placeholder="Ataque"
                    name="attack"
                    value={input.attack}
                    onChange={(e) => handleChange(e)} />
                    {errors.attack && <p className="errors">{errors.attack}</p>}
                </div>

                <div>
                    <input
                    className='generic-input'
                    type="number"
                    placeholder="Defensa"
                    name="defense"
                    value={input.defense}
                    onChange={(e) => handleChange(e)} />
                    {errors.defense && <p className="errors">{errors.defense}</p>}
                </div>

                <div>
                    <input
                    className='generic-input'
                    type="number"
                    placeholder="Velocidad"
                    name="speed"
                    value={input.speed}
                    onChange={(e) => handleChange(e)} />
                    {errors.speed && <p className="errors">{errors.speed}</p>}
                </div>

                <div>
                    <input
                    className='generic-input'
                    type="number"
                    placeholder="Altura"
                    name="height"
                    value={input.height}
                    onChange={(e) => handleChange(e)} />
                    {errors.height && <p className="errors">{errors.height}</p>}
                </div>
                
                <div>
                    <input
                    className='generic-input'
                    type="number"
                    placeholder="Peso"
                    name="weight"
                    value={input.weight}
                    onChange={(e) => handleChange(e)} />
                    {errors.weight && <p className="errors">{errors.weight}</p>}
                </div>

                <input
                className="generic-input"
                type="url"
                id="sprite"
                placeholder={("Ingrese una imagen")}
                name="sprite"
                onChange={(e) => handleChange(e)}
                value={input.sprite} />

                <select className="generic-input" onChange={(e) => { handleSelect(e); }}>
                    {types.map((e) => {
                        return (
                            <option value={e.name} key={e.id}>
                                {e.name}
                            </option>
                        );
                    })}
                </select>

                <div className="form-types">
                    <ul>
                        {input.types.map((e) => (<TypeIcon name={e} />))}
                    </ul>
                </div>
                <ul>
                    <li>
                        <a href={null} onClick={handleClearTypes} >Limpiar tipos</a>
                    </li>
                    <li>
                        <button className="realodButton" type="submit">Crear!</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}