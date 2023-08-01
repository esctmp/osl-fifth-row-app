import '@testing-library/jest-dom';
import { getByText, render, screen } from '@testing-library/react';
import Homepage from "../pages/FifthRow/Homepage.js";
import React from 'react';
import { UserID } from '../routes/UserID.js';

// test for homepage rendering
describe('Fifth Row - Homepage', () => {
    test('Homepage', () => {
        const [userId,setUserId] = [null, null];
        render(
            <UserID.Provider value ={{userId,setUserId}}>
            <Homepage />
            </UserID.Provider>
            )
        const field = screen.getByText("WELCOME");
        expect(field).toBeInTheDocument();

    });
});