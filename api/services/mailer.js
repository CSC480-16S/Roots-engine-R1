
module.exports = {
    send: function(address, sub, txt, htm, next) {
        var nodemailer = require('nodemailer');
            // manually put in password below to get functional
	var emailPass = passwords.emailPass();
	var pw = require("../../config/passwords.json");
	var ePass = pw.emailPass;
	var transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:' + ePass + '@smtp.gmail.com'),
            mailOptions = {
                from: 'Roots Team <rootsspammer@gmail.com>',
                to: address,
                subject: sub,
                text: txt,
                html: htm
            };
        transporter.sendMail(mailOptions, function (error, info) {
            if(error){
                next(error, false);
            }
            else {
                next('success', info);
            }
        });
    }
};
