const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

async function restart() {
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

    

    //Create Test User
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
}

describe("createEPF", () => {
    beforeEach(async() => {
            
    })


    test("Test ID: 1 - Create new EPF with valid fields", async () => {
        await restart()

        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test1.json"
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
        data = data["body"]
        
        let matches = true;
        for (let key in data) {
            if(key=="test") {
                continue
            }

            if (String(data[key]) !== String(result[key])) {
                matches = false;
                break;
            }
        }
        expect(matches).toBeTruthy();
    }, 1000000);

    test("Test ID: 2 - Non-existent EXCO User ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test2.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Non-existent exco user id");
    }, 1000000);

    test("Test ID: 3 - Missing Event Name", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test3.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Event name missing");
    }, 1000000);

    test("Test ID: 4 - Invalid INT datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test4.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    }, 1000000);

    test("Test ID: 5 - Invalid Object datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test5.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    }, 1000000);

    test("Test ID: 6 - Invalid Decimal datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test6.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    }, 1000000);

    test("Test ID: 7 - Invalid String datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test7.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    }, 1000000);



    test("Test ID: 8 - Create multiple EPFs with valid fields concurrently", async () => {

        await restart()
        const jsonFilePath_1 = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test8_1.json"
        );
        const jsonData_1 = fs.readFileSync(jsonFilePath_1, "utf-8");
        let data_1 = JSON.parse(jsonData_1);

        const jsonFilePath_2 = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test8_2.json"
        );
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, "utf-8");
        let data_2 = JSON.parse(jsonData_2);

        
        const response = await Promise.all([
            lambda
                .invoke({
                    FunctionName: "createEPF-staging",
                    Payload: JSON.stringify(data_1),
                })
                .promise(),
            lambda
                .invoke({
                    FunctionName: "createEPF-staging",
                    Payload: JSON.stringify(data_2),
                })
                .promise(),
        ]);
   
        let result_EPF1 = JSON.parse(response[0].Payload);
        result_EPF1 = JSON.parse(result_EPF1["body"])
        result_EPF1 = JSON.parse(JSON.stringify(result_EPF1["result"], null, 2))

        let result_EPF2 = JSON.parse(response[1].Payload);
        result_EPF2 = JSON.parse(result_EPF2["body"])
        result_EPF2 = JSON.parse(JSON.stringify(result_EPF2["result"], null, 2))

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


    

    test("Test ID: 9 - Invalid Student ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test9.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Student ID");
    }, 1000000);

    test("Test ID: 10 - Invalid Contact Number", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test10.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Contact Number");
    }, 1000000);

    test("Test ID: 11 - Invalid Email Format", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test11.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid email format");
    }, 1000000);

    test("Test ID: 12 - Invalid Student ID in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test12.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Student ID");
    }, 1000000);

    test("Test ID: 13 - Invalid Value for Money", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test13.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid value for money");
    }, 1000000);

    test("Test ID: 14 - Invalid Value for Money in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test14.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid value for money");
    }, 1000000);

    test("Test ID: 15 - Invalid Value for Quantity in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test15.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid quantity value");
    }, 1000000);

    test("Test ID: 16 - Invalid Datetime format for Event Schedule", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test16.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Datetime Format");
    }, 1000000);

    test("Test ID: 17 - Invalid Date format in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test17.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Date Format");
    }, 1000000);

    test("Test ID: 18 - Invalid Time format in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test18.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Time Format");
    }, 1000000);

    test("Test ID: 19 - Invalid Status Type", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "createEPF_testjson",
            "createEPF_test19.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "createEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Status Type");
    }, 1000000);

    afterAll(async()=> {
        
    })
});
