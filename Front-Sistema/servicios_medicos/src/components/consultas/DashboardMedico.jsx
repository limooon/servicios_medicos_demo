import React from 'react'
import Header from './Header';
import Sidebar from './Siderbar';
import Main from './Main';
import Fotter from './Fotter';

const DashboardMededico = () => {
    return (
      <>
      <div className="app-wrapper">
        <Header/>
        <Sidebar/>
        <Main/>
        <Fotter/>
      </div>
    </>
      );
}

export default DashboardMededico