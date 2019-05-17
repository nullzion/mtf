const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');
const emoji =  require('node-emoji');

app.use(bodyParser.json());
app.use(express.static('client'));

const connections = [];

app.post('/message', (req, res) => {
    const message = req.body.results[0];
    console.log(message);
    if (message.content) {
        
        expressWs.getWss().clients.forEach(c => c.send(emoji.unemojify(message.content.text)));
    } else {
        expressWs.getWss().clients.forEach(c => c.send(emoji.unemojify(message.message.text)));
    }
    
    res.send('Ok');
});

app.ws('/ws', (ws, req) => {
    connections.push(ws);
    ws.send('Yeehao');
});

app.listen(process.argv[2], () => {
    console.log('Listening');
});
