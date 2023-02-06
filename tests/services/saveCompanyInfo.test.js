const saveCompanyInfoServices = require("../../src/services/saveCompanyInfo")
const axios = require("axios");
const { Company } = require("../../src/models");
let { csvToJson } = require("../../src/utils/stringUtils");


describe("Save company info service", () => {
    // clear mocks after each test
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe("saveCompanyInfo", () => {
        it("should return a list of company information", async () => {
            axios.get = jest.fn().mockResolvedValue({data: "company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile\n46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc,Software"});
            jest.spyOn(saveCompanyInfoServices, "storeCompany").mockResolvedValue();
            jest.spyOn(saveCompanyInfoServices, "storeSectorInfo").mockResolvedValue("Success");
            jest.spyOn(Company, "findAll").mockResolvedValue({abc: "abc"});
            const result = await saveCompanyInfoServices.saveCompanyInfo("http://abc.com");
            expect(saveCompanyInfoServices.storeCompany).toBeCalled();
            expect(result).toEqual({abc: "abc"});
        });
    });
    describe("storeCompany", () => {
        it("should store company information", async () => {
            axios.get = jest.fn().mockResolvedValue({data: {abc: "abc"}});
            jest.spyOn(Company, "create").mockResolvedValue('a');
            Company.create = jest.fn().mockResolvedValue();
            await saveCompanyInfoServices.storeCompany("abc", "xyz");
            expect(axios.get).toHaveBeenCalledWith("http://54.167.46.10/company/abc");
            expect(Company.create).toBeCalledWith({abc: "abc", sector: "xyz"});
        });
    });
    describe("storeSectorInfo", () => {
        it("should store sector information", async () => {
            axios.get = jest.fn().mockResolvedValue({data: [{
                "companyId": "8888888888-888888-009900-999999999",
                "performanceIndex": [{
                    "key": "cpi",
                    "value": 0.2
                }, {
                    "key": "cf",
                    "value": 30000
                },{
                    "key": "mau",
                    "value": 0.1
                },{
                    "key": "roic",
                    "value": 20
                }],
            }]});
            jest.spyOn(Company, "update").mockResolvedValue();


            const result = await saveCompanyInfoServices.storeSectorInfo("abc");

            expect(result).toEqual("Success");
        });
        it("should return null if there is an error", async () => {
            axios.get = jest.fn().mockRejectedValue();
            const result = await saveCompanyInfoServices.storeSectorInfo("abc");
            expect(result).toEqual("Error");
        })
    });



});