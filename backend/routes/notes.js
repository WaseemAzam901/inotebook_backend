const express = require('express');
const router = express();


router.get('/',(req, res) => {
    const name = "waseem" 
    res.json(name)
})


module.exports = router