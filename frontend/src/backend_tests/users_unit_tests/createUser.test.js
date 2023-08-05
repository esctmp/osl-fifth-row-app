const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

describe("createUser", () => {
    test("Test ID: 1.1 - Valid input: Create root user with valid name, email and id", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "ROOT",
                    name: "hello world3",
                    email: "helloword3_testing@example.com",
                },
            },
            userName: "helloworld3",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();
    
        response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
    });

    test("Test ID: 1.2 - Valid input: Create osl user with valid name, email and id", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "OSL",
                    name: "hello world4",
                    email: "helloword4_testing@example.com",
                },
            },
            userName: "helloworld4",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();
    
        response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
    });

    test("Test ID: 1.3 - Valid input: Create exco user with valid name, email and id", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "EXCO",
                    name: "hello world4",
                    email: "helloword4_testing@example.com",
                },
            },
            userName: "helloworld4",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();
    
        response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
    });

    test("2.1 - Missing name: Attempt to create user without providing a name", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "EXCO",
                    name: "",
                    email: "helloword4_testing@example.com",
                },
            },
            userName: "helloworld4",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Name must be provided");
    });

    test("Test ID: 2.2 - Missing email: Attempt to create user without providing an email", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "EXCO",
                    name: "User",
                    email: "",
                },
            },
            userName: "helloworld4",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid email format");
    });

    test("Test ID: 2.3 - Invalid email format: Attempt to create user with an incorrect email format", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "EXCO",
                    name: "User",
                    email: "invalid_email",
                },
            },
            userName: "helloworld4",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid email format");
    });

    test("Test ID: 2.4 - Missing user_id: Attempt to create user without providing an id", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "EXCO",
                    name: "User",
                    email: "invalid_email",
                },
            },
            userName: "",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("User ID must be provided");
    });

    test("Test ID: 2.5 - Invalid user_type: Attempt to create user with an invalid type", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "invalid",
                    name: "User",
                    email: "invalid_email",
                },
            },
            userName: "testingg",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid user type. Must be 'root', 'osl', or 'exco'");
    });

    test("Test ID: 3.1 - Duplicate entry: Attempt to create user with an existing id, name, email, and type combination", async () => {
        const payload = {
            request: {
                userAttributes: {
                    "custom:user_type": "invalid",
                    name: "User",
                    email: "invalid_email",
                },
            },
            userName: "testingg",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Duplicate entry");
    });


});