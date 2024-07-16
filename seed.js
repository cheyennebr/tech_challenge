const sequelize = require('./models');
const Space = require('./models/Space');
const Booking = require('./models/Booking');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const space1 = await Space.create({ name: 'Conference Room', capacity: 10 });
        const space2 = await Space.create({ name: 'Meeting Room', capacity: 5 });

        await Booking.create({
            date: '2024-07-15',
            startTime: '09:00:00',
            endTime: '11:00:00',
            spaceId: space1.id
        });

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();