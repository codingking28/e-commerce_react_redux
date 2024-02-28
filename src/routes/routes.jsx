import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddUser,
  AddUserRedux,
  CreateRecords,
  Dashboard,
  EditRecords,
  LogIn,
} from "../modules";

let routes = [
  { path: "/login", component: LogIn },
  { path: "/add_user", component: AddUser },
  { path: "/add_user_redux", component: AddUserRedux },
  { path: "/dashboard", component: Dashboard },
  { path: "/edit_record/:id", component: EditRecords },
  { path: "/create_record", component: CreateRecords },
];
export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route
            exact
            path={route.path}
            key={i.toString()}
            element={<route.component />}
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}
