import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="Name">
                <label htmlFor="Name">OSL Fifth-Row App</label>
            </div>
            <div className="ForgetPassword">
                <h2>Forget Password</h2>
                <form>
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
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" onClick={() => navigate("/login")}>Send</button >
                    </div>
                </form>
            </div>
        </div>
    );
}
