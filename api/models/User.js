/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
   email: {
     type: 'string',
     size: 100,
     unique: true,
     primaryKey: true,
     required: true
   },
    password: {
      type: 'string',
      size: 32,
      required: true
    },
    email_confirm: {
      type: 'string',
      size: 32
    },
    individual_id: {
      type: 'integer'
    },
    password_reset: {
      type: 'string',
      size: 32
    }
  }
};

