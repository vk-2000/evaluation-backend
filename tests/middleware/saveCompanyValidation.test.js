const { saveCompanyValidation, saveCompanySchema } = require("../../src/middleware/saveCompanyValidation");

describe("Save company info validation", () => {
    describe("saveCompanyValidation", () => {
        it("should return a list of company information", async () => {
            const req = {body: {urlLink: "http://abc.com"}};
            const res = {send: jest.fn()};
            const next = jest.fn();
            await saveCompanyValidation(req, res, next);
            expect(next).toBeCalled();
        });

        it("should send an error message if urlLink is not a valid url", async () => {
            const req = {body: {urlLink: "abc"}};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await saveCompanyValidation(req, res, next);
            expect(res.send).toBeCalledWith("\"urlLink\" must be a valid uri");
        });

        it("should return 500 error if there is an error", async () => {
            jest.spyOn(saveCompanySchema, "validate").mockImplementation(() => {
                throw new Error("Internal server error");
            });
            const req = {body: {urlLink: "abc"}};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn().mockImplementation(() => {
                throw new Error("abc");
            });
            await saveCompanyValidation(req, res, next);
            expect(res.send).toBeCalledWith("Internal server error");
        });
    });
});
