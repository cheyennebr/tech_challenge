const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Space = sequelize.define('space', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Space;