import '@testing-library/jest-dom';
import { fireEvent , render, screen } from '@testing-library/react';
import OSL_ExTable from "../components/CM_Components/views/dashboards/dashboard1-components/OSL_ExTable";
import React from 'react';



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

    // it("filters by EPF ID correctly", () => {
    //     render(<OSL_ExTable />);
    //     const searchInput = screen.getByPlaceholderText("Search by EPF ID");
    //     fireEvent.change(searchInput, { target: { value: "123" } });
      
    //     const tableContainsEPFID = (text) => {
    //         const columnHeader = screen.getByText("EPF Id");
    //         const columnHeaderIndex = Array.from(columnHeader.parentElement.children).indexOf(columnHeader);

    //         if (columnHeaderIndex === -1) {
    //         return false; // Column header not found
    //         }

    //         const tableBodyRows = Array.from(screen.getAllByRole("row"));
    //         return tableBodyRows.some((row) => row.children[columnHeaderIndex].textContent.includes(text));
    //     };
      
    //     expect(tableContainsEPFID("123")).toBeTruthy();
    //     expect(tableContainsEPFID("456")).toBeFalsy(); // Assuming 456 is not a valid EPF ID
    // });

});