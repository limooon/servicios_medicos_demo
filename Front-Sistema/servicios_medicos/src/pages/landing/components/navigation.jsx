import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            React Landing Page
          </Link>
        </div>

        
          <div className="btn-group">
                 <Link
                    to="/login"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Logearse
                  </Link>
                  <Link
                    to="/dashboard"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    registrarse
                  </Link>
                  <Link
                    to="/crear-multa"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Crear Multa
                  </Link>
                  <Link
                    to="/historial-multas"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Historial Multas
                  </Link>
                </div>
        </div>
      
    </nav>
  );
};
