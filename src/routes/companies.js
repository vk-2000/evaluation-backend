const express = require("express");
const router = express.Router();

const companiesControllers = require("../controllers/companies");


router.route('/').get(companiesControllers.getCompaniesRankedByScore);

module.exports = router;