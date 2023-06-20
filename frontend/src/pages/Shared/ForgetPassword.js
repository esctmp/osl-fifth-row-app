import "./ForgetPassword.css";

export default function ForgetPassword() {
    return (
        <div>
            <div className="Name">
                <label htmlFor="Name">OSL Fifth-Row App</label>
            </div>
            <div className="Login">
                <h2>Login</h2>
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
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
