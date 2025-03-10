import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,30}$")) 
    .required(),
  address: Joi.string().min(5).max(100).required(),
  country: Joi.string().min(2).max(50).required(),
  city: Joi.string().min(2).max(50).required(),
});

export default signupSchema;
