const express = require('express');
const fetch = require('node-fetch');

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
        let payload = JSON.parse(body)

        if (payload.Type === 'SubscriptionConfirmation') {
            try{
                const data = fetch(payload.SubscribeURL)
                console.log('Subscription confirmed')
                res.end("ok")
            } catch (err) {
                console.log(err)
            }
        }
    })
})