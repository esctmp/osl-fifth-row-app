import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="Name">
                <label htmlFor="Name">OSL Fifth-Row App</label>
            </div>
            <div className="Login">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Club Email:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your club email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="forgetpassword">
                        <label htmlFor="forgetpassword">
                            <nav><Link to='/forgetpassword'>Forget Password</Link></nav>
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={() => navigate("/fifthrow/epf")}>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
