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
});