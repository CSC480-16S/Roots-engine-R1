
module.exports = {
    signup: function(email, password, firstName, lastName, code, next) {
        // check email/password length
        // other checks as necessary
        var id;
        database.getLoginCredentials(email, function (responseExistingLogin, resultExistingLogin) {
            if (responseExistingLogin === 'empty') {
                database.initializeProfile(function(responseId, resultId){
                    if (responseId === 'success') {
                        id = resultId[0].id;
                        database.insertLoginCredentials(email, password, id, code, function(responseInsertCredentials, resultInsertCredentials){
                            if (responseInsertCredentials === 'success') {
                                database.initializeName(firstName, lastName, id, function(responseName, resultName) {
                                    if (responseName === 'success'){
                                        next('success', true);
                                    }
                                    else {
                                        next('name insert failed', resultName);
                                    }
                                });
                            }
                            else {
                                next('credentials insert failed', resultInsertCredentials);
                            }
                        });
                    }
                    else {
                        next('get id failed', resultId);
                    }
                });
            }
            else {
                next('user exists', resultExistingLogin);
            }
        });
    },

    login: function(email, password, next) {
        database.getLoginCredentials(email, function(response, result){
            if (response === 'success') {
				if(result[0].password === password && !(result[0].email_confirm === null)) {
					next('email not verified', true);
				}
                else if (result[0].email === email && result[0].password === password) {
                    next(response, result[0].individual_id);
                }
                else {
                    next('incorrect password', false);
                }
            }
            else {
                next('incorrect username', false);
            }
        });
    },

    updateProfile: function(data, next) {
        //perform checks against data
        database.updateProfile(data, function(response, result){
            if (response === 'success') {
                next(response, result);
            }
            else {
                next('update failed', result);
            }
        });
    },

    confirmEmail: function(code, next) {
	database.getEmailFromCode(code, function(response, result) {
	    if(response === 'success' && result.length == 1) {
		e = result[0].email;
		database.getLoginCredentials(e, function(
		    loginResponse, loginResult) {
		    if(loginResponse === 'success') {
			database.updateEmailVerified(e, function(
			    insertResponse, insertResult) {
			    if (insertResponse === 'success') {
				next(insertResponse, insertResult);
			    }
			    else {
				next('Email verification update failed',
				     insertResult);
			    }
			});
		    }
		    else {
			next('Email does not exist');
		    }
		});
	    } else {
		next('Invalid code');
	    }
	});
    },

    changePassword: function(code, encryptedPassword, next) {
	database.getEmailFromPCode(code, function(eResponse, eResult){
	    if(eResponse === 'success' && eResult.length == 1) {
		var email = eResult[0].email;
		database.getLoginCredentials(email, function(loginResponse, loginResult) {
		    if(loginResponse === 'success') {
			database.updatePassword(email, encryptedPassword, function(updateResponse, result) {
			    if(updateResponse === 'success') {
				next(updateResponse, result);
			    }
			    else {
				next('Update password failed', result);
			    }
			});
		    } else {
			next('Email does not exist', loginResult);
		    }
		});
		database.updateNullifyPCode(code, function(nResponse, nResult) {
		    if(nResponse !== 'success') {
			console.log('Unable to set ' + email + '\'s reset_password'
				    + ' field to NULL. result: ' + nResult);
		    }
		});
	    } else {
		next('Invalid code', eResult);
	    }
        });
    },
    upload: function(file, next) {
      file.upload(next);
    }

};
