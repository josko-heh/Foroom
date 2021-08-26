module.exports=function(app, express, db, pool, jwt, secret){

    let ObjectId = require('mongodb').ObjectId;
    let apiRouter = express.Router();

    apiRouter.use(function(req, res, next){

        var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.body.query || req.query.token;

        if (token){
            jwt.verify(token, secret, function (err, decoded){

                if (err){
                    return res.status(403).send({
                        status: 'NOT OK',
                        message:'Wrong token'
                    });
                } else {
                    req.decoded=decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                status: 'NOT OK',
                message:'No token'
            });
        }
    });


    apiRouter.route('/users').get(function(req,res){
        pool.then(function (p) {
                return p.getConnection()
            }).then(function (connection) {
                con = connection;
                return con.query('SELECT * FROM users')
            }).then(rows => {
                con.release();
                res.json({ status: 'OK', users:rows });
            }).catch(function(err) {
                console.error(err);
                res.json({"code" : 100, "status" : "Error with query"});
            });
    });


    apiRouter.route('/posts').get(async function(req,res){
        try {
            let rows = await db.collection('posts').find({}).toArray();
            res.json({ status: 'OK', posts : rows });
        } catch(e) {
            res.json({status: 'NOT OK'});
        }
    }).post(async function(req,res){

        let post = {
            userId : req.body.idUser,
            timestamp : req.body.timestamp,
            comment : req.body.comment,
        };

        try {
            let data = await db.collection('posts').insertOne(post);
            res.json({ status: 'OK', newId:data.insertedId });

        } catch (e) {
            res.json({ status: 'NOT OK' });
        }
    }).put(async  function(req,res){
        let post = {
            userId : req.body.idUser,
            timestamp : req.body.timestamp,
            comment : req.body.comment,
        };

        try {
            let data = await db.collection('posts').updateOne({
                _id : ObjectId(req.body.id)
            },{
                $set : post
            });

            res.json({ status: 'OK', changedRows: data.nModified });

        } catch (e) {
            res.json({ status: 'NOT OK' });
        }
    });


    apiRouter.route('/posts/:id').delete(async function(req,res){
        try {

            let data = await db.collection('posts').removeOne({
                _id : ObjectId(req.params.id)
            });

            res.json({ status: 'OK', affectedRows : data });

        } catch (e) {
            res.json({ status: 'NOT OK' });
        }
    });


    apiRouter.route('/categories').get(function(req,res){
        pool.then(function (p) {
                return p.getConnection()
            }).then(function (connection) {
                con = connection;
                return con.query('SELECT * FROM categories')
            }).then(rows => {
                con.release();
                res.json({ status: 'OK', categories:rows });
            }).catch(function(err) {
                console.error(err);
                res.json({"code" : 100, "status" : "Error with query"});
            });
    });

    /*apiRouter.get('/me', function (req, res){

        res.send(req.decoded);

    });*/

    return apiRouter;
}
