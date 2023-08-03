import React from "react";
import "./ResetPassword.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

export default function ResetPassword() {
  const navigate = useNavigate();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;
  const location = useLocation();
  const { email } = location.state || {};

  const onSubmit = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(email, data.code, data.password);
      navigate("/login"); 
    } catch (error) {
      console.error("Error resetting password:", error.message);
      navigate("/login"); 

    }
  };

  return (
    <div className ='bg'>
    <FormProvider {...methods}>
      <div className="MainContainer">
        <div className="Name">
          <label htmlFor="Name">OSL Fifth-Row App</label>
        </div>
        <div className="ResetPassword">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="container">
            <div>
              <p>
                A code to reset the account's password will only be sent if the user exists. Enter the verification code and new password to reset your password.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="code">Verification Code:</label>
              <input
                {...register("code", { required: "*This field is required!" })}
                type="text"
                id="code"
                name="code"
                placeholder="Enter verification code"
                required
                className={errors.code ? "input-error" : ""}
              />
              {errors.code && <p className="errorMessage">{errors.code.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                {...register("password", { required: "*This field is required!" })}
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
                required
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <p className="errorMessage">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <button type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
    </div>
  );
}
