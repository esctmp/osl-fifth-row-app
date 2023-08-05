import { FormProvider, useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from 'aws-amplify'
import { useContext ,useState} from 'react'
import {UserID} from "../../routes/UserID"  
import {Groups} from "../../routes/Groups"
import {UserLoggedIn} from "../../routes/UserLoggedIn"

export default function Login() {
    const navigate = useNavigate();
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const {setUserId} = useContext(UserID);
    const {groups,setGroups} = useContext(Groups);
    const {setUserLoggedIn} = useContext(UserLoggedIn);
    const [loginError,setLoginError] = useState("");
    const onSubmit = handleSubmit(async (data) => {
        try {
          const user =  await Auth.signIn(data.email,data.password);
          const uid = user.username;
          console.log(user);
          var group =null;
          group = user.attributes["custom:user_type"];
          if (!group){
            group = user.signInUserSession.accessToken.payload["cognito:groups"];}
          console.log(group);
          console.log(group == "FRE");
          console.log(group ==="FRE");
          setGroups(group);
          setUserId(uid);
          setUserLoggedIn(true);
          if (group.includes('OSL')|| group == "OSL") {
            navigate("/osl/homepage");
          } else if (group.includes('FRE') || group=="FRE") {
            navigate("/fifthrow/homepage");
          } else if (group.includes('ROOT') || group =="ROOT"){
            navigate("/root/homepage");
          }else{
            navigate("/login");
          }
        } catch (error) {
          console.log('Error signing in:', error);
          setLoginError('Error signing in: ' + error);
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
                                    {...register("email")}
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
                                    <nav><Link to='/forget-password'>Forget Password</Link></nav>
                                </label>
                            </div>
                            <div className="form-group">
                            {loginError && <p className="errorMessage">{loginError}</p>}
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
