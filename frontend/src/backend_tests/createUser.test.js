const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

describe("createUser", () => {
    test("Test ID: 1.1 - Valid input: Create root user with valid name, email and id", async () => {
        const payload = {
            username: "test user",
            name: "test name",
            password: "test password",
            attributes: {
                email: "test_name@mymail.sutd.edu.sg",
                name: "test name",
                "custom:user_type": "OSL",
            },
        };

        const response = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload),
            })
            .promise();

        console.log(response);

        //let result = JSON.parse(response.Payload);
        //result = result["body"];

        //console.log(result);
    });
});
