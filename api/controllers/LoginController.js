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
        var send = {};
        send.action = '/userSignup';
        send.action2 = '/userLogin';
        send.error = '';
        res.view('login', send);
    },

  /*inputs:null
   outputs: page-renders the page for a user to enter their email for reset
   */
    renderPasswordReset: function(req, res) {
    	var send = {};
	send.error = '';
    	res.view('login_help', send);
    },

    /*inputs: email-query string from url specifying the user to confirm
     outputs: error-message for a successful email confirmation, or 
     unsuccessful, pages-renders login page,
     login-flag that will be used by gui to determine which tab of their 
     login box to use
      */
    confirmEmail: function(req, res) {
        var send = {},
            code = req.param('q');
        send.action = '/userSignup';
        send.action2 = '/userLogin';
        send.error = '';
        user.confirmEmail (code, function (response, result) {
            switch (response) {
                case 'Email does not exist':
                    send.error = 'You have not signed up yet';
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'Email verification update failed':
                send.error = 'Unable to verify your email. Please attempt '
		    + 'to login to receive a new verification email.';
                    send.login = true;
                    res.view('login', send);
                    break;
                case 'success':
                    send.error = 'Email confirmed, please log in.';
                    send.login = true;
                    res.view('login', send);
                    break;
                default:
                res.redirect('/error?location=LOGIN_CONTROLLER/' +
			     'CONFIRM_EMAIL&response=' + response
			     + '&result=' + result);
                    break;
            }
        });
    },

    /*inputs: q-query string from url specifying the user to confirm
    outputs: , page-renders the page to enter a new password
     */
    enterNewPassword: function(req, res) {
    	var send = {};
	send.error = '';
    	send.q = req.query.q;
    	res.view('password_reset', send);
    },

    /*inputs: newPassword-the password the was entered by the user, q-code of user whose password is changing
    outputs: error-message claiming success of failure of password reset, page-renders the login page
     */
    changePassword: function(req, res) {
        var send = {},
            params = req.params.all(),
            nPassword = params.password,
            nPassword2 = params.password2,
            code = params.q,
            cipher = crypto.createCipher('aes192', 'a password'),
            encryptedPassword = cipher.update(nPassword, 'utf8', 'hex') + cipher.final('hex');
        send.action = '/userSignup';
        send.action2 = '/userLogin';
        send.error = '';
	    send.q = code;
        user.changePassword(code, nPassword, nPassword2, encryptedPassword, function(response, result) {
            switch (response) {
                case 'password length':
                    send.error = 'Password must contain a minimum of 8 characters.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'password match':
                    send.error = 'Passwords do not match.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'password content':
                    send.error = 'Password must be between 8 and 128 characters, with one each of a lower and upper case character, a special character and a number.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'Email does not exist':
                    send.error = 'You have not signed up yet';
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'Update password failed':
                    send.error = 'Unable to update your password due to an error on our side. Please request a new link and try again.';
                    send.login = true;
                    res.view('login', send);
                    break;
                case 'Invalid code':
                    send.error = 'Your password reset link is not valid. Please request a new one and try again.'
                    send.login = true;
                    res.view('login', send);
                    break;
                case 'success':
                    send.error = 'Your password has changed, please log in.';
                    send.login = true;
                    res.view('login', send);
                    break;
                default:
                    res.redirect('/error?location=LOGIN_CONTROLLER/CHANGE_PASSWORD&response=' + response + '&result=' + result);
                    break;
            }
        });
    },

    /*inputs: email-query string from url specifying the user to send to
    outputs: email-email sent to user with the link to user for password reset,
    error-message claiming success of failure of password reset email being sent,
    page-renders the login page
     */
    sendResetPasswordEmail: function(req, res) {
	/*Generates a random id code for password reset.
	Is only pseudorandom but getting them from random.org
	would require another callback and look bad.*/
	var code = '';
	var abc = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for(var i = 0; i < 15; i++) {
	    code += abc.charAt(Math.floor(Math.random() * abc.length));
	}
        var send = {},
            email = req.param('emailReset'),
            subject = 'Roots Password Reset Link',
            txt = 'Link: ',
            htm = 'link: localhost:1337/enterNewPassword?q=' + code;
        send.action = '/userSignup';
        send.action2 = '/userLogin';
        send.error = '';
        user.login(email, '', function(response, result) {
            if(response === 'incorrect password') {
		database.updatePasswordCode(email, code, function(codeResponse,
								  codeResult) {
		    if(codeResponse === 'success') {
			mailer.send(email, subject, txt, htm,
				    function(mailResponse, mailResult){
			    if(mailResponse === 'success'){
				send.error = 'Reset Password Email Sent';
				res.view('login', send);
			    } else {
				res.redirect('/error?location=LOGIN_CONTROLLER/'+
					     'SEND_RESET_PASSWORD_EMAIL&response='
					     +mailResponse+'&result='+mailResult);
			    }
			    
			});
		    } else {
			res.redirect('/error?location=LOGIN_CONTROLLER/' +
				     'SEND_RESET_PASSWORD_EMAIL&RESPONSE='
				     + codeResponse + '&result=' + codeResult);
		    }
		});			    
            } else {
                send.error = 'You have not signed up yet.';
                res.view('login', send);
            }
        });
    },
    /*input:email-query string from url specifying the user to send to
    outputs:email-email sent to user with the link to user for password reset,
     error-message telling the user that a confirmation email was resent,
     page-renders the login page
     */
    resendEmail: function(req, res) {
	//TODO: get their code and email it to them,
	//      or error out if they are where they shouldn't be.
        var send = {},
            email = req.param('email'),
            subject = 'Email Verification Link',
            txt = 'Link: ',
            htm = 'localhost:1337/emailConfirm?q=';
        send.action = '/userSignup';
        send.action2 = '/userLogin';
        send.error = '';
	database.getCodeFromEmail(email, function(response, result){
	    if(response === 'success' && result.length == 1) {
		mailer.send(email, subject, txt,
			    htm + result[0].email_confirm_code,
			    function(emailResponse, emailResult){
		    if(emailResponse === 'success'){
			send.error = 'Email address not yet confirmed. Another'
			    + ' message was sent to ' + email +
			    '. Please check the spelling of your address and '
			    + 'your spam folder. If you did not spell your email'
			    + ' correctly, you will have to make a new account.';
			res.view('login', send);
		    }
		    else {
			res.redirect('/error?location=LOGIN_CONTROLLER/RESEND_EMAIL&response='
				     + emailResponse + '&result=' + emailResult);
		    }
		});
	    } else {
		res.redirect('error?location=LOGIN_CONTROLLER/RESEND_EMAIL&response='
			     + response + '&result=' + emailResult);
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
        send.action = '/userSignup';
        send.action2 = '/userLogin';
        send.error = '';
        user.login(email, encryptedPassword, function (response, result) {
            switch(response) {
                case 'incorrect username':
                    send.error = 'Incorrect credentials.';
                    send.login = true;
                    send.username = email;
                    res.view('login', send);
                    break;
                case 'incorrect password':
                    send.error = 'Incorrect credentials.';
                    send.login = true;
                    send.username = email;
                    res.view('login', send);
                    break;
                case 'email not verified':
                    send.login = true;
                    res.redirect('/emailResent?email=' + email);
                    break;
                case 'success':
                    req.session.authenticated = true;
                    req.session.email = email;
                    req.session.individualId = result;
                    res.redirect('/treeViewer');
                    break;
                default:
                res.redirect('/error?location=LOGIN_CONTROLLER/'+
			     'USER_LOGIN&response=' + response +
			     '&result=' + result);
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
        /*Generates a random id code for email confirmation.
        Is only pseudorandom but getting them from random.org
        would require another callback and look bad.*/
	    var code = '',
	        abc = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    for(var i = 0; i < 15; i++) {
	        code += abc.charAt(Math.floor(Math.random() * abc.length));
	    }
	    var params = req.params.all(),
            email = params.email,
            password = params.password,
            passwordConfirm = params.passwordconfirm,
            firstName = params.firstName,
            lastName = params.lastName,
            send = {},
            cipher = crypto.createCipher('aes192', 'a password'),
            encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex'),
            subject = 'Email Verification Link',
            txt = 'Link: ',
            htm = 'localhost:1337/emailConfirm?q=' + code;
            send.action = '/userSignup';
            send.action2 = '/userLogin';
            send.error = '';
        user.signup(email, password, passwordConfirm, encryptedPassword, firstName, lastName, code, function (response, result) {
            switch(response) {
                case 'first name':
                    send.error = 'First name is too long.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'last name':
                    send.error = 'Last name is too long.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'password length':
                    send.error = 'Password must contain a minimum of 8 characters.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'password match':
                    send.error = 'Passwords do not match.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'password content':
                    send.error = 'Password must be between 8 and 128 characters, with one each of a lower and upper case character, a special character and a number.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'user exists':
                    send.error = 'This user already exists.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'name insert failed':
                    send.error = 'Unable to insert name.';
                    send.login = false;
                    send.username = email;
                    res.view('login', send);
                    break;
                case 'credentials insert failed':
                    send.error = 'Unable to make credentials.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'get id failed':
                    send.error = 'Unable to get individual id.';
                    send.username = email;
                    send.login = false;
                    res.view('login', send);
                    break;
                case 'success':
                    send.login = false;
                    mailer.send(email, subject, txt, htm, function(mailResponse, mailResult){
                        if(mailResponse === 'success'){
                            send.error = 'Please confirm your email at ' + email + ' to login.';
                            res.view('login', send);
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
            send.action = '/userSignup';
            send.action2 = '/userLogin';
            send.error = '';
            res.view('login', send);
        });
    }
};

