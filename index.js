const express = require("express");
const port=5000;
const saveCompanyInfoRouter = require("./src/routes/saveCompanyInfo")
const app = express();

app.use(express.json());

app.use("/api/save", saveCompanyInfoRouter);

app.listen(port, () => {
    console.log("Server started");
});
