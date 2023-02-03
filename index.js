const express = require("express");
const port=5000;
const saveCompanyInfoRouter = require("./src/routes/saveCompanyInfo")
const companiesRouter = require("./src/routes/companies");
const app = express();

app.use(express.json());

app.use("/api/save", saveCompanyInfoRouter);
app.use("/api/companies", companiesRouter);

app.listen(port, () => {
    console.log("Server started");
});
