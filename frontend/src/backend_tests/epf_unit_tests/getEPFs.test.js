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
            "getEPFs_testjson",
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


        //CreateEPF to update
        const jsonFilePath_2 = path.join(
            __dirname,
            "getEPFs_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, "utf-8");
        let data_2 = JSON.parse(jsonData_2);

        let response_2 = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data_2),
            })
            .promise();

        let result_2 = JSON.parse(response_2.Payload);
        result_2 = JSON.parse(result_2["body"])
        result_2 = JSON.parse(JSON.stringify(result_2["result"], null, 2))
        my_epf_id_2 = result_2["epf_id"]

    }, 1000000)


    test("Test ID: 1 - Single getEPFs call", async () => {

        const response = 
            await lambda
            .invoke({
                FunctionName: "getEPFs-staging",
                Payload: JSON.stringify({
                    test: 1
                })
            })
            .promise()

        let result_EPF1 = JSON.parse(response.Payload);
        result_EPF1 = JSON.parse(result_EPF1["body"])
        result_EPF1 = result_EPF1[0]

        let result_EPF2 = JSON.parse(response.Payload);
        result_EPF2 = JSON.parse(result_EPF2["body"])
        result_EPF2 = result_EPF2[1]


        const jsonFilePath_3 = path.join(
            __dirname,
            "getEPFs_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData_3 = fs.readFileSync(jsonFilePath_3, "utf-8");
        let data_1 = JSON.parse(jsonData_3);


        const jsonFilePath_4 = path.join(
            __dirname,
            "getEPFs_testjson",
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






    test("Test ID: 2 - Multiple Concurrent getEPFs call", async () => {

        const response = await Promise.all([
            lambda
            .invoke({
                FunctionName: "getEPFs-staging",
                Payload: JSON.stringify({
                    test: 1
                })
            })
            .promise(),
            lambda
            .invoke({
                FunctionName: "getEPFs-staging",
                Payload: JSON.stringify({
                    test: 1
                })
            })
            .promise()
        ])


        let result_EPF1 = JSON.parse(response[0].Payload);
        result_EPF1 = JSON.parse(result_EPF1["body"])
        result_EPF1 = result_EPF1[0]

        let result_EPF2 = JSON.parse(response[0].Payload);
        result_EPF2 = JSON.parse(result_EPF2["body"])
        result_EPF2 = result_EPF2[1]


        const jsonFilePath_3 = path.join(
            __dirname,
            "getEPFs_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData_3 = fs.readFileSync(jsonFilePath_3, "utf-8");
        let data_1 = JSON.parse(jsonData_3);


        const jsonFilePath_4 = path.join(
            __dirname,
            "getEPFs_testjson",
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
        



        let result_EPF1_2 = JSON.parse(response[1].Payload);
        result_EPF1_2 = JSON.parse(result_EPF1_2["body"])
        result_EPF1_2 = result_EPF1_2[0]

        let result_EPF2_2 = JSON.parse(response[1].Payload);
        result_EPF2_2 = JSON.parse(result_EPF2_2["body"])
        result_EPF2_2 = result_EPF2_2[1]



        if (result_EPF1_2["a_name"] == "user 1") {
            let matches_3 = true;
            for (let key in data_1) {

                if(key=="test") {
                    continue
                }

                if (String(data_1[key]) != String(result_EPF1_2[key])) {
                    matches_3 = false;
                    break;
                }
            }

            expect(matches_3).toBeTruthy();

            let matches_4 = true;
            for (let key in data_2) {

                if(key=="test") {
                    continue
                }

                if (String(data_2[key]) != String(result_EPF2_2[key])) {
                    matches_4 = false;
                    break;
                }
            }
            expect(matches_4).toBeTruthy();
        } else {
            let matches_3 = true;
            for (let key in data_1) {

                if(key=="test") {
                    continue
                }

                if (String(data_1[key]) != String(result_EPF2_2[key])) {
                    matches_3 = false;
                    break;
                }
            }
            expect(matches_3).toBeTruthy();

            let matches_4 = true;
            for (let key in data_2) {

                if(key=="test") {
                    continue
                }

                if (String(data_2[key]) != String(result_EPF1_2[key])) {
                    matches_4 = false;
                    break;
                }
            }
            expect(matches_4).toBeTruthy();
        }


        


    }, 1000000);



    afterAll(async()=> {
        //Truncate Users Table
        //Truncate EPFs table
    })
});
