import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/pagination";
import notFoundImg from "../../resources/404-Page-Not-Found.png";
import { fetchPokemons, fetchTypes } from "../../redux/actions";
import Card from "../../Components/Card/card";
import "./styles.css";

//FALTAN LOS FILTERS

export default function Home() {
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(10);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    const currentPokemons = allPokes?.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    return (
        <div className="ContainerPrincipal">
            {/* faltan filtros */}

            <div className="pokePosition">
                {currentPokemons.length ? currentPokemons?.map((e, i) => {
                    return (
                        <div key={i}>
                            <Card id={e.id} name={e.name} img={e.sprite} types={e.types} />
                        </div>
                    );
                }) :
                <div>
                    <img src={notFoundImg} alt="Not found" />
                </div>
                }
            </div>
            <div>
                <Pagination key={allPokes.id} pokemonsPerPage={pokemonsPerPage} totalPokemons={allPokes.length} paginate={paginate}/>
            </div>
        </div>
    );
}