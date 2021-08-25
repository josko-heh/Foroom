

module.exports=function(express, pool, jwt, secret, crypto){


    let authRouter = express.Router();

    authRouter.post('/', async function(req,res){



        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users WHERE username=?', req.body.username);
            conn.release();

         // pri registraciji
            //let salt = crypto.randomBytes(128).toString('base64');
           // let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');


            if (rows.length==0) {

                res.json({ status: 'NOT OK', description:'Username doesnt exist' });

            }

            let compare = false;

            if (rows[0].salt) {

                let hash = crypto.pbkdf2Sync(req.body.password, rows[0].salt, 10000, 64, 'sha512');
                compare = hash.toString('hex') == rows[0].password;

            }



           // let compare = req.body.password===rows[0].password;

            if (compare){

                const token = jwt.sign({
                    username:rows[0].username,
                    email:rows[0].email,
                    level:rows[0].level
                }, secret, {
                    expiresIn:1440
                });

                res.json({ status: 200, token:token, user:rows[0]});

            } else if (rows.length>0){

                res.json({ status: 150, description:'Wrong password' });

            }


        } catch (e){

            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }



    });


    return authRouter;

};
