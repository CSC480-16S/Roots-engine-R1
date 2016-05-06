/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  // error page
  '/error*': 'ErrorController.errorPage',

  // login controller, accessible by any user
  '/': 'LoginController.homepage', //renders the login page, login.ejs
  '/userSignup': 'LoginController.userSignup', //used to call user sighup function, returns to login.ejs
  '/userLogin': 'LoginController.userLogin', //used to call login function, returns to login.ejs on failure and treeViewer.ejs on sucess
  '/emailConfirm*': 'LoginController.confirmEmail', //process email confirmation and renders the login.ejs page
  '/emailResent*': 'LoginController.resendEmail', //reseeds confirm email and renders login.ejs
  '/enterNewPassword*': 'LoginController.enterNewPassword', //renders password_reset.ejs
  '/changePassword': 'LoginController.changePassword', //used to call change password, returns the user to login.ejs
  '/resetEmailSent': 'LoginController.sendResetPasswordEmail', //send the email for password rest and returns the user to the login.ejs page
  '/renderPasswordReset': 'LoginController.renderPasswordReset', //renders the login_help.ejs page
  '/logout': 'LoginController.logout', //calls the logout function and returns the user to the login.ejs page

  // tree controller, accessible only to authenticated users
  '/treeViewer': 'TreeController.viewTree', //renders the treeViewer.ejs
  '/populateTree': 'TreeController.populateTree', //loads json for tree
  '/getRelations': 'TreeController.getRelations',
  '/getAllParents': 'TreeController.getAllParents',
  '/map': 'TreeController.viewMap',
  '/mapData': 'TreeController.getMapData',
  '/parliament': 'TreeController.viewParliament',
  '/getParliamentData': 'TreeController.getParliamentData',
  '/getOldest': 'TreeController.getOldestId',
  '/getDescendents': 'TreeController.getDescendants',

  // profile controller, accessible only to authenticated users
  '/profile': 'ProfileController.openProfile', //renders the personal_profile.ejs page
  '/updateProfile': 'ProfileController.updateProfile', // calls the update profile function
  '/createNewIndividual': 'ProfileController.createNewIndividual', // TODO: Implement this function
  '/accountinfo': 'ProfileController.renderAccountInfo', //renders the accountinfo.ejs page
  '/getProfileInfo': 'ProfileController.getUserProfile',
  '/addPerson': 'ProfileController.addPerson',



  //settings controller, accessible by any user
  '/about': 'SettingsController.aboutpage' //renders the about page

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
