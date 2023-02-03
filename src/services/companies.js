const {Company} = require("../models")

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

module.exports = {getCompaniesRankedByScore};