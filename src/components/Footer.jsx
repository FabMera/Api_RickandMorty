import React from 'react'

const Footer = ({tittle}) => {
  return (
    <nav className="navbar navbar-dark bg-info">
    <div className="container-fluid justify-content-center">
      <a className="navbar-brand " href="./NavBar.jsx">{tittle}</a>
    </div>
  </nav>
  )
}

export default Footer