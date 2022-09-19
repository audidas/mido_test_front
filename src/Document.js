import React, { useEffect } from "react";
import { useParams, useLocation, Route, Routes } from "react-router-dom";
import Content from "./Content";
import SideBar from "./SideBar";

const Document = () => {
  const { doc } = useParams();

  return (
    <div style={{width:"100vw" , display: "flex", flexDirection: "row"}} >
      <div className="no-scroll" style={{height:"100vh"}}>

      <SideBar doc={doc} />
      </div>
      <Routes>
        <Route path=":id" element={<Content />}  />
      </Routes>
    </div>
  );
};

export default Document;
