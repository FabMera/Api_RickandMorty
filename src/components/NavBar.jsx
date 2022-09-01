import React from "react";

const NavBar = ({ title }) => {
  return (
    <nav className="navbar navbar-dark bg-info">
      <div className="container">
        <a className="navbar-brand text-uppercase" href="/">{title}</a>
      </div>
    </nav>
  );
};

export default NavBar;
