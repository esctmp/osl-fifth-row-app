const { Pool } = require("pg");
const AWS = require("aws-sdk");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// START FORMATTING //
const epf_db_datatypes_create = {
    status: "string",
    exco_user_id: "string",
    a_name: "string",
    a_student_id: "number",
    a_organisation: "string",
    a_contact_number: "number",
    a_email: "string",
    a_comments_osl: "string",
    a_comments_root: "string",
    b_event_name: "string",
    b_target_audience: "string",
    b_event_schedule: "string",
    b_expected_turnout: "number",
    b_event_objective: "string",
    b_comments_osl: "string",
    b_comments_root: "string",
    c1_date: "object",
    c1_time: "object",
    c1_activity_and_description: "object",
    c1_venue: "object",
    c2_date: "object",
    c2_time: "object",
    c2_activity_and_description: "object",
    c2_venue: "object",
    c3_date: "object",
    c3_time: "object",
    c3_activity_and_description: "object",
    c3_venue: "object",
    c3_cleanup_date: "object",
    c3_cleanup_time: "object",
    c3_cleanup_activity_and_description: "object",
    c3_cleanup_venue: "object",
    c_comments_osl: "string",
    c_comments_root: "string",
    d1a_club_income_fund: "number",
    d1a_osl_seed_fund: "number",
    d1a_donation: "number",
    d1b_revenue: "number",
    d1b_donation_or_scholarship: "number",
    d1b_total_source_of_funds: "number",
    d11_items_goods_services: "object",
    d11_price: "object",
    d11_quantity: "object",
    d11_amount: "object",
    d11_total_revenue: "number",
    d2_items: "object",
    d2_reason_for_purchase: "object",
    d2_venue: "object",
    d2_total_expenditure: "number",
    d_comments_osl: "string",
    d_comments_root: "string",
    e_personal_data: "number",
    e_comments_osl: "string",
    e_comments_root: "string",
    f_name: "object",
    f_student_id: "object",
    f_position: "object",
    f_comments_osl: "string",
    f_comments_root: "string",
    g_1_1: "string",
    g_1_2: "string",
    g_1_3: "string",
    g_2_1: "string",
    g_2_2: "string",
    g_2_3: "string",
    g_3_1: "string",
    g_3_2: "string",
    g_3_3: "string",
    g_4_1: "string",
    g_4_2: "string",
    g_4_3: "string",
    g_5_1: "string",
    g_5_2: "string",
    g_5_3: "string",
    g_6_1: "string",
    g_6_2: "string",
    g_6_3: "string",
    g_7_1: "string",
    g_7_2: "string",
    g_7_3: "string",
    g_comments_osl: "string",
    g_comments_root: "string",
};

// async function sendEmailToOSF() {
//     try {
//         AWS.config.update({ region: "ap-southeast-1" }); // Replace "us-east-1" with your preferred AWS region
//         const ses = new AWS.SES({ apiVersion: "2010-12-01" });
//         const mailParams = {
//             Destination: {
//                 ToAddresses: ["oslfifthrow@gmail.com"], // Replace with the OSF's email address
//             },
//             Message: {
//                 Body: {
//                     Text: {
//                         Data: "A new EPF has been created.", // Email body (plain text)
//                     },
//                 },
//                 Subject: {
//                     Data: "New EPF Created", // Email subject
//                 },
//             },
//             Source: "oslfifthrow@gmail.com", // Replace with your verified sender email address
//         };

//         await ses.sendEmail(mailParams).promise();
//         console.log("Email notification sent to OSF successfully");
//     } catch (err) {
//         console.error("Error sending email to OSF:", err);
//     }
// }

// // Function to send an email to the user
// async function sendEmailToUser(userEmail) {
//     try {
//         AWS.config.update({ region: "ap-southeast-1" }); // Replace "us-east-1" with your preferred AWS region
//         const ses = new AWS.SES({ apiVersion: "2010-12-01" });
//         const mailParams = {
//             Destination: {
//                 ToAddresses: [userEmail], // Replace with the user's email address
//             },
//             Message: {
//                 Body: {
//                     Text: {
//                         Data: "Your EPF has been submitted.", // Email body (plain text)
//                     },
//                 },
//                 Subject: {
//                     Data: "EPF Submission Confirmation", // Email subject
//                 },
//             },
//             Source: "oslfifthrow@gmail.com", // Replace with your verified sender email address
//         };

//         await ses.sendEmail(mailParams).promise();
//         console.log("Email notification sent to user successfully");
//     } catch (err) {
//         console.error("Error sending email to user:", err);
//     }
// }

exports.handler = async (event) => {
    const columns = [
        { name: "status", value: event.status },
        { name: "exco_user_id", value: event.exco_user_id },
        { name: "a_name", value: event.a_name },
        { name: "a_student_id", value: event.a_student_id },
        { name: "a_organisation", value: event.a_organisation },
        { name: "a_contact_number", value: event.a_contact_number },
        { name: "a_email", value: event.a_email },
        { name: "a_comments_osl", value: event.a_comments_osl },
        { name: "a_comments_root", value: event.a_comments_root },
        { name: "b_event_name", value: event.b_event_name },
        { name: "b_target_audience", value: event.b_target_audience },
        { name: "b_event_schedule", value: event.b_event_schedule },
        { name: "b_expected_turnout", value: event.b_expected_turnout },
        { name: "b_event_objective", value: event.b_event_objective },
        { name: "b_comments_osl", value: event.b_comments_osl },
        { name: "b_comments_root", value: event.b_comments_root },
        { name: "c1_date", value: event.c1_date },
        { name: "c1_time", value: event.c1_time },
        { name: "c1_activity_and_description", value: event.c1_activity_and_description },
        { name: "c1_venue", value: event.c1_venue },
        { name: "c2_date", value: event.c2_date },
        { name: "c2_time", value: event.c2_time },
        { name: "c2_activity_and_description", value: event.c2_activity_and_description },
        { name: "c2_venue", value: event.c2_venue },
        { name: "c3_date", value: event.c3_date },
        { name: "c3_time", value: event.c3_time },
        { name: "c3_activity_and_description", value: event.c3_activity_and_description },
        { name: "c3_venue", value: event.c3_venue },
        { name: "c3_cleanup_date", value: event.c3_cleanup_date },
        { name: "c3_cleanup_time", value: event.c3_cleanup_time },
        { name: "c3_cleanup_activity_and_description", value: event.c3_cleanup_activity_and_description },
        { name: "c3_cleanup_venue", value: event.c3_cleanup_venue },
        { name: "c_comments_osl", value: event.c_comments_osl },
        { name: "c_comments_root", value: event.c_comments_root },
        { name: "d1a_club_income_fund", value: event.d1a_club_income_fund },
        { name: "d1a_osl_seed_fund", value: event.d1a_osl_seed_fund },
        { name: "d1a_donation", value: event.d1a_donation },
        { name: "d1b_revenue", value: event.d1b_revenue },
        { name: "d1b_donation_or_scholarship", value: event.d1b_donation_or_scholarship },
        { name: "d1b_total_source_of_funds", value: event.d1b_total_source_of_funds },
        { name: "d11_items_goods_services", value: event.d11_items_goods_services },
        { name: "d11_price", value: event.d11_price },
        { name: "d11_quantity", value: event.d11_quantity },
        { name: "d11_amount", value: event.d11_amount },
        { name: "d11_total_revenue", value: event.d11_total_revenue },
        { name: "d2_items", value: event.d2_items },
        { name: "d2_reason_for_purchase", value: event.d2_reason_for_purchase },
        { name: "d2_venue", value: event.d2_venue },
        { name: "d2_total_expenditure", value: event.d2_total_expenditure },
        { name: "d_comments_osl", value: event.d_comments_osl },
        { name: "d_comments_root", value: event.d_comments_root },
        { name: "e_personal_data", value: event.e_personal_data },
        { name: "e_comments_osl", value: event.e_comments_osl },
        { name: "e_comments_root", value: event.e_comments_root },
        { name: "f_name", value: event.f_name },
        { name: "f_student_id", value: event.f_student_id },
        { name: "f_position", value: event.f_position },
        { name: "f_comments_osl", value: event.f_comments_osl },
        { name: "f_comments_root", value: event.f_comments_root },
        { name: "g_1_1", value: event.g_1_1 },
        { name: "g_1_2", value: event.g_1_2 },
        { name: "g_1_3", value: event.g_1_3 },
        { name: "g_2_1", value: event.g_2_1 },
        { name: "g_2_2", value: event.g_2_2 },
        { name: "g_2_3", value: event.g_2_3 },
        { name: "g_3_1", value: event.g_3_1 },
        { name: "g_3_2", value: event.g_3_2 },
        { name: "g_3_3", value: event.g_3_3 },
        { name: "g_4_1", value: event.g_4_1 },
        { name: "g_4_2", value: event.g_4_2 },
        { name: "g_4_3", value: event.g_4_3 },
        { name: "g_5_1", value: event.g_5_1 },
        { name: "g_5_2", value: event.g_5_2 },
        { name: "g_5_3", value: event.g_5_3 },
        { name: "g_6_1", value: event.g_6_1 },
        { name: "g_6_2", value: event.g_6_2 },
        { name: "g_6_3", value: event.g_6_3 },
        { name: "g_7_1", value: event.g_7_1 },
        { name: "g_7_2", value: event.g_7_2 },
        { name: "g_7_3", value: event.g_7_3 },
        { name: "g_comments_osl", value: event.g_comments_osl },
        { name: "g_comments_root", value: event.g_comments_root },
      ];
    
    
    const status_types = ["Draft", "Pending Approval", "Approved", "Rejected"];
    const definedColumns = columns.filter((column) => column.value !== undefined);
    const columnNames = definedColumns.map((column) => column.name).join(",");
    const columnParams = definedColumns.map((_, i) => `$${i + 1}`).join(",");
    const defined_values = definedColumns.map((column) => column.value);
    const datatypes = Object.values(epf_db_datatypes_create);

    const exco_user_id = event.exco_user_id
    
    // BEGIN VERIFICATION //
    // Check for datatypes
    //console.log("Checking datatypes");
    for (let i = 0; i < columns.length; i++) {
        const { name, value } = columns[i];
        const expectedType = datatypes[i];
        if (value !== undefined && typeof value !== expectedType) {
          throw new Error("Unexpected data type");
        }
    }

    // Check for valid status
    //console.log("Checking status");
    if (!status_types.includes(event.status)) {
        throw new Error("Invalid Status Type");
    }

    // Check for valid exco_user_id
    //console.log("Checking exco user id");
    const valid_exco_user_id = await pool.query(
        `SELECT COUNT(*) FROM users WHERE user_id=$1`,
        [event.exco_user_id]
    );
    if (valid_exco_user_id.rows[0]["count"] == 0) {
        throw new Error("Non-existent exco user id");
    }

    // Check for event name
    //console.log("Checking event name");
    if (event.b_event_name.trim().length == 0) {
        throw new Error("Event name missing");
    }

    // Check for valid student id
    //console.log("Checking student id");
    const student_id_regex = /^1\d{6}$/;
    if (
        !student_id_regex.test(event.a_student_id) &&
        event.a_student_id !== undefined
    ) {
        throw new Error("Invalid Student ID");
    }

    event.f_student_id.forEach((student_id) => {
        if (
            !student_id_regex.test(parseInt(student_id)) &&
            student_id !== ""
        ) {
            throw new Error("Invalid Student ID");
        }
    });

    // Check for valid contact number
    //console.log("Checking contact number");
    const contact_number_regex = /^[689]\d{7}$/;
    if (
        !contact_number_regex.test(event.a_contact_number) &&
        event.a_contact_number !== undefined
    ) {
        throw new Error("Invalid Contact Number");
    }

    // Check for valid email format
    //console.log("Checking email format");
    if (event.a_email !== undefined) {
        const [username, domain] = event.a_email.split("@");
        const isValidUsername = /^[^\s@]+$/;
        const isValidDomain = /^[^\s@]+\.[^\s@]+$/;
        if (
            !event.a_email.includes("@") ||
            !isValidUsername.test(username) ||
            !isValidDomain.test(domain)
        ) {
            throw new Error("Invalid email format");
        }
    }

    // Check for money or funding sections
    //console.log("Checking money or funding sections");
    if (
        (event.d1a_club_income_fund < 0 &&
            event.d1a_club_income_fund !== undefined) ||
        (event.d1a_osl_seed_fund < 0 &&
            event.d1a_osl_seed_fund !== undefined) ||
        (event.d1a_donation < 0 && event.d1a_donation !== undefined) ||
        (event.d1b_revenue < 0 && event.d1b_revenue !== undefined) ||
        (event.d1b_donation_or_scholarship < 0 &&
            event.d1b_donation_or_scholarship !== undefined) ||
        (event.d1b_total_source_of_funds < 0 &&
            event.d1b_total_source_of_funds !== undefined) ||
        (event.d11_total_revenue < 0 &&
            event.d11_total_revenue !== undefined) ||
        (event.d2_total_expenditure < 0 &&
            event.d2_total_expenditure !== undefined)
    ) {
        throw new Error("Invalid value for money");
    }
    event.d11_price.forEach((price) => {
        if (price !== "") {
            if (price < 0) {
                throw new Error("Invalid value for money");
            }
        }
    });
    event.d11_amount.forEach((price) => {
        if (price !== "") {
            if (price < 0) {
                throw new Error("Invalid value for money");
            }
        }
    });
    //Validation for Quantity
    //console.log("Checking quantity");
    event.d11_quantity.forEach((price) => {
        if (price !== "") {
            if (price < 0) {
                throw new Error("Invalid quantity value");
            }
        }
    });

    // Check for valid datetime format
    //console.log("Checking datetime format");
    const datetime_regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (event.b_event_schedule !== undefined) {
        if (!datetime_regex.test(event.b_event_schedule)) {
            throw new Error("Invalid Datetime Format");
        }
    }

    // Check for date format
    //console.log("Checking date format");
    const date_regex = /^\d{4}-\d{2}-\d{2}$/;
    event.c1_date.forEach((date) => {
        if (date !== "") {
            if (!date_regex.test(date)) {
                throw new Error("Invalid Date Format");
            }
        }
    });
    event.c2_date.forEach((date) => {
        if (date !== "") {
            if (!date_regex.test(date)) {
                throw new Error("Invalid Date Format");
            }
        }
    });
    event.c3_date.forEach((date) => {
        if (date !== "") {
            if (!date_regex.test(date)) {
                throw new Error("Invalid Date Format");
            }
        }
    });
    event.c3_cleanup_date.forEach((date) => {
        if (date !== "") {
            if (!date_regex.test(date)) {
                throw new Error("Invalid Date Format");
            }
        }
    });
    // Check for valid time format
    const time_regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    event.c1_time.forEach((time) => {
        if (time !== "") {
            if (!time_regex.test(time)) {
                throw new Error("Invalid Time Format");
            }
        }
    });

    event.c2_time.forEach((time) => {
        if (time !== "") {
            if (!time_regex.test(time)) {
                throw new Error("Invalid Time Format");
            }
        }
    });
    event.c3_time.forEach((time) => {
        if (time !== "") {
            if (!time_regex.test(time)) {
                throw new Error("Invalid Time Format");
            }
        }
    });

    event.c3_cleanup_time.forEach((time) => {
        if (time !== "") {
            if (!time_regex.test(time)) {
                throw new Error("Invalid Time Format");
            }
        }
    });

    // END VERIFICATION OF EVENT//

    let client;
    let result = null;
    let epf_count = null;
    let retryCount = 5;
    const RETRY_DELAY_MS = 200;

    try {
        client = await pool.connect();
        //console.log("connected to db");
        await client.query("BEGIN");
        while (retryCount > 0) {
            try {
                await client.query("BEGIN");
                await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

                // Check for valid exco_user_id
                const valid_exco_user_id = await client.query(
                    `SELECT COUNT(*) FROM users WHERE user_id=$1`,
                    [exco_user_id]
                );
                if (valid_exco_user_id.rows[0]["count"] == 0) {
                    throw new Error("Non-existent exco user id");
                }

                const query = `INSERT INTO EPFS(${columnNames}) VALUES (${columnParams}) RETURNING *`;
                result = await client.query(query, defined_values);

                // UPDATE OUTSTANDING EPF COUNT //
                try {
                    //console.log("Updating outstanding EPF count");
                    const exco_user_ids = await client.query(
                        `SELECT user_id FROM users WHERE user_type=$1`,
                        ["FRE"]
                    );
                    for (let i in exco_user_ids["rows"]) {
                        let result = await client.query(
                            `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND exco_user_id=$2 AND is_deleted = false`,
                            ["Approved", exco_user_ids["rows"][i]["user_id"]]
                        );

                        await client.query(
                            `UPDATE users SET outstanding_epf=$1 WHERE user_id=$2`,
                            [
                                result["rows"][0]["count"],
                                exco_user_ids["rows"][i]["user_id"],
                            ]
                        );
                    }
                    //console.log("Updated outstanding EPF count for FREs");

                    const result = await client.query(
                        `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND is_deleted = false`,
                        ["Approved"]
                    );

                    // update osl and root outstanding EPFs
                    await client.query(
                        `UPDATE users SET outstanding_epf = $1 WHERE user_type != $2`,
                        [result["rows"][0]["count"], "FRE"]
                    );
                    //console.log("Updated outstanding EPF count for OSL and ROOT");
                    // sendEmailToOSF();
                    // console.log("sendEmailtoOSF")

                    // // Send email to the user
                    // const userEmail = event.a_email;
                    // sendEmailToUser(userEmail);
                    // console.log("sendEmailToUser")
                } catch (e) {
                    // ERROR HANDLING FOR UPDATE OUTSTANDING EPF COUNT
                    await client.query("ROLLBACK");
                    throw e;
                }
                // END UPDATE OUTSTANDING EPF COUNT //
                
            await client.query("COMMIT");
            return { 
                headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        },
                statusCode: 200,
                result: result["rows"][0], 
                epf_count: epf_count };

            } catch (err) {
                if (err.message === "Non-existent exco user id") {
                    await client.query("COMMIT");
                    throw err;
                } else {
                    if (client) {
                    await client.query("ROLLBACK");
                    if (
                        err.code === "40001" ||
                        err.message.includes("deadlock detected")
                    ) {
                        // 40001 is the error code for serialization failure
                        retryCount -= 1;
                        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
                    } else {
                        throw err;
                    }
                    } else new Error("couldnt acquire client");
                }
            } finally {
                if (client) {
                    client.release();
                    }
                }
                if (retryCount <= 0) {
                    throw new Error(
                    "Transaction failed due to serialization error or deadlock after 5 retries"
                    );
            } 
        } 
    } catch(error) {
        throw error
    }
}