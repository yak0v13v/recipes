const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/CategoriesService');

router.get('/', async function (req, res){
    try {
        const data = await CategoriesService.getCategories();
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(400).json({err})
    }
})

router.get('/:id', async function(req, res){
    try{
        const id = req.params.id;

        if(id) {
            const data = await CategoriesService.getCategory(id);

            res.status(200).json(data.rows[0]);
        } else {
            res.status(404).json({status: 'Not found'});
        }
    } catch (err) {
        res.status(400).json({err})
    }
})

router.put('/', async function(req, res){
    try{
       const {category} = req.body;
       await CategoriesService.addCategory(category);
       res.status(201).json({status: 'successfully created'});
    } catch (err) {
        res.status(400).json({err})
    }
})

router.post('/:id', async function(req, res){
    try{
        const id = req.params.id
        const {category} = req.body;
        await CategoriesService.updateCategory(id, category);
        res.status(200).json({status: 'successfully updated'});
    } catch (err) {
        res.status(400).json({err})
    }
})

router.delete('/:id', async function(req, res){
    try{
        const id = req.params.id;
        await CategoriesService.deleteCategory(id);
        res.status(200).json({status: 'successfully deleted'});
    }catch (err){
        res.status(400).json({err});
    }
})

module.exports = router;