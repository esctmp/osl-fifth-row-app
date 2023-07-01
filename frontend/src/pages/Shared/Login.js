import { FormProvider, useForm } from "react-hook-form";
import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";
// import input from "../../components/Forms/Custom/input.js"

export default function Login() {
    const navigate = useNavigate();
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const onSubmit = methods.handleSubmit(data => {
        navigate("/dashboards/dashboard1")
    })
    return (
        <FormProvider{...methods}>

            <div>
                <div className="Name">
                    <label htmlFor="Name">OSL Fifth-Row App</label>
                </div>
                <div className="Login">
                    <h2>Login</h2>
                    <form
                        onSubmit={onSubmit} noValidate className="container">
                        <div className="form-group">
                            <label htmlFor="username">Club Email:</label>
                            <input
                                {...register("username", { required: "*This field is required!" })}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your club email"
                                required
                            />
                            {errors.username && <p className="errorMessage">{errors.username.message}</p>}
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
        </FormProvider >
    );
}