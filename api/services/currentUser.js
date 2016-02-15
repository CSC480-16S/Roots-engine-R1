module.exports = {
    email: '',

    setEmail: function(userEmail, next) {
        this.email = userEmail;
        next();
    },

    getEmail: function(next) {
        next(this.email);
    }


};