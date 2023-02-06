const express = require("express");
const router = express.Router();

const companiesControllers = require("../controllers/companies");
const { updateCompanyValidation } = require("../middleware/companyValidation");


router.route('/')
    .get(companiesControllers.getCompaniesRankedByScore);
router.route('/:id')
    .patch(updateCompanyValidation, companiesControllers.updateCompany)

module.exports = router;