const express = require("express");
const router = express.Router();

const saveCompanyInfoControllers = require("../controllers/saveCompanyInfo");
const { saveCompanyValidation } = require("../middleware/saveCompanyValidation");

router.route('/').post(saveCompanyValidation,  saveCompanyInfoControllers.saveCompanyInfo);

module.exports = router;