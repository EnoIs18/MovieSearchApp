import React, { useContext } from "react";
import "./App.css";

import PaginationProvider from "./context/PaginationProvider";
import HomePage from "./components/HomePage/HomePage";
function App() {
  return (
    <PaginationProvider>
      <HomePage />
    </PaginationProvider>
  );
}

export default App;
