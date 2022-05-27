const expresss = require('express');
const serverConfig = require('./configs/server.config');
const app = expresss();

app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port no : ${serverConfig.PORT}`)
})