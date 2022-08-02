const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');
const { setOrder, filters } = require('../services/pokemons');

// router.get('/', async (req, res) => {
//     const {name} = req.query;
//     const pokemonsTotal = await getAllPokemons();
//     try {
//         if(name) {
//             let pokemonName = await pokemonsTotal.find(e => e.name.toLowerCase() === name.toLowerCase());
//             if(pokemonName === undefined) {
//                 return res.status(404).send('Pokemon not found')
//             } else {
//                 return res.status(200).json(pokemonName)
//             }
//         } else {
//             res.status(200).json(pokemonsTotal);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

router.get('/', async (req, res) => {
    let { name, typeFilter, order, created } = req.query;
    try {
        if (created !== 'default' && created == true) {
            const createdInDb = await Pokemon.findAll({ where: {
                createdInDb: created
            } });
            if (!createdInDb.length) {
                return res.send({ msg: "No has creado ningun pokemon todavia" });
            }
            console.log("ENTRE A CREATED");
            return res.send(createdInDb);
        }

        if (name && name !== '') {
            const poke = await Pokemon.findAll({
                where: {
                    // name: { [Op.iLike]: `%${name}%` }
                    name: name
                },
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            })
            console.log("ENTRE A NAME ");
            if (poke?.length) return res.status(200).send(poke);
            else return res.status(404).send(`El pokemon "${name}" no existe.`);
        }

        if ( typeFilter !== 'default' && typeFilter) {
            const filteredPoke = await filters(typeFilter, order !== 'default' && order ? order : null);
            console.log("ENTRE A TYPEFILTER ", filteredPoke);
            return res.send(filteredPoke);
        }
        var allPokemons = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [], }
            }
        })
        if (order !== 'default' && order) {
            console.log("ENTRE A ORDER");
            allPokemons = setOrder(allPokemons, order);
        }
        res.send(allPokemons);
    } catch (err) {
        console.log("El error esta aqui ", err.message);
        res.send({ msg: err.message });
    }
})

router.post('/create', async (req, res) => {
    const {
        name, hp, attack, defense, speed, height, weight, sprite
    } = req.body;
    if (!name || !hp || !attack || !defense || !speed || !height || !weight) {
        console.log(name);
        return res.status(400).json({ info: `Falta ingresar un dato` });
    }
    let arrType = [];
    req.body.types.map(e => arrType.push({ name: e }));
    if (!arrType.length) {
        return res.status(400).json({ info: `Debes elegir al menos un tipo` });
    }
    const exist = await Pokemon.findOne({ where: { name: req.body.name } });
    if (exist) return res.json({ info: "Ya existe un pokemon con ese nombre" });
    try {
        const newPoke = await Pokemon.create({
            name:req.body.name,
            hp:req.body.hp,
            attack:req.body.attack,
            defense:req.body.defense,
            speed:req.body.speed,
            height:req.body.height,
            weight:req.body.weight,
            createdInDb: true,
            sprite: sprite ? sprite : "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif"
        });
        let typeDb = await Type.findAll({ where: { name: arrType[0].name } });
        newPoke.addType(typeDb);
        if (arrType[1]) {
            let typeDb2 = await Type.findAll({ where: { name: arrType[1].name } });
            newPoke.addType(typeDb2);
        }
        res.status(201).send({ msg: "Pokemon creado exitosamente!" });
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        if(id.length > 1) {
            var encontrado = await Pokemon.findOne({
                where: { id: id },
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            });
        } else if (typeof id === "string") {
            var encontrado = await Pokemon.findOne({
                where: { idApiPoke: parseInt(id) },
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            });
        } else {
            return res.status(400).json({ info: `No existe pokemon con el id `, encontrado });
        }
        res.send(encontrado);
    } catch (err) {
        console.log(err.message);
        res.send({ msg: err.msg });
    }
})



module.exports = router;