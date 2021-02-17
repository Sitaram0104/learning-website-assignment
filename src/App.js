import "./App.css";
import { Link, Route } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <h3>Logo</h3>
        {location.pathname === "/" ? (
          <Link to="/register">Go To Register screen</Link>
        ) : (
          <Link to="/">Go Back to home screen</Link>
        )}

        <Route path="/register" component={RegisterScreen} />
      </header>
    </div>
  );
}

export default App;
