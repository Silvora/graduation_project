const db = require('../moudule/db.js')
const md5 = require('../moudule/md5')

//管理员列表
async function rootList(req, res) {
    let cnt = ''
    let sql = `SELECT COUNT(UID) FROM UserManager where coding = 1`
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(result)
            this.cnt = result[0]['COUNT(UID)']
        }
    })

    sql = `SELECT * FROM UserManager where coding = 1 limit 
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

//管理员查询
async function rootSearch(req, res) {
    //console.log(req.query)
    let cnt = ''
    let sql = `SELECT COUNT(UID) FROM UserManager where userName like '%${req.query.search}%' and coding='1'`
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
    and coding='1' limit ${(req.query.page - 1) * req.query.limit},${req.query.limit * req.query.page}`;
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

//管理员添加
async function rootAdd(req, res) {
    let sql = `INSERT INTO UserManager(UID ,userName, real_name, passWord, coding ) VALUES(?,?,?,?,?)`;
	let Uid = new Date().getTime()
	let newUid = md5.md5(Uid + req.body.userName)
	console.log(newUid)
	let newPassWord = md5.md5(req.body.password)
	const paramse = [newUid, req.body.userName, req.body.real_name, newPassWord, 1];
	//console.log(req.body) 
	await db(sql, paramse, (result)=>{
		if (result) {
			res.status(200).json({
				code: 200,
				msg: '管理员注册成功'
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
		
	})
}


//管理员删除
async function rootDelete(req, res) {
   //console.log(req.query)
   let sql = `DELETE FROM UserManager WHERE UID='${req.body.UID}' and coding = 1`
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

}

//管理员更改
async function rootEdit(req, res) {
    // let sql = `INSERT INTO UserManager(UID ,userName, real_name, passWord, sex, address, phone, born_data, cards, 
	// 	serviceTime, team, now_address, email, join_activity, coding ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	// const paramse = [newUid, req.body.userName, req.body.real_name, newPassWord, req.body.sex, req.body.address, req.body.phone,
	// 	req.body.born_data, req.body.cards, 0, "", req.body.now_address, req.body.email, "", 0];
    let pass = md5.md5(req.body.passWord)
    
    let sql = `UPDATE UserManager SET userName='${req.body.userName}', real_name='${req.body.real_name}', passWord='${pass}' where UID='${req.body.UID}' and coding = 1`
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

module.exports = {
	rootList,
    rootSearch,
    rootAdd,
    rootDelete,
    rootEdit
}
