module.exports=function(express,pool, jwt, secret){


    const apiRouter = express.Router();



    apiRouter.get('/', function(req, res) {
        res.json({ message: 'Dobro dosli na nas API!' });
    });

    apiRouter.use(function(req, res, next){

        const token = req.body.token || req.params.token || req.headers['x-access-token'] || req.query.token;

        console.log(req.params);
        console.log(token);

        if (token){

            jwt.verify(token, secret, function (err, decoded){

                if (err){

                    return res.status(403).send({
                        success:false,
                        message:'Wrong token'
                    });

                } else {

                    req.decoded=decoded;
                    next();

                }

            });


        } else {

            return res.status(403).send({
                success:false,
                message:'No token'
            });

        }


    });


    apiRouter.route('/users').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users');
            conn.release();
            res.json({ status: 'OK', users:rows });

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }

    }).post(async function(req,res){

        const user = {
            username : req.body.username,
            password : req.body.password,
            email : req.body.email

        };

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO users SET ?', user);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }


    }).put(async function(req,res){


        const user = req.body;

        console.log(user);

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('UPDATE users SET ? WHERE id = ?', [user,user.id]);
            conn.release();
            res.json({ status: 'OK', changedRows:q.changedRows });
            console.log(q);

        } catch (e){
            res.json({ status: 'NOT OK' });
        }

    }).delete(async function(req,res){

        res.json({"code" : 101, "status" : "Body in delete request"});

    });


    apiRouter.route('/users/:id').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users WHERE id=?',req.params.id);
            conn.release();
            res.json({ status: 'OK', user:rows[0]});

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }



    }).delete(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('DELETE FROM users WHERE id = ?', req.params.id);
            conn.release();
            res.json({ status: 'OK', affectedRows :q.affectedRows });

        } catch (e){
            res.json({ status: 'NOT OK' });
        }

    });

    apiRouter.route('/countries').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM countries');
            conn.release();
            res.json({ status: 'OK', countries:rows });

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }

    }).post(async function(req,res){

        delete req.body.id;
        console.log(req.body);


        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO countries SET ?', req.body);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }

    }).put(async function(req,res){

        console.log(req.body);


        try {

            let conn = await pool.getConnection();
            let q = await conn.query('UPDATE countries SET ? WHERE id = ?', [req.body ,req.body.id]);
            conn.release();
            res.json({ status: 'OK', changedRows:q.changedRows });
            console.log(q);

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }


    });

    apiRouter.route('/countries/:id').delete(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('DELETE FROM countries WHERE id = ?', req.params.id);
            conn.release();
            res.json({ status: 'OK', affectedRows :q.affectedRows });

        } catch (e){
            res.json({ status: 'NOT OK' });
        }


    });

    apiRouter.get('/me', function (req, res){

        res.send({status:200, user:req.decoded});
    });

    return apiRouter;


};

