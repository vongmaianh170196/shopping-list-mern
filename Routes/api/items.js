const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
//Item Model
const Item = require('../../Models/Item');

//@route Get api/items
// @desc Get All items
// @access Public 

router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
});

//@route Post api/items
// @desc Create a post
// @access Private

router.post('/', auth, (req, res) => {
   const newItem = new Item({
       name: req.body.name
   });
   newItem.save().then(item => res.json(item));
})

//@route Delete api/items/:id
// @desc Delete a post
// @access Private 

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({sucess: true})))
    .catch(err => err);
 })

module.exports = router;
