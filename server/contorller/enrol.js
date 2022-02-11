const db = require('../moudule/db.js')
const md5 = require('../moudule/md5')
const Email  = require('../sendEmail/sendEmail')

async function login(req, res) {
	let pass = md5.md5(req.body.password)
	const sql = `SELECT * FROM UserManager where userName="${req.body.username}" and passWord="${pass}"`;
	const paramse = [];

	console.log(req.body.username,req.body.password)
	await db(sql, paramse, (result)=>{
		if (result.length == 1) {
			res.status(200).json({
				code: 200,
				msg: '用户登录成功'
			})
		}else{
			res.status(404).json({
				message: 'Welcome to the project-name api'
			});
		}
		
			
	});
};

//用户注册
async function register(req, res) {
// 	userName: '31',
//   passWord: '321',
//   nowPassWord: '312',
//   real_name: 'dsa',
//   sex: '男',
//   born_data: '2022-01-12',
//   address: 'dsa',
//   phone: 'dsa',
//   cards: 'dsad',
//   now_address: 'dsa',
//   email: '321@qq.com',
//   verify: 'dsa'

	let sql = `INSERT INTO UserManager(UID ,userName, real_name, passWord, sex, address, phone, born_data, cards, 
		serviceTime, team, now_address, email, join_activity, coding ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	let Uid = new Date().getTime()
	let newUid = md5.md5(Uid + req.body.userName)
	//console.log(newUid)
	let newPassWord = md5.md5(req.body.passWord)
	const paramse = [newUid, req.body.userName, req.body.real_name, newPassWord, req.body.sex, req.body.address, req.body.phone,
		req.body.born_data, req.body.cards, 0, "", req.body.now_address, req.body.email, "", 0];
	//console.log(req.body) 
	await db(sql, paramse, (result)=>{
		if (result) {
			res.status(200).json({
				code: 200,
				msg: '用户注册成功'
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
	// });
};


//用户邮箱验证
const verify = require("../sendEmail/html")
async function verifyEmail(req, res) {
	const yzm = parseInt( Math.random()*9000+1000)
	let html = verify.yzm(yzm)
	console.log(yzm)
	let emailTodo = await Email.emailTo(req.body.email, '志愿者', '', html)
	console.log(emailTodo)

	if(emailTodo.httpCode == 200){
		res.status(200).json({
			code: 200,
			data: yzm*1024
		})
	}
};



module.exports = {
	login,
	register,
	verifyEmail,
}
