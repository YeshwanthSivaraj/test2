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
    res.send('SES SNS-falls')
})

app.post('/', (req, res) => {

    // console.log(req.body)
    // res.end('ok')

    let body = ''
    res.on('data', (chunk) => {
        body += chunk.toString()
    })

    res.on('end', () => {
        let payload = JSON.parse(body)

        if (payload.Type === 'SubscriptionConfirmation') {
            try{
                console.log('Subscription confirmed', payload)
                res.end("ok")
            } catch (err) {
                console.log(err)
            }
        }
    })
})