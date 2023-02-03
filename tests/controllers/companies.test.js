const companiesController = require("../../src/controllers/companies");
const companiesService = require("../../src/services/companies");
const HTTPerror = require("../../src/utils/errors/HTTPerror");


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

    describe("Update company", () => {
        it("should update the company", async () => {
            jest.spyOn(companiesService, "updateCompany").mockResolvedValue([
                1,
                [
                    {"changed":true}
                ]
            ]);
            const moqReq = {
                params: {
                    id: "xxxx-xxxxxx-xxx"
                }
            };
            const moqRes = {
                send: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis()
            };
            await companiesController.updateCompany(moqReq, moqRes);
            expect(moqRes.status).toBeCalledWith(200);
            expect(moqRes.send).toBeCalledWith([
                1,
                [
                    {"changed":true}
                ]
            ]);
        });
        
    });
    it("should return company not found", async () => {
        jest.spyOn(companiesService, "updateCompany").mockImplementation(() => {throw new HTTPerror("Company not found", 404);});
        const moqReq = {
            params: {
                id: "xxx-xxxxx-xxxx"
            }
        };
        const moqRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        await companiesController.updateCompany(moqReq, moqRes);
        expect(moqRes.status).toBeCalledWith(404);
        expect(moqRes.send).toBeCalledWith({"msg": "Company not found"});
    });

    it("should return something went wrong", async() => {
        jest.spyOn(companiesService, "updateCompany").mockRejectedValue(new Error("Something went wrong"));
        const moqReq = {
            params: {
                id: "xxx-xxx-xxx"
            }
        };
        const moqRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        await companiesController.updateCompany(moqReq, moqRes);
        expect(moqRes.status).toBeCalledWith(500);
        expect(moqRes.send).toBeCalledWith({"msg": "Something went wrong"}); 

    });
});