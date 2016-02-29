
module.exports = {
    send: function(address, sub, txt, htm, next) {
        var nodemailer = require('nodemailer'),
            // manually put in password below to get functional
            transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:PASSWORD@smtp.gmail.com'),
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
