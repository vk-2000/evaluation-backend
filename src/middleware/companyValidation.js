const Joi = require("joi");
const HTTPerror = require("../utils/errors/HTTPerror");

const updateCompanySchema = Joi.object({
    name: Joi.string(),
    ceo: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    cpi: Joi.number(),
    cf: Joi.number(),
    mau: Joi.number(),
    roic: Joi.number(),
    score: Joi.number(),
    description: Joi.string(),
    sector: Joi.string()
});


const updateCompanyValidation = async (req, res, next) => {
    try{
        const data = req.body;
        const {value, error} = updateCompanySchema.validate(data);
        if(error){
            throw new HTTPerror(error.message, 400);
        }
        next();
    }
    catch(err){
        if(err instanceof HTTPerror){
            res.status(err.code).send(err.message);
        }
        else{
            res.status(500).send(err.message);
        }
    }
    
};

module.exports = {updateCompanySchema, updateCompanyValidation}