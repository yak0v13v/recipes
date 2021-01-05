const express = require('express');
const router = express.Router();
const RecipesService = require('../services/RecipesService');

router.get('/', async function(req, res, next) {
    try {
        const data = await RecipesService.getRecipes();
        res.status(200).json(data.rows);
    } catch (err){
        res.status(400).json({err})
    }
});

router.get('/:id', async function(req, res){
    try {
        const id = req.params.id;

        if(id <= 0){
            res.status(404).json({status: 'Not found'});
        }

        const data = await RecipesService.getRecipe(id);

        if(data) {
            res.status(200).json(data.rows[0]);
        } else {
            res.status(404).json({status: 'Not found'});
        }
    } catch (err){
        res.status(400).json({err});
    }
});

router.put('/', async function(req, res){
   try {
       const {title, description, img, category_id} = req.body;

       if(title, description, img) {
           await RecipesService.addRecipe(title, description, img, category_id);
           res.status(201).json({status: 'successfully created'});
       } else {
           res.status(400).json({err: 'no required parameters'});
       }
   } catch (err){
       res.status(400).json({err});
   }
});

router.post('/:id', async function(req, res){
    try {
        const id = req.params.id;
        const {title, description, img, category_id} = req.body;

        if(id, title, description, img, category_id) {
            await RecipesService.updateRecipe(id, title, description, img, category_id);
            res.status(200).json({status: 'successfully updated'});
        } else {
            res.status(400).json({err: 'no required parameters'});
        }
    } catch (err){
        res.status(400).json({err});
    }
});

router.delete('/:id', async function(req, res){
    const id = req.params.id;

    if(id) {
        await RecipesService.deleteRecipe(id);
        res.status(200).json({status: 'successfully deleted'});
    } else {
        res.status(400).json({err: 'no required parameters'});
    }
});

module.exports = router;