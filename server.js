require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const argon2 = require('argon2');
const { Sequelize, Op } = require('sequelize');
const sequelize = require('./models');
const Space = require('./models/space');
const Booking = require('./models/booking');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoints de Autenticação
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && await argon2.verify(user.password, password)) {
        const redirectTo = user.role === 'admin' ? '/admin.html' : '/user.html';
        res.json({ redirectTo, userId: user.id });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

app.post('/logout', (req, res) => {
    res.redirect('/index.html');
});

// Endpoints de Espaços
app.post('/spaces', async (req, res) => {
    try {
        const space = await Space.create(req.body);
        res.status(201).json(space);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/spaces', async (req, res) => {
    try {
        const spaces = await Space.findAll();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/spaces/:id', async (req, res) => {
    try {
        const space = await Space.findByPk(req.params.id);
        if (space) {
            res.status(200).json(space);
        } else {
            res.status(404).json({ error: 'Espaço não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/spaces/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, capacidade } = req.body;
        const space = await Space.findByPk(id);
        if (!space) {
            return res.status(404).json({ error: 'Espaço não encontrado' });
        }
        space.name = name;
        space.capacidade = capacidade;
        await space.save();
        res.status(200).json(space);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/spaces/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const space = await Space.findByPk(id);
        if (!space) {
            return res.status(404).json({ error: 'Espaço não encontrado' });
        }
        await space.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoints de Reservas
app.post('/bookings', async (req, res) => {
    const { spaceId, date, startTime, endTime } = req.body;

    try {
        // Verificar conflitos de horários
        const conflict = await Booking.findOne({
            where: {
                spaceId: spaceId,
                date: date,
                [Op.or]: [
                    {
                        startTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        endTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        [Op.and]: [
                            {
                                startTime: {
                                    [Op.lte]: startTime
                                }
                            },
                            {
                                endTime: {
                                    [Op.gte]: endTime
                                }
                            }
                        ]
                    }
                ]
            }
        });

        if (conflict) {
            return res.status(400).json({ error: 'Horário de reserva conflita com uma reserva existente para este espaço.' });
        }

        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { spaceId, date, startTime, endTime } = req.body;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        // Verificar conflitos de horários ao atualizar a reserva
        const conflict = await Booking.findOne({
            where: {
                spaceId: spaceId,
                date: date,
                [Op.or]: [
                    {
                        startTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        endTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        [Op.and]: [
                            {
                                startTime: {
                                    [Op.lte]: startTime
                                }
                            },
                            {
                                endTime: {
                                    [Op.gte]: endTime
                                }
                            }
                        ]
                    }
                ],
                id: { [Op.ne]: id }
            }
        });

        if (conflict) {
            return res.status(400).json({ error: 'Horário de reserva conflita com uma reserva existente para este espaço.' });
        }

        booking.spaceId = spaceId;
        booking.date = date;
        booking.startTime = startTime;
        booking.endTime = endTime;
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        await booking.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});