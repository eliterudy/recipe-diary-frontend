import React from "react";
import "./App.css";
import Routes from "./components/routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
