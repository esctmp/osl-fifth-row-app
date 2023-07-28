const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

exports.handler = async (event) => {

    const client = await pool.connect();
    
    try {
    console.log("connected to db")
    await client.query('BEGIN');

    const insertQuery = `INSERT INTO epfs(
      status, exco_user_id, a_name, a_student_id, a_organisation, a_contact_number, a_email, 
      b_event_name, b_target_audience, b_event_schedule, b_expected_turnout, b_event_objective, 
      c1_date, c1_time, c1_activity_and_description, c1_venue,
      c2_date, c2_time, c2_activity_and_description, c2_venue,
      c3_date, c3_time, c3_activity_and_description, c3_venue,
      c3_cleanup_date, c3_cleanup_time, c3_cleanup_activity_and_description, c3_cleanup_venue,
      d1a_club_income_fund, d1a_osl_seed_fund, d1a_donation, 
      d1b_revenue, d1b_donation_or_scholarship, d1b_total_source_of_funds, 
      d11_items_goods_services, d11_price, d11_quantity, d11_amount, d11_total_revenue,
      d2_items, d2_reason_for_purchase, d2_venue, d2_total_expenditure, 
      e_personal_data,
      f_name, f_student_id, f_position,
      g_1_1, g_1_2, g_1_3,
      g_2_1, g_2_2, g_2_3,
      g_3_1, g_3_2, g_3_3,
      g_4_1, g_4_2, g_4_3,
      g_5_1, g_5_2, g_5_3,
      g_6_1, g_6_2, g_6_3,
      g_7_1, g_7_2, g_7_3
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, 
      $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, 
      $64, $65, $66, $67, $68)`;

    const values = [
      event.status, event.exco_user_id, 
      event.a.a_name, event.a.a_student_id, event.a.a_organisation, event.a.a_contact_number, event.a.a_email, 
      event.b.b_event_name, event.b.b_target_audience, event.b.b_event_schedule, event.b.b_expected_turnout, event.b.b_event_objective, 
      event.c.c1.c1_date, event.c.c1.c1_time, event.c.c1.c1_activity_and_description, event.c.c1.c1_venue,
      event.c.c2.c2_date, event.c.c2.c2_time, event.c.c2.c2_activity_and_description, event.c.c2.c2_venue,
      event.c.c3.c3_date, event.c.c3.c3_time, event.c.c3.c3_activity_and_description, event.c.c3.c3_venue,
      event.c.c3_cleanup.c3_cleanup_date, event.c.c3_cleanup.c3_cleanup_time, event.c.c3_cleanup.c3_cleanup_activity_and_description, event.c.c3_cleanup.c3_cleanup_venue,
      event.d.d1a.d1a_club_income_fund, event.d.d1a.d1a_osl_seed_fund, event.d.d1a.d1a_donation, 
      event.d.d1b.d1b_revenue, event.d.d1b.d1b_donation_or_scholarship, event.d.d1b.d1b_total_source_of_funds, 
      event.d.d11.d11_items_goods_services, event.d.d11.d11_price, event.d.d11.d11_quantity, event.d.d11.d11_amount, event.d.d11.d11_total_revenue,
      event.d.d2.d2_items, event.d.d2.d2_reason_for_purchase, event.d.d2.d2_venue, event.d.d2.d2_total_expenditure, 
      event.e.e_personal_data,
      event.f.f_name, event.f.f_student_id, event.f.f_position,
      event.g.g_1_1, event.g.g_1_2, event.g.g_1_3,
      event.g.g_2_1, event.g.g_2_2, event.g.g_2_3,
      event.g.g_3_1, event.g.g_3_2, event.g.g_3_3,
      event.g.g_4_1, event.g.g_4_2, event.g.g_4_3,
      event.g.g_5_1, event.g.g_5_2, event.g.g_5_3,
      event.g.g_6_1, event.g.g_6_2, event.g.g_6_3,
      event.g.g_7_1, event.g.g_7_2, event.g.g_7_3
    ];

    await client.query(insertQuery, values);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
