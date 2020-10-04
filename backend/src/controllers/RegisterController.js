const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/connection');


class RegisterController {
    async create (request, response) {
        const { userId, password, roles } = request.body;

        const trx = await db.transaction(); 
        
        try {
            const hashPassword = await bcrypt.hash(password, 10);

            await trx('users').insert({
                userId,
                password: hashPassword,
                roles
            });
        
            await trx.commit();
            return response.status(201).json({
                message:'User created.'
            });
        
        } catch (err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error:'Unexpected error while creating new register.'
            });
        }
    }

    async read(request, response) {
        const { id } = request.params;

        const trx = await db.transaction(); 
    
        try {

            const user = await db('users')
            .first('*').where('id', id);
    
            if(!user){
             return response.json({message: 'User not exists'});
            } 
        
            await trx.commit(); 
        
            return response.status(200).json(user);
        } catch (err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while searching the register'
            })
        }
    }
    
    async update (request, response) {
        const { id, rules } = request.params;

        const trx = await db.transaction(); 
    
        try {

            const user = await db('users')
            .first('*').where('id', id);
    
            if(!user){
             return response.json({message: 'User not exists'});
            }
            
            const updateUser = await trx('users').where('id',id).update({
                rules
            });
        
            await trx.commit(); 
        
            return response.status(200).json(updateUser);
        } catch (err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while updating the register'
            })
        }
    }

    async delete(request, response) {
        const { id } = request.body;

        const user = await db('users')
        .first('*').where('id', id);

        if(!user){
         return response.json({message: 'User not exists'});
        } 

        const trx = await db.transaction(); 
    
        try {

            const deleteUsersIds = await trx('users')
            .where('id',id).delete();
        
            await trx.commit(); 
        
            return response.status(200).json({message:'User deleted.'});
        } catch (err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while deleting the register'
            })
        }
    }
}

module.exports = RegisterController;