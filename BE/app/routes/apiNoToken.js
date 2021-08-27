module.exports=function(express, pool){

    let apiRouter = express.Router();

    apiRouter.route('/addUser').post(function(req,res){
             require('bcrypt-nodejs').hash(req.body.password, null, null, function(err, hash) {

                let user = {
                     username : req.body.username,
                     password : hash,
                     name : req.body.name,
                     email : req.body.email
                 };

                 pool.then(function(p) {
                    return p.getConnection()
                }).then(function(connection) {
                    con = connection;
                    return con.query('INSERT INTO users SET ?', user);
                }).then(row => {
                    con.release();
                    res.json({ status: 'OK', insertId:row.insertId });
                }).catch(function(err) {
                    console.error(err);
                    res.json({"code" : 100, "status" : "Error with query"});
                });
             });
    });

    return apiRouter;
}
