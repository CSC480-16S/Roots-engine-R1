/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const crypto = require('crypto');
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
    renderPasswordReset: function(req, res) {
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
        user.confirmEmail (email, function (response, result) {
            switch (response) {
                case 'Email does not exist':
                    send.error = 'You have not signed up yet';
                    send.login = false;
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                    break;
                case 'Email verification update failed':
                    send.error = 'Unable to verify your email. Please attempt to login to receive a new verification email.';
                    send.login = true;
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                    break;
                case 'success':
                    send.error = 'Email confirmed, please log in.';
                    send.login = true;
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                    break;
                default:
                    res.redirect('/error?location=LOGIN_CONTROLLER/CONFIRM_EMAIL&response=' + response + '&result=' + result);
                    break;
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
    	render.page(send, 'password_reset', function(html) {
    		res.send(html);
        });
    },

    /*inputs: newPassword-the password the was entered by the user, email-email of user whose password is changing
    outputs: error-message claiming success of failure of password reset, page-renders the login page
     */
    changePassword: function(req, res) {
    	var send = {},
    	    params = req.params.all(),
    	    nPassword = params.newPassword,
    	    nPassword2 = params.newPassword2,
    	    email = params.email,
            cipher = crypto.createCipher('aes192', 'a password'),
            encryptedPassword = cipher.update(nPassword, 'utf8', 'hex') + cipher.final('hex');
        if (nPassword !== nPassword2) {
            send.error = 'Passwords are different';
            render.page(send, 'password_reset', function(html) {
                res.send(html);
            });
        }
        else {
            user.changePassword(email, encryptedPassword, function(response, result) {
                switch (response) {
                    case 'Email does not exist':
                        send.error = 'You have not signed up yet';
                        send.login = false;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'Update password failed':
                        send.error = 'Unable to update your password. Please use forget password again.';
                        send.login = true;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'success':
                        send.error = 'Your password has changed, please log in.';
                        send.login = true;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    default:
                        res.redirect('/error?location=LOGIN_CONTROLLER/CHANGE_PASSWORD&response=' + response + '&result=' + result);
                        break;
                }
            });
        }
    },

    /*inputs: email-query string from url specifying the user to send to
    outputs: email-email sent to user with the link to user for password reset,
    error-message claiming success of failure of password reset email being sent,
    page-renders the login page
     */
    sendResetPasswordEmail: function(req, res) {
        var send = {},
            email = req.param('email'),
            subject = 'Roots Password Reset Link',
            txt = 'Link: ',
            htm = 'link: localhost:1337/enterNewPassword?email=' + email;
        user.login(email, '', function(response, result) {
            if(response === 'incorrect password') {
                mailer.send(email, subject, txt, htm, function(mailResponse, mailResult){
                    if(mailResponse === 'success'){
                        send.error = 'Reset Password Email Sent';
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                    }
                    else {
                        res.redirect('/error?location=LOGIN_CONTROLLER/SEND_RESET_PASSWORD_EMAIL&response=' + mailResponse + '&result=' + mailResult);
                    }
                });
            }
            else {
                send.error = 'You have not signed up yet.';
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
            subject = 'Email Verification Link',
            txt = 'Link: ',
            htm = 'localhost:1337/emailConfirm?email=' + email;
        mailer.send(email, subject, txt, htm, function(response, result){
            if(response === 'success'){
                send.error = 'Email address not yet confirmed. Another message was sent to ' + email + '. Please check the spelling of your address and your spam folder. If you did not spell your email correctly, you will have to make a new account.';
                render.page(send, 'login', function(html) {
                    res.send(html);
                });
            }
            else {
                res.redirect('/error?location=LOGIN_CONTROLLER/RESEND_EMAIL&response=' + response + '&result=' + result);
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
            email = params.email,
            password = params.password,
            send = {},
            cipher = crypto.createCipher('aes192', 'a password'),
            encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

        user.login(email, encryptedPassword, function (response, result) {
            switch(response) {
                case 'incorrect username':
                    send.error = 'This username does not exist';
                    send.login = true;
                    send.username = email;
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                    break;
                case 'incorrect password':
                    send.error = 'Wrong password';
                    send.login = true;
                    send.username = email;
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                    break;
                case 'fields too long?':
                    send.error = 'Your username and password must be less than 32 characters?';
                    send.login = true;
                    send.username = email;
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
                    break;
                case 'email not verified':
                    send.login = true;
                    res.redirect('/emailResent?email=' + username);
                    break;
                case 'success':
                    req.session.authenticated = true;
                    req.session.email = email;
                    req.session.individualId = result;
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
    page-renders a page telling the user to check their inbox
     */
    userSignup: function(req, res) {
          var params = req.params.all(),
              email = params.email,
              password = params.password,
              firstName = params.firstName,
              lastName = params.lastName,
              send = {},
              cipher = crypto.createCipher('aes192', 'a password'),
              encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex'),
              subject = 'Email Verification Link',
              txt = 'Link: ',
              htm = 'localhost:1337/emailConfirm?email=' + email;
          user.signup(email, encryptedPassword, firstName, lastName, function (response, result) {
                switch(response) {
                    case 'user exists':
                        send.error = 'This username is already in use.';
                        send.username = email;
                        send.login = false;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'fields too long?':
                        send.error = 'Your username and password must be less than 32 characters?';
                        send.username = email;
                        send.login = false;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'name insert failed':
                        send.error = 'Unable to insert name.';
                        send.login = false;
                        send.username = email;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'credentials insert failed':
                        send.error = 'Unable to make credentials.';
                        send.username = email;
                        send.login = false;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'get id failed':
                        send.error = 'Unable to get individual id.';
                        send.username = email;
                        send.login = false;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'success':
                        send.login = false;
                        mailer.send(email, subject, txt, htm, function(mailResponse, mailResult){
                            if(mailResponse === 'success'){
                                send.error = 'Please confirm your email at ' + email + ' to login.';
                                render.page(send, 'login', function(html) {
                                    res.send(html);
                                });
                            }
                            else {
                                res.redirect('/error?location=LOGIN_CONTROLLER/USER_SIGNUP_EMAIL&response=' + mailResponse + '&result=' + mailResult);
                            }
                        });
                        break;
                    default:
                        res.redirect('/error?location=LOGIN_CONTROLLER/USER_SIGNUP&response=' + response + '&result=' + result);
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

