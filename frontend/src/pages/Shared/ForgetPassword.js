import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const onSubmit = methods.handleSubmit(data => {
        navigate("/login")
    })
    return (
        <FormProvider{...methods}>
        <div>
            <div className="Name">
                <label htmlFor="Name">OSL Fifth-Row App</label>
            </div>
            <div className="ForgetPassword">
                <h2>Forget Password</h2>
                <form
                    onSubmit={onSubmit} noValidate className="container">
                    <div>
                        <p>
                            Enter your SUTD club email and we’ll send you a link to reset your
                            password.
                        </p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="club-email">
                            Club Email:
                        </label>
                        
                        <input
                                {...register("email", { required: "*This field is required!",pattern:{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "*Invalid email address"
            } })}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <button type="submit">Send</button >
                    </div>
                </form>
            </div>
        </div>
        </FormProvider>
    );
}
