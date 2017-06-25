const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => { 
  res.json([{ "id": 1, "title": "json-server", "author": "typicode" }]) 
});

router.get('/:id', (req, res) => { 
  res.json({ "id": 1, "title": "json-server", "author": "typicode" }) 
});

module.exports = router;
