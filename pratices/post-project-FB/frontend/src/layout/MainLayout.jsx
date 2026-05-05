import React from "react";
import { Outlet } from "react-router";
import Nabar from "../components/Nabar";

const MainLayout = () => {
  return (
    <div className="w-full h-lvh bg-black text-white ">
      <Nabar />
      <div className="h-[88%] mt-2.5 flex  justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
