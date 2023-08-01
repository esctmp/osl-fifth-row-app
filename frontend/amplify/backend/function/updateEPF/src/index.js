const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

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
    
    var epf_db_datatypes_update = { ...epf_db_datatypes_create };
    epf_db_datatypes_update = { epf_id: "number", ...epf_db_datatypes_create };
    
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const client = await pool.connect();

    try{
        console.log("connected to db")
        const columnNames =
            "status,exco_user_id,a_name,a_student_id,a_organisation,a_contact_number,a_email,a_comments_osl,a_comments_root,b_event_name,b_target_audience,b_event_schedule,b_expected_turnout,b_event_objective,b_comments_osl,b_comments_root,c1_date,c1_time,c1_activity_and_description,c1_venue,c2_date,c2_time,c2_activity_and_description,c2_venue,c3_date,c3_time,c3_activity_and_description,c3_venue,c3_cleanup_date,c3_cleanup_time,c3_cleanup_activity_and_description,c3_cleanup_venue,c_comments_osl,c_comments_root,d1a_club_income_fund,d1a_osl_seed_fund,d1a_donation,d1b_revenue,d1b_donation_or_scholarship,d1b_total_source_of_funds,d11_items_goods_services,d11_price,d11_quantity,d11_amount,d11_total_revenue,d2_items,d2_reason_for_purchase,d2_venue,d2_total_expenditure,d_comments_osl,d_comments_root,e_personal_data,e_comments_osl,e_comments_root,f_name,f_student_id,f_position,f_comments_osl,f_comments_root,g_1_1,g_1_2,g_1_3,g_2_1,g_2_2,g_2_3,g_3_1,g_3_2,g_3_3,g_4_1,g_4_2,g_4_3,g_5_1,g_5_2,g_5_3,g_6_1,g_6_2,g_6_3,g_7_1,g_7_2,g_7_3,g_comments_osl,g_comments_root";

        const columnParams = columnNames
            .split(",")
            .map((_, i) => `$${i + 2}`)
            .join(",");

        const values = [
            event.epf_id, 
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
            event.g_comments_root
        ];


        const epf_id = event.epf_id;
        const exco_user_id = event.exco_user_id;

        await client.query("BEGIN");
        //Check for datatypes
        const datatypes = Object.values(epf_db_datatypes_update);

        //console.log("checking datatypes")
        for (let i = 0; i < values.length; i++) {
            if (typeof values[i] !== datatypes[i]) {
                console.log("Error in " + values[i] + " at index " + i)
                console.log("Compared between " + values[i] + " and " + datatypes[i])
                throw new Error("Unexpected data type");
                }
            }
        //console.log("datatypes verified")
        //Check for valid epf_id

        //console.log("checking valid epf_id in epfs table")
        const valid_epf_id = await pool.query(
            `SELECT COUNT(*) FROM EPFS WHERE epf_id=$1 AND is_deleted = false `,
            [epf_id]
        );
        
        if (valid_epf_id.rows[0]["count"] == 0) {
            throw new Error("Non-existent epf");    
        }
        
        //console.log("valid epf_id in epfs table")

        //Check for valid exco_user_id
        //console.log("checking valid exco_user_id in users table")
        const valid_exco_user_id = await pool.query(
            `SELECT COUNT(*) FROM users WHERE user_id=$1`,
            [exco_user_id]
        );

        if (valid_exco_user_id.rows[0]["count"] == 0) {
            throw new Error("Non-existent exco user id");
        }

        //console.log("valid exco_user_id in users table")
        //Check for event name
        //console.log("checking event 'B_event_name' name")
        if (event.b_event_name.trim().length == 0) {
            throw new Error("Event name missing");
        }
        //console.log("event name 'B_event_name' verified")

        //console.log("Begin updating epfs")
        const query = `UPDATE EPFS SET (${columnNames}) = (${columnParams}) WHERE epf_id=$1 AND is_deleted = false RETURNING *`;

        let result = await pool.query(query, values); // Return everything
        await client.query("COMMIT");
        //console.log("Query Succeeded")
        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },

            statusCode: 200,
            body: result.rows[0] // Returns updated EPF Data in body
        };

        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }
};
