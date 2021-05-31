'use strict';

const express = require('express'),
	path = require('path'),

	Point = require(path.join(__dirname, '..', 'modules', 'point')),
	RecipeValidator = require(path.join(__dirname, '..', 'validators', 'recipe')),

	router = express.Router();

router.get('/list', (req, res, next) => {
	Point.list().then(points => {
		res.json(points);
	}).catch(err => {
		next(err);
	});
});

router.put('/:id', (req, res, next) => {
	new RecipeValidator(req, [
		'id',
		'name',
		'ingredients'
	]).validate().then(() => {
		return new Recipe({
			id: req.params.id,
			name: req.body.name,
			ingredients: req.body.ingredients,
			description: req.body.description
		}).update();
	}).then(() => {
		res.status(204).end();
	}).catch(err => {
		next(err);
	});
});

module.exports = router;
