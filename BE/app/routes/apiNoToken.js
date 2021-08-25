module.exports=function(express, db){

    let apiRouter = express.Router();

    apiRouter.route('/addUser').post(function(req,res){
             require('bcrypt-nodejs').hash(req.body.password, null, null, function(err, hash) {

                let user = {
                     username : req.body.username,
                     password : hash,
                     name : req.body.name,
                     email : req.body.email
                 };

                 db.collection('users').insertOne(user, function(err, data){
                     if (!err){
                         res.json({ status: 'OK', newId:data.insertedId});
                     }
                     else
                         res.json({ status: 'NOT OK' });
                 });

             });
    });

    return apiRouter;
}
