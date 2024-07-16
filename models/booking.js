const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Space = require('./space');

const Booking = sequelize.define('booking', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    spaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Space,
            key: 'id'
        }
    }
});

Space.hasMany(Booking, { foreignKey: 'spaceId' });
Booking.belongsTo(Space, { foreignKey: 'spaceId' });

module.exports = Booking;