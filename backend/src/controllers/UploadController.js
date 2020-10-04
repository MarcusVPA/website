const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database/connection');

const privateKey = 'qwerty@123';

class UploadController {
    async check (request, response, next) {
        if(request.files) {
            console.log("REQUEST FILES: ", request.files);
            var file = request.files.file;
            var filename = file.name;
            console.log("FILENAME: ", filename);
        }
        next();
    }
}

module.exports = TokenController;