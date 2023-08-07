import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
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
    "outstanding_epf": 3,
},
]

describe('Homepage', () => {

    // 1
    test('Render - Landing Page', () => {
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
    test('Display outstanding EPF when user successfully logs in', async () => {

        const mockAxios = new MockAdapter(axios);
        const userId = '1';
        const apiResponse = [userPool.find(user => user['user_id'] === userId)];

        // mock axios get request
        mockAxios.onGet(`http://localhost:3000/users/getUser?user_id=${userId}`).reply(200, apiResponse);


        render(
            <UserID.Provider value ={{userId: userId, setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )

        await waitFor(() => {
            const epfCount = screen.getByTestId('epfcount');
            expect(epfCount).toBeInTheDocument();
            expect(epfCount).toHaveTextContent("You have 3 outstanding forms to review.")
        })

    });

    // 3
    test('Display username when user successfully logs in', async () => {
        const mockAxios = new MockAdapter(axios);
        const userId = '1';
        const apiResponse = [userPool.find(user => user['user_id'] === userId)];
        mockAxios.onGet(`http://localhost:3000/users/getUser?user_id=${userId}`).reply(200, apiResponse);
        render(
            <UserID.Provider value ={{userId: userId, setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )

        await waitFor(() => {
            const username = screen.getByTestId('username');
            expect(username).toBeInTheDocument();
            expect(username).toHaveTextContent("EXCO User 1")
        })
        
    });

    // 4 
    test('Display default username and epf values if unable to retrieve user info for homepage', () => {
        render(
            <UserID.Provider value ={{userId:'null', setUserId:()=>{}}}>
            <Homepage />
            </UserID.Provider> 
            )
        
        expect(screen.getByTestId("username")).toHaveTextContent("User");
        expect(screen.getByTestId("epfcount")).toHaveTextContent("_");
    });

});