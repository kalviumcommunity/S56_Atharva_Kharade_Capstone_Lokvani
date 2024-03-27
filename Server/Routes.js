const express = require('express');
const router = express.Router();
const userModel = require('./Models/userSchema');

router.use(express.json());

router.post('/users', async (req, res) => {
    try {
        const newUser = await userModel.create(req.body);
        res.status(201).json(newUser);
        console.log("New user created:", newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
        console.log("Users retrieved:", users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
