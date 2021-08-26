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
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        let payload = JSON.parse(body)

        let message = JSON.parse(payload.Message)

        const status = message.eventType
        const messageID = message.mail.messageId
        const timestamp = new Date(message.mail.timestamp)
        const email_id = message.mail.destination[0]
        const subject = message.mail.commonHeaders.subject

        const result = {
            status,
            messageID,
            timestamp,
            email_id,
            subject
        }

        console.log(result)

        res.end('ok')        
    })
})