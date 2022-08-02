const { Pokemon, Type } = require('../db');
const axios = require('axios');



const searchIdApi = async(id) => {
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = pokemon.data;
    // console.log(data);
    return {
        id: data.id,
        name: data.name,
        hp:data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
    }
}

const getAllPokemons = async () => {
    const pokemonsApi = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=61");
    const mapUrl = await pokemonsApi.data.results.map(element => { return element.url});
    let pokemons = [];
    for (let i = 0; i < mapUrl.length; i++) {
        const url = await axios.get(mapUrl[i]);
        pokemons.push({
            id: url.data.id,
            name: url.data.name,
            hp: url.data.stats[0].base_stat,
            attack: url.data.stats[1].base_stat,
            defense: url.data.stats[2].base_stat,
            speed: url.data.stats[5].base_stat,
            height: url.data.height,
            weight: url.data.weight,
            sprite: url.data.sprites.other.dream_world.front_default,
            types: url.data.types.map(e => e = { name: e.type.name }),
        });
    }
    return pokemons;
}

const fillTypesDB = async function () {
    let typesDb = [];
    try {
        typesDb = await Type.findAll({ where: { createdInDb: true } });
        // console.log("CANTIDAD DE typesDb: ", typesDb);
        const cantTypesDb = await Type.count();
        // console.log("CANTIDAD DE cantTypesDb: ", cantTypesDb);
        if (typesDb.length === cantTypesDb) {
            // console.log("ENTRE AL IF DE TYPES");
            const api = await axios.get("https://pokeapi.co/api/v2/type");
            const apiTypes = api.data.results.map(element => element.name);
            for (let i = 0; i < apiTypes.length; i++) {
                
                
                Type.findOrCreate({
                    where: { name: apiTypes[i] }
                });  
            };
        };
        console.log("Types Loaded.. ", await Type.count());
    } catch(err){
        console.log(err.message);
    }
}

const createFromApi = async function () {
    try {
        const pokemonInDb = await Pokemon.findAll({ where: { createdInDb: true}}) //CUIDAD CON ESTO XQ DEBERIA TRAER 0 SOLO CUANDO LA db ESTA VACIA LA PRIMERA VEZ
        
        const count = await Pokemon.count();

        if (pokemonInDb.length === count) {
            const apiPoke = await getAllPokemons();
            for (let i = 0; i < apiPoke.length; i++) {
                let newPokemon = await Pokemon.create({
                    idApiPoke: apiPoke[i].id,
                    name: apiPoke[i].name,
                    hp: apiPoke[i].hp,
                    attack: apiPoke[i].attack,
                    defense: apiPoke[i].defense,
                    speed: apiPoke[i].speed,
                    height: apiPoke[i].height,
                    weight: apiPoke[i].weight,
                    sprite: apiPoke[i].sprite,
                })
                let typeDb = await Type.findAll({ where: { name: apiPoke[i].types[0].name }})
                newPokemon.addType(typeDb);
                if (apiPoke[i].types[1]) {
                    let typeDb2 = await Type.findAll({ where: { name: apiPoke[i].types[1].name} });
                    newPokemon.addType(typeDb2);
                }
            }
        }
        console.log("Pokemons cargados...", await Pokemon.count());
    } catch (err) {
        console.log(err.message);
    }
}

const loadDb = async function () {
    await fillTypesDB();
    await createFromApi();
}

const filters = async (typeFilter, orderBy) => {
    try {
        var filterType = await Pokemon.findAll({
            inlcude: {
                model: Type,
                where: { "name": typeFilter },
                attributes: ["name"]
            },
        })
        if (filterType.length) {
            if (orderBy) return setOrder(filterType, orderBy);
            return filterType;
        }
    } catch (err) {
        console.log(err.message);
        throw new Error({ msg: err.message });
    }
}

const setOrder = (pokemon, by) => {
    switch (by) {
        case "attackUp": {
            return pokemon.sort((a, b) => b.attack - a.attack); 
        };
        case "attackDown": {
            return pokemon.sort((a, b) => a.attack - b.attack);
        };
        case "nameUp": {
            return pokemon.sort((a, b) => a.name.localeCompare(b.name));
        };
        case "nameDown": {
            return pokemon.sort((a, b) => b.name.localeCompare(a.name));
        };
        default: return pokemon;
    }
}

module.exports = { loadDb, setOrder, filters };