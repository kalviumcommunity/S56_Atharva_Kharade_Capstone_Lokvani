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


module.exports = router;
