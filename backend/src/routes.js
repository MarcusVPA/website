const express = require('express');
//const crypto = require('crypto');
const connection = require('./database/connection');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const { response } = require('express');
//const { request, response } = require('express');
//const db = require('../src/database/connection');

const routes = express.Router();

const loginController = new LoginController();
const registerController = new RegisterController();

routes.get('/', (request, response) => { 
  return response.json({ message: 'Welcome to API' });
});

routes.post('/login', loginController.check);
routes.post('/register', registerController.create);

routes.post('/upload', async (request, response) => {
  
  try {
      if(!request.files) {
          response.send({
              status: false,
              message: 'Error: No file uploaded'
          });
      } 
        
      console.log("request.files: ", request.files);
      let uploadedFile = request.files.file;
      uploadedFile.mv('./src/uploadedFiles/' + uploadedFile.name, function(err){
        if (err) {
            console.log("=== ERROR ===", err);
        }
      });
      response.json({
        message: 'File is uploaded',
        data: {
          name: uploadedFile.name,
          mimetype: uploadedFile.mimetype,
          size: uploadedFile.size,
          path: `/${uploadedFile.name}`
        }
      });
      
  } catch (err) {
      response.json({Error: "Error while uploading file."})
  }
});

routes.get('/show-user/:id', registerController.read);
routes.get('/edit-user/:id', registerController.update);
routes.post('/delete-user', registerController.delete);


routes.get('/list-users', async (request, response) => {
  const listUser = await connection('users').select('*');
  return response.json(listUser); 
});

routes.get('*', (request, response) => { 
  return response.json({message:'Error 404'}); 
  //res.sendFile(__dirname+'/public/index-404.html') 
});


module.exports = routes;