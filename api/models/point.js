'use strict';

module.exports = (sequelize, DataTypes) => {
	const point = sequelize.define('point', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		latitude: {
			type: DataTypes.STRING,
			allowNull: false
		},
		longitude: {
			type: DataTypes.STRING,
			allowNull: false
		},
		team: {
			type: DataTypes.STRING(1),
			allowNull: true
		}
	});

	return point;
};
