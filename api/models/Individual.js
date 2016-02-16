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
    /* this will be a separate table with updated schema*/
    first_name: {
      type: 'text'
    },
    middle_name: {
      type: 'text'
    },
    last_name: {
      type: 'text'
    },
    /*for use with updated schema */
    /*country_of_birth: {
      type: 'text'
    },
    state_of_birth: {
      type: 'text'
    },
    county_of_birth: {
      type: 'text'
    },
    municipality_of_birth: {
      type: 'text'
    },*/
    date_of_death: {
      type: 'date'
    },
    /*for use with updated schema*/
    /*country_of_death: {
      type: 'text'
    },
    state_of_death: {
      type: 'text'
    },
    county_of_death: {
      type: 'text'
    },
    municipality_of_death: {
      type: 'text'
    },*/
    gender: {
      type: 'text'
    },

    bio: {
      type: 'text'
    },
    /*for use with updated schema*/
    /*economic_status: {
      type: 'text'
    },
    immigration_history: {
      type: 'text'
    },
    accomplishments: {
      type: 'text'
    },*/
    notes: {
      type: 'text'
    }
  }
};

