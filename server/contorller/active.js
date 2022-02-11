const db = require('../moudule/db.js')
//const activeDB = require('../moudule/activeDB.js')
const md5 = require('../moudule/md5')

//活动创建
async function activeEdit(req, res) {
    let sql = `INSERT INTO ActivityManager(UID ,activity_name, activity_address, total,
         begin_time, end_time, time, address, introduce, activity_director, 
         activity_apply_coding) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
    let Uid = new Date().getTime()
	let newUid = md5.md5(Uid)

    let oldAddress = String(req.body.activity_name) + new Date().getTime()
    console.log(oldAddress);
    const perAddress = md5.md5(oldAddress)

    const paramse = [newUid, req.body.activity_name, perAddress, 
        req.body.total, req.body.begin_time, req.body.end_time, req.body.time, req.body.address, 
        req.body.introduce, '张三', 0];

    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(result)
            // res.status(200).json({
			// 	code: 200,
			// 	msg: '活动创建成功'
			// })
            createBase(perAddress, req, res)
        }
    })
}

async function createBase(base, req, res){
    //console.log("**************",base);
    let newBase = 'ac' + base
    let sql = `CREATE TABLE Active.${newBase}(

        id int not null primary key auto_increment,

        UID varchar(60) not null,
        
        userName varchar(60) not null,
        
        coding varchar(10) not null
        
        ) `
    let paramse = []
        await db(sql, paramse, (result)=>{
            if(result){
                //console.log(result)
                res.status(200).json({
                    code: 200,
                    msg: '活动创建成功'
                })
            }
        })


}



//活动列表
async function activeList(req, res) {
    console.log(req.query)
    let cnt = ''
    let sql = `SELECT COUNT(UID) FROM ActivityManager`
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(result)
            this.cnt = result[0]['COUNT(UID)']
        }
    })

    sql = `SELECT * FROM ActivityManager limit ${(req.query.page - 1) * req.query.limit},${req.query.limit * req.query.page}`;
    
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
		}
		
			
	});
   }
};


//活动查询
async function activeSearch(req, res) {
    //console.log(req.query)
    let cnt = ''
    let sql = `SELECT COUNT(UID) FROM ActivityManager where activity_name like '%${req.query.search}%'`
    //console.log(sql)
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            console.log(result)
            this.cnt = result[0]['COUNT(UID)']
        }
    })

    //console.log(cnt)
    sql = `SELECT * FROM ActivityManager where activity_name like '%${req.query.search}%' limit
     ${(req.query.page - 1) * req.query.limit},${req.query.limit * req.query.page}`;
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

module.exports = {
	activeEdit,
    activeList,
    activeSearch
}


