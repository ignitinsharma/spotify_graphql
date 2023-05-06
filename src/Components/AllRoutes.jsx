import React from "react";
import { Route, Routes } from "react-router-dom";
import Foryou from "../Pages/Foryou";
import Favourites from "../Pages/Favourites";
import Recentplayed from "../Pages/Recentplayed";
import Toptracks from "../Pages/Toptracks";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Foryou />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/recent" element={<Recentplayed />} />
      <Route path="/top" element={<Toptracks />} />
    </Routes>
  );
};

export default AllRoutes;
