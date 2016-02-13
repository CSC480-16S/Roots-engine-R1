/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    var params = req.params.all()
    Login.find({email: params.email}).exec(function (err, nameCheck) {
      if (err) {
        return res.negotiate(err);
      }
      if (nameCheck.length) {
        console.log('User name ' + params.email + ' already exists');
        return res.view('static/signup', params);
      } else {
        Individual.create({
          first_name: params.first_name,
          last_name: params.last_name
        }).exec(function createCB(err, created) {
          if (err) {
            return res.negotiate(err);
          }
          Login.create({
            email: params.email,
            password: params.password,
            profile_complete: false,
            self: created.id
          }).exec(function createCB(err, created) {
            if (err) {
              return res.negotiate(err);
            }
            console.log('Created user with name ' + params.email);
            return res.view('static/index', params);
          });
        });


      }
    });
  },
  check: function (req, res) {
  }
}

