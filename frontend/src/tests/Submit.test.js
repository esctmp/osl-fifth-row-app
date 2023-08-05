import EPFSubmit from "../pages/FifthRow/EPF/Submit";
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { waitFor } from "@testing-library/react";
import { UserID } from "../routes/UserID.js";
import Router from "react-router-dom";
import axios from 'axios';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
   }));

const getSampleUserId = async () => {
    // get sample user id
    let response = await axios.get("http://localhost:3000/users/getUsers",
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EXCO user ids");
    });
    return (response.data.find((obj) => obj?.user_type == "FRE") || {})?.user_id;
};

const createSampleDraftForm = async () => {
    // upload draft form
    let userId = await getSampleUserId();
    let eventName = `Unit Test Event ${(new Date).toISOString()}`;
    let response = await axios.post("http://localhost:3000/epfs/createEPF",
        {
            "a_student_id": 1222222,
            "b_event_name": eventName,
            "exco_user_id": userId,
            "status": "Draft"
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((res) => res, (error) => {
        throw new Error("Cannot create EPF draft form");
    });
    // get newly uploaded draft form
    response = await axios.get("http://localhost:3000/epfs/getEPFs"
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EPF draft forms");
    });
    return {
        epf_id: (response.data.find((obj) => obj?.b_event_name == eventName) || {})?.epf_id,
        userId: userId,
        b_event_name: eventName
    }
};

describe('Fifth Row - EPF Form', () => {

    // describe('Validation', () => {
    //     // 11 - 13
    //     test('Validation - Required', () => {
    //         render(
    //             <UserID.Provider value={{ userId: 'null', setUserId: () => { } }}>
    //                 <EPFSubmit />
    //             </UserID.Provider>
    //         )
    //         // 11
    //         const field = screen.getByLabelText(/^Name/);
    //         fireEvent.change(field, { target: { value: '' } });
    //         expect(field).toBeInvalid();
    //         // 12
    //         const field1 = screen.getByLabelText(/^Expected Turnout/);
    //         fireEvent.change(field1, { target: { value: '' } });
    //         expect(field1).toBeInvalid();
    //         // 13
    //         const field2 = screen.getByLabelText(/^Event Schedule/);
    //         fireEvent.change(field2, { target: { value: '' } });
    //         expect(field2).toBeInvalid();
    //     });

    //     // 15 - 18
    //     test('Validation - Correct Format', async () => {
    //         render(
    //             <UserID.Provider value={{ userId: 'null', setUserId: () => { } }}>
    //                 <EPFSubmit />
    //             </UserID.Provider>
    //         )
    //         // 15
    //         const field = screen.getByLabelText(/^Event Schedule/);
    //         fireEvent.change(field, { target: { value: '2023-01-01T14:00' } });
    //         expect(field).toBeInvalid();
    //         fireEvent.change(field, { target: { value: '2023-08-12T14:00' } });
    //         await waitFor(() => {
    //             expect(screen.getByText("Warning: The event date is < 5 weeks away.")).toBeInTheDocument();
    //         });
    //         // 16
    //         const field1 = screen.getByLabelText(/^Contact Number/);
    //         fireEvent.change(field1, { target: { value: 'abc' } });
    //         expect(field1).toBeInvalid();
    //         fireEvent.change(field1, { target: { value: '123456' } });
    //         expect(field1).toBeInvalid();
    //         fireEvent.change(field1, { target: { value: '12345678' } });
    //         expect(field1).toBeValid();
    //         // 17
    //         const field2 = screen.getByLabelText(/^Email/);
    //         fireEvent.change(field2, { target: { value: 'abc' } });
    //         expect(field2).toBeInvalid();
    //         fireEvent.change(field2, { target: { value: 'abc@mymail.sutd.edu.sg' } });
    //         expect(field2).toBeValid();
    //         // 18
    //         const field3 = screen.getByLabelText(/^Student Id/);
    //         fireEvent.change(field3, { target: { value: 'abc' } });
    //         expect(field3).toBeInvalid();
    //         fireEvent.change(field3, { target: { value: '123456' } });
    //         expect(field3).toBeInvalid();
    //         fireEvent.change(field3, { target: { value: '1006123' } });
    //         expect(field3).toBeValid();
    //     });
    // });

    describe('Upload', () => {
        // test('Blank Form Behavior', async () => {
        //     const userId = await getSampleUserId();
        //     const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
        //     render(
        //         <UserID.Provider value={{ userId: userId, setUserId: () => { } }}>
        //             <EPFSubmit />
        //         </UserID.Provider>
        //     )

        //     // 5
        //     fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
        //     await waitFor(() =>
        //         expect(alertMock).toHaveBeenLastCalledWith("You must fill in the Event Name before saving this form as draft.")
        //         , { timeout: 2000 });

        //     // 11
        //     fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
        //     await waitFor(() =>
        //         expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
        //         , { timeout: 2000 });

        //     // 4
        //     const eventName = screen.getByLabelText(/^Event Name/);
        //     fireEvent.change(eventName, { target: { value: 'Test Event' } });
        //     fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
        //     await waitFor(() =>
        //         expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
        //         , { timeout: 2000 });

        //     // 10
        //     fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
        //     await waitFor(() =>
        //         expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
        //         , { timeout: 2000 });
        // }, 25000)

        test("Invalid Form Behavior", async () => {
            const { userId, epf_id, b_event_name } = await createSampleDraftForm();
            // expect(epf_id).not.toBeUndefined();
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
            render(
                <UserID.Provider value={{ userId: userId, setUserId: () => { } }}>
                    <EPFSubmit />
                </UserID.Provider>
            )

            // 2
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            fireEvent.change(screen.getByLabelText(/^Contact Number/), { target: { value: '1234578' } });
            fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
            , { timeout: 2000 });

            // 8
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
            , { timeout: 2000 });

            // 3
            fireEvent.change(screen.getByLabelText(/^Event Name/), { target: { value: '' } });
            fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("You must fill in the Event Name before saving this form as draft.")
            , { timeout: 2000 });

            // 7
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
            , { timeout: 2000 });  
        }, 25000);
    })
});