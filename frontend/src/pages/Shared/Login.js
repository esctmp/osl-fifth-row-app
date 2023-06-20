import "./LoginPage.css";

export default function App() {
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
                            <u>Forget Password?</u>
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
