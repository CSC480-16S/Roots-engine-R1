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

    sendReset: function(req, res) {
    	var send = {};
    	//var email = req.param('email');
    	render.page(send, 'sendReset', function(html) {
    		res.send(html);
    	});
    },

    confirmEmail: function(req, res) {
        var send = {},
            email = req.param('email');
        database.getLoginCredentials(email, function(loginResponse, loginResult) {
            if(loginResponse === 'success') {
                send.error = 'Email confirmed, please log in.';
                database.updateEmailVerified(email, function(insertResponse, insertResult) {
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                });
            }
            else {
                send.login = true;
                send.confirmation = 'You have not signed up yet or there was an error.';
                render.page(send, 'login', function(html) {
                    res.send(html);
                });
            }
        });
    },

    enterNewPassword: function(req, res) {
    	var send = {};
    	    email = req.query.email;
    	send.email = email;
    	render.page(send, 'enterNewPassword', function(html) {
    		res.send(html);
        });
    },

    submitNewPassword: function(req, res) {
    	var send = {},
    	    params = req.params.all(),
    	    nPassword = params.newPassword,
    	    email = params.email;
    	database.getLoginCredentials(email, function(loginResponse, loginResult) {
            if(loginResponse === 'success') {
                database.updatePassword(email, nPassword, function(updateResponse, result) {
                    if(updateResponse === 'success') {
                        send.error = 'Your password has changed, please log in.';
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                    }
                    else {
            		    res.redirect('/error?location=LOGIN_CONTROLLER/SUBMIT_NEW_PASSWORD&response=' + updateResponse + '&result=' + result);
                    }
                });
            }
            else {
                send.error = 'There was an error, please change your password again.';
                render.page(send, 'login', function(html) {
                    res.send(html);
                });
            }
        });
    },

    sendResetPasswordEmail: function(req, res) {
    		var send = {},
    		    email = req.param('email');
    		database.getLoginCredentials(email, function(loginResponse, loginResult) {
    			if(loginResponse === 'success') {
    				send.confirmation = 'Plese check your email for a password reset link.';
    				var nodemailer = require('nodemailer'),
    				    transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:roots480@smtp.gmail.com'),
    				    mailOptions = {
                            from: 'Roots Team <rootsspammer@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: 'Password Reset Link', // Subject line
                            text: 'Link: ', // plaintext body
                            html: 'localhost:1337/enterNewPassword?email=' + email // html body
    				    };

    				transporter.sendMail(mailOptions, function(error, info){
        				if(error){
            				res.redirect('/error?location=LOGIN_CONTROLLER/SEND_RESET_PASSWORD_EMAIL&response=' + error + '&result=' + info);
        				}
        				else {
        					send.error = 'Reset Password Email Sent';
                            render.page(send, 'login', function(html) {
                                res.send(html);
                            });
    					}
    				});
    			}
    			else {
    				send.error = 'You have not signed up yet or there was an error.';
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
    			}
    		});
    	},

    resendEmail: function(req, res) {
        var send = {},
            email = req.param('email'),
            nodemailer = require('nodemailer'),
            transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:roots480@smtp.gmail.com'),
            mailOptions = {
                from: 'Roots Team <rootsspammer@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Email Verification Link', // Subject line
                text: 'Link: ', // plaintext body
                html: 'localhost:1337/emailConfirm?email=' + email // html body
            };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.redirect('/error?location=LOGIN_CONTROLLER/RESEND_EMAIL&response=' + error + '&result=' + info);
            }
            else {
                console.log('Message sent: ' + info.response);
                send.address = email;
                send.error = 'Email address not yet confirmed. Another message was sent to ' + email + '. Please check the spelling of your address and your spam folder. If you did not spell your email correctly, you will have to make a new account.';
                render.page(send, 'login', function(html) {
                    res.send(html);
                });
            }
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

    userSignup: function(req, res) {
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

