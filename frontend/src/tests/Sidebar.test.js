import '@testing-library/jest-dom';
import '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../layouts/FullLayout/Sidebar/Sidebar';
import { Groups } from "../routes/Groups";


describe ('Sidebar', () => {

    test('Render - Sidebar Logo', () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )

        let logo = screen.getAllByAltText('logo');
        expect(logo).not.toBeNull();
    });


    test('Render - FRE Sidebar', () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:['FRE'], setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )

        const element1 = screen.getByText("Homepage");
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText("EPF");
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText("Create New EPF");
        expect(element3).toBeInTheDocument();
        const element4 = screen.getByText("View EPF List");
        expect(element4).toBeInTheDocument();
        
    });


    test('Render - OSL and ROOT Sidebar', () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:['OSL'], setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )

        const element1 = screen.getByText("Homepage");
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText("EPF");
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText("Review EPF");
        expect(element3).toBeInTheDocument();
        const element4 = screen.getByText("View EPF List");
        expect(element4).toBeInTheDocument();
        
    });


    test('Routing - Homepage button routes correctly', async () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:['FRE'], setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )
        
        // click on 'Homepage' on sidebar
        await act(async () => {
            fireEvent.click(screen.getByTestId("Homepage"));
        })
        
        expect(window.location.pathname).toBe("/fifthrow/homepage")
            
    });


    test('Routing - Create New EPF button routes correctly', async () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:['FRE'], setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )
        
        // click on 'Create New EPF' on sidebar
        await act(async () => {
            fireEvent.click(screen.getByTestId("Create New EPF"));
        })
        
        expect(window.location.pathname).toBe("/fifthrow/epf/new")
            
    });


    test('Routing - View EPF List button routes correctly', async () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:['FRE'], setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )
        
        // click on 'View EPF List' on sidebar
        await act(async () => {
            fireEvent.click(screen.getByTestId("View EPF List"));
        })
        
        expect(window.location.pathname).toBe("/fifthrow/epf/view")
            
    });

    
    test('Routing - Review EPF button routes correctly', async () => {
        let t = true;
        render(
            <Router>
            <Groups.Provider value ={{groups:['OSL'], setGroups:()=>{}}}>
            <Sidebar isMobileSidebarOpen={t}/>
            </Groups.Provider> 
            </Router>
            )
        
        // click on 'Review EPF' on sidebar
        await act(async () => {
            fireEvent.click(screen.getByTestId("Review EPF"));
        })
        
        expect(window.location.pathname).toBe("/osl/epf/submit")
            
    });


});