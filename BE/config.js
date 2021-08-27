
module.exports={

      port:  process.env.PORT || 8081,
      secret:'nekidugacakstringzakodiranjetokena',
      poolsql:  {
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'foroom',
        debug    :  false
    }

};