const { updateCompanySchema, updateCompanyValidation } = require("../../src/middleware/companyValidation");

describe("Update company info validation", () => {
    describe("updateCompanyValidation", () => {
        it("should update the company information", async () => {
            const req = {body: {name: "abc"}};
            const res = {send: jest.fn()};
            const next = jest.fn();
            await updateCompanyValidation(req, res, next);
            expect(next).toBeCalled();
        });

        it("should send an error message if request is not a valid", async () => {
            jest.spyOn(updateCompanySchema, "validate").mockReturnValue({error: {message: "Invalid request body"}});
            const req = {body: {name: true}};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await updateCompanyValidation(req, res, next);
            expect(res.send).toHaveBeenCalledWith("Invalid request body");
        });

        it("should return 500 error if there is an error", async () => {
            jest.spyOn(updateCompanySchema, "validate").mockImplementation(() => {
                throw new Error("Internal server error");
            });
            const req = {body: {urlLink: "abc"}};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await updateCompanyValidation(req, res, next);
            expect(res.send).toBeCalledWith("Internal server error");
        });
    });
});
