/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    homepage: function(req, res) {
        render.page({}, 'login', function(html) {
            res.send(html);
        });
    },

    userLogin: function(req, res) {
        var params = req.params.all(),
            username = params.email,
            password = params.password,
            send = {'login': true};

          user.login(username, password, function (response, result) {
                switch(response) {
                    case 'incorrect username':
                        send.error = 'This username does not exist';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'incorrect password':
                        send.error = 'Wrong password';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'fields too long?':
                        send.error = 'Your username and password must be less than 32 characters?';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'email not verified':
                      res.redirect('/emailResent?email=' + username);
                      break;
                    case 'success':
                      req.session.authenticated = true;
                      req.session.email = params.email;
                      res.redirect('/treeViewer');
                        break;
					default:
                        res.redirect('/error?location=LOGIN_CONTROLLER/USER_LOGIN&response=' + response + '&result=' + result);
                        break;
                }
          });
    },

    createUser: function(req, res) {
          var params = req.params.all(),
              username = params.email,
              password = params.password,
              firstName = params.firstName,
              lastName = params.lastName,
              send = {'login': false};

          user.signup(username, password, firstName, lastName, function (response, result) {
                switch(response) {
                    case 'user exists':
                        send.error = 'This username is already in use.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'fields too long?':
                        send.error = 'Your username and password must be less than 32 characters?';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'name insert failed':
                        send.error = 'Unable to insert name.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'credentials insert failed':
                        send.error = 'Unable to make credentials.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'profile failed':
                        send.error = 'Unable to establish a user profile.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'get id failed':
                        send.error = 'Unable to get individual id.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'individual reference failed':
                        send.error = 'Unable to establish a user reference.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'success':
						var nodemailer = require('nodemailer');
						var transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:roots480@smtp.gmail.com');
						var mailOptions = {
    						from: 'Roots Team <rootsspammer@gmail.com>', // sender address
    						to: username, // list of receivers
    						subject: 'Email Verification Link', // Subject line
    						text: 'Link: ', // plaintext body
    						html: 'localhost:1337/emailConfirm?email=' + username // html body
						};

						transporter.sendMail(mailOptions, function(error, info){
    						if(error){
        						console.log(error);
    						} else {
    							console.log('Message sent: ' + info.response);
							}
						});

                            res.redirect('/checkYourInbox');
                        break;
                    default:
                        res.redirect('/error?location=LOGIN_CONTROLLER/CREATE_USER&response=' + response + '&result=' + result);
                        break;
                }
          });
      },
      logout: function(req,res){
        req.session.destroy(function(err) {
          var send = {};
          render.page(send, 'login', function(html) {
            res.send(html);
          });
        });
      }
  };

