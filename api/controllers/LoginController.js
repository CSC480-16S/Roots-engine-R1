/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /*inputs: null
    outputs:page-login home page
     */
    homepage: function(req, res) {
        render.page({}, 'login', function(html) {
            res.send(html);
        });
    },
  /*inputs:null
   outputs: page-renders the page for a user to enter their email for reset
   */
    sendReset: function(req, res) {
    	var send = {};
    	render.page(send, 'sendReset', function(html) {
    		res.send(html);
    	});
    },
    /*inputs: email-query string from url specifying the user to confirm
     outputs: error-message for a successful email confirmation, or unsuccessful, pages-renders login page,
     login-flag that will be used by gui to determine which tab of their login box to use
      */
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
    /*inputs: email-query string from url specifying the user to confirm
    outputs: email- users email whose password is being reset, page-renders the page to enter a new password
     */
    enterNewPassword: function(req, res) {
    	var send = {};
    	    email = req.query.email;
    	send.email = email;
    	render.page(send, 'enterNewPassword', function(html) {
    		res.send(html);
        });
    },

    /*inputs: newPassword-the password the was entered by the user, email-email of user whose password is changing
    outputs: error-message claiming success of failure of password reset, page-renders the login page
     */
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

    /*inputs: email-query string from url specifying the user to send to
    outputs: email-email sent to user with the link to user for password reset,
    error-message claiming success of failure of password reset email being sent,
    page-renders the login page
     */
    sendResetPasswordEmail: function(req, res) {
    		var send = {},
    		    email = req.param('email');
    		database.getLoginCredentials(email, function(loginResponse, loginResult) {
    			if(loginResponse === 'success') {
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
    /*input:email-query string from url specifying the user to send to
    outputs:email-email sent to user with the link to user for password reset,
     error-message telling the user that a confirmation email was resent,
     page-renders the login page
     */
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
                send.error = 'Email address not yet confirmed. Another message was sent to ' + email + '. Please check the spelling of your address and your spam folder. If you did not spell your email correctly, you will have to make a new account.';
                render.page(send, 'login', function(html) {
                    res.send(html);
                });
            }
        });
    },

    /*inputs:username-username entered by user, password-password entered by user
    outputs:error-message explaining why login was unsuccessful, username-username used to login with,
    login-flag for gui to use to decide which tab of their login box to use, session.authentication-value to set
    session authentication so the user has access to restricted pages, page-renders the tree viewer page
     */
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
    /*input:username-username entered by user, password-password entered by user, firstName-name to enter in the
    database for the user's first name, lastName-name to enter in the database for the user's last name
    output:login-flag for gui to use to decide which tab of their login box to use,
    error- message to inform the user of a failed sign up, username-username used for the sign up attempt,
    page-renders a page telling the user to check thier inbox
     */
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

      /*input:session-the session associated with the user's browser
      output-session.authentication-this value should now be false so the user can no longer access restricted pages,
      page-renders the login page
       */
      logout: function(req,res){
        req.session.destroy(function(err) {
          var send = {};
          render.page(send, 'login', function(html) {
            res.send(html);
          });
        });
      }
  };

