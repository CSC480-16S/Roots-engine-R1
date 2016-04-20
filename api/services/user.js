
module.exports = {
    signup: function(email, password, passwordConfirm, encryptedPassword, firstName, lastName, code, next) {
        var id;
        user.passwordCheck(password, passwordConfirm, function (responsePassword, resultPassword) {
            if (responsePassword === 'success') {
                user.nameCheck(firstName, lastName, function (responseName, resultName) {
                    if (responseName === 'success') {
                        database.getLoginCredentials(email, function (responseExistingLogin, resultExistingLogin) {
                            if (responseExistingLogin === 'empty') {
                                database.initializeProfile(function (responseId, resultId){
                                    if (responseId === 'success') {
                                        id = resultId[0].id;
                                        database.insertLoginCredentials(email, encryptedPassword, id, code, function (responseInsertCredentials, resultInsertCredentials){
                                            if (responseInsertCredentials === 'success') {
                                                database.initializeName(firstName, lastName, id, function (responseName, resultName) {
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
                    }
                    else {
                        next(responseName, resultName);
                    }
                });
            }
            else {
                next(responsePassword, resultPassword);
            }
        });
    },

    nameCheck: function(firstName, lastName, next){
        if (firstName.length > 256) {
            next('first name', false);
        }
        else if (lastName.length > 256) {
            next('last name', false);
        }
        else {
            next('success', true);
        }
    },

    passwordCheck: function(password, passwordConfirm, next){
        var pwregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(password.length < 8){
            next('password length', false);
        }
        if(password.length > 128){
            next('password length', false);
        }
        else if (password !== passwordConfirm) {
            next('password match', false);
        }
        else if (!pwregex.test(password)) {
            next('password content', false);
        }
        else {
            next('success', true);
        }
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
		        database.getLoginCredentials(e, function(loginResponse, loginResult) {
		            if(loginResponse === 'success') {
			            database.updateEmailVerified(e, function(insertResponse, insertResult) {
			                if (insertResponse === 'success') {
				                next(insertResponse, insertResult);
			                }
			                else {
                                next('Email verification update failed', insertResult);
                            }
			            });
		            }
                    else {
                        next('Email does not exist');
                    }
		        });
	        }
	        else {
                next('Invalid code');
            }
	    });
    },

    changePassword: function(code, nPassword, nPassword2, encryptedPassword, next) {
        user.passwordCheck(nPassword, nPassword2, function (responsePassword, resultPassword) {
            if (responsePassword === 'success') {
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
                            }
                            else {
                                next('Email does not exist', loginResult);
                            }
                        });
                        database.updateNullifyPCode(code, function(nResponse, nResult) {
                            if(nResponse !== 'success') {
                                console.log('Unable to set ' + email + '\'s reset_password' + ' field to NULL. result: ' + nResult);
                            }
                        });
                    }
                    else {
                        next('Invalid code', eResult);
                    }
                });
            }
            else {
                next(responsePassword, resultPassword);
            }
        });
    },

    upload: function(file, next) {
      file.upload(next);
    },
  map: {},
    getAllParents: function(id){
      database.getParents(id, function(getParentsResponse, getParentsResult) {

      });
        /*//var i = 0;
        if(getParentsResult[0] != null){
          console.log("here");
          console.log(id);
          console.log(i);
          console.log(getParentsResult[0].individual_id);
          user.getAllParents(i++, getParentsResult[0].individual_id, function(getAllParentResult){

          });
        }
        if (getParentsResult[1] != null){
          console.log("here");
          console.log(id);
          console.log(i);
          console.log(getParentsResult[i].individual_id);
          user.getAllParents(i++, getParentsResult[1].individual_id, function(getAllParentResult) {

          });
        }
        //while (getParentsResult[i] != null){

          //console.log("here");
          //console.log(id);
          //console.log(i);
          //console.log(getParentsResult[i].individual_id);
          //user.getAllParents(getParentsResult[i].individual_id, function(getAllParentResult){
          //
          //});
          i++;
        //}
        next(getParentsResult);
      });*/
    },
  getAllParents2: function(id, next){
    var i = 0;
    getAllParents(i, id, function(response, getParentsResult) {

      next(response, getParentsResult);

    })
  }

};
