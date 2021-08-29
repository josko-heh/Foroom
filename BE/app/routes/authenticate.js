module.exports = function (app, express, pool, jwt, secret, bcrypt) {

    var authRouter = express.Router();

    authRouter.post('/', async function (req, res) {
        try {
            let rows = await pool.then(function (p) { return p.getConnection(); })
                .then(function (connection) {
                    con = connection;
                    return con.query('SELECT * FROM users where username=?', req.body.username);
                }).then(rows => {
                    return rows;
                }).catch(function(err) {
                    console.error(err);
                    res.json({"code" : 100, "status" : "Error with query"});
                });
                //  await db.collection('users').find({
                //     username: req.body.username
                // }).toArray();


            if (rows.length == 0) res.json({ status: 'NOT OK', description: 'Username doesnt exist' }); 
            else {
                let validPass = bcrypt.compareSync(req.body.password, rows[0].password);

                if (rows.length > 0 && validPass) {

                    let token = jwt.sign({
                        username: rows[0].username,
                        password: rows[0].password,
                    }, secret, {
                        expiresIn: 1440
                    });

                    res.json({
                        status: 'OK',
                        token: token,
                        user: { 
                            id:  rows[0].id,
                            username: rows[0].username, 
                            name: rows[0].name,
                            password: rows[0].password,
                            email: rows[0].email,
                            authLevel: rows[0].auth_level
                        }
                    });
                } else {
                    res.json({ status: 'NOT OK', description: 'Wrong password' });
                }
            }
        } catch (e) {
            res.json({ status: 'NOT OK' });
        }
    });

    return authRouter;
}
