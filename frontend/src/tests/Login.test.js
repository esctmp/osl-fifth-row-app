import Login from "../pages/Shared/Login";
import '@testing-library/jest-dom';
import {render, fireEvent,screen, waitFor} from '@testing-library/react';
import {UserID} from "../routes/UserID"
import {Groups} from "../routes/Groups"
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { UserLoggedIn } from "../routes/UserLoggedIn";
import { Auth } from 'aws-amplify';
// const mockSetGroups = jest.fn();
// jest.mock('../routes/Groups', () => ({
//   Groups: {
//     Consumer: ({ children }) => children({
//       groups: 'FRE',
//       setGroups: mockSetGroups,
//     }),
//     Provider: ({ children }) => <div>{children}</div>,
//   },
// }));

jest.mock('aws-amplify', () => ({
    Auth: {
      signIn: jest.fn(),
      currentAuthenticatedUser: jest.fn(),
    },
  }));
  
  
describe("Login Form Validation",() => {
    test("should reject the login due to empty email field", async()=>{
        render(<Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
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
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
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
    test("should not have an error in the email field if email field is filled in", async()=>{
        render(<Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
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
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
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
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
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
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
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
    test("should reject login if both password and email fields are empty", async()=>{    
        render(<Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:'null',setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'null', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
            </Groups.Provider>
            </UserID.Provider>
            </Router>);
        const emailField = screen.getByPlaceholderText("Enter your club email");
        const passwordField = screen.getByPlaceholderText("Enter your password");
        const submit = screen.getByTestId("Log in");
        await act(async () => {
            fireEvent.change(emailField,{target:{value:""}});
            fireEvent.change(passwordField, { target: { value: "" } });
            fireEvent.click(submit);
          });
        const errorMessage = await screen.queryByText("*Email is required!")
        const errorMessage3 = await screen.queryByText("*Password is required!")
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage3).toBeInTheDocument();
        
    })

});

describe("Login form navigation",()=>{
    test('redirects user to homepage after successful login', async () => {
        Auth.signIn.mockResolvedValueOnce({
            username: "testfre",
            attributes: {
              'custom:user_type': "FRE",
            },
            signInUserSession: {
              accessToken: {
                payload: {
                  'cognito:groups': "FRE",
                },
              },
            },
          });
          Auth.currentAuthenticatedUser.mockResolvedValueOnce({
            username: "testfre",
            attributes: {
              'custom:user_type': "FRE",
            },
          });
        const { getByPlaceholderText, getByTestId } = render(
            <Router>
            <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
            <Groups.Provider value ={{groups:["FRE"],setGroups: ()=>{}}}>
            <UserLoggedIn.Provider value ={{userLoggedIn:'true', setUserLoggedIn:()=>{}}}>
                <Login/>
            </UserLoggedIn.Provider>
            </Groups.Provider>
            </UserID.Provider>
            </Router>);
        const emailField = getByPlaceholderText('Enter your club email');
        const passwordField = getByPlaceholderText('Enter your password');
        const submitButton = getByTestId('Log in');
        
        await act(async()=>{
            fireEvent.change(emailField, { target: { value: 'testfre@club.sutd.edu.sg' } });
            fireEvent.change(passwordField, { target: { value: 'P@ssword1!' } });
            fireEvent.click(submitButton);
        })
      
        await waitFor(() => {
          // Check if navigate function was called with the expected argument
          expect(window.location.pathname).toBe('/fifthrow/homepage');
        });
      });
    test('redirects user to homepage after successful login', async () => {
    Auth.signIn.mockResolvedValueOnce({
        username: "testosl",
        attributes: {
            'custom:user_type': "OSL",
        },
        signInUserSession: {
            accessToken: {
            payload: {
                'cognito:groups': "OSL",
            },
            },
        },
        });
        Auth.currentAuthenticatedUser.mockResolvedValueOnce({
        username: "testosl",
        attributes: {
            'custom:user_type': "OSL",
        },
        });
    
    
    const { getByPlaceholderText, getByTestId } = render(
        <Router>
        <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
        <Groups.Provider value ={{groups:["FRE"],setGroups: ()=>{}}}>
        <UserLoggedIn.Provider value ={{userLoggedIn:'true', setUserLoggedIn:()=>{}}}>
            <Login/>
        </UserLoggedIn.Provider>
        </Groups.Provider>
        </UserID.Provider>
        </Router>);
    const emailField = getByPlaceholderText('Enter your club email');
    const passwordField = getByPlaceholderText('Enter your password');
    const submitButton = getByTestId('Log in');
    
    await act(async()=>{
        fireEvent.change(emailField, { target: { value: 'testosl@sutd.edu.sg' } });
        fireEvent.change(passwordField, { target: { value: 'P@ssword1!' } });
        fireEvent.click(submitButton);
    })
    
    await waitFor(() => {
        // Check if navigate function was called with the expected argument
        expect(window.location.pathname).toBe('/osl/homepage');
    });
    });
    
    test("Correctly routes to Root homepage",async()=>{
    Auth.signIn.mockResolvedValueOnce({
        username: "testroot",
        attributes: {
            'custom:user_type': "ROOT",
        },
        signInUserSession: {
            accessToken: {
            payload: {
                'cognito:groups': "ROOT",
            },
            },
        },
    });
    Auth.currentAuthenticatedUser.mockResolvedValueOnce({
        username: "testroot",
        attributes: {
            'custom:user_type': "ROOT",
        },
    })
    const { getByPlaceholderText, getByTestId } = render(
        <Router>
        <UserID.Provider value ={{userId:'null',setUserId:()=>{}}}>
        <Groups.Provider value ={{groups:["FRE"],setGroups: ()=>{}}}>
        <UserLoggedIn.Provider value ={{userLoggedIn:'true', setUserLoggedIn:()=>{}}}>
            <Login/>
        </UserLoggedIn.Provider>
        </Groups.Provider>
        </UserID.Provider>
        </Router>);
    const emailField = getByPlaceholderText('Enter your club email');
    const passwordField = getByPlaceholderText('Enter your password');
    const submitButton = getByTestId('Log in');
    
    await act(async()=>{
        fireEvent.change(emailField, { target: { value: 'testosl@sutd.edu.sg' } });
        fireEvent.change(passwordField, { target: { value: 'P@ssword1!' } });
        fireEvent.click(submitButton);
    })
    
    await waitFor(() => {
        // Check if navigate function was called with the expected argument
        expect(window.location.pathname).toBe('/root/homepage');
    });
    });

})