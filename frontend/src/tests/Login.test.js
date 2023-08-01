import Login from "../pages/Shared/Login";
import '@testing-library/jest-dom';
import {render, fireEvent,screen, waitFor} from '@testing-library/react';
import {UserID} from "../routes/UserID"
import {Groups} from "../routes/Groups"
import { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from "axios";
import {Auth} from "aws-amplify"


jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);
const mockNavigate = jest.fn();
axios.get = jest.fn(() => {
    return Promise.resolve({data: { userId: 'ee0843b7-8517-432d-9612-58b9a42434e0' }});
})

// Mock Auth.signIn
Auth.signIn = jest.fn(() => {
    return Promise.resolve({ data: { groups: "FRE" }});
})


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
        const errorMessage2 = await screen.queryByText("*Invalid email address entered")
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage2).not.toBeInTheDocument();
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
            const errorMessage = await screen.queryByText("*Email is required!")
            const errorMessage2 = await screen.queryByText("*Invalid email address entered")
            expect(errorMessage).not.toBeInTheDocument();
            expect(errorMessage2).toBeInTheDocument();
        
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
        const errorMessage = await screen.queryByText("*Email is required!")
        const errorMessage2 = await screen.queryByText("*Invalid email address entered")
        expect(errorMessage).not.toBeInTheDocument();
        expect(errorMessage2).not.toBeInTheDocument();

    })
    test("should reject the login due to empty password field", async()=>{    
        render(<Router>
            <UserID.Provider value={{userId: 'null', setUserId: () => {}}}>
            <Groups.Provider value = {{groups:"null",setGroups:()=>{}}}>
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
        const errorMessage3 = await screen.queryByText("*Password is required!")
        const errorMessage4 = await screen.queryByText("*Invalid password entered")
        expect(errorMessage3).toBeInTheDocument();
        expect(errorMessage4).not.toBeInTheDocument();
    })
    test("should have an error if password requirement is not fulfilled",async()=>{
        render(
        <Router>
            <UserID.Provider  value = {{userid:"null",setUserId:()=>{}}}>
                <Groups.Provider value = {{groups:"null",setGroups:()=>{}}}>
                    <Login/>
                </Groups.Provider>
            </UserID.Provider>
        </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async()=>{
            fireEvent.change(emailField,{target:{value:"testfre@club.sutd.edu.sg"}});
            fireEvent.change(passwordField,{target:{value:"abc"}});
            fireEvent.click(submit);
        });
        const errorMessage3 = await screen.queryByText("*Password is required!")
        const errorMessage4 = await screen.queryByText("*Invalid password entered")
        expect(errorMessage3).not.toBeInTheDocument();
        expect(errorMessage4).toBeInTheDocument();
    });
    test("should not have an error if password field is filled in",async()=>{
        render(
        <Router>
            <UserID.Provider  value = {{userid:"null",setUserId:()=>{}}}>
                <Groups.Provider value = {{groups:"null",setGroups:()=>{}}}>
                    <Login/>
                </Groups.Provider>
            </UserID.Provider>
        </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async()=>{
            fireEvent.change(emailField,{target:{value:"testfre@club.sutd.edu.sg"}});
            fireEvent.change(passwordField,{target:{value:"P@ssword1"}});
            fireEvent.click(submit);
        });
        const errorMessage3 = await screen.queryByText("*Password is required!")
        const errorMessage4 = await screen.queryByText("*Invalid password entered")
        expect(errorMessage3).not.toBeInTheDocument();
        expect(errorMessage4).not.toBeInTheDocument();
    });

    // test('redirects user to homepage after successful login', async () => {
    //     const { getByPlaceholderText, getByTestId } = render(
    //         <Router>
    //         <UserID.Provider  value = {{userid:"ee0843b7-8517-432d-9612-58b9a42434e0",setUserId:()=>{}}}>
    //             <Groups.Provider value = {{groups:"FRE",setGroups:()=>{}}}>
    //                 <Login/>
    //             </Groups.Provider>
    //         </UserID.Provider>
    //     </Router>);
    //     const emailField = getByPlaceholderText('Enter your club email');
    //     const passwordField = getByPlaceholderText('Enter your password');
    //     const submitButton = getByTestId('Log in');
      
    //     fireEvent.change(emailField, { target: { value: 'testfre@club.sutd.edu.sg' } });
    //     fireEvent.change(passwordField, { target: { value: 'P@ssword1!' } });
    //     fireEvent.click(submitButton);
      
    //     await waitFor(() => {
    //       // Check if navigate function was called with the expected argument
    //       expect(mockNavigate).toBeCalledWith('/fifthrow/homepage');
    //     });
    //   });

    
});