const express = require('express');
const router = express.Router();
const {addnews,listnews,listnewsByid,updatenews,deletenews} = require('../controller/newstask')


router.get('/',listnews)
router.get('/:id',listnewsByid)
router.post('/',addnews)
router.patch('/:id',updatenews)
router.delete('/:id',deletenews)

module.exports = router