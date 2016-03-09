/**
 * Name.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
     id: {
         type: 'integer',
         unique: true,
         primaryKey: true,
         required: true
       },
       individual_id: {
         model: 'Individual',
         required: true
       },
       first_name: {
         type: 'string',
         size: 256,
         required: true
       },
       last_name: {
         type: 'string',
         size: 256,
         required: true
       },
        middle_name: {
         type: 'string',
         size: 256
       },
       suffix: {
         type: 'string',
         size: 256
       },
       reason_for_change: {
         type: 'string',
         size: 256
       },
       date_from: {
         type: 'date'
       },
       date_to: {
         type: 'date'
       },
       notes: {
         type: 'string',
         size: 256
       }
  }
};

