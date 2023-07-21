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
          const user =  await Auth.signIn(data.email,data.password);
          console.log("user")
          console.log(user)
          Auth.completeNewPassword(user, "12345678");

          const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
          console.log(groups)
          if (groups.includes('OSL')) {
            navigate("/osl/homepage");
          } else if (groups.includes('EXCO')) {
            navigate("/fifthrow/homepage");
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.log('Error signing in:', error);
          // Handle the error appropriately (e.g., display an error message to the user)
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