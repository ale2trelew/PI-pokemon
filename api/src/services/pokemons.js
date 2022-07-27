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
    const pokemonsApi = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=60");
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

const fillTypesDB = async () => {
    let typesDb = [];
    try {
        typesDb = await Type.findAll({ where: { createdinDb: true } });
        const cantTypesDb = await Type.count();
        if (typesDb === cantTypesDb) {
            const api = await axios.get("https://pokeapi.co/api/v2/type");
            const apiTypes = api.data.results.map(element => element.name);
            for (let i = 0; i < apiTypes.length; i++) {
                if (apiTypes[i] == "shadow" || apiTypes[i] == "unknown") {
                    continue;
                }
                Type.findOrCreate({
                    where: { name: apiTypes[i] }
                });  
            };
        };
        console.log("Types Loaded.. ", await Types.count());
    } catch(err){
        console.log(err.message);
    }
}

module.exports = { searchIdApi, getAllPokemons };