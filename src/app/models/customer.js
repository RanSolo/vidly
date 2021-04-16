const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    isGold: Joi.bool(),
    phone: Joi.string().min(7).max(30),
    name: Joi.string().min(3).required()
  });
  const result = schema.validate(customer);
  return result.error;
};

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
