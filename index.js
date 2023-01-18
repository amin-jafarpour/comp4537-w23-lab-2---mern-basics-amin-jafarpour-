const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static('public'));

app.post('/chatbot', (req, res) => {
    const message = req.body.message;
    const number = message.match(/\d+/); //danger***
    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text())
            .then(data => {
                res.json({ text: data });
            }).catch(error => {
                res.json({ text: data });
            });

    } else {
        res.json({ text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});