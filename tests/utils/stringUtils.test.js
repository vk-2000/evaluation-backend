
const { csvToJson } = require("../../src/utils/stringUtils");

describe("test string utils", () => {
    describe("test csvToJson", () => {
        it("should return a list of json objects", () => {
            const csv = "company_id,company_sector\n1,Automobile";
            const result = csvToJson(csv);
            expect(result).toEqual([{company_id: "1", company_sector: "Automobile"}]);
        })
    })
})