const companiesService = require("../../src/services/companies");
const {Company} = require("../../src/models");

describe("Test companies service", () => {
    describe("getCompaniesRankedByScore", () => {
        it("should return a list of companies ranked by score", async () => {
            jest.spyOn(Company, "findAll").mockResolvedValue([{"abc": "abc"}]);
            const companies = await companiesService.getCompaniesRankedByScore("software");
            expect(companies).toEqual([{"abc": "abc"}]);
        });
    });
});