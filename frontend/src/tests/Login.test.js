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
});