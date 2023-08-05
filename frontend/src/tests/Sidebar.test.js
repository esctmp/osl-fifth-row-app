import '@testing-library/jest-dom';
import '@testing-library/react';
import { render, screen } from '@testing-library/react';
// import mediaQuery from 'css-mediaquery';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import mockCognito from '../__mocks__/Auth';
import Header from '../layouts/FullLayout/Header/Header';
import FREitems from '../layouts/FullLayout/Sidebar/FREitems';
import Sidebar from '../layouts/FullLayout/Sidebar/Sidebar';
import { Groups } from "../routes/Groups";
import { UserID } from "../routes/UserID";

jest.mock('amazon-cognito-identity-js', () => ({
    CognitoUser: jest.fn(() => mockCognito),
  }));

const userPool = 
[
{
    "user_id": "1",
    "name": "EXCO User",
    "email": "excouser@club.sutd.edu.sg",
    "type": "FRE",
    "outstanding EPF": 3,
},
{
    "user_id": "2",
    "name": "OSL User",
    "email": "osl@sutd.edu.sg",
    "type": "OSL",
    "outstanding EPF": 4,
},
{
    "user_id": "3",
    "name": "ROOT User",
    "email": "root@studentgov.sutd.edu.sg",
    "type": "ROOT",
    "outstanding EPF": 6,
},
]

describe ('Sidebar', () => {
// SIDE BAR WAS CLOSED DUMBASS!!!!!!!!!
// need to set window size before testing
    test('Render - Sidebar', () => {
        render(
            <Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
            {/* <Sidebar/> */}
            <Header />
            </Groups.Provider> 
            </UserID.Provider>
            </Router>
            )
        // const field = screen.getByRole("generic");
        const button = screen.getByTestId("sidebarmenu");
        // const logo = screen.queryByRole("img", {name: "logo"});
        // expect(field).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        // expect(logo).toHaveAttribute('src', '../layouts/FullLayout/Logo/LogoIcon');
    });


    test('render a list item with NavLink', () => {
    // Define the test data
    const item = {
        title: "Homepage",
        href: "fifthrow/homepage",
    };
    const items = FREitems;
    const pathDirect = 'fifthrow/homepage'; // Set a path for comparison
    
    // Render the component with necessary context and props
    render(
        <Router>
        <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
        <Sidebar
        //   item={items}
        //   pathDirect={pathDirect}
        //   user={userPool.find(user => user['type'] === "FRE")}
        />
        </Groups.Provider>
        </Router>
    );

//     // // Get the rendered list item element
        
        // const list = screen.getByRole('link', {name: "Homepage"});
        // // const listElement = list.querySelectorAll('li');
        // // const listElementValue = listElement[0]; 
        // expect(list).toBeInTheDocument();
//     const list = screen.getByRole('list');
//     // expect(list.length).toBe(1);
//     // const listItem = list.querySelectorAll('li');

//     // // Assertions
//     // expect (listItem.length).toBe(4); 
//     expect(list).toBeInTheDocument();
        // expect(list).toHaveTextContent('Homepage'); // Make sure the text is rendered
        // expect(list).toHaveAttribute('href', 'fifthrow/homepage'); // Ensure NavLink has the correct 'to' prop
  });



    // side bar will show what buttons based on user type
    // test('Render - FRE Sidebar', () => {
    //     render(
    //         <Router>
    //         <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
    //         <Sidebar 
    //             user={userPool.find(user => user['type'] === "FRE")}
    //         />
    //         </Groups.Provider> 
    //         </Router>
    //         )
    //     // const user = userPool.find(user => user['type'] === "FRE");
    //     const list = screen.getByRole('li', {name : "Homepage"});
    //     expect (list).toBeInTheDocument();
    //     // -------- works until here
    //     const listItem = list.querySelectorAll('li');
    //     expect(listItem).not.toBe("[]")
        // expect(listItem.length).toBeGreaterThan(0);
        // expect (listItem).toHaveTextContent("Homepage");
        // const field1 = screen.getByTestId("Homepage");
        // const field2 = screen.getByText("EPF");
        // const field3 = screen.getByText("Create New EPF");
        // const field4 = screen.getByText("View EPF List");
        // expect(field1).toBeInTheDocument();
    //     expect(field2).toBeInTheDocument();
    //     expect(field3).toBeInTheDocument();
    //     expect(field4).toBeInTheDocument();
    // });

    // each button will route to where it is supposed to




});