
module.exports = {
    signup: function(email, password, firstName, lastName, next) {
        // check email/password length
        // other checks as necessary
        database.getLoginCredentials(email, function (responseExistingLogin, resultExistingLogin) {
            if (responseExistingLogin === 'empty') {
                database.insertLoginCredentials(email, password, function(responseInsertCredentials, resultInsertCredentials){
                    if (responseInsertCredentials === 'success') {
                        database.initializeName(firstName, lastName, function(responseName, resultName) {
                            if (responseName === 'success'){
                                database.initializeProfile(function(responseProfile, resultProfile){
                                    if (responseProfile === 'success') {
                                        database.getLastIndividualId(function(responseId, resultId){
                                            if (responseId === 'success') {
                                                database.insertIndividualReferenceUser(email, resultId[0].id, function(response, result){
                                                    if (response === 'success') {
                                                        next(response, result);
                                                    }
                                                    else {
                                                        next('individual reference failed', result);
                                                    }
                                                });
                                            }
                                            else {
                                                next('get id failed', resultId);
                                            }
                                        });
                                    }
                                    else {
                                        next('profile failed', resultProfile);
                                    }
                                });
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
                next('user exists', resultExistingLogin);
            }
        });
    },

    login: function(email, password, next) {
        database.getLoginCredentials(email, function(response, result){
            if (response === 'success') {
				if(result[0].password === password && result[0].email_verified === 0) {
					next('email not verified', true);
				}
                else if (result[0].email === email && result[0].password === password) {
                    next(response, true);
                }
                else {
                    next('incorrect password', false);
                }
            }
            else {
                next('incorrect username', result);
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
    }

};
