const mysql = require('mysql');

const db_config={
    host:"localhost",
    user:"root",
    password:"757909414",
    port:"3306",
    database:"Volunteer" 
}
let pool=mysql.createPool(db_config);

module.exports = query = (sql, paramse, callback)=>{
	pool.getConnection(function(err,connect){//通过getConnection()方法进行数据库连接

    if(err){
        console.log(`mysql链接失败${err}`);
    }else{
        connect.query(sql, paramse, function(err,result){
            if(err){
                console.log(`SQL error:${err}`);
                callback();
            }else{
                callback(result);
                connect.release();//释放连接池中的数据库连接
            }
        });
    }

 })

}

