import React, { useState } from "react";
import UserList from "../../components/userList/userList";
import { addUser as addUserAction } from "../../store/slice/userSlice";
import { useDispatch } from "react-redux";

export default function AddUserRedux() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  function userSubmit() {
    if (user) {
      // action creator is dispatched
      dispatch(addUserAction(user));
      setUser("");
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
      <UserList Customers={[]} />
    </div>
  );
}
