import "./App.css";
import NavBar from "./components/Navegation";
import LoginForm from "./components/LoginForm";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <LoginForm />
    </BrowserRouter>
  );
}

export default App;
