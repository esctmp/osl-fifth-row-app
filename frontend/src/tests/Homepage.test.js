import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Homepage from "../pages/FifthRow/Homepage.js";
import { UserID } from "../routes/UserID.js";

const userPool = 
[
{
    "user_id": "1",
    "name": "EXCO User 1",
    "email": "excouser1@club.sutd.edu.sg",
    "type": "FRE",
    "outstanding EPF": 3,
},
{
    "user_id": "2",
    "name": "EXCO User 2",
    "email": "excouser2@club.sutd.edu.sg",
    "type": "FRE",
    "outstanding EPF": 4,
},
]


describe('Homepage', () => {
    // test for homepage rendering
    // test('Render - Landing Page', () => {
    //     const [userId,setUserId] = [null, null];
    //     render(
    //         <UserID.Provider value ={{userId,setUserId}}>
    //         <Homepage />
    //         </UserID.Provider>
    //         )
    //     const field = screen.getByText("WELCOME");
    //     const field2 = screen.getByText("You have _ outstanding forms to review.");
    //     expect(field).toBeInTheDocument();
    //     expect(field2).toBeInTheDocument();

    // });

    test('Display outstanding EPF', () => {
        // const [userId,setUserId] = [null,null];
        // const[EPFcount, setEPFcount] = [null, null];
        render(
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )
        // setUserId("1");
        // const user = userPool.find(user => user['user_id'] === userId);
        // setEPFcount(user['outstanding EPF']);
        // const field = screen.getByText("You have 3 outstanding forms to review.");
        // expect(EPFcount).toBe(3);
        // expect(field).toBeInTheDocument();
        // render(<Homepage />);
        // setUserId = "1";
        const user = userPool.find(user => user['user_id'] === "1");
        expect(user['outstanding EPF']).toBe(3);
        // const field = screen.getByTestId("homepage - 1");
        // expect(field).toBeInTheDocument();
        // const placeholderPattern = new RegExp(`You have ${user['outstanding EPF']} outstanding forms to review.`);
        // const field = screen.getByText(`You have ${user['outstanding EPF']} outstanding forms to review.`);
        // expect(field).toBeInTheDocument();
        // expect(field).toHaveTextContent(
        //     `You have ${user['outstanding EPF']} outstanding forms to review.`);
        
        const informationTextElement = screen.getByTestId("epfcount");
        expect(informationTextElement).toBeInTheDocument();
          
    });

});