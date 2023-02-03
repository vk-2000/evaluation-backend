const saveCompanyInfoServices = require("../../src/services/saveCompanyInfo")
const axios = require("axios");
const { Company } = require("../../src/models");
let { csvToJson } = require("../../src/utils/stringUtils");

describe("Save company info service", () => {
    describe("saveCompanyInfo", () => {
        it("should return a list of company information", async () => {
            jest.spyOn(axios, "get").mockResolvedValue("");
            csvToJson = jest.fn().mockReturnValue([]);
            saveCompanyInfoServices.storeCompany = jest.fn().mockResolvedValue();
            saveCompanyInfoServices.storeSectorInfo = jest.fn().mockResolvedValue("");
            jest.spyOn(Company, "findAll").mockResolvedValue({abc: "abc"});
            const result = await saveCompanyInfoServices.saveCompanyInfo("http://abc.com");
            expect(result).toEqual({abc: "abc"});
        });
    });

    describe("storeCompany", () => {
        it("should store company information", async () => {
            jest.spyOn(axios, "get").mockResolvedValue({data: {abc: "abc"}});
            jest.spyOn(Company, "create").mockResolvedValue();
            await saveCompanyInfoServices.storeCompany("abc", "xyz");
            expect(Company.create).toBeCalledWith({abc: "abc", sector: "xyz"});
        });
    });

    describe("storeSectorInfo", () => {
        it("should store sector information", async () => {
            jest.spyOn(axios, "get").mockResolvedValue("");
            jest.spyOn(Company, "update").mockResolvedValue();
            await saveCompanyInfoServices.storeSectorInfo("abc");
            expect(Company.update).toBeCalledWith({cpi: 1, cf: 2, mau: 3, roic: 4, score: 2.5}, {where: {id: "abc"}});
        });
        it("should return null if there is an error", async () => {
            jest.spyOn(axios, "get").mockRejectedValue();
            const result = await saveCompanyInfoServices.storeSectorInfo("abc");
            expect(result).toBeNull();
        })
    });

});