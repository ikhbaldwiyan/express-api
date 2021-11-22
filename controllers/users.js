const { v4: uuidv4 } = require('uuid');

let users = []

const getUser = (req, res) => {
    res.send(users)
}

const createUser = (req, res) => {
    const user = {
        id: uuidv4(),
        name: req.body.name,
        age: req.body.age
    };    

    users.push(user)
    res.send(user)
}

const detailUser = (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id === id)
    res.send(findUser)
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const user = users.find((user) => user.id === id);

    if (name) user.name = name
    if (age) user.age = age

    res.send(`User ${id} has been updated`)
}

const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id)
    res.send(`users ${id} success deleted`)
}

module.exports = { getUser, createUser, detailUser, updateUser, deleteUser };