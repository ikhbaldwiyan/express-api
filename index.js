const express = require('express');
const bodyParser = require('body-parser');

//routes
const router = require('./routes/users');
const roomRouter = require('./routes/rooms');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use('/users', router);
app.use('/rooms', roomRouter);
app.listen(PORT, () => console.log(`Server Running on port http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send({
        welcome: 'Simple RESTFUL API Crud With Express JS'
    })
});