import React from 'react';
import { Outlet } from 'react-router';


import Sidebar from '../../components/Sidebar';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="grid email">
            <div className="grid-body">
              <div className="row">
                <Sidebar />
                <div className="col-md-9">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;