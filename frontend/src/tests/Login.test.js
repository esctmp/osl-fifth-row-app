import Login from "../pages/Shared/Login";
import '@testing-library/jest-dom';
import {render, fireEvent,screen} from '@testing-library/react';

describe("Validation",() => {
    test("should reject the login due to empty username field", async()=>{
        render(<Login/>);
        const field = screen.getByPlaceholderText("Enter your club email");
        fireEvent.change(field,{target:{value:""}});
        expect(field.value).toBe("*This field is required!");
    })
    test("should reject the login due to empty password field", async()=>{
        render(<Login/>);
        field1 = screen.getByPlaceholderText("Enter your password");
        fireEvent.change(field1,{target:{value:""}});
        expect(field1.value).toBe("*This field is required");
    })
});