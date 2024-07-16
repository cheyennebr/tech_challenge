require('dotenv').config();
const argon2 = require('argon2');
const sequelize = require('./models');
const Space = require('./models/space');
const Booking = require('./models/booking');
const User = require('./models/user');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Usar { alter: true } para atualizar as tabelas sem excluir os dados
        console.log('Database synchronized successfully.');

        // Hashing de senhas
        const adminPassword = await argon2.hash(process.env.ADMIN_PASSWORD);
        const userPassword = await argon2.hash(process.env.USER_PASSWORD);

        // Verificar se os usuários já existem
        const adminExists = await User.findOne({ where: { username: 'admin' } });
        if (!adminExists) {
            await User.create({
                username: 'admin',
                password: adminPassword,
                role: 'admin'
            });
        }

        const userExists = await User.findOne({ where: { username: 'user' } });
        if (!userExists) {
            await User.create({
                username: 'user',
                password: userPassword,
                role: 'user'
            });
        }

        console.log('Admin and user accounts created with hashed passwords if they did not exist.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDatabase();