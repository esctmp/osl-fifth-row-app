import FifthRowEPFSubmit from "../pages/FifthRow/EPF/Submit";
import OSLEPFSubmit from "../pages/OSL/EPF/Submit";
import ROOTEPFSubmit from "../pages/ROOT/EPF/Submit";
import React from 'react';
import { render, fireEvent, screen, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { waitFor } from "@testing-library/react";
import { UserID } from "../routes/UserID.js";
import Router from "react-router-dom";
import apis from "../apis.js";
import axios from 'axios';

const ENV = "LOCAL";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

var spy;
beforeEach(() => {
    spy = jest.spyOn(window, 'alert');
})

afterEach(() => {
    spy.mockRestore();
})

const getSampleUserId = async () => {
    // get sample user id
    let response = await axios.get(apis[ENV].getUsers
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EXCO user ids");
    });
    return (response.data.find((obj) => obj?.user_type == "FRE") || {})?.user_id;
};

const getSampleFormWithStatus = async (status) => {
    let response = await axios.get(apis[ENV].getEPFs
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EPF forms");
    });
    let form = (response.data.find((obj) => obj?.status == status) || {});
    var epf_id = form?.epf_id;
    var b_event_name = form?.b_event_name;
    if (epf_id == undefined) { // if cannot find any form with specified status, create one
        form = await createSampleForm(status);
        epf_id = form?.epf_id;
        b_event_name = form?.b_event_name;
    }
    return {
        epf_id: epf_id,
        b_event_name: b_event_name
    };
}

const createSampleForm = async (status = "Draft") => {
    // upload draft form
    let userId = await getSampleUserId();
    let eventName = `Unit Test Event ${(new Date).toISOString()}`;
    let response = await axios.post(apis[ENV].createEPF,
        {
            "a_student_id": 1222222,
            "b_event_name": eventName,
            "exco_user_id": userId,
            "status": status
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((res) => res, (error) => {
        throw new Error("Cannot create EPF form");
    });
    // get newly uploaded form
    response = await axios.get(apis[ENV].getEPFs
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EPF forms");
    });
    return {
        epf_id: (response.data.find((obj) => obj?.b_event_name == eventName) || {})?.epf_id,
        userId: userId,
        b_event_name: eventName
    }
};

const getFormWithEventName = async (b_event_name) => {
    let response = await axios.get(apis[ENV].getEPFs
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EPF forms");
    });
    let form = (response.data.find((obj) => obj?.b_event_name == b_event_name) || {});
    if (form == {}) { // if cannot find any form with specified name, throw error
        throw new Error("Cannot find EPF form with specified name");
    } else return form;
}

const getFormWithEPFId = async (epf_id) => {
    let response = await axios.get(apis[ENV].getEPF,
        {
            params: { epf_id: epf_id }
        }
    ).then((res) => res, (error) => {
        throw new Error("Cannot get the EPF form with the specified ID");
    });
    let form = response.data[0];
    return form;
}


describe('Fifth Row - EPF Form', () => {

    describe('Validation', () => {
        // 11 - 13
        test('Validation - Required', () => {
            render(
                <UserID.Provider value={{ userId: 'null', setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )
            // 11
            // for input HTML elems, can just change the 'value' attribute
            const field = screen.getByLabelText(/^Name/);
            fireEvent.change(field, { target: { value: '' } });
            expect(field).toBeInvalid();
            // 12
            const field1 = screen.getByLabelText(/^Expected Turnout/);
            fireEvent.change(field1, { target: { value: '' } });
            expect(field1).toBeInvalid();
            // 13
            const field2 = screen.getByLabelText(/^Event Schedule/);
            fireEvent.change(field2, { target: { value: '' } });
            expect(field2).toBeInvalid();
        });

        // 15 - 18
        test('Validation - Correct Format', async () => {
            render(
                <UserID.Provider value={{ userId: 'null', setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )
            // 15
            const field = screen.getByLabelText(/^Event Schedule/);
            fireEvent.change(field, { target: { value: '2023-01-01T14:00' } });
            expect(field).toBeInvalid();
            fireEvent.change(field, { target: { value: '2023-08-12T14:00' } });
            await waitFor(() => {
                expect(screen.getByText("Warning: The event date is < 5 weeks away.")).toBeInTheDocument();
            }, { timeout: 3000 });
            // 16
            const field1 = screen.getByLabelText(/^Contact Number/);
            fireEvent.change(field1, { target: { value: 'abc' } });
            expect(field1).toBeInvalid();
            fireEvent.change(field1, { target: { value: '123456' } });
            expect(field1).toBeInvalid();
            fireEvent.change(field1, { target: { value: '12345678' } });
            expect(field1).toBeValid();
            // 17
            const field2 = screen.getByLabelText(/^Email/);
            fireEvent.change(field2, { target: { value: 'abc' } });
            expect(field2).toBeInvalid();
            fireEvent.change(field2, { target: { value: 'abc@mymail.sutd.edu.sg' } });
            expect(field2).toBeValid();
            // 18
            const field3 = screen.getByLabelText(/^Student Id/);
            fireEvent.change(field3, { target: { value: 'abc' } });
            expect(field3).toBeInvalid();
            fireEvent.change(field3, { target: { value: '123456' } });
            expect(field3).toBeInvalid();
            fireEvent.change(field3, { target: { value: '1006123' } });
            expect(field3).toBeValid();
        });
    });

    describe('Upload', () => {
        test('Blank Form Behavior', async () => {
            const userId = await getSampleUserId();
            const alertMock = spy.mockImplementation(() => { })
            render(
                <UserID.Provider value={{ userId: userId, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 5
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toBeInTheDocument();
            }, { timeout: 5000 });
            fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("You must fill in the Event Name before saving this form as draft.")
                , { timeout: 2000 });

            // 11
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
                , { timeout: 2000 });

            // 4
            const eventName = screen.getByLabelText(/^Event Name/);
            fireEvent.change(eventName, { target: { value: 'Test Event' } });
            fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
                , { timeout: 2000 });

            // 10
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
                , { timeout: 2000 });
        }, 30000)

        test("Invalid Form Behavior", async () => {
            const { userId, epf_id, b_event_name } = await createSampleForm();
            // expect(epf_id).not.toBeUndefined();
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            const alertMock = spy.mockImplementation(() => { })
            render(
                <UserID.Provider value={{ userId: userId, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
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

            // 7
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

            // 8
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
                , { timeout: 2000 });

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test("Valid Form Behavior", async () => {
            const userId = await getSampleUserId();
            let spy = jest.spyOn(window, 'alert');
            const alertMock = spy.mockImplementation(() => { });
            let dom = render(
                <UserID.Provider value={{ userId: userId, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )
            let eventName = `Unit Test Event ${(new Date).toISOString()}`;
            const data = {
                // compulsory fields
                "a_name": "user 1",
                "a_student_id": 1000001,
                "a_organisation": "organisation 1",
                "a_contact_number": 99998888,
                "a_email": "user_1@mymail.sutd.edu.sg",
                "b_event_name": eventName,
                "b_target_audience": "target Audience 1",
                "b_expected_turnout": 1,
                "b_event_objective": "event Objective 1",
                "d11_total_revenue": 30.00,
                "d2_total_expenditure": 25.00,
                "b_event_schedule": "2023-08-04 14:30",
                "c1_date": "2023-08-21",
                "c1_time": "14:00",
                "c1_activity_and_description": "do sth",
                "c1_venue": "LT1",
                "c2_date": "2023-08-21",
                "c2_time": "16:00",
                "c2_activity_and_description": "actual event stuff",
                "c2_venue": "LT1",
                "c3_date": "2023-08-21",
                "c3_time": "19:00",
                "c3_activity_and_description": "do sth after",
                "c3_venue": "LT1",
                "f_name": "name1",
                "f_student_id": 1006732,
                "f_position": "Treasurer"
            }

            // 1
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toBeInTheDocument();
            }, { timeout: 10000 });
            for (let key of Object.keys(data)) {
                let elem = queryByAttribute('id', dom.container, new RegExp(`${key}$`));
                expect(elem).not.toBeNull();
                fireEvent.change(elem, { target: { value: data[key] } });
            }
            fireEvent.click(screen.getByRole('button', { name: /Save draft/ }));
            await waitFor(() => {
                expect(alertMock).toHaveBeenCalledTimes(1);
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
            }, { timeout: 2000 });

            // 37
            let form = await getFormWithEventName(data["b_event_name"]);
            expect(form?.status).toBe("Draft");

            // 6
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() => {
                expect(alertMock).toHaveBeenCalledTimes(2);
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!");
            }, { timeout: 2000 });

            // 38
            await new Promise(r => setTimeout(r, 3000)); // allow for backend to process the form
            form = await getFormWithEventName(data["b_event_name"]);
            expect(form?.status).toBe("Pending Approval");
        }, 30000);
    })

    describe('Table', () => {
        test('Table Input Fields Validation', async () => {
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 19 NOT WORKING b/c clicking on the input field does not trigger the onChange event 
            // let parentElem = queryByAttribute('inputlabelprops', dom.container, 'd2_total_expenditure');
            // fireEvent.change(parentElem, { target: { value: '' } });
            // let elem1 = queryByAttribute('id', dom.container, 'd2_total_expenditure');
            // expect(elem1).toBeInvalid();

            // 20 
            // for textarea HTML elems, need to change the content inside i.e. <textarea>Some content</textarea>
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toBeInTheDocument();
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, /c1_date/);
            userEvent.type(elem, '2023-08-21a');
            expect(elem).toBeInvalid();
            userEvent.clear(elem);
            userEvent.type(elem, '2023-21-21');
            expect(elem).toBeInvalid();
            userEvent.clear(elem);
            userEvent.type(elem, '2023-08-21');
            expect(elem).toBeValid();
            userEvent.clear(elem);

            // 21
            elem = queryByAttribute('id', dom.container, /c1_time/);
            userEvent.type(elem, '14:00a');
            expect(elem).toBeInvalid();
            userEvent.clear(elem);
            userEvent.type(elem, '14:0');
            expect(elem).toBeInvalid();
            userEvent.clear(elem);
            userEvent.type(elem, '14:00');
            expect(elem).toBeValid();
            userEvent.clear(elem);

            // 22
            elem = queryByAttribute('id', dom.container, /d1a_club_income/);
            userEvent.type(elem, '22.00a');
            expect(elem).toBeInvalid();
            userEvent.clear(elem);
            userEvent.type(elem, '22.000');
            expect(elem).toBeInvalid();
            userEvent.clear(elem);
            userEvent.type(elem, '22');
            expect(elem).toBeValid();
            userEvent.clear(elem);
            userEvent.type(elem, '30.00');
            expect(elem).toBeValid();
            userEvent.clear(elem);
        })

        test("Table Row Addition and Deletion", async () => {
            const userId = await getSampleUserId();
            const alertMock = spy.mockImplementation(() => { })
            let dom = render(
                <UserID.Provider value={{ userId: userId, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 24
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toBeInTheDocument();
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'f-add-row');
            fireEvent.click(elem);
            var newRowStudentId = null;
            await waitFor(() => {
                newRowStudentId = queryByAttribute('id', dom.container, 'f_grouped\.1\.f_student_id');
                expect(newRowStudentId).not.toBeNull();
            }, { timeout: 5000 });

            // 23
            userEvent.type(newRowStudentId, '10000000');
            expect(newRowStudentId).toBeInvalid();
            userEvent.clear(newRowStudentId);
            userEvent.type(newRowStudentId, '1000aaa');
            expect(newRowStudentId).toBeInvalid();
            userEvent.clear(newRowStudentId);
            userEvent.type(newRowStudentId, '1005123');
            expect(newRowStudentId).toBeValid();

            // 25
            elem = queryByAttribute('id', dom.container, 'f-delete-row');
            fireEvent.click(elem);
            await waitFor(() => {
                newRowStudentId = queryByAttribute('id', dom.container, 'f_grouped\.1\.f_student_id');
                expect(newRowStudentId).toBeNull();
            }, { timeout: 5000 });
            elem = queryByAttribute('id', dom.container, 'f-add-row');
            fireEvent.click(elem);
            await waitFor(() => {
                newRowStudentId = queryByAttribute('id', dom.container, 'f_grouped\.1\.f_student_id');
                expect(newRowStudentId).toHaveTextContent('');
            }, { timeout: 5000 });
            elem = queryByAttribute('id', dom.container, 'f-delete-row');
            fireEvent.click(elem);

            // 26
            elem = queryByAttribute('id', dom.container, 'f-delete-row');
            fireEvent.click(elem);
            await waitFor(() => {
                let compRowStudentId = queryByAttribute('id', dom.container, 'f_grouped\.0\.f_student_id');
                expect(compRowStudentId).not.toBeNull();
            }, { timeout: 5000 });

            // 27
            const data = {
                // compulsory fields
                "a_name": "user 1",
                "a_student_id": 1000001,
                "a_organisation": "organisation 1",
                "a_contact_number": 99998888,
                "a_email": "user_1@mymail.sutd.edu.sg",
                "b_event_name": "Unit Test Event 1",
                "b_target_audience": "target Audience 1",
                "b_expected_turnout": 1,
                "b_event_objective": "event Objective 1",
                "d11_total_revenue": 30.00,
                "d2_total_expenditure": 25.00,
                "b_event_schedule": "2023-08-04 14:30",
                "c1_date": "2023-08-21",
                "c1_time": "14:00",
                // "c1_activity_and_description": "do sth", // missing compulsory table row field
                "c1_venue": "LT1",
                "c2_date": "2023-08-21",
                "c2_time": "16:00",
                "c2_activity_and_description": "actual event stuff",
                "c2_venue": "LT1",
                "c3_date": "2023-08-21",
                "c3_time": "19:00",
                "c3_activity_and_description": "do sth after",
                "c3_venue": "LT1",
                "f_name": "name1",
                "f_student_id": 1006732,
                "f_position": "Treasurer"
            }
            for (let key of Object.keys(data)) {
                let elem = queryByAttribute('id', dom.container, new RegExp(`${key}$`));
                expect(elem).not.toBeNull();
                fireEvent.change(elem, { target: { value: data[key] } });
            }
            fireEvent.click(screen.getByRole('button', { name: /Submit/ }));
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form is invalid. Please fix and submit it again.")
                , { timeout: 2000 });

        }, 30000);
    })

    describe('Status', () => {
        test('Status - Draft Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Draft');
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 28            
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeEnabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeEnabled();

            // 29
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeEnabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeEnabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Approved Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Approved');
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 30
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 31
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeDisabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeDisabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Pending Approval Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Pending Approval');
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 32
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 33
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeDisabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeDisabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Rejected Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Rejected');
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            const alertMock = spy.mockImplementation(() => { })
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <FifthRowEPFSubmit />
                </UserID.Provider>
            )

            // 34
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeEnabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeEnabled();

            // 35
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeEnabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeEnabled();

            // 36
            let newEventName = `Unit Test Event ${(new Date).toISOString()}`;
            const data = {
                // compulsory fields
                "a_name": "user 1",
                "a_student_id": 1000001,
                "a_organisation": "organisation 1",
                "a_contact_number": 99998888,
                "a_email": "user_1@mymail.sutd.edu.sg",
                "b_event_name": newEventName,
                "b_target_audience": "target Audience 1",
                "b_expected_turnout": 1,
                "b_event_objective": "event Objective 1",
                "d11_total_revenue": 30.00,
                "d2_total_expenditure": 25.00,
                "b_event_schedule": "2023-08-04 14:30",
                "c1_date": "2023-08-21",
                "c1_time": "14:00",
                "c1_activity_and_description": "do sth",
                "c1_venue": "LT1",
                "c2_date": "2023-08-21",
                "c2_time": "16:00",
                "c2_activity_and_description": "actual event stuff",
                "c2_venue": "LT1",
                "c3_date": "2023-08-21",
                "c3_time": "19:00",
                "c3_activity_and_description": "do sth after",
                "c3_venue": "LT1",
                "f_name": "name1",
                "f_student_id": 1006732,
                "f_position": "Treasurer"
            }
            await waitFor(() => { // make sure form is valid now
                expect(screen.getByLabelText(/^Event Name/)).toBeInTheDocument();
            }, { timeout: 1000 });
            for (let key of Object.keys(data)) {
                let elem = queryByAttribute('id', dom.container, new RegExp(`${key}$`));
                expect(elem).not.toBeNull();
                fireEvent.change(elem, { target: { value: data[key] } });
            }
            fireEvent.click(submitBtn);
            await waitFor(() => {
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!");
            }, { timeout: 2000 });
            const form = await getFormWithEventName(newEventName);
            expect(form?.epf_id == epf_id).toBe(false);
            expect(form?.status).toBe("Pending Approval");

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);
    })
})

describe('OSL - EPF Form', () => {

    describe('Status', () => {
        test('Status - Pending Approval Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Pending Approval');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <OSLEPFSubmit />
                </UserID.Provider>
            )

            // 42
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 43
            elem = queryByAttribute('id', dom.container, 'a_comments_osl');
            expect(elem).toBeEnabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_osl');
            expect(elem).toBeEnabled();

            // 44
            elem = queryByAttribute('id', dom.container, 'a_comments_root');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_root');
            expect(elem).toBeDisabled();

            // 45
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeEnabled();
            let approveBtn = screen.getByRole('button', { name: /Approve/ });
            expect(approveBtn).toBeEnabled();
            let rejectBtn = screen.getByRole('button', { name: /Reject/ });
            expect(rejectBtn).toBeEnabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Approved Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Approved');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <OSLEPFSubmit />
                </UserID.Provider>
            )

            // 46
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 47
            elem = queryByAttribute('id', dom.container, 'a_comments_osl');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_osl');
            expect(elem).toBeDisabled();

            // 48
            elem = queryByAttribute('id', dom.container, 'a_comments_root');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_root');
            expect(elem).toBeDisabled();

            // 49
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeDisabled();
            let approveBtn = screen.getByRole('button', { name: /Approve/ });
            expect(approveBtn).toBeDisabled();
            let rejectBtn = screen.getByRole('button', { name: /Reject/ });
            expect(rejectBtn).toBeDisabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Rejected Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Rejected');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <OSLEPFSubmit />
                </UserID.Provider>
            )

            // 50
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 51
            elem = queryByAttribute('id', dom.container, 'a_comments_osl');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_osl');
            expect(elem).toBeDisabled();

            // 52
            elem = queryByAttribute('id', dom.container, 'a_comments_root');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_root');
            expect(elem).toBeDisabled();

            // 53
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeDisabled();
            let approveBtn = screen.getByRole('button', { name: /Approve/ });
            expect(approveBtn).toBeDisabled();
            let rejectBtn = screen.getByRole('button', { name: /Reject/ });
            expect(rejectBtn).toBeDisabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);
    });

    describe('Upload', () => {
        test('Upload - All Forms', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Pending Approval');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <OSLEPFSubmit />
                </UserID.Provider>
            )

            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            let approveBtn = screen.getByRole('button', { name: /Approve/ });
            let rejectBtn = screen.getByRole('button', { name: /Reject/ });

            // 54
            fireEvent.click(saveDraftBtn);
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
                , { timeout: 2000 });

            // 57
            let form = await getFormWithEPFId(epf_id);
            expect(form?.status).toBe("Pending Approval");

            // 55
            fireEvent.click(approveBtn);
            await waitFor(() => {
                expect(alertMock).toHaveBeenCalledTimes(2);
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
            }, { timeout: 2000 });

            // 58
            form = await getFormWithEPFId(epf_id);
            expect(form?.status).toBe("Approved");

            // 56
            fireEvent.click(rejectBtn);
            await waitFor(() => {
                expect(alertMock).toHaveBeenCalledTimes(3);
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
            }, { timeout: 2000 });

            // 57
            form = await getFormWithEPFId(epf_id);
            expect(form?.status).toBe("Rejected");

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 35000)
    });
});


describe('ROOT - EPF Form', () => {

    describe('Status', () => {
        test('Status - Pending Approval Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Pending Approval');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <ROOTEPFSubmit />
                </UserID.Provider>
            )

            // 62
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 63
            elem = queryByAttribute('id', dom.container, 'a_comments_osl');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_osl');
            expect(elem).toBeDisabled();

            // 64
            elem = queryByAttribute('id', dom.container, 'a_comments_root');
            expect(elem).toBeEnabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_root');
            expect(elem).toBeEnabled();

            // 45
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeEnabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeEnabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Approved Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Approved');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <ROOTEPFSubmit />
                </UserID.Provider>
            )

            // 66
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 67
            elem = queryByAttribute('id', dom.container, 'a_comments_osl');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_osl');
            expect(elem).toBeDisabled();

            // 68
            elem = queryByAttribute('id', dom.container, 'a_comments_root');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_root');
            expect(elem).toBeDisabled();

            // 69
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeDisabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeDisabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);

        test('Status - Rejected Form Edit Permission', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Rejected');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <ROOTEPFSubmit />
                </UserID.Provider>
            )

            // 70
            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let elem = queryByAttribute('id', dom.container, 'a_name');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'g_7_1');
            expect(elem).toBeDisabled();

            // 71
            elem = queryByAttribute('id', dom.container, 'a_comments_osl');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_osl');
            expect(elem).toBeDisabled();

            // 72
            elem = queryByAttribute('id', dom.container, 'a_comments_root');
            expect(elem).toBeDisabled();
            elem = queryByAttribute('id', dom.container, 'f_comments_root');
            expect(elem).toBeDisabled();

            // 73
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            expect(saveDraftBtn).toBeDisabled();
            let submitBtn = screen.getByRole('button', { name: /Submit/ });
            expect(submitBtn).toBeDisabled();

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        }, 30000);
    });

    describe('Upload', () => {
        test('Upload - All Forms', async () => {
            const { epf_id, b_event_name } = await getSampleFormWithStatus('Pending Approval');
            const alertMock = spy.mockImplementation(() => { })
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: epf_id });
            let dom = render(
                <UserID.Provider value={{ userId: null, setUserId: () => { } }}>
                    <ROOTEPFSubmit />
                </UserID.Provider>
            )

            await waitFor(() => {
                expect(screen.getByLabelText(/^Event Name/)).toHaveValue(b_event_name);
            }, { timeout: 5000 });
            let saveDraftBtn = screen.getByRole('button', { name: /Save draft/ });
            let submitBtn = screen.getByRole('button', { name: /Submit/ });

            // 74
            fireEvent.click(saveDraftBtn);
            await waitFor(() =>
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
                , { timeout: 2000 });

            // 76
            let form = await getFormWithEPFId(epf_id);
            expect(form?.status).toBe("Pending Approval");

            // 75
            fireEvent.click(submitBtn);
            await waitFor(() => {
                expect(alertMock).toHaveBeenCalledTimes(2);
                expect(alertMock).toHaveBeenLastCalledWith("Form uploaded successfully!")
            }, { timeout: 2000 });

            // 77
            form = await getFormWithEPFId(epf_id);
            expect(form?.status).toBe("Pending Approval");

            // teardown
            jest.spyOn(Router, 'useParams').mockReturnValue({ epf_id: undefined });
        })
    }, 35000);
});