module.exports = function (app, express, pool, jwt, secret) {

    let apiRouter = express.Router();

    apiRouter.use(function (req, res, next) {

        var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.body.query || req.query.token;

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {

                if (err) {
                    return res.status(403).send({
                        status: 'NOT OK',
                        message: 'Wrong token'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                status: 'NOT OK',
                message: 'No token'
            });
        }
    });


    apiRouter.route('/users').get(function (req, res) {
        pool.then(function (p) {
            return p.getConnection()
        }).then(function (connection) {
            con = connection;
            return con.query('SELECT * FROM users')
        }).then(rows => {
            con.release();
            res.json({ status: 'OK', users: rows });
        }).catch(function (err) {
            console.error(err);
            res.json({ "code": 100, "status": "Error with query" });
        });
    });


    apiRouter.route('/categories').get(function (req, res) {
        pool.then(function (p) {
            return p.getConnection()
        }).then(function (connection) {
            con = connection;
            return con.query('SELECT * FROM categories')
        }).then(rows => {
            con.release();
            res.json({ status: 'OK', categories: rows });
        }).catch(function (err) {
            console.error(err);
            res.json({ "code": 100, "status": "Error with query" });
        });
    });

    apiRouter.route('/categories/:id').get(function (req, res) {
        pool.then(function (p) {
            return p.getConnection()
        }).then(function (connection) {
            con = connection;
            return con.query(`SELECT categories.id cat_id, name, threads.id th_id, title, datetime FROM categories
                LEFT JOIN threads ON categories.id = threads.category_id
                WHERE categories.id = ?;`, req.params.id);
        }).then(rows => {
            con.release();

            if (rows.length > 0) {
                let returnCategory = {
                    "id": rows[0].cat_id,
                    "name": rows[0].name,
                    "threads": []
                }

                rows.forEach(row => {
                    if (row.th_id != null)
                        returnCategory.threads.push({
                            "id": row.th_id,
                            "title": row.title,
                            "datetime": row.datetime
                        });
                });

                res.json({ status: 'OK', category: returnCategory });
            } else
                res.json({ status: 'NO CONTENT', category: null });

        }).catch(function (err) {
            console.error(err);
            res.json({ "code": 100, "status": "Error with query" });
        });
    });

    apiRouter.route('/categories/threads/rand').get(function (req, res) {
        pool.then(function (p) {
            return p.getConnection()
        }).then(function (connection) {
            con = connection;
            return con.query(`SELECT categories.id cat_id, threads.id th_id FROM threads
                JOIN categories ON threads.category_id = categories.id
                ORDER BY RAND()
                LIMIT 1;`);
        }).then(rows => {
            con.release();

            if (rows.length > 0) {
                res.json({ 
                    status: 'OK', 
                    categoryId: rows[0].cat_id,
                    threadId: rows[0].th_id
                });
            } else
                res.json({ status: 'NO CONTENT', categoryId: null, threadId: null});

        }).catch(function (err) {
            console.error(err);
            res.json({ "code": 100, "status": "Error with query" });
        });
    });

    apiRouter.route('/categories/threads/:id').get(function (req, res) {
        pool.then(function (p) {
            return p.getConnection()
        }).then(function (connection) {
            con = connection;
            return con.query(
                `SELECT threads.id th_id, title, threads.datetime th_dt, th_users.id th_userId, th_users.username th_username, 
                comments.id comm_id, content, comments.datetime comm_dt, comm_users.id comm_userId, comm_users.username comm_username
            FROM threads
            LEFT JOIN users th_users ON th_users.id = threads.user_id
            LEFT JOIN comments ON comments.thread_id = threads.id
            LEFT JOIN users comm_users ON comm_users.id = comments.user_id
            WHERE threads.id = ?;`, req.params.id);
        }).then(rows => {
            con.release();

            if (rows.length > 0) {
                let returnThread = {
                    "id": rows[0].th_id,
                    "title": rows[0].title,
                    "datetime": rows[0].th_dt,
                    "user": {
                        "id": rows[0].th_userId,
                        "username": rows[0].th_username
                    },
                    "comments": []
                }

                rows.forEach(row => {
                    if (row.comm_id != null)
                        returnThread.comments.push({
                            "id": row.comm_id,
                            "content": row.content,
                            "datetime": row.comm_dt,
                            "user": {
                                "id": row.comm_userId,
                                "username": row.comm_username
                            }
                        });
                });

                res.json({ status: 'OK', thread: returnThread });
            } else
                res.json({ status: 'NO CONTENT', thread: null });

        }).catch(function (err) {
            console.error(err);
            res.json({ "code": 100, "status": "Error with query" });
        });
    });

    
    /*apiRouter.get('/me', function (req, res){

        res.send(req.decoded);

    });*/

    return apiRouter;
}
