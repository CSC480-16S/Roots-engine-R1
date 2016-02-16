/**
 * Individual.js
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
    date_of_birth: {
      type: 'date'
    },
    country_of_birth: {
      type: 'string',
      size: 64
    },
    state_of_birth: {
      type: 'string',
      size: 64
    },
    municipality_of_birth: {
      type: 'string',
      size: 64
    },
    date_of_death: {
      type: 'date'
    },
    country_of_death: {
      type: 'string',
      size: 64
    },
    state_of_death: {
      type: 'string',
      size: 64
    },
    municipality_of_death: {
      type: 'string',
      size: 64
    },
    gender: {
      type: 'string',
      size: 64
    },

    bio: {
      type: 'string',
      size: 256
    },
    economic_status: {
      type: 'string',
      size: 64
    },
    immigration_history: {
      type: 'string',
      size: 64
    },
    accomplishments: {
      type: 'string',
      size: 256
    },
    notes: {
      type: 'string',
      size: 256
    }
  }
};

