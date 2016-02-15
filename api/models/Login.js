/**
 * Login.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      required: true
    },
    email: {
      type: 'string',
      size: 100
    },
    password: {
      type: 'string',
      size: 32
    },
    profile_complete: {
      type: 'boolean'
    },
    self: {
      model: 'Individual'
    }
  }
};

