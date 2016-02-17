module.exports = {
  /*this class should be useless right now but a final check should be preformed*/
    email: '',

    setEmail: function(userEmail, next) {
        this.email = userEmail;
        next();
    },

    getEmail: function(next) {
        next(this.email);
    }


};
