import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const Navbar = () => {

// is say humain pata chal jata hai k hum kis route per hain jesay / per yeh /home per simply location.pathname ab issay hum use kar k link active karay gay
let location = useLocation();
// useEffect(() => {
//  console.log(location.pathname);
// }, [location]);   
  return (

<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/About"?"active": ""}`} to="/About">About</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
      <Link className="btn btn-primary" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="signup" role="button">SignUp</Link>
        {/* <button className="btn btn-primary" type="submit">Login</button>
        <button className="btn btn-primary mx-2" type="submit">Signup</button> */}
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar