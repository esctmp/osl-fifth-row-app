import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import { UserContext } from "../../contexts/UserContext"; // Assuming you have a context to manage user data

const UpdateName = () => {
  const { user, setUser } = useContext(UserContext); // Use the context to get and set the user data
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeName = async (event) => {
    event.preventDefault();
    try {
      // Use Amplify Auth to update the name attribute
      const updatedUser = await Auth.updateUserAttributes(user, {
        name: newName,
      });

      // Update the user data in the context with the updated name
      setUser(updatedUser);

      // Name update successful
      alert("Name updated successfully!");

      // Clear the form field and error message
      setNewName("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating name:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Update Name</h2>
      <form onSubmit={handleChangeName}>
        {errorMessage && <div>{errorMessage}</div>}
        <div>
          <label>New Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <button type="submit">Update Name</button>
      </form>
    </div>
  );
};

export default UpdateName;
