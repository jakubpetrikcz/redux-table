import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
// import Row from "./components/Table";
import CollapsibleTable from "./components/CollapsibleTable";

function App() {
  return (
    <div className="App">
      <CollapsibleTable />
    </div>
  );
}

export default App;
