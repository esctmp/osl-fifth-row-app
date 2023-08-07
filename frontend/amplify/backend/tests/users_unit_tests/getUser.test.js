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

        //Create User 1
        const payload = {
            test: 1,
            userName: "1239e242-3538-41f2-95dd-abc62e451310",
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
                    name: "user 1",
                    email: "user_1@example.com",
                },
            }
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

    }, 1000000)

    test("Test ID: 1.1 - Valid input: Create root user with valid name, email and id", async () => {


        
        const jsonFilePath_payload = path.join(
            __dirname,
            "getUser_testjson",
            "getUser_test1.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);

        const response = await lambda
            .invoke({
                FunctionName: "GetUser-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        console.log(response)

        /*
        let response_payload = JSON.parse(response["Payload"])
        expect(response_payload["user_id"]).toMatch(payload["userName"])
        expect(response_payload["name"]).toMatch(payload["request"]["userAttributes"]["name"])
        expect(response_payload["email"]).toMatch(payload["request"]["userAttributes"]["email"])
        expect(response_payload["user_type"]).toMatch(payload["request"]["userAttributes"]["custom:user_type"])
        */
        
    }, 1000000);


});