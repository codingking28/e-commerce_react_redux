import "./App.css";
import { Provider } from "react-redux";
import AppRoute from "./routes/routes.jsx";
import { store } from "./store/createStore";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoute />
      </div>
    </Provider>
  );
}

export default App;
