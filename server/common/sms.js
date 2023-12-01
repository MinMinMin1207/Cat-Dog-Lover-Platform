import express from 'express';

import bodyParser from 'body-parser';

import twilio from 'twilio';

const app = express();
const PORT = process.env.PORT || 3000;

const accountSid = "AC992e73e1685c43d1876239e83203d61d";
const authToken = "45ed6577c7757da11fc0a0a276d464d0";

const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { to, body } = req.body;
    console.log(req.body);

    client.messages.create({
        body: body,
        to: to,
        from: "+18599641237",
    })
        .then(() => {
            res.send("SMS sent successfully!");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error sending SMS');

    })
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}')
})