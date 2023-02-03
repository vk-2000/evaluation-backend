const {Company} = require("../models")
const HTTPerror = require("../utils/errors/HTTPerror");


const getCompaniesRankedByScore = async (sector) => {
    const companies = await Company.findAll({
        where: {
            sector: sector
        },
        attributes: ["id", "name", "ceo", "score"],
        order: [["score", "DESC"]]
    });
    return companies;
}

const updateCompany = async (id, data) => {
    const result = await Company.update(data, {
        where: {
            id: id
        }, returning: true
    });
    const affectedRows = result[0];
    if(affectedRows === 0){
        throw new HTTPerror("Company not found", 404);
    }
    return result;
}

module.exports = {getCompaniesRankedByScore, updateCompany};