const companiesServices = require('../services/companies');

const getCompaniesRankedByScore = async (req, res) => {
    const sector = req.query.sector;
    const companies = await companiesServices.getCompaniesRankedByScore(sector);
    res.send(companies);
}

module.exports = {getCompaniesRankedByScore};