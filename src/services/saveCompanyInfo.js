const axios = require("axios");
const {Company} = require("../models")
const { csvToJson } = require("../utils/stringUtils");



const storeCompany = async (company_id, sector_name) => {
    const data = await axios.get(`http://54.167.46.10/company/${company_id}`);
    const company = data.data;
    company["sector"] = sector_name;
    await Company.create(company);
}

const storeSectorInfo = async (name) => {
    try{
        const data = await axios.get(`http://54.167.46.10/sector?name=${name}`);
        const sectorInfo = data.data;
        // console.log(sectorInfo);
        sectorInfo.forEach(async (info) => {
            const stats = info.performanceIndex;
            const updateData = {
                cpi: stats[0].value,
                cf: stats[1].value,
                mau: stats[2].value,
                roic: stats[3].value,
            }
            const score = ((updateData.cpi * 10) + (updateData.cf / 10000) + (updateData.mau * 10) + updateData.roic) / 4;
            updateData["score"] = score;
            await Company.update(updateData, {
                where: {
                    id: info.companyId 
                }
            })
        })
        return "Success";
    }
    catch(err){
        return "Error";
    }
}


const saveCompanyInfo = async (urlLink) => {
    const data = await axios.get(urlLink);
    const companyInformation = csvToJson(data.data);
    console.log(companyInformation);
    companyInformation.forEach(async (info) => {
        await storeCompany(info.company_id, info.company_sector);
    });
    let requests = companyInformation.map(info => {
        return storeSectorInfo(info.company_sector)
    });
    const results = await Promise.allSettled(requests);
    return await Company.findAll({attributes: ["id","name", "score"], raw: true});
}

module.exports = {saveCompanyInfo, storeCompany, storeSectorInfo};