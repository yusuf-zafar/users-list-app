// App.js
import React from "react";
import TabNavigation from "./components/TabNavigation";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1 style={{color:"#007bff"}}>Github Users App</h1>
      <TabNavigation />
    </div>
  );
};

export default App;
