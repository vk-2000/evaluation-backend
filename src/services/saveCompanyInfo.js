const axios = require("axios");
const { raw } = require("express");
const { where } = require("sequelize");
const {Company} = require("../models")
const { csvToJson } = require("../utils/stringUtils");



const storeCompany = async (company_id, sector_name) => {
    const data = await axios.get(`http://54.167.46.10/company/${company_id}`);
    const company = data.data;
    company["sector"] = sector_name;
    Company.create(company);
}

const storeSectorInfo = async (name) => {
    try{
        const data = await axios.get(`http://54.167.46.10/sector?name=${name}`);
        const sectorInfo = data.data;
        console.log(sectorInfo);
        sectorInfo.forEach(async (info) => {
            const stats = info.performanceIndex;
            console.log(stats);
            const updateData = {
                cpi: stats[0].value,
                cf: stats[1].value,
                mau: stats[2].value,
                roic: stats[3].value,
            }
            const score = ((updateData.cpi * 10) + (updateData.cf / 10000) + (updateData.mau * 10) + updateData.roic) / 4;
            updateData["score"] = score;
            console.log(updateData);
            await Company.update(updateData, {
                where: {
                    id: info.companyId 
                }
            })
        })
    }
    catch(err){
        return null
    }
}


const saveCompanyInfo = async (urlLink) => {
    const data = await axios.get(urlLink);
    const companyInformation = csvToJson(data.data);
    companyInformation.forEach(async (info) => {
        await storeCompany(info.company_id, info.company_sector);
    });
    let requests = companyInformation.map(info => {
        console.log(info.company_sector);
        return storeSectorInfo(info.company_sector)
    });
    await Promise.all(requests);
    return await Company.findAll({attributes: ["id","name", "score"], raw: true});
}

module.exports = {saveCompanyInfo, storeCompany, storeSectorInfo};