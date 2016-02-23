/**
 * NameController
 *
 * @description :: Server-side logic for managing Names
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
};

