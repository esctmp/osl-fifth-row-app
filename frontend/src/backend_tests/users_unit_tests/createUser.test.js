const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

describe("createUser", () => {
    beforeEach(async() => {
        
        //TruncateEPF Table
        const response_epfs = await lambda
        .invoke({
            FunctionName: "clearEPFTests-staging", 
        })
        .promise();
        
        //TruncateUsers Table
        const response_users = await lambda
        .invoke({
            FunctionName: "clearUSERSTest-staging", 
        })
        .promise();

    }, 1000000)

    test("Test ID: 1.1 - Valid input: Create root user with valid name, email and id", async () => {


        
        const payload = {
            test: 1,
            userName: "1239e242-3538-41f2-95dd-abc62e451310",
            request: {
                userAttributes: {
                    "custom:user_type": "root",
                    name: "test user",
                    email: "test_user@example.com",
                },
            }
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)

    
        let response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
        
    }, 1000000);

    test("Test ID: 1.2 - Valid input: Create osl user with valid name, email and id", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "osl",
                    name: "user 1",
                    email: "user_1_testing@example.com",
                },
            },
            userName: "user1",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)
    
        let response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
    }, 1000000);

    test("Test ID: 1.3 - Valid input: Create exco user with valid name, email and id", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
                    name: "user 1",
                    email: "user_1_testing@example.com",
                },
            },
            userName: "user1",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)
    
        let response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
    }, 1000000);

    test("Test ID: 2.1 - Missing name: Attempt to create user without providing a name", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "root",
                    name: "",
                    email: "user_1_testing@example.com",
                },
            },
            userName: "user1",
        };

        

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)


        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Name must be provided");
    }, 1000000);

    test("Test ID: 2.2 - Missing email: Attempt to create user without providing an email", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
                    name: "user 1",
                    email: "",
                },
            },
            userName: "user1",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid email format");
    }, 1000000);

    test("Test ID: 2.3 - Invalid email format: Attempt to create user with an incorrect email format", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
                    name: "user 1",
                    email: "invalid_email",
                },
            },
            userName: "user1",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid email format");
    }, 1000000);

    test("Test ID: 2.4 - Missing user_id: Attempt to create user without providing an id", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
                    name: "user 1",
                    email: "user_1_testing@example.com",
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

        //console.log(response)

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("User ID must be provided");
    }, 1000000);

    test("Test ID: 2.5 - Invalid user_type: Attempt to create user with an invalid type", async () => {
        const payload = {
            test: 1,
            request: {
                userAttributes: {
                    "custom:user_type": "invalid",
                    name: "user 1",
                    email: "user_1_testing@example.com",
                },
            },
            userName: "user1",
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        //console.log(response)

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid user type. Must be 'root', 'osl', or 'fre'");
    }, 1000000);


});