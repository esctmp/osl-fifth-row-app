import '@testing-library/jest-dom';

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
    // test('Render - Sidebar', () => {
    //     render(
    //         <UserID.Provider value ={{userId:'null', setUserId:()=>{}}}>
    //         <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}>
    //         <Sidebar />
    //         </Groups.Provider>
    //         </UserID.Provider>
    //         )
    //     const field = screen.getByText("Dashboard");
    //     expect(field).toBeInTheDocument();
    // });


    // side bar will show what buttons based on user type
    // test('Render - FRE Sidebar', () => {
    //     render(<Router>
    //         <UserID.Provider value ={{userId:'null', setUserId:()=>{}}}>
    //         {/* <Groups.Provider value ={{groups:'null', setGroups:()=>{}}}> */}
    //         <Sidebar />
    //         {/* </Groups.Provider> */}
    //         </UserID.Provider>
    //         </Router>
    //         )
    //     const user = userPool.find(user => user['type'] === "FRE");
    //     const field = screen.getByText("Homepage");
    //     const field2 = screen.getByText("EPF");
    //     const field3 = screen.getByText("Create New EPF");
    //     const field4 = screen.getByText("View EPF List");
    //     expect(field).toBeInTheDocument();
    //     expect(field2).toBeInTheDocument();
    //     expect(field3).toBeInTheDocument();
    //     expect(field4).toBeInTheDocument();
    // });

    // each button will route to where it is supposed to
})