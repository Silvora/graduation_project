const express = require('express');
const bodyParser = require('body-parser')
const DateStr = require('./moudule/date.js')

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//app.use(express.json());
app.use(require('cors')())
require('./routes/index.js')(app);

// const crypto = require("./moudule/md5");
// let oldpass = "root" + new Date().getTime()
// const newpass = crypto.md5(oldpass)
// console.log(newpass)


setInterval(() => {
    DateStr.setActiveList()
}, 1000*60*5);

app.listen(1991, ()=>{
    console.log('1991端口启动成功......');
});