import React from 'react';
import { Route, Routes } from 'react-router-dom'

import useAuth from './hooks/useAuth';
import NotFound from './pages/404';

import Home from './pages/Home';
import Items from './pages/Items';
import Login from './pages/Login';

const RoutesWrapper: React.FC = () => {

  const { signed } = useAuth()

  return (
    <Routes>
      {signed ?
        (
          <>
            <Route path="/dashboard" element={<Home />}>
              <Route path="/dashboard/items/:item" element={<Items />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )
      }
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RoutesWrapper;