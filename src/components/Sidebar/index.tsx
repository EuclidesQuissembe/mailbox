import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '../../@types/data';
import useAuth from '../../hooks/useAuth';

import api from '../../services/api';

const Sidebar: React.FC = () => {

  const { logout } = useAuth()

  const navigate = useNavigate()

  const [menus, setMenus] = useState<Menu[]>([])

  const getMenus = useCallback(async () => {
    try {
      const response = await api.get('/menus')

      if (response.status === 200) {
        setMenus(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])


  const signOut = () => {
    logout()

    navigate('/')
  }

  useEffect(() => {
    getMenus()
  }, [getMenus])

  return (
    <div className="col-md-3">
      <nav id="sidebar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#"
                    id="navbarScrollingDropdown" role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Admin
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li>
                      <p onClick={() => signOut()} className="dropdown-item">
                        Terminar sessão
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <ul className="list-unstyled components">
          {menus.map(menu => (
            <li key={menu.id}>
              <a href={"#homeSubmenu-" + menu.id} data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle">{menu.name}</a>
              <ul className="collapse list-unstyled" id={"homeSubmenu-" + menu.id}>
                {menu.subMenus.map(subMenu => (
                  <li key={subMenu.id}>
                    <Link to={`/dashboard/items/${subMenu.id}`}>{subMenu.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div >
  );
}

export default Sidebar;