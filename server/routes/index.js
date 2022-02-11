module.exports = app => {
	
	const express = require('express');
	const router = express.Router();
	const Enrol = require('../contorller/enrol.js');
	const User = require('../contorller/user.js')
	const Root = require('../contorller/root.js')
	const Active = require('../contorller/active.js')
	//const newsapi = require('../contorller//news.js')
	//const userAddNews = require('../contorller//userAddNews.js')
	//const newsClass = require('../contorller//newsClass.js')
	//const upNewsFlag = require('../contorller//upNewsFlag.js')
	
	app.use('/api', router);

	//登录注册
	router.post('/login',Enrol.login);
	router.post('/register',Enrol.register);
	router.post('/verifyEmail',Enrol.verifyEmail);

	//用户管理
	router.get('/userList',User.userList);
	router.get('/userSearch',User.userSearch);
	router.post('/userEdit',User.userEdit);
	router.post('/userDelete',User.userDelete);

	//管理员管理
	router.get('/rootList',Root.rootList);
	router.get('/rootSearch',Root.rootSearch);
	router.post('/rootAdd',Root.rootAdd);
	router.post('/rootDelete',Root.rootDelete);
	router.post('/rootEdit',Root.rootEdit);

	//活动管理
	router.post('/activeEdit',Active.activeEdit);
	router.get('/activeList',Active.activeList);
	router.get('/activeSearch',Active.activeSearch);
	
}
