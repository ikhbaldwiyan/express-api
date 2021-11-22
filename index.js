const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/users');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use('/users', router);
app.listen(PORT, () => console.log(`Server Running on port http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send({
        welcome: 'Simple RESTFUL API Crud With Express JS'
    })
});