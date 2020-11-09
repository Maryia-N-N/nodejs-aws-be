import joi from '@hapi/joi';

export const productSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  price: joi.number().required().min(1),
  count: joi.number().required().min(1)
});


export const validateProduct = (product) => productSchema.validate(product);
