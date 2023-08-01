import Login from "../pages/Shared/Login";
import '@testing-library/jest-dom';
import {render, fireEvent,screen} from '@testing-library/react';
import {UserID} from "../routes/UserID"
import {Groups} from "../routes/Groups"
import { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe("Login Form Validation",() => {
    test("should reject the login due to empty username field", async()=>{
        render(<Router>
            <UserID.Provider value={{userId: 'null', setUserId: () => {}}}>
            <Groups.Provider value ={{groups:'null',setGroups:()=>{}}}>
            <Login/>
            </Groups.Provider>
            </UserID.Provider>
            </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async () => {
            fireEvent.change(emailField, { target: { value: "" } });
            fireEvent.change(passwordField,{target:{value:"P@ssword1!"}})
            fireEvent.click(submit);
          });
        const errorMessage = await screen.queryByText("*Email is required!")
        expect(errorMessage).toBeInTheDocument();
        
    })
    test("should reject the log in due to invalid email, not in the form of ...@...sutd.edu.sg",async()=>{
        render(<Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups:()=>{}}}>
                <Login/>
            </Groups.Provider>
            </UserID.Provider>
            </Router>);
            const emailField = screen.getByPlaceholderText("Enter your club email");
            const passwordField = screen.getByPlaceholderText("Enter your password");
            const submit = screen.getByTestId("Log in");
            await act(async()=>{
                fireEvent.change(emailField,{target:{value:"test@gmail.com"}});
                fireEvent.change(passwordField,{target:{value:"P@ssword1!"}});
                fireEvent.click(submit);
            });
            const errorMessage  = await screen.queryByText("*Invalid email address");
            expect(errorMessage).not.toBeInTheDocument();
        
    })
    test("should not have an error in the login field if login field is filled in", async()=>{
        render(<Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups:()=>{}}}>
                <Login/>
            </Groups.Provider>
            </UserID.Provider>
            </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async()=>{
            fireEvent.change(emailField,{target:{value:"tesfre@club.sutd.edu.sg"}});
            fireEvent.change(passwordField,{target:{value:"P@ssword1!"}});
            fireEvent.click(submit);
        });
        const errorMessage  = await screen.queryByText("*Email is required!");
        expect(errorMessage).not.toBeInTheDocument();

    })
    test("should reject the login due to empty password field", async()=>{    
        render(<Router>
            <UserID.Provider value={{userId: 'null', setUserId: () => {}}}>
            <Groups.Provider value ={{groups:'null',setGroups:()=>{}}}>
                <Login/>
            </Groups.Provider>
            </UserID.Provider>
            </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async () => {
            fireEvent.change(emailField,{target:{value:"testfre@club.sutd.edu.sg"}});
            fireEvent.change(passwordField, { target: { value: "" } });
            fireEvent.click(submit);
          });
        const errorMessage = await screen.queryByText("*Password is required!")
        expect(errorMessage).toBeInTheDocument();
    })
    test("should not have an error if password field is filled in",async()=>{
        render(
        <Router>
            <UserID.Provider  value = {{userid:"null",setUserId:()=>{}}}>
                <Groups.Provider value = {{userid:"null",setUserId:()=>{}}}>
                    <Login/>
                </Groups.Provider>
            </UserID.Provider>
        </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async()=>{
            fireEvent.change(emailField,{target:{value:"testfre@club.sutd.edu.sg"}});
            fireEvent.change(passwordField,{target:{value:"P@ssword1!"}});
            fireEvent.click(submit);
        });
        const errorMessage = await screen.queryByText("*Password is required!")
        expect(errorMessage).not.toBeInTheDocument();
    });

    
});