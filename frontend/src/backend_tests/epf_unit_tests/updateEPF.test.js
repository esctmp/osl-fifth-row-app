const { experimentalStyled } = require("@material-ui/core");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "ap-southeast-1" });

const path = require("path");
const fs = require("fs");

describe("updateEPF", () => {

    beforeAll(async() => {
        //TruncateUsers Table
        //TruncateEPF Table

        //Create Test User
    })

    beforeEach(async() => {
        //TruncateEPF Table
        //CreateEPF to update
    })

    test("Test ID: 1 - Valid input: Update existing EPF with valid fields", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test1.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
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

    test("Test ID: 2 - Non-existent EXCO User ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test2.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Non-existent exco_user_id");
    });

    test("Test ID: 3 - Missing Event Name", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test3.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Event name missing");
    });

    test("Test ID: 4 - Invalid INT datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test4.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    });

    test("Test ID: 5 - Invalid Object datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test5.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    });

    test("Test ID: 6 - Invalid Decimal datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test6.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    });

    test("Test ID: 7 - Invalid String datatype", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test7.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    });

    test("Test ID: 8 - Update multiple EPFs with valid fields concurrently", async () => {
        const jsonFilePath_1 = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test8_1.json"
        );
        const jsonData_1 = fs.readFileSync(jsonFilePath_1, "utf-8");
        const data_1 = JSON.parse(jsonData_1);

        const jsonFilePath_2 = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test8_2.json"
        );
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, "utf-8");
        const data_2 = JSON.parse(jsonData_2);

        const response = await Promise.all([
            lambda
                .invoke({
                    FunctionName: "updateEPF-staging",
                    Payload: JSON.stringify(data_1),
                })
                .promise(),
            lambda
                .invoke({
                    FunctionName: "updateEPF-staging",
                    Payload: JSON.stringify(data_2),
                })
                .promise(),
        ]);

        let result_EPF1 = JSON.parse(response[0].Payload);
        result_EPF1 = result_EPF1["body"];

        let result_EPF2 = JSON.parse(response[1].Payload);
        result_EPF2 = result_EPF2["body"];

        if (result_EPF1["a_name"] == "user 1") {
            let matches_1 = true;
            for (let key in data_1) {
                if (String(data_1[key]) !== String(result_EPF1[key])) {
                    matches_1 = false;
                    break;
                }
            }

            expect(matches_1).toBeTruthy();

            let matches_2 = true;
            for (let key in data_2) {
                if (String(data_2[key]) !== String(result_EPF2[key])) {
                    matches_2 = false;
                    break;
                }
            }
            expect(matches_2).toBeTruthy();
        } else {
            let matches_1 = true;
            for (let key in data_1) {
                if (String(data_1[key]) !== String(result_EPF2[key])) {
                    matches_1 = false;
                    break;
                }
            }
            expect(matches_1).toBeTruthy();

            let matches_2 = true;
            for (let key in data_2) {
                if (String(data_2[key]) !== String(result_EPF1[key])) {
                    matches_2 = false;
                    break;
                }
            }
            expect(matches_2).toBeTruthy();
        }
    });

    test("Test ID: 9 - Invalid Student ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test9.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Student ID");
    });

    test("Test ID: 10 - Invalid Contact Number", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test10.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Contact Number");
    });

    test("Test ID: 11 - Invalid Email Format", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test11.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid email format");
    });

    test("Test ID: 12 - Invalid Student ID in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test12.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Student ID");
    });

    test("Test ID: 13 - Invalid Value for Money", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test13.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid value for money");
    });

    test("Test ID: 14 - Invalid Value for Money in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test14.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid value for money");
    });

    test("Test ID: 15 - Invalid Value for Quantity in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test15.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid quantity value");
    });

    test("Test ID: 16 - Invalid Datetime format for Event Schedule", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test16.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Datetime Format");
    });

    test("Test ID: 17 - Invalid Date format in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test17.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Date Format");
    });

    test("Test ID: 18 - Invalid Time format in List", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test18.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Time Format");
    });

    test("Test ID: 19 - Invalid Status Type", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test19.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid Status Type");
    });

    test("Test ID: 20 - Non-existent EPF ID", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test20.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Non-existent epf_id");
    });

    test("Test ID: 21 - Invalid EPF id data type", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test21.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Unexpected data type");
    });

    test.only("Test ID: 22 - D11 amount invalid value", async () => {
        const jsonFilePath = path.join(
            __dirname,
            "updateEPF_testjson",
            "updateEPF_test22.json"
        );
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const data = JSON.parse(jsonData);

        const response = await lambda
            .invoke({
                FunctionName: "updateEPF-staging",
                Payload: JSON.stringify(data),
            })
            .promise();

        let result = JSON.parse(response.Payload);
        result = result["errorMessage"];

        expect(result).toBe("Invalid value for amount");
    });



    afterAll(async() => {
        //Truncate Users Table
        //Truncate EPFs Table
    })
});
