import '@testing-library/jest-dom';
import { fireEvent , render, screen } from '@testing-library/react';
import OSL_ExTable from "../components/CM_Components/views/dashboards/dashboard1-components/OSL_ExTable";
import React from 'react';
// import { act } from 'react-dom/test-utils';

// test for homepage rendering
describe('OSL - View Page', () => {
    // Test case for UI rendering
    it("renders OSL_ExTable component without errors", () => {
        render(<OSL_ExTable />);
        // You can add more assertions here if needed
    });

    // Test case for column names matching
    it("displays correct column names", () => {
        render(<OSL_ExTable />);
        expect(screen.getByText("EPF Id")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Club")).toBeInTheDocument();
    });

    it('displays pagination correctly', () => {
        // Render the OSL_ExTable component
        render(<OSL_ExTable />);
    
        // Find the pagination elements on the screen
        const nextButton = screen.getByRole('button', { name: /next page/i });
        const previousButton = screen.getByRole('button', { name: /previous page/i });
    
        // Assert that the pagination elements are present
        expect(nextButton).toBeInTheDocument();
        expect(previousButton).toBeInTheDocument();
    });
    
    it('search input updates correctly', () => {
        render(<OSL_ExTable />);
    
        // Type 'John' in the search input and check if the value is updated
        const searchInput = screen.getByPlaceholderText(/Search by EPF ID/i);
        fireEvent.change(searchInput, { target: { value: '123' } });
        expect(searchInput.value).toBe('123');
    });

    // it('search input for Name updates correctly', () => {
    //     render(<OSL_ExTable />);
    
    //     // Type 'John' in the search input and check if the value is updated
    //     const searchInput = screen.getByPlaceholderText(/Search by Name/i);
    //     fireEvent.change(searchInput, { target: { value: 'Badminton Competition' } });
    //     expect(searchInput.value).toBe('Badminton Competition');
    // });

    it('check if Status is indeed inside the column', () => {
        // Render the OSL_ExTable component
        render(<OSL_ExTable />);
    
        // Find the table rows in the current page
        const tableRows = screen.getAllByRole('row');
    
        // All displayed rows should contain the search term 'John'
        tableRows.forEach((row) => {
          expect(row).toHaveTextContent('Status');
        });
    });

    it('initial page number display without any data', () => {
        // Render the OSL_ExTable component
        render(<OSL_ExTable />);
    
        // Initially, the page number should be 0
        expect(screen.getByTestId('page-number')).toHaveTextContent('0-0 of 0');
      });
    
    it('initial rows displayed without any data', () => {
    // Render the OSL_ExTable component
    render(<OSL_ExTable />);

    // The initial number of rows per page should be 3 (as defined in the component)
    const rowsPerPage = screen.getAllByRole('row').length;
    expect(rowsPerPage).toBe(1);
    });
    


});