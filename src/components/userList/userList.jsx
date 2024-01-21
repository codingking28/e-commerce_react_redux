import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/slice/userSlice";

export default function UserList({ Customers }) {
  // state.users is the reducer name in the store
  const CustomersState = useSelector((state) => state.users);
  //Customers is the prop data without redux
  //CustomersState is the state data from redux store
  Customers = [...Customers, ...CustomersState];
  const dispatch = useDispatch();
  function onDelete(key) {
    //dispatch the deleteUser action creator
    dispatch(deleteUser(key));
  }

  return (
    <div>
      <h1>Customer List</h1>
      <ul style={{ listStyle: "none" }}>
        {Customers.map((customer, i) => {
          return (
            <li key={i}>
              {customer}
              {CustomersState.length > 0 && (
                <button onClick={() => onDelete(i)}>Delete</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
