const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

describe("getEPF", () => {
    beforeAll(async()=> {
        //Truncate Users Table
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


        //Create User 2
        const payload_2 = {
            test: 1,
            userName: "user2",
            request: {
                userAttributes: {
                    "custom:user_type": "fre",
                    name: "user 2",
                    email: "user_2@example.com",
                },
            }
        };

        const response_2 = await lambda
            .invoke({
                FunctionName: "addUserGroups",
                Payload: JSON.stringify(payload_2),
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

        //CreateEPF 1
        const jsonFilePath = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
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


        //CreateEPF 2
        const jsonFilePath_2 = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, "utf-8");
        let data_2 = JSON.parse(jsonData_2);

        const response_2 = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data_2),
            })
            .promise();

    }, 1000000)

    test("Test ID: 1 - Get EXCO 1 EPF", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        let data = JSON.parse(jsonData);

        const jsonFilePath_payload = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "getEXCOEPFs_test1.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);

        const response = await lambda
            .invoke({
                FunctionName: "getEXCOEPFs-staging",
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

    test("Test ID: 2 - Get EXCO 2 EPF", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        let data = JSON.parse(jsonData);

        const jsonFilePath_payload = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "getEXCOEPFs_test2.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);

        const response = await lambda
            .invoke({
                FunctionName: "getEXCOEPFs-staging",
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


    test("Test ID: 3 - Get EXCO EPFs concurrently", async () => {
        const jsonFilePath_2 = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, "utf-8");
        let data_2 = JSON.parse(jsonData_2);

        const jsonFilePath_payload_2 = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "getEXCOEPFs_test2.json"
        );
        const jsonData_payload_2 = fs.readFileSync(jsonFilePath_payload_2, "utf-8");
        let payload_2 = JSON.parse(jsonData_payload_2);

        const jsonFilePath = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        let data_1 = JSON.parse(jsonData);

        const jsonFilePath_payload = path.join(
            __dirname,
            "getEXCOEPFs_testjson",
            "getEXCOEPFs_test1.json"
        );
        const jsonData_payload = fs.readFileSync(jsonFilePath_payload, "utf-8");
        let payload = JSON.parse(jsonData_payload);

        const response = await Promise.all([
            lambda
            .invoke({
                FunctionName: "getEXCOEPFs-staging",
                Payload: JSON.stringify(payload),
            })
            .promise(),
            lambda
            .invoke({
                FunctionName: "getEXCOEPFs-staging",
                Payload: JSON.stringify(payload_2),
            })
            .promise()
        ])

                
        let result_EPF1 = JSON.parse(response[0].Payload);
        result_EPF1 = JSON.parse(result_EPF1["body"]);
        result_EPF1 = result_EPF1[0]

        let result_EPF2 = JSON.parse(response[1].Payload);
        result_EPF2 = JSON.parse(result_EPF2["body"]);
        result_EPF2 = result_EPF2[0]


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
