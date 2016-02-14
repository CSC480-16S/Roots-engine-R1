
module.exports = {
    signup: function(email, password, next) {
        // check email/password length
        // other checks as necessary
        database.getLoginCredentials(email, function (responseExistingLogin, resultExistingLogin) {
            if (responseExistingLogin === 'empty') {
                database.insertLoginCredentials(email, password, function(response, result){
                    if (response === 'success') {
                        next (response, result);
                    }
                    else {
                        next('insert failed', result);
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
                if (result[0].email === email && result[0].password === password) {
                    next(response, true);
                }
                else {
                    next('incorrect password', false)
                }
            }
            else {
                next('incorrect username', result);
            }
        });
    }

};