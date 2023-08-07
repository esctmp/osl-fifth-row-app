const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

let my_epf_id = 100;
let my_epf_id_2 = 1000;

describe("getEPF", () => {
    beforeAll(async()=> {
        //Truncate Users Table
        const response_users = await lambda
        .invoke({
            FunctionName: "clearUSERSTest-staging", 
        })
        .promise();
        
        //Create User
        const payload = {
            test: 1,
            userName: "1239e242-3538-41f2-95dd-abc62e451310",
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
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

    }, 1000000)

    beforeEach(async()=> {
        //TruncateEPF Table
        const response_epfs = await lambda
        .invoke({
            FunctionName: "clearEPFTests-staging", 
        })
        .promise();

        //CreateEPF to update
        const jsonFilePath = path.join(
            __dirname,
            "getEPF_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        let data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = JSON.parse(result["body"])
        result = JSON.parse(JSON.stringify(result["result"], null, 2))
        my_epf_id = result["epf_id"]
    }, 1000000)

    test("Test ID: 1 - Valid EPF ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "getEPF_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        let data = JSON.parse(jsonData);

        const jsonFilePath_payload = path.join(
            __dirname,
            "getEPF_testjson",
            "getEPF_test1.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);
        payload["body"]["epf_id"] = my_epf_id

        const response = await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = JSON.parse(result["body"]);
        result = JSON.parse(JSON.stringify(result[0]))
        data = data["body"]

        
        let matches = true;
        for (let key in data) {
            if (String(data[key]) !== String(result[key])) {
                matches = false;
                break;
            }
        }
        expect(matches).toBeTruthy();
        
    }, 1000000);

    test("Test ID: 2 - Invalid EPF datatype", async () => {
        const jsonFilePath_payload = path.join(
            __dirname,
            "getEPF_testjson",
            "getEPF_test2.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);

        const response = await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = JSON.parse(result["body"]);
        result = result["error"];

        expect(result).toBe("Invalid epf_id data type");
    }, 1000000);

    test("Test ID: 3 - Non-existent EPF ID", async () => {
        const jsonFilePath_payload = path.join(
            __dirname,
            "getEPF_testjson",
            "getEPF_test3.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);

        const response = await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Non-existent epf");
    }, 1000000);

    test("Test ID: 4 - Get multiple EPFs concurrently", async () => {

        //CreateEPF to update
        const jsonFilePath = path.join(
            __dirname,
            "getEPF_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        let data = JSON.parse(jsonData);

        let response_epf = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result_epf = JSON.parse(response_epf.Payload);
        result_epf = JSON.parse(result_epf["body"])
        result_epf = JSON.parse(JSON.stringify(result_epf["result"], null, 2))
        my_epf_id_2 = result_epf["epf_id"]


        const jsonFilePath_payload = path.join(
            __dirname,
            "getEPF_testjson",
            "getEPF_test1.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);
        payload["body"]["epf_id"] = my_epf_id

        const jsonFilePath_payload_2 = path.join(
            __dirname,
            "getEPF_testjson",
            "getEPF_test2.json"
        );
        const jsonData_payload_2 = fs.readFileSync(jsonFilePath_payload_2, "utf-8");
        let payload_2 = JSON.parse(jsonData_payload_2);
        payload_2["body"]["epf_id"] = my_epf_id_2

        const response = await Promise.all([
            await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload),
            })
            .promise(),
            await lambda
            .invoke({
                FunctionName: "getEPF-staging",
                Payload: JSON.stringify(payload_2),
            })
            .promise()
        ])

        let result_EPF1 = JSON.parse(response[0].Payload);
        result_EPF1 = JSON.parse(result_EPF1["body"])
        result_EPF1 = result_EPF1[0]

        let result_EPF2 = JSON.parse(response[1].Payload);
        result_EPF2 = JSON.parse(result_EPF2["body"])
        result_EPF2 = result_EPF2[0]


        const jsonFilePath_3 = path.join(
            __dirname,
            "getEPF_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData_3 = fs.readFileSync(jsonFilePath_3, "utf-8");
        let data_1 = JSON.parse(jsonData_3);


        const jsonFilePath_4 = path.join(
            __dirname,
            "getEPF_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData_4 = fs.readFileSync(jsonFilePath_4, "utf-8");
        let data_2 = JSON.parse(jsonData_4);

        data_1 = data_1["body"]
        data_2 = data_2["body"]

        if (result_EPF1["a_name"] == "user 1") {
            let matches_1 = true;
            for (let key in data_1) {

                if(key=="test") {
                    continue
                }

                if (String(data_1[key]) != String(result_EPF1[key])) {
                    matches_1 = false;
                    break;
                }
            }

            expect(matches_1).toBeTruthy();

            let matches_2 = true;
            for (let key in data_2) {

                if(key=="test") {
                    continue
                }

                if (String(data_2[key]) != String(result_EPF2[key])) {
                    matches_2 = false;
                    break;
                }
            }
            expect(matches_2).toBeTruthy();
        } else {
            let matches_1 = true;
            for (let key in data_1) {

                if(key=="test") {
                    continue
                }

                if (String(data_1[key]) != String(result_EPF2[key])) {
                    matches_1 = false;
                    break;
                }
            }
            expect(matches_1).toBeTruthy();

            let matches_2 = true;
            for (let key in data_2) {

                if(key=="test") {
                    continue
                }

                if (String(data_2[key]) != String(result_EPF1[key])) {
                    matches_2 = false;
                    break;
                }
            }
            expect(matches_2).toBeTruthy();
        }


    }, 1000000);



    afterAll(async()=> {
        //Truncate Users Table
        //Truncate EPFs table
    })
});
