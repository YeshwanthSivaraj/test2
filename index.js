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

        // if (payload.eventType === "Delivery") {
        //     let messageID = payload.mail.messageId
        //     let timestamp = new Date(payload.delivery.timestamp)
        //     let email_id = payload.mail.destination[0]
        //     let subject = payload.mail.commonHeaders.subject

        //     console.log(messageID, timestamp, email_id, subject) 
        //     res.end('ok')
        // }
        console.log(payload.Message)
    })
})