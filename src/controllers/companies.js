const companiesServices = require('../services/companies');
const HTTPerror = require("../../src/utils/errors/HTTPerror");


const getCompaniesRankedByScore = async (req, res) => {
    const sector = req.query.sector;
    const companies = await companiesServices.getCompaniesRankedByScore(sector);
    res.send(companies);
}

const updateCompany = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedCompany = await companiesServices.updateCompany(id, req.body);
        res.status(200).send(updatedCompany);
    }
    catch(err) {
        if(err instanceof HTTPerror){
            res.status(err.code).send({msg: err.message});
        }
        else{
            res.status(500).send({msg: "Something went wrong"});
        }
    }
};

module.exports = {getCompaniesRankedByScore, updateCompany};