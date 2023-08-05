const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

describe("getEPF", () => {
    beforeAll(async()=> {
        //Truncate Users Table
        //Create User
    })

    beforeEach(async()=> {
        //Truncate EPFs table
        //Create EPF
    })

    test("Test ID: 1 - Valid EPF ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test1.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const payload = {
            epf_id: 125,
        };

        const response = await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["body"];

        let matches = true;
        for (let key in data) {
            if (String(data[key]) !== String(result[key])) {
                matches = false;
                break;
            }
        }
        expect(matches).toBeTruthy();
    });

    test("Test ID: 2 - Invalid EPF datatype", async () => {
        const payload = {
            epf_id: "125",
        };

        const response = await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    });

    test("Test ID: 3 - Non-existent EPF ID", async () => {
        const payload = {
            epf_id: "125",
        };

        const response = await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Non-existent epf_id");
    });

    afterAll(async()=> {
        //Truncate Users Table
        //Truncate EPFs table
    })
});
