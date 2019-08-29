import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li>
        <NavLink
          className="nav__item"
          activeClassName="nav__item--active"
          to="/"
          exact
        >
          Posts list
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav__item"
          activeClassName="nav__item--active"
          to="/new-post"
          exact
        >
          New post
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
