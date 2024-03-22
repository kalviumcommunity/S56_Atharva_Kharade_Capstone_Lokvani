const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

dotenv.config();

app.get('/', (req, res) => {
    try {
        res.send('Hello World from Atharva');
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});