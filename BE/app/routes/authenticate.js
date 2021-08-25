module.exports = function (app, express, db, jwt, secret, bcrypt) {

    var authRouter = express.Router();

    authRouter.post('/', async function (req, res) {
        try {
            let rows = await db.collection('users').find({
                username: req.body.username
            }).toArray();

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
                            id :  rows[0]._id,
                            username: rows[0].username, 
                            name: rows[0].name,
                            password: rows[0].password,
                            email: rows[0].email
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
