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
    // 1
    test('Render - Landing Page', () => {
        const [userId,setUserId] = [null, null];
        render(
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )
        const field = screen.getByText("WELCOME");
        const field2 = screen.getByText("You have _ outstanding forms to review.");
        expect(field).toBeInTheDocument();
        expect(field2).toBeInTheDocument();

    });

    // 2
    test('Display outstanding EPF when user successfully logs in', () => {
        render(
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )
        
        const user = userPool.find(user => user['user_id'] === "1");
        expect(user['outstanding EPF']).toBe(3);

        const field = screen.getByTestId("epfcount");
        expect(field).toBeInTheDocument();
    });

    // 3
    test('Display username when user successfully logs in', () => {
        render(
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )
        
        const user = userPool.find(user => user['user_id'] === "2");
        expect(user['name']).toBe("EXCO User 2");

        const field = screen.getByTestId("username");
        expect(field).toBeInTheDocument();
    });

    // 4 
    test('Display default username and epf values if unable to retrieve user info for homepage', () => {
        render(
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )
        
        expect(screen.getByTestId("username")).toHaveTextContent("User");
        expect(screen.getByTestId("epfcount")).toHaveTextContent("_");
    });

});