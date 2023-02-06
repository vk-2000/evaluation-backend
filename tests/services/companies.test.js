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

    describe("Update company", () => {
        it("should update company", async () => {
            const data = {
                name: "abc",
                ceo: "bcd"
            };
            jest.spyOn(Company, "update").mockResolvedValue([1, [{"changed": "abc"}]]);
            const result = await companiesService.updateCompany("xxxx-xxxxxx-xxxx", data);
            expect(result).toEqual([1, [{"changed": "abc"}]]);
        });
        it("should throw error if company not found", async () => {
            jest.spyOn(Company, "update").mockResolvedValue([0, []]);
            const data = {
                name: "abc",
                ceo: "bcd"
            };
            await expect(companiesService.updateCompany(1, data)).rejects.toThrow("Company not found");
        });
    });
});