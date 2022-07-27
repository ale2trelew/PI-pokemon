const { Router } = require('express');
const router = Router();
const { searchIdApi, getAllPokemons } = require('../services/pokemons');

router.get('/', async (req, res) => {
    const {name} = req.query;
    const pokemonsTotal = await getAllPokemons();
    try {
        if(name) {
            let pokemonName = await pokemonsTotal.find(e => e.name.toLowerCase() === name.toLowerCase());
            if(pokemonName === undefined) {
                return res.status(404).send('Pokemon not found')
            } else {
                return res.status(200).json(pokemonName)
            }
        } else {
            res.status(200).json(pokemonsTotal);
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;