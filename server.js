const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hey there');
});

app.listen(process.env.port || 3000);
console.log('Web server is listening at port ' + (process.env.port || 3000));