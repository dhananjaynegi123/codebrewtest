const express = require('express');
const app = express();
let server;

require('./startup')(app);
require('./startup/models')

server = require('http').Server(app);

server.listen(process.env.PORT, async () => {
    const error = require('./middleware/v1/error');


    // routes
    await require('./startup/routes')(app);

    app.use(error);
    console.log('listening on port: ', process.env.PORT);
});