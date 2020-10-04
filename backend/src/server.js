const express = require('express');
const cors =  require('cors');
const routes = require('./routes');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3333;

/*app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "http://localhost:3333");
    response.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
})*/

app.use( (request, response, next) => {
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

/*app.use('*', function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next(); 
}); 
    
app.options('http://localhost:3000', cors());*/


/*app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
    })
);
*/

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));

app.use(routes);

app.listen(port,(err)=>{
    err ? console.log("Erro ao executar o server.") : console.log("Executando o server na porta " +port); 
});