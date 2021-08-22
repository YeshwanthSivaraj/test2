const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port:", port)
})

app.get('/', (req, res) => {
    res.send('SES SNS TO HEROKU webapp quiet-falls')
})

app.post('/', (req, res) => {
    let body = ''
    res.on('data', (chunk) => {
        body += chunk.toString()
    })

    res.on('end', () => {
        console.log(body)
    })
})