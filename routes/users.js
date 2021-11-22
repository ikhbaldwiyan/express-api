const express = require('express');
const { getUser, createUser, detailUser, updateUser, deleteUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);
router.get('/:id', detailUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;