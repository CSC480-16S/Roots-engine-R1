
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
        var sqlInsertCredentials = 'INSERT INTO Login (email, password) VALUES (\'' + email + '\', \'' + password + '\');';
        this.insert(Login, sqlInsertCredentials, function (response, result){
            next(response, result);
        });
    },

    getLoginCredentials: function(email, next) {
        var sqlGetCredentials = 'SELECT * FROM Login WHERE email=\'' + email + '\';';
        this.read(Login, sqlGetCredentials, function(response, result) {
            next(response, result);
        });
    }

};