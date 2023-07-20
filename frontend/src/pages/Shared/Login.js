import { FormProvider, useForm } from "react-hook-form";
import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";
// import input from "../../components/Forms/Custom/input.js"
import { Auth } from 'aws-amplify'
import { useContext } from 'react'
import {UserID} from "../../routes/UserID"
import axios from "axios"

export default function Login() {
    const role = "FRE"; 
    const navigate = useNavigate();
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const {userId,setUserId} = useContext(UserID);
    const onSubmit = methods.handleSubmit(async data => {
        try {
            let response = await Auth.signIn(data.email, data.password);
            // console.log(response);
            axios.get("http://localhost:3000/users/getEXCOs").then(function(response){
                for(let i=0;i<(response.data.length);i++)  {
                    if(response.data[i].email==data.email){
                        const user_id = response.data[i].user_id;
                        setUserId(user_id);
                    }
                }  
            }).catch(error =>{
                console.error("Error fetching EXCO: ",error);
            });

            // let user = await Auth.currentAuthenticatedUser();
            if (role === "OSL") {
              navigate("/osl/homepage");
            } else if (role === "FRE") {
              navigate("/fifthrow/homepage");
            } else {
              navigate("/login");
            }
          } 
          catch (error) {
            console.log('Error signing in:', error);
          }
    })
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