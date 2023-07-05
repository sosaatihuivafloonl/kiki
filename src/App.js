import {Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cart from "./components/cart/cart.jsx"

function App() {

  return (
    <>
       <Routes>
        {/* {isMobile ? */}
          {/* <Route path='/order' element={<MobileCart />} /> */}
          {/* : */}
          <Route path='/order' element={<Cart />} />
        {/* } */}
        </Routes>
    </>
  );
}

export default App;
