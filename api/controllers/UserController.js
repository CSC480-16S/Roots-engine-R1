/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    var params = req.params.all()
    User.create({user_name: params.email, password: params.password}).exec(function createCB(err, created) {
      console.log('Created user with name ' + params.email);
    });
  }
};

