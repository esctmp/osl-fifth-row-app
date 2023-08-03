import React, { useState } from "react";
import { API, Auth } from "aws-amplify";
import "./CreateUser.css";

const CreateUser = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successCreate, setSuccessCreate] = useState(null);
    const [user, setUser] = useState({
      email: "",
      role: "FRE",
      password: "",
      confirmPassword: "",
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        // Perform password validation here (optional)
  
        await Auth.signUp({
          username: user.email,
          name: user.name,
          password: user.password,
          attributes: {
            email: user.email,
            name: user.name,
            'custom:user_type': user.role,
          },
        });
        setSuccessCreate("User successfully signed up and assigned to group!");
        console.log("User successfully signed up and assigned to group!");
      } catch (error) {
        console.error("Error signing up user:", error.message);
        setErrorMessage("Your username or password is in the wrong format!")
      }
    };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formField}>
          <label >Name:</label>
          <input
            className="Name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formField}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Required: in the form of ...@...sutd.edu.sg"
            className="userfield"
          />
        </div>
        <div style={styles.formField}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Required: 8 characters, 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter"
            className="pwfield"
          />
        </div>
        <div style={styles.formField}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formField}>
          <label>Role:</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="OSL">OSL</option>
            <option value="ROOT">ROOT</option>
            <option value="FRE">FifthRow Exco</option>
          </select>
        </div>
        {successCreate && <p className=  'successCreate'>{successCreate}</p>}
        {errorMessage && <p className = 'errorMessage'>{errorMessage}</p>}
        <button type="submit" style={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formField: {
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CreateUser;