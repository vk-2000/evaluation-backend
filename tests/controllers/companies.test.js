const companiesController = require("../../src/controllers/companies");
const companiesService = require("../../src/services/companies");

describe("Companies controller", () => {
    describe("getCompaniesRankedByScore", () => {
        it("should return a list of companies ranked by score", async () => {
            const req = {query: {sector: "software"}};
            const res = {send: jest.fn()};
            companiesService.getCompaniesRankedByScore = jest.fn().mockResolvedValue({abc: "abc"});
            await companiesController.getCompaniesRankedByScore(req, res);
            expect(res.send).toBeCalledWith({abc: "abc"});
        });
    });
});