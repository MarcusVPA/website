const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database/connection');

const privateKey = 'qwerty@123';

class TokenController {
    async create (request, response) {
        const { id } = request.body;
        const token = await jwt.sign({ id }, privateKey, { expiresIn: "1h" });
        return response.status(200).json({ message: token });
    }
}

module.exports = TokenController;