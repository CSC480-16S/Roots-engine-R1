
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
        var sqlInsertCredentials = 'INSERT INTO User (email, password, email_verification) VALUES (\'' + email + '\', \'' + password + '\', ' + false + ');';
        this.insert(Login, sqlInsertCredentials, function (response, result){
            next(response, result);
        });
    },

    insertIndividualReference: function(id, table, next) {
        var sqlInsertIndividualReference = 'INSERT INTO ' + table + ' (individual_id) VALUES (' + id + ');';
        this.insert(table, sqlInsertIndividualReference, function (response, result){
            next(response, result);
        });
    },

    initializeName: function(firstName, lastName, next) {
        var sqlInitializeName = 'INSERT INTO Name (first_name, last_name) VALUES (\'' + firstName + '\', \'' + lastName + '\');';
        this.insert(Login, sqlInitializeName, function (response, result){
            next(response, result);
        });
    },

    getLoginCredentials: function(email, next) {
        var sqlGetCredentials = 'SELECT * FROM User WHERE email=\'' + email + '\';';
        this.read(Login, sqlGetCredentials, function(response, result) {
            next(response, result);
        });
    },

    initializeProfile: function(next) {
        var sqlInsertProfile = 'INSERT INTO Individual () VALUES ();';
        this.insert(Individual, sqlInsertProfile, function(response, result) {
        console.log(result);
            next(response, result);
        });
    },

    updateProfile: function(userData, next) {
        var sqlUpdateProfile = 'UPDATE Individual SET date_of_birth=\'' + userData.dateOfBirth + '\', municipality_of_birth=\'' + userData.birthCity + '\', state_of_birth=\'' + userData.birthState + '\', country_of_birth=\'' + userData.birthCountry + '\', gender=\'' + userData.gender + '\', bio=\'' + userData.bio + '\', economic_status=\'' + userData.economicStatus + '\', immigration_history=\'' + userData.immigrationHistory + '\', bio=\'' + userData.accomplishments + '\', notes=\'' + userData.notes + '\' WHERE id=\'' + userData.id'\';';
        this.update(Individual, sqlUpdateProfile, function(response, result) {
            next(response, result);
        });
    }

};
