'use strict';

const PORT = 3000;
const http = require('http');
let { app } = require('./app.js');

(async ()=>{
    app = await app().catch(er=>console.error(er))
    var server = http.createServer(app);
    server.listen(PORT)
    console.log(`listening on http://localhost:${PORT}`)
})();