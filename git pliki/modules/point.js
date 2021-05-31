'use strict';

const status = require('http-status-codes'),
	path = require('path'),

	models = require(path.join(__dirname, '..', 'models'));

class Point {
	constructor(point) {
		this.id = point.id;
		this.latitude = point.latitude;
		this.longitude = point.longitude;
		this.team = point.team;
	}

	construct(point) {
		this.id = point.id;
		this.latitude = point.latitude;
		this.longitude = point.longitude;
		this.team = point.team;
	}

	get getId() {
		return this.id;
	}

	get getName() {
		return this.name;
	}

	get getIngredients() {
		return this.ingredients;
	}

	get getDescription() {
		return this.description;
	}

	findByPk() {
		return new Promise((resolve, reject) => {
			models.recipe.findByPk(this.getId).then(recipe => {
				if (null === recipe)
					return reject({
						status: status.NOT_FOUND,
						errors: [{
							message: 'Przepis o podanym identyfikatorze nie istnieje.'
						}]
					});

				return resolve(recipe);
			}).catch(reject);
		});
	}

	read() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(recipe => {
				this.construct(recipe);

				return resolve(this);
			}).catch(reject);
		});
	}

	update() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(recipe => recipe.update({
				name: this.getName,
				ingredients: this.getIngredients,
				description: this.getDescription
			})).then(() => resolve()).catch(reject);
		});
	};
	
	static list() {
		return new Promise((resolve, reject) => {
			models.point.findAll().then(points => {
				const pointsResponse = [];

				points.forEach(point => {
					pointsResponse.push({
						id: point.id,
						latitude: point.latitude,
						longitude: point.longitude,
						team: point.team,
					});
				});

				return resolve(pointsResponse);
			}).catch(reject);
		});
	}
}

module.exports = Point;
