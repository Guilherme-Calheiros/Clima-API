import express from "express";
import "dotenv/config"
import axios from "axios";
import { readFileSync } from 'fs'

const app = express();
const port = 3000;

const apiKey = process.env.apiKey
const indexHTML = readFileSync('public/index.html', 'utf8');

app.use(express.static('public'))

app.get('/' , (req, res) => {
    res.send(indexHTML)
});

app.get('/weather' , async (req, res) => {
    try {
        const city = req.query.city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: 'Error fetching data'})
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})