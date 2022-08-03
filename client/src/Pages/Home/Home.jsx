import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/pagination";
import notFoundImg from "../../resources/404-Page-Not-Found.png";
import { fetchPokemons, fetchTypes, filterByCreated, filterPokemonsByType } from "../../redux/actions";
import Card from "../../Components/Card/card";
import "./styles.css";
import Filters from "../../Components/Filters/Filters";


export default function Home() {
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
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

    function handleFilterCreatedInDb(e) {
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
    }

    function handleTypes(e) {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1)
        console.log(e.target.value, 'HANDLE TYPES');
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    return (
        <div className="ContainerPrincipal">
            <Filters
                createdFilter={handleFilterCreatedInDb}
                typesFilter={handleTypes}
            />

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