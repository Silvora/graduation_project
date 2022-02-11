var nodemailer = require("nodemailer");
var settingConfig = require('./settingConfig.js');//解析参数

//var smtp = settingConfig.smtp;
var mailFrom = settingConfig.mailFrom;
var mailPwd = settingConfig.mailPwd;

function emailTo(email,subject,text,html) {
    var transporter = nodemailer.createTransport({
        //host: 'smtp.qq.com',
        service: "QQ", // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
        auth: {
            user: mailFrom,
            pass: mailPwd //授权码,通过QQ获取

        }
    });

    var mailOptions = {
        from: mailFrom, // 发送者
        to: email, // 接受者,可以同时发送多个,以逗号隔开
        subject: subject, // 标题
    };
    if(text != undefined)
    {
        mailOptions.text =text;// 文本
    }
    if(html != undefined)
    {
        mailOptions.html =html;// html
    }

    var result = {
        httpCode: 200,
        message: '发送成功!',
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            result.httpCode = 500;
            result.message = err;
        }
    });
    return result

}

module.exports = {
	emailTo
}