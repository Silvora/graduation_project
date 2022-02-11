const db = require('../moudule/db.js')


//用户列表
async function userList(req, res) {
    let cnt = ''
    let sql = `SELECT COUNT(UID) FROM UserManager where coding = 0`
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(result)
            this.cnt = result[0]['COUNT(UID)']
        }
    })

    sql = `SELECT * FROM UserManager where coding = 0 limit 
    ${(req.query.page - 1) * req.query.limit},${req.query.limit * req.query.page}`;
    
	//console.log(req.query)
    
   if(cnt>=0){
    await db(sql, paramse, (result)=>{
		if (result) {
            //console.log(this.cnt)
			res.status(200).json({
				code: 200,
                cnt: this.cnt,
                data: result
			})
		}else{
			res.status(404).json({
				message: 'Welcome to the project-name api'
			});
			//res.body.status = 403
			// res.json({
			// 	status: 403,
			// 	msg: '没有此用户'
			// })
		}
		
			
	});
   }
};

//用户查询
async function userSearch(req, res) {
    //console.log(req.query)
    let cnt = ''
    let sql = `SELECT COUNT(UID) FROM UserManager where userName like '%${req.query.search}%' and coding='0'`
    //console.log(sql)
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            console.log(result)
            this.cnt = result[0]['COUNT(UID)']
        }
    })

    //console.log(cnt)
    sql = `SELECT * FROM UserManager where userName like '%${req.query.search}%'
    and coding='0' limit ${(req.query.page - 1) * req.query.limit},${req.query.limit * req.query.page}`;
	if(cnt >=0){
        await db(sql, paramse, (result)=>{
            if (result) {
                res.status(200).json({
                    code: 200,
                    cnt: this.cnt,
                    data: result
                })
            }else{
                res.status(404).json({
                    message: 'Welcome to the project-name api'
                });
            }
            
                
        });
    }
};



//用户更改
async function userEdit(req, res) {
    //console.log(req.body)
    let sql = `SELECT * FROM UserManager where UID='${req.body.UID}' and coding = 0`
    //console.log(sql)
    let paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(JSON.stringify({...result[0]})==JSON.stringify(req.body))
            if(JSON.stringify({...result[0]})==JSON.stringify(req.body)){
                res.status(200).json({
                    code: 200,
                    msg: '数据更改成功'
                })
            }else{
                Edit(req, res)
            }
        }
    })
    //console.log('*************',oldData)
    
    
};
async function Edit(req, res) {
    // let sql = `INSERT INTO UserManager(UID ,userName, real_name, passWord, sex, address, phone, born_data, cards, 
	// 	serviceTime, team, now_address, email, join_activity, coding ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	// const paramse = [newUid, req.body.userName, req.body.real_name, newPassWord, req.body.sex, req.body.address, req.body.phone,
	// 	req.body.born_data, req.body.cards, 0, "", req.body.now_address, req.body.email, "", 0];
    let sql = `UPDATE UserManager SET userName='${req.body.userName}', real_name='${req.body.real_name}', sex='${req.body.sex}', address='${req.body.address}', 
    phone='${req.body.phone}', born_data='${req.body.born_data}', cards='${req.body.cards}', serviceTime='${req.body.serviceTime}', team='${req.body.team}', 
    now_address='${req.body.now_address}', email='${req.body.email}', join_activity='${req.body.join_activity}' where UID='${req.body.UID}' and coding = 0`
    //console.log(sql)
    let paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            res.status(200).json({
                code: 200,
                msg: '数据更改成功'
            })
        }
    })
}



//用户删除
async function userDelete(req, res) {
    //console.log(req.query)
    let sql = `DELETE FROM UserManager WHERE UID='${req.body.UID}' and coding = 0`
    //console.log(sql)
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            res.status(200).json({
                code: 200,
                msg: '用户删除成功'
            })
        }
    })

   
};


module.exports = {
	userList,
    userSearch,
    userEdit,
    userDelete
}
