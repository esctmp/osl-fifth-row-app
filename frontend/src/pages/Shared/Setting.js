import React, { useState, useContext } from "react"; // Import useContext
import { Auth } from "aws-amplify";
import { UserID } from "../../routes/UserID";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("password");
  const { userId } = useContext(UserID); 
  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage("New password and confirm password do not match.");
        return;
      }

      const userId = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(userId, currentPassword, newPassword);

      alert("Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error changing password:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Settings</h2>
      <div style={styles.tabContainer}>
        <div
          className={activeTab === "password" ? "activeTab" : ""}
          onClick={() => setActiveTab("password")}
          style={styles.tab}
        >
          Password
        </div>
        <div
          className={activeTab === "profile" ? "activeTab" : ""}
          onClick={() => setActiveTab("profile")}
          style={styles.tab}
        >
          Profile
        </div>
      </div>
      {activeTab === "password" && (
        <div>
          <h3 style={styles.subHeading}>Change Password</h3>
          {errorMessage && <div style={styles.error}>{errorMessage}</div>}
          <div style={styles.formField}>
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formField}>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formField}>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="button" style={styles.button} onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      )}
      {activeTab === "profile" && (
        <div>
          {/* Add profile section content here */}
          <h3 style={styles.subHeading}>Profile Settings</h3>
          {/* Example: Profile Picture, Name, Email */}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    textAlign: "center",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  activeTab: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  subHeading: {
    fontSize: "20px",
    marginBottom: "10px",
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
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Settings;
