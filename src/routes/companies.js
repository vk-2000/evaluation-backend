const express = require("express");
const router = express.Router();

const companiesControllers = require("../controllers/companies");


router.route('/')
    .get(companiesControllers.getCompaniesRankedByScore);
router.route('/:id')
    .patch(companiesControllers.updateCompany)

module.exports = router;