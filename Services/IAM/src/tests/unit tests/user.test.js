import { userLogin } from "../Application/user.js";
import loginValidate from "../Contracts/login.js"; 
import bcrypt from "bcrypt";
import createJwtToken from "../Application/token.js";
import * as userModule from "../Infrastructure/user.js";

jest.mock("../Contracts/login.js", () => jest.fn());
jest.mock("../Application/token.js", () => ({
    __esModule: true, 
    default: jest.fn(), 
}));

describe("userLogin", () => {
    let mockReq, mockRes, mockJson, mockHeader;

    beforeEach(() => {
       
        mockJson = jest.fn();
        mockHeader = jest.fn(() => ({ json: mockJson }));
        mockRes = {
            status: jest.fn(() => mockRes),
            header: mockHeader,
            json: mockJson,
        };

        jest.clearAllMocks();
    });

    it("should return a validation error if the request body is invalid", async () => {
        const mockReq = { body: {} }; 
        const mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };

        loginValidate.mockReturnValue({ error: { details: "Validation error" } });

        await userLogin(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Validation error" });
    });

    it("should return an error if the user does not exist", async () => {
        mockReq = { body: { email: "nonexistent@example.com", password: "password123" } };

        loginValidate.mockReturnValue({ error: null });

        jest.spyOn(userModule, "userRead").mockResolvedValue([]);
        await userLogin(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({ error: "invalid email or password" });
    });

    it("should return an error if the password is invalid", async () => {
        mockReq = { body: { email: "karan32e2@gmail.com", password: "wrongpassword" } };
        jest.spyOn(userModule, "userRead").mockResolvedValue([{ id: 1, password: "hashedpassword" }]);
        jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

        await userLogin(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({ error: "invalid email or password" });
    });

    it("should return a JWT token and user data on successful login", async () => {
        mockReq = { body: { email: "karan32e2@gmail.com", password: "Pa3$word!!" } };
        const user = { id: 1, password: "hashedpassword", toJSON: () => ({ id: 1, name: "Test User", password: "hashedpassword" }) };
        jest.spyOn(userModule, "userRead").mockResolvedValue([user]);
        jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
        createJwtToken.mockReturnValue("mockJwtToken"); 

        await userLogin(mockReq, mockRes);

        expect(mockHeader).toHaveBeenCalledWith("x-auth-token", "mockJwtToken");
        expect(mockJson).toHaveBeenCalledWith({
            user: { id: 1, name: "Test User" },
        });
    });
});
