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
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        let payload = JSON.parse(body)

        let message = JSON.parse(payload.Message)

        console.log(message.eventType)
        console.log(message)

        res.end('ok')        
    })
})