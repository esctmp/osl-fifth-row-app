import '@testing-library/jest-dom';
import '@testing-library/react';
import { render, screen } from '@testing-library/react';
// import mediaQuery from 'css-mediaquery';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FREitems from '../layouts/FullLayout/Sidebar/FREitems';
import Sidebar from '../layouts/FullLayout/Sidebar/Sidebar';
import { Groups } from "../routes/Groups";

// const url = "http://localhost:3001/#/fifthrow/homepage";


// function createMatchMedia(width) {
//     return (query) => ({
//       matches: mediaQuery.match(query, {
//         width,
//       }),
//       addListener: () => {},
//       removeListener: () => {},
//     });
//   }

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

    // beforeAll(() => {
    //     window.matchMedia = createMatchMedia(window.innerWidth);
    //   });

    // test('Render - Sidebar', () => {
    //     render(
    //         <Router>
    //         <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
    //         {/* <ThemeProvider theme={theme}> */}
    //         <Sidebar 
    //             user={userPool.find(user => user['type'] === "FRE")}
    //         />
    //         {/* </ThemeProvider> */}
    //         </Groups.Provider> 
    //         </Router>
    //         )
    //     // const field = screen.getByTestId("sidebar");
    //     const field = screen.getByTestId("logo");
    //     expect(field).toBeInTheDocument();
    // });


    it('should render a list item with NavLink', () => {
    // Define the test data
    const item = {
        title: "Homepage",
        href: "fifthrow/homepage",
    };
    const items = FREitems.forEach;
    const pathDirect = 'fifthrow/homepage'; // Set a path for comparison

    // Render the component with necessary context and props
    render(
        <Router>
        <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
        <Sidebar
          item={items}
          pathDirect={pathDirect}
          handleClick={() => {}}
          user={userPool.find(user => user['type'] === "FRE")}
        />
        </Groups.Provider>
        </Router>
    );

    // // Get the rendered list item element
    const list = screen.getByRole('generic');
    // expect(list.length).toBe(4);
    // const listItem = list.querySelectorAll('li');

    // // Assertions
    // expect (listItem.length).toBe(4); 
    expect(list).toBeInTheDocument();
    // expect(list).toHaveTextContent('Homepage'); // Make sure the text is rendered
//     expect(listItem).toHaveAttribute('href', 'fifthrow/homepage'); // Ensure NavLink has the correct 'to' prop
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
    //     const list = screen.getByRole('generic');
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