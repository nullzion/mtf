const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('client'));

const connections = [];

app.post('/message', (req, res) => {
    expressWs.getWss().clients.forEach(c => c.send(req.body.results[0].message.text));
    res.send('Ok');
});

app.ws('/ws', (ws, req) => {
    connections.push(ws);
    ws.send('Hello');
});

app.listen(process.argv[2], () => {
    console.log('Listening');
});
