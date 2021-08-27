let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let path = require('path');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');
let cors = require('cors');
const mysql = require('promise-mysql');

let config = require('./config');


let init = async () => {
    try {
        let pool = mysql.createPool(config.poolsql);
        initServer(pool);
    } catch (e) {
        console.error('Problem connecting to database', e);
    }
};

let initServer = (pool) => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use(express.static(__dirname+'/public'));
    
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
        next();
    });

    app.use(morgan('dev'));

    let authRouter = require('./app/routes/authenticate')(app, express, pool, jwt, config.secret, bcrypt);
    app.use('/authenticate', authRouter);

    let apiRouter = require('./app/routes/api')(app, express, pool, jwt, config.secret);
    app.use('/api', apiRouter);

    let apiNoTokenRouter = require('./app/routes/apiNoToken')(express, pool);
    app.use('/apiNoToken', apiNoTokenRouter);



    const allowed = [
        '.js',
        '.css',
        '.png',
        '.jpg',
        '.ico'
    ];
    
    // Catch all other routes and return the angular index file
    app.get('*', (req, res) => {
        if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
            res.sendFile(path.join(__dirname, `/public/app/${req.url}`));
        } else {
            res.sendFile(path.join(__dirname, '/public/app/index.html'));
        }
    });
    

    app.listen(config.port);

    console.log('Running on port ' + config.port);
};

init();














