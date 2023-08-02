import { FormProvider, useForm } from "react-hook-form";
import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from 'aws-amplify'
import { useContext } from 'react'
import {UserID} from "../../routes/UserID"  
import {Groups} from "../../routes/Groups"
import axios from "axios"

export default function Login() {
    const navigate = useNavigate();
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const {userId,setUserId} = useContext(UserID);
    const {groups,setGroups} = useContext(Groups);
    const onSubmit = handleSubmit(async (data) => {
        try {
          const user =  await Auth.signIn(data.email,data.password);
          const uid = user.username;
          const group = user.signInUserSession.accessToken.payload["cognito:groups"]
          await setGroups(group);
          await setUserId(uid);
          if (group.includes('OSL')) {
            navigate("/osl/homepage");
          } else if (group.includes('FRE')) {
            navigate("/fifthrow/homepage");
          } else if (group.includes('ROOT')){
            navigate("/root/homepage");
          }else{
            navigate("/login");
          }
        } catch (error) {
          console.log('Error signing in:', error);
        }
      });
    return (
        <div className="bg">
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
                                    {...register("email", { required: "*Email is required!",pattern:{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]*sutd\.edu\.sg$/i,
                    message: "*Invalid email address entered"
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
                                    {...register("password", { required: "*Password is required!" ,pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:"*Invalid password entered"
                                    }})}
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
                            <button type="submit" data-testid = "Log in">Log in</button>
                            </div>
                        </form>
                    </div>
                </div >
                </div>
            </FormProvider >
        </div>
    );
}
