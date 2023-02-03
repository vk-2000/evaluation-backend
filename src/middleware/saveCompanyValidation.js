const Joi = require("joi");
const HTTPerror = require("../utils/errors/HTTPerror");

const saveCompanySchema = Joi.object({
    urlLink: Joi.string()
        .uri()
        .required(),
});


const saveCompanyValidation = async (req, res, next) => {
    try{
        const data = req.body;
        const {value, error} = saveCompanySchema.validate(data);
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

module.exports = {saveCompanySchema, saveCompanyValidation}