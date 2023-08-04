const { experimentalStyled } = require('@material-ui/core');
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'ap-southeast-1' });

describe('Integration Test for Amplify Function', () => {

  test('Should create EPF', async () => {
    const testPayload = {
            "status": "Pending",
            "exco_user_id": "1239e242-3538-41f2-95dd-abc62e451310",
            "a_name": "user 1",
            "a_student_id": 1000001,
            "a_organisation": "organisation 1",
            "a_contact_number": 99998888,
            "a_email": "user_1@mymail.sutd.edu.sg",
            "a_comments_osl": "A Comment OSL",
            "a_comments_root": "A Comment ROOT",
            "b_event_name": "event 1",
            "b_target_audience": "target Audience 1",
            "b_event_schedule": "2023-06-21 16:49:00",
            "b_expected_turnout": 1,
            "b_event_objective": "event Objective 1",
            "b_comments_osl": "B Comment OSL",
            "b_comments_root": "B Comment ROOT",
            "c1_date": [
              "2023-06-21",
              "2023-06-22"
            ],
            "c1_time": [
              "16:49:00",
              "16:50:00"
            ],
            "c1_activity_and_description": [
              "activity 1 description 1",
              "activity 2 description 2"
            ],
            "c1_venue": [
              "venue 1",
              "venue 2"
            ],
            "c2_date": [
              "2023-06-21",
              "2023-06-22"
            ],
            "c2_time": [
              "16:49:00",
              "16:50:00"
            ],
            "c2_activity_and_description": [
              "activity 1 description 1",
              "activity 2 description 2"
            ],
            "c2_venue": [
              "venue 1",
              "venue 2"
            ],
            "c3_date": [
              "2023-06-21",
              "2023-06-22"
            ],
            "c3_time": [
              "16:49:00",
              "16:50:00"
            ],
            "c3_activity_and_description": [
              "activity 1 description1",
              "activity 2 description 2"
            ],
            "c3_venue": [
              "venue 1",
              "venue 2"
            ],
            "c3_cleanup_date": [
              "2023-06-21",
              "2023-06-22"
            ],
            "c3_cleanup_time": [
              "16:49:00",
              "16:50:00"
            ],
            "c3_cleanup_activity_and_description": [
              "activity 1 description 1",
              "activity 2 description 2"
            ],
            "c3_cleanup_venue": [
              "venue 1",
              "venue 2"
            ],
            "c_comments_osl": "C Comment OSL",
            "c_comments_root": "C Comment ROOT",
            "d1a_club_income_fund": 23.23,
            "d1a_osl_seed_fund": 23.23,
            "d1a_donation": 23.23,
            "d1b_revenue": 23.23,
            "d1b_donation_or_scholarship": 23.23,
            "d1b_total_source_of_funds": 23.23,
            "d11_items_goods_services": [
              "item 1",
              "item 2"
            ],
            "d11_price": [
              "price 1",
              "price 2"
            ],
            "d11_quantity": [
              "quantity 1",
              "quantity 2"
            ],
            "d11_amount": [
              "amount 1",
              "amount 2"
            ],
            "d11_total_revenue": 23.23,
            "d2_items": [
              "item 1",
              "item 2"
            ],
            "d2_reason_for_purchase": [
              "reason 1",
              "reason 2"
            ],
            "d2_venue": [
              "venue 1",
              "venue 2"
            ],
            "d2_total_expenditure": 23.23,
            "d_comments_osl": "D Comment OSL",
            "d_comments_root": "D Comment ROOT",
            "e_personal_data": 1,
            "e_comments_osl": "E Comment OSL",
            "e_comments_root": "E Comment ROOT",
            "f_name": [
              "name 1",
              "name 2"
            ],
            "f_student_id": [
              "student id 1",
              "student id 2"
            ],
            "f_position": [
              "position 1",
              "position 2"
            ],
            "f_comments_osl": "F Comment OSL",
            "f_comments_root": "F Comment ROOT",
            "g_1_1": "blank",
            "g_1_2": "blank",
            "g_1_3": "blank",
            "g_2_1": "blank",
            "g_2_2": "blank",
            "g_2_3": "blank",
            "g_3_1": "blank",
            "g_3_2": "blank",
            "g_3_3": "blank",
            "g_4_1": "blank",
            "g_4_2": "blank",
            "g_4_3": "blank",
            "g_5_1": "blank",
            "g_5_2": "blank",
            "g_5_3": "blank",
            "g_6_1": "blank",
            "g_6_2": "blank",
            "g_6_3": "blank",
            "g_7_1": "blank",
            "g_7_2": "blank",
            "g_7_3": "blank",
            "g_comments_osl": "G Comment OSL",
            "g_comments_root": "G Comment ROOT"
          
    };

    const result = await lambda.invoke({
      FunctionName: 'createEPF-staging', 
      Payload: JSON.stringify(testPayload),
    }).promise();

    expect(result.StatusCode).toBe(200);

    const responseBody = JSON.parse(result.Payload);
  });
  test('Should fetch EPF data for a valid epf_id', async () => {
    const testPayload = {
      "epf_id": 21 
    };

    const result = await lambda.invoke({
      FunctionName: 'getEPF-staging',
      Payload: JSON.stringify(testPayload),
    }).promise();
    
  
    console.log('Response:', result);
    console.log('Response Body:', result.body);
  
    if (!result.Payload) {
      throw new Error('Empty response body');
    }
  
    try {
      const responseBody = JSON.parse(result.Payload);
      console.log('Parsed Response Body:', responseBody);
      expect(result.StatusCode).toBe(200);
      expect(responseBody.body).toEqual(expect.any(Array)); 
      const epfId = responseBody.body[0].epf_id;
      expect(epfId).toBe(21); 
    } catch (error) {
      console.error('Error parsing response body:', error);
      throw error;
    }
    
  });
  test('Should delete EPF data for a valid epf_id', async () => {
    const testPayload = {
      "epf_id": 21 
    };

    const result = await lambda.invoke({
      FunctionName: 'deleteEPF-staging', 
      Payload: JSON.stringify(testPayload),
    }).promise();
    
    console.log('Delete Response:', result);
  
    if (!result.Payload) {
      throw new Error('Empty response body');
    }
  
    try {
      const responseBody = JSON.parse(result.Payload);
      console.log('Parsed Delete Response Body:', responseBody);
  
      // Perform your assertions to validate the response
      expect(result.StatusCode).toBe(200);
      
      const fetchPayload = {
        "epf_id": 21 
      };

      const fetchResult = await lambda.invoke({
        FunctionName: 'deleteEPF-staging', 
        Payload: JSON.stringify(fetchPayload),
      }).promise();

      expect(fetchResult.StatusCode).toBe(200);
    } catch (error) {
      console.error('Error parsing delete response body:', error);
      throw error;
    }
  });
  test('Should return user data for a valid user_id', async () => {
    const validUserId = '1239e242-3538-41f2-95dd-abc62e451310'; 

    const event = {
      queryStringParameters: {
        user_id: validUserId,
      },
    };

    const response = await lambda.invoke({
      FunctionName: 'GetUser-staging',
      Payload: JSON.stringify(event),
    }).promise();
    
    console.log(response)
    expect(response.StatusCode).toBe(200);
   

  
  });

  test('Should return 200 status code when user_id is missing', async () => {
    const event = {
      queryStringParameters: {},
    };

    const response = await lambda.invoke({
      FunctionName: 'GetUser-staging', 
      Payload: JSON.stringify(event),
    }).promise();
    expect(response.StatusCode).toBe(200);

  });
  
  test('Should return users', async () => {
    const event = {
      queryStringParameters: {},
    };

    const response = await lambda.invoke({
      FunctionName: 'GetUsers-staging', 
      Payload: JSON.stringify(event),
    }).promise();
    expect(response.StatusCode).toBe(200);

  });


});
