import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Document from "./Document";
import Home from "./Home";
import CreateForm from "./CreateForm";
import Detail from "./Detail";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/document/:doc/*" element={<Document />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
