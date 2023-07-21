import { FormProvider, useForm } from "react-hook-form";
import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";
// import input from "../../components/Forms/Custom/input.js"
import { Auth } from 'aws-amplify'

export default function Login() {
    const navigate = useNavigate();
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const onSubmit = handleSubmit(async (data) => {
        try {
          const user = await Auth.signIn(data.email, data.password);
          // ... rest of the code ...
        } catch (error) {
          console.log('Error signing in:', error);
          // Add additional logic to handle different types of errors
          if (error.code === 'UserNotConfirmedException') {
            // Handle the case when the user is not confirmed
          } else if (error.code === 'NotAuthorizedException') {
            // Handle the case when the credentials are not authorized (incorrect username/password)
          } else {
            // Handle other error cases
          }
        }
      });
    return (
        <FormProvider{...methods}>
            <div className= "MainContainer">
            <div>
                <div className="Name">
                    <label htmlFor="Name">OSL Fifth-Row App</label>
                </div>
                <div className="Login">
                    <h2>Login</h2>
                    <form
                        onSubmit={onSubmit} noValidate className="container">
                        <div className="form-group">
                            <label htmlFor="email">Club Email:</label>
                            <input
                                {...register("email", { required: "*This field is required!",pattern:{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "*Invalid email address"
            } })}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your club email"
                                required
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                {...register("password", { required: "*This field is required!" })}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                className={errors.password ? 'input-error' : ''}
                            />
                            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                        </div>

                        <div className="forgetpassword">
                            <label htmlFor="forgetpassword">
                                <nav><Link to='/forgetpassword'>Forget Password</Link></nav>
                            </label>
                        </div>
                        <div className="form-group">
                        <button type="submit">Log in</button>
                        </div>
                    </form>
                </div>
            </div >
            </div>
        </FormProvider >
    );
}