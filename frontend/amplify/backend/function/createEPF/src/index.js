const { Pool } = require("pg");
const AWS = require('aws-sdk');

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

const metadata = "status,exco_user_id,";
const sectionA =
    "a_name,a_student_id,a_organisation,a_contact_number,a_email,a_comments_osl,a_comments_root,";
const sectionB =
    "b_event_name,b_target_audience,b_event_schedule,b_expected_turnout,b_event_objective,b_comments_osl,b_comments_root,";
const sectionC1 = "c1_date,c1_time,c1_activity_and_description,c1_venue,";
const sectionC2 = "c2_date,c2_time,c2_activity_and_description,c2_venue,";
const sectionC3 = "c3_date,c3_time,c3_activity_and_description,c3_venue,";
const sectionC3Cleanup =
    "c3_cleanup_date,c3_cleanup_time,c3_cleanup_activity_and_description,c3_cleanup_venue,c_comments_osl,c_comments_root,";
const sectionD1 =
    "d1a_club_income_fund,d1a_osl_seed_fund,d1a_donation,d1b_revenue,d1b_donation_or_scholarship,d1b_total_source_of_funds,";
const sectionD11 =
    "d11_items_goods_services,d11_price,d11_quantity,d11_amount,d11_total_revenue,";
const sectionD2 =
    "d2_items,d2_reason_for_purchase,d2_venue,d2_total_expenditure,d_comments_osl,d_comments_root,";
const sectionE = "e_personal_data,e_comments_osl,e_comments_root,";
const sectionF =
    "f_name,f_student_id,f_position,f_comments_osl,f_comments_root,";
const sectionG1 = "g_1_1,g_1_2,g_1_3,";
const sectionG2 = "g_2_1,g_2_2,g_2_3,";
const sectionG3 = "g_3_1,g_3_2,g_3_3,";
const sectionG4 = "g_4_1,g_4_2,g_4_3,";
const sectionG5 = "g_5_1,g_5_2,g_5_3,";
const sectionG6 = "g_6_1,g_6_2,g_6_3,";
const sectionG7 = "g_7_1,g_7_2,g_7_3,g_comments_osl,g_comments_root";

const column_names = metadata.concat(
    sectionA,
    sectionB,
    sectionC1,
    sectionC2,
    sectionC3,
    sectionC3Cleanup,
    sectionD1,
    sectionD11,
    sectionD2,
    sectionE,
    sectionF,
    sectionG1,
    sectionG2,
    sectionG3,
    sectionG4,
    sectionG5,
    sectionG6,
    sectionG7
);

const columnParams = new Array(82)
    .fill()
    .map((_, i) => `$${i + 1}`)
    .join(",");

// // END FORMATTING //
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
    const client = await pool.connect();

    try {
        console.log("connected to db");
        await client.query("BEGIN");

        // Extract values from event object //
        const values = [
            event.status,
            event.exco_user_id,
            event.a_name,
            event.a_student_id,
            event.a_organisation,
            event.a_contact_number,
            event.a_email,
            event.a_comments_osl,
            event.a_comments_root,
            event.b_event_name,
            event.b_target_audience,
            event.b_event_schedule,
            event.b_expected_turnout,
            event.b_event_objective,
            event.b_comments_osl,
            event.b_comments_root,
            event.c1_date,
            event.c1_time,
            event.c1_activity_and_description,
            event.c1_venue,
            event.c2_date,
            event.c2_time,
            event.c2_activity_and_description,
            event.c2_venue,
            event.c3_date,
            event.c3_time,
            event.c3_activity_and_description,
            event.c3_venue,
            event.c3_cleanup_date,
            event.c3_cleanup_time,
            event.c3_cleanup_activity_and_description,
            event.c3_cleanup_venue,
            event.c_comments_osl,
            event.c_comments_root,
            event.d1a_club_income_fund,
            event.d1a_osl_seed_fund,
            event.d1a_donation,
            event.d1b_revenue,
            event.d1b_donation_or_scholarship,
            event.d1b_total_source_of_funds,
            event.d11_items_goods_services,
            event.d11_price,
            event.d11_quantity,
            event.d11_amount,
            event.d11_total_revenue,
            event.d2_items,
            event.d2_reason_for_purchase,
            event.d2_venue,
            event.d2_total_expenditure,
            event.d_comments_osl,
            event.d_comments_root,
            event.e_personal_data,
            event.e_comments_osl,
            event.e_comments_root,
            event.f_name,
            event.f_student_id,
            event.f_position,
            event.f_comments_osl,
            event.f_comments_root,
            event.g_1_1,
            event.g_1_2,
            event.g_1_3,
            event.g_2_1,
            event.g_2_2,
            event.g_2_3,
            event.g_3_1,
            event.g_3_2,
            event.g_3_3,
            event.g_4_1,
            event.g_4_2,
            event.g_4_3,
            event.g_5_1,
            event.g_5_2,
            event.g_5_3,
            event.g_6_1,
            event.g_6_2,
            event.g_6_3,
            event.g_7_1,
            event.g_7_2,
            event.g_7_3,
            event.g_comments_osl,
            event.g_comments_root,
        ];

        // BEGIN VERIFICATION OF EVENT//
        // Check for datatypes
        const datatypes = Object.values(epf_db_datatypes_create);

        for (let i = 0; i < values.length; i++) {
            if (typeof values[i] !== datatypes[i]) {
                console.log(
                    "Error at index " +
                        i +
                        " for value, datatype: " +
                        values[i] +
                        " " +
                        datatypes[i]
                );
                throw new Error("Unexpected data type");
            }
        }

        // Check for valid exco_user_id
        const valid_exco_user_id = await pool.query(
            `SELECT COUNT(*) FROM users WHERE user_id=$1`,
            [event.exco_user_id]
        );
        if (valid_exco_user_id.rows[0]["count"] == 0) {
            throw new Error("Non-existent exco user id");
        }

        // Check for event name
        if (event.b_event_name.trim().length == 0) {
            throw new Error("Event name missing");
        }
        // END VERIFICATION OF EVENT//

        // BEGIN CREATE EPF QUERY //
        const query = `INSERT INTO EPFS(${column_names}) VALUES (${columnParams}) RETURNING *`;
        const results = await pool.query(query, values);
        await client.query("COMMIT");
        console.log("Committed to db, new EPF created");
        // END CREATE EPF QUERY //

        // UPDATE OUTSTANDING EPF COUNT //
        try {
            console.log("Updating outstanding EPF count");
            await client.query("BEGIN");
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
            console.log("Updated outstanding EPF count for FREs");

            const result = await client.query(
                `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND is_deleted = false`,
                ["Approved"]
            );

            // update osl and root outstanding EPFs
            await client.query(
                `UPDATE users SET outstanding_epf = $1 WHERE user_type != $2`,
                [result["rows"][0]["count"], "FRE"]
            );
            console.log("Updated outstanding EPF count for OSL and ROOT");
            await client.query("COMMIT");
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

        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            statusCode: 200,
            body: results.rows[0],
        };
    } catch (e) {
        // ERROR HANDLING FOR CREATE EPF QUERY
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
};
