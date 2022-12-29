const express = require('express');
const userController = require('../controllers/userController');

const routes = express.Router();

routes.post('/login', userController.kakaoLogin)

module.exports = {
    routes
}