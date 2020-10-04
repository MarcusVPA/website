const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/connection');


class LoginController {
    async check (request, response) {
        const privateKey = 'qwerty@123';
        const { userId, password } = request.body;
        const user = await db('users')
        .first('*').where('userId', userId);
    
        try {

            if(user) {
              const checkPassword = await bcrypt.compare(password, user.password);
              if(checkPassword) {
                //const token = await jwt.sign({userId}, privateKey, {expiresIn: "1h"});
                return response.status(200).json({user});
              } else {
                  return response.status(404).json({message:'Incorrect User or Password.'});
              }
            } else {
                return response.status(404).json({message:"User doesn't exist"});
            }
  
          } catch (err) {
              console.log(err);
              return response.status(500).json({message:'Error to try login.'});
          }

    }
}

module.exports = LoginController;