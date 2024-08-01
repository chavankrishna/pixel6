// src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import EmployeeTable from "./components/EmployeeTable";


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<EmployeeTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
