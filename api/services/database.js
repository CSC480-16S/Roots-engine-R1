
module.exports = {

    // skeleton for insert
    insert: function(table, sql, next) {
        table['query'](sql, function(err, result) {
              if (err) {
                  next(err, result);
              }
              else {
                  if(!result){
                      next('insert failed', result);
                  }
                  else {
                      next('success', result);
                  }
              }
        });
    },

    // skeleton for remove
    remove: function(table, sql, next) {
        table['query'](sql, function(err, result) {
              if (err) {
                  next(err, result);
              }
              else {
                  if(!result){
                      next('remove failed', result);
                  }
                  else {
                      next('success', result);
                  }
              }
        });
    },

    // skeleton for update
    update: function(table, sql, next) {

        table['query'](sql, function (err, result) {
          if (err) {
            next(err, result);
          }
          else {
            if (!result) {
              next('update failed', result);
            }
            else {
              next('success', result);
            }
          }
        });

    },

    // skeleton for read
    read: function(table, sql, next) {
        table['query'](sql, function(err, result) {
              if (err) {
                  next(err, result);
              }
              else {
                  if(!result || !result[0]){
                      next('empty', result);
                  }
                  else {
                      next('success', result);
                  }
              }
        });
    },

    insertLoginCredentials: function(email, password, id, code, next) {
        var sqlInsertCredentials = 'INSERT INTO User (individual_id, email, password, '
	    + 'email_confirm, email_confirm_code) '
	    + 'VALUES (\'' + id + '\', \'' + email + '\', \'' + password
	    + '\', \'' + 0 + '\', \'' + code + '\');';
        this.insert(User, sqlInsertCredentials, function (response, result){
            next(response, result);
        });
    },

    initializeName: function(firstName, lastName, individualId, next) {
        var sqlInitializeName = 'INSERT INTO Name (first_name, last_name, individual_id) VALUES (\'' + firstName + '\', \'' + lastName + '\', ' + individualId + ');';
        this.insert(Name, sqlInitializeName, function (response, result){
            next(response, individualId);
        });
    },

    getLoginCredentials: function(email, next) {
      var mysql      = require('mysql');
        var sqlGetCredentials = 'SELECT * FROM User WHERE email=?;';
        var inserts = [email];
      sqlGetCredentials = mysql.format(sqlGetCredentials, inserts);
        this.read(User, sqlGetCredentials, function(response, result) {
            next(response, result);
        });
    },

    initializeProfile: function(next) {
        var _this = this,
            sqlInsertProfile = 'INSERT INTO Individual () VALUES ();',
            sqlLastIndividualId = 'SELECT * FROM Individual ORDER BY id DESC LIMIT 1;';
        this.insert(Individual, sqlInsertProfile, function(response, result) {
            if (response === 'success') {
                _this.read(Individual, sqlLastIndividualId, function(responseId, resultId) {
                    next(responseId, resultId);
                });
            }
            else {
                next(response, result);
            }
        });
    },

    updateProfile: function(userData, next) {
      var mysql      = require('mysql');
      var sqlUpdateProfile = "UPDATE Individual SET date_of_birth=?, municipality_of_birth=?, state_of_birth=?, country_of_birth=?, gender=?, bio=? WHERE id=?";
      var inserts = [userData.dateOfBirth, userData.birthCity, userData.birthState, userData.birthCountry, userData.gender, userData.bio, userData.id];
      sqlUpdateProfile = mysql.format(sqlUpdateProfile, inserts);
      this.update(Individual, sqlUpdateProfile, function(response, result) {
            next(response, result);
        });
    },

	updateEmailVerified: function(email, next) {
    var mysql      = require('mysql');
		var sqlUpdateEmailVerified = 'Update User SET email_confirm=NULL WHERE email=?;';
    var inserts = [email];
    sqlUpdateEmailVerified = mysql.format(sqlUpdateEmailVerified, inserts);
    this.update(User, sqlUpdateEmailVerified, function(response, result) {
			next(response, result);
		});
	},

	updatePassword: function(email, password, next) {
    var mysql      = require('mysql');
		var sqlUpdatePassword = 'UPDATE User SET password=? WHERE email=?;';
    var inserts = [password, email];
    sqlUpdatePassword = mysql.format(sqlUpdatePassword, inserts);
    this.update(User, sqlUpdatePassword, function(response, result) {
			next(response, result);
		});

	},
  getUserInfo: function(individualId, next){
    var mysql      = require('mysql');
    var sqlReadUserInfo = 'SELECT * FROM Individual INNER JOIN Name ON(Individual.id=Name.individual_id) WHERE Individual.id=?;';
    var inserts = [individualId];
    sqlReadUserInfo = mysql.format(sqlReadUserInfo, inserts);
    this.read(Individual, sqlReadUserInfo, function(response, result) {
      next(response, result);
    });
  },

    getEmailFromCode: function(code, next){
	var sqlGetEmail = 'SELECT email FROM User WHERE email_confirm_code=\''
	    + code + '\';';
	this.read(User, sqlGetEmail, function(response, result) {
	    next(response, result);
	});
    },

    getEmailFromPCode: function(code, next){
	var sqlGetEmail = 'SELECT email FROM User WHERE password_reset=\''
	    + code + '\';';
	this.read(User, sqlGetEmail, function(response, result) {
	    next(response, result);
	});
    },

    updateNullifyPCode: function(code, next){
	var sqlNullifyCode = 'UPDATE User SET password_reset=NULL WHERE ' +
	    'password_reset=\'' + code + '\';';
	this.update(User, sqlNullifyCode, function(response, result) {
	    next(response, result);
	});
    },

    getCodeFromEmail: function(email, next){
	var sqlGetCode = 'SELECT email_confirm_code FROM User WHERE email=\''
	    + email + '\';';
	this.read(User, sqlGetCode, function(response, result) {
	    next(response, result);
	});
    },

    updatePasswordCode: function(email, code, next){
	var sqlUpdateCode = 'UPDATE User SET password_reset=\'' +
	    code +'\' WHERE email=\'' + email + '\';';
	this.update(User, sqlUpdateCode, function(response, result) {
	    next(response, result);
	});
    }

};


