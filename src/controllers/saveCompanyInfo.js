

const saveCompanyInfoServices = require("../services/saveCompanyInfo");


const saveCompanyInfo = async (req, res) => {
    const urlLink = req.body.urlLink;
    const data = await saveCompanyInfoServices.saveCompanyInfo(urlLink);
    res.send(data);
}

module.exports = {saveCompanyInfo};