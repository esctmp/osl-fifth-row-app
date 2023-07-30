import EPFSubmit from "../pages/FifthRow/EPF/Submit";
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Fifth Row - EPF Form', () => {
   describe('Validation', () => {
        test('Validation - Text Field Required', () => {
            render(<EPFSubmit />)
            const field = screen.getByLabelText(/^Name/);
            fireEvent.change(field, {target: { value: ''}});
            expect(field).toBeInvalid();
        });
   });
});