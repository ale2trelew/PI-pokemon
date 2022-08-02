import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../../redux/actions";
import TypeIcon from "../Icons/TypeIcon";
import './styles.css';

export default function Details(props) {
    const dispatch = useDispatch();

    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchDetails(id));
    }, [dispatch, id]);

    const pokemon = useSelector((state) => state.details);
    return (
        <div className="detail.container">
            <div className="tittle-image-pos">
                <div className="detail-tittle">
                    <p className="pokemon-name">{pokemon.name}</p>
                    {/* Quizas deberia ir el detalle? */}
                </div>
                <br />
                <div>
                    <img className="detail-image" src={pokemon.sprite} alt={`${pokemon.name}`} />
                </div>
            </div>
            <div className="detail-data">
                <p>{pokemon.name}</p>
                <p>Vida: {pokemon.hp}</p>
                <p>Ataque: {pokemon.attack}</p>
                <p>Defensa: {pokemon.defense}</p>
                <p>Velocidad: {pokemon.speed}</p>
                <p>Altura: {pokemon.height}</p>
                <p>Peso: {pokemon.weight}</p>
                <p>Tipo:</p>
                <div className="detail-types">
                    {pokemon.types && <TypeIcon name={pokemon.types[0].name} />}
                    {pokemon.types && pokemon.types[1] && <TypeIcon name={pokemon.types[1].name} />}
                </div>
            </div>
        </div>
    );
}