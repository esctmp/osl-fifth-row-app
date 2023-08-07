import '@testing-library/jest-dom';
import { fireEvent , render, screen } from '@testing-library/react';
import OSL_ExTable from "../components/CM_Components/views/dashboards/dashboard1-components/OSL_ExTable";
import React from 'react';
// import { act } from 'react-dom/test-utils';

// test for homepage rendering
describe('OSL - View Page', () => {
    // Test Case 13: Test if component renders properly
    it("renders OSL_ExTable component without errors", () => {
        render(<OSL_ExTable />);
        // You can add more assertions here if needed
    });

    // Test Case 14: Test if "EPF Id" exist in the column name
    it("displays 'EPF Id' in the column name", () => {
        render(<OSL_ExTable />);
        expect(screen.getByText("EPF Id")).toBeInTheDocument();
    });
    // Test Case 15: Test if "Date" exist in the column name
    it("displays 'Date' in the column name", () => {
        render(<OSL_ExTable />);
        expect(screen.getByText("Date")).toBeInTheDocument();
    });
    // Test Case 16: Test if "Name" exist in the column name
    it("displays 'Name' in the column name", () => {
        render(<OSL_ExTable />);
        expect(screen.getByText("Name")).toBeInTheDocument();
    });
    // Test Case 17: Test if "Status" exist in the column name
    it("displays 'Status' in the column name", () => {
        render(<OSL_ExTable />);
        expect(screen.getByText("Status")).toBeInTheDocument();
    });
    // Test Case 18: Test if "Club" exist in the column name
    it("displays 'Club' in the column name", () => {
        render(<OSL_ExTable />);
        expect(screen.getByText("Club")).toBeInTheDocument();
    });
    // Test Case 19: Test if Pagination button renders works correctly
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
    // Test Case 20: Test if search input updates correctly according to what user type
    it('search input updates correctly', () => {
        render(<OSL_ExTable />);
    
        // Type 'John' in the search input and check if the value is updated
        const searchInput = screen.getByPlaceholderText(/Search by EPF ID/i);
        fireEvent.change(searchInput, { target: { value: '123' } });
        expect(searchInput.value).toBe('123');
    });
    // Test Case 21: Test initial page number displayed correctly when no data is being fed
    it('initial page number display without any data', () => {
        // Render the OSL_ExTable component
        render(<OSL_ExTable />);
    
        // Initially, the page number should be 0
        expect(screen.getByTestId('page-number')).toHaveTextContent('0-0 of 0');
      });
    // Test Case 22: Test initial row count (number) displayed correctly when no data is being fed
    it('initial rows displayed without any data', () => {
    // Render the OSL_ExTable component
    render(<OSL_ExTable />);

    // The initial number of rows per page should be 3 (as defined in the component)
    const rowsPerPage = screen.getAllByRole('row').length;
    expect(rowsPerPage).toBe(1);
    });
    


});