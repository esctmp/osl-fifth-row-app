import EPFSubmit from "../pages/FifthRow/EPF/Submit";
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { waitFor } from "@testing-library/react";
import { UserID } from "../routes/UserID.js";

describe('Fifth Row - EPF Form', () => {

    describe('Validation', () => {
        // 11 - 13
        test('Validation - Required', () => {
            render(
                <UserID.Provider value={{ userId: 'null', setUserId: () => { } }}>
                    <EPFSubmit />
                </UserID.Provider>
            )
            // 11
            const field = screen.getByLabelText(/^Name/);
            fireEvent.change(field, { target: { value: '' } });
            expect(field).toBeInvalid();
            // 12
            const field1 = screen.getByLabelText(/^Expected Turnout/);
            fireEvent.change(field1, { target: { value: '' } });
            expect(field1).toBeInvalid();
            // 13
            const field2 = screen.getByLabelText(/^Event Schedule/);
            fireEvent.change(field2, { target: { value: '' } });
            expect(field2).toBeInvalid();
        });

        // 15 - 18
        test('Validation - Correct Format', async () => {
            render(
                <UserID.Provider value={{ userId: 'null', setUserId: () => { } }}>
                    <EPFSubmit />
                </UserID.Provider>
            )
            // 15
            const field = screen.getByLabelText(/^Event Schedule/);
            fireEvent.change(field, { target: { value: '2023-01-01T14:00' } });
            expect(field).toBeInvalid();
            fireEvent.change(field, { target: { value: '2023-08-12T14:00' } });
            await waitFor(() => {
                expect(screen.getByText("Warning: The event date is < 5 weeks away.")).toBeInTheDocument();
            });
            // 16
            const field1 = screen.getByLabelText(/^Contact Number/);
            fireEvent.change(field1, { target: { value: 'abc' } });
            expect(field1).toBeInvalid();
            fireEvent.change(field1, { target: { value: '123456' } });
            expect(field1).toBeInvalid();
            fireEvent.change(field1, { target: { value: '12345678' } });
            expect(field1).toBeValid();
            // 17
            const field2 = screen.getByLabelText(/^Email/);
            fireEvent.change(field2, { target: { value: 'abc' } });
            expect(field2).toBeInvalid();
            fireEvent.change(field2, { target: { value: 'abc@mymail.sutd.edu.sg' } });
            expect(field2).toBeValid();
            // 18
            const field3 = screen.getByLabelText(/^Student Id/);
            fireEvent.change(field3, { target: { value: 'abc' } });
            expect(field3).toBeInvalid();
            fireEvent.change(field3, { target: { value: '123456' } });
            expect(field3).toBeInvalid();
            fireEvent.change(field3, { target: { value: '1006123' } });
            expect(field3).toBeValid();
        });
    });
});