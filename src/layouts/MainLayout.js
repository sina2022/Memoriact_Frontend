import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import DisplaySuccessMessage from '../components/DisplaySuccessMessage';
import DisplayErrorMessage from '../components/DisplayErrorMessage';

function MainLayout(userId, setUserId) {
  return (
    <>
      <Navbar userId={userId} setUserId={setUserId} />
      <div style={{ minHeight: '1000px'}}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
