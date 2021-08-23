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

        let message = payload.Message
        let event_data = message
        // let result = {}

        if (message.eventType === "Delivery") {
            let messageID = event_data.mail.messageId
            let timestamp = new Date(event_data.delivery.timestamp)
            let email_id = event_data.mail.destination[0]
            let subject = event_data.mail.commonHeaders.subject

            // result = {
            //     messageID,
            //     timestamp,
            //     email_id,
            //     subject
            // }

            console.log(messageID, timestamp, email_id, subject) 
            res.end('ok')
        }
    })
})