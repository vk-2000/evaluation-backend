const saveCompanyInfoController = require("../../src/controllers/saveCompanyInfo");
const saveCompanyInfoServices = require("../../src/services/saveCompanyInfo");

describe("Save company info controller", () => {
    describe("saveCompanyInfo", () => {
        it("should return a list of company information", async () => {
            const req = {body: {urlLink: "http://abc.com"}};
            const res = {send: jest.fn()};
            saveCompanyInfoServices.saveCompanyInfo = jest.fn().mockResolvedValue({abc: "abc"});
            await saveCompanyInfoController.saveCompanyInfo(req, res);
            expect(res.send).toBeCalledWith({abc: "abc"});
        });
    });
});

