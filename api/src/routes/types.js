const { Router } = require('express');
const router = Router();
const { Type } = require('../db');

router.get('/', async (req, res) => {
    try {
        const types = await Type.findAll();
        res.send(types);
    } catch (err) {
        console.log(er.message);
        res.send({ msg: err.message});
    }
})

module.exports = router;