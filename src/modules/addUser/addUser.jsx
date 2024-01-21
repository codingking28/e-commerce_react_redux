import React, { useState } from "react";
import UserList from "../../components/userList/userList";

export default function AddUser() {
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);

  function userSubmit() {
    if (user) {
      // insert the data to the existing state array
      setUserList((previousState) => [...previousState, user]);
      setUser("");
      console.log(userList);
    }
  }

  return (
    <div>
      <h1>Add Customer</h1>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      ></input>
      <button onClick={userSubmit}>Add</button>
      <UserList Customers={userList} />
    </div>
  );
}
