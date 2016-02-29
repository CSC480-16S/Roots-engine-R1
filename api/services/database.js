
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
        table['query'](sql, function(err, result) {
              if (err) {
                  next(err, result);
              }
              else {
                  if(!result){
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

    insertLoginCredentials: function(email, password, next) {
        var sqlInsertCredentials = 'INSERT INTO User (email, password, email_confirm) VALUES (\'' + email + '\', \'' + password + '\', \'' + 0 + '\');';
        this.insert(User, sqlInsertCredentials, function (response, result){
            next(response, result);
        });
    },

    insertIndividualReferenceUser: function(email, id, next) {
        var sqlInsertIndividualReference = 'UPDATE User SET individual_id=\'' + id + '\' WHERE email=\'' + email + '\';';
        this.update(User, sqlInsertIndividualReference, function (response, result){
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
        var sqlGetCredentials = 'SELECT * FROM User WHERE email=\'' + email + '\';';
        this.read(User, sqlGetCredentials, function(response, result) {
            next(response, result);
        });
    },

    getLastIndividualId: function(next) {
        var sqlLastIndividualId = 'SELECT * FROM Individual ORDER BY id DESC LIMIT 1;';
        this.read(Individual, sqlLastIndividualId, function(response, result) {
            next(response, result);
        });
    },

    initializeProfile: function(next) {
        var sqlInsertProfile = 'INSERT INTO Individual () VALUES ();';
        this.insert(Individual, sqlInsertProfile, function(response, result) {
            next(response, result);
        });
    },

    updateProfile: function(userData, next) {
        var sqlUpdateProfile = 'UPDATE Individual SET date_of_birth=\'' + userData.dateOfBirth + '\', municipality_of_birth=\'' + userData.birthCity + '\', state_of_birth=\'' + userData.birthState + '\', country_of_birth=\'' + userData.birthCountry + '\', gender=\'' + userData.gender + '\', bio=\'' + userData.bio + '\' WHERE id=\'' + userData.id + '\';';
        this.update(Individual, sqlUpdateProfile, function(response, result) {
            next(response, result);
        });
    },

	updateEmailVerified: function(email, next) {
		var sqlUpdateEmailVerified = 'Update User SET email_confirm=NULL WHERE email=\'' + email + '\';';
		this.update(User, sqlUpdateEmailVerified, function(response, result) {
			next(response, result);
		});
	},

	updatePassword: function(email, password, next) {
		var sqlUpdatePassword = 'UPDATE User SET password=\'' + password + '\' WHERE email=\'' + email + '\';';
		this.update(User, sqlUpdatePassword, function(response, result) {
			next(response, result);
		});
	}
};
