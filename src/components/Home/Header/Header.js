import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Cyberlearn
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item ">
            <NavLink
              className="nav-link"
              activeClassName="activeNavItem"
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="activeNavItem"
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="activeNavItem"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="activeNavItem"
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="activeNavItem"
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="activeNavItem"
              to="/cyberbugs"
            >
              Cyberbugs-JiraClone
            </NavLink>
          </li>
          <li className="nav-item dropdown ">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Exercise
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <NavLink
                className="nav-link text-dark"
                activeClassName="activeNavItem"
                to="/todolistrcc"
              >
                ToDoList RCC
              </NavLink>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/todolistrfc"
                >
                  ToDoList RFC
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/todolistredux"
                >
                  ToDoList Redux-Thunk
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/todolistsaga"
                >
                  ToDoList Redux-Saga
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/demohocmodal"
                >
                  Demo HOC Modal
                </NavLink>
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/dragdrop"
                >
                  Demo Drag and Drop
                </NavLink>
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/demo"
                >
                  Demo Drag and Drop 2
                </NavLink>
                
                <NavLink
                  className="nav-link text-dark"
                  activeClassName="activeNavItem"
                  to="/demodragdropdnd"
                >
                  Drag and Drop DnD
                </NavLink>
              </li>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
