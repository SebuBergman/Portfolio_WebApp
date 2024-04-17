import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";

function Navbar() {
  return (
      <div className="navbar">
        <Sidebar/>
        <div className="wrapper">
          <div>
          <span>BergmanWebWorks</span>
          </div>
          <div className="social">
            <a href="#"><img src="/Instagram.webp" alt="" /></a>
            <a href="#"><img src="/LinkedIn.webp" alt="" /></a>
            <a href="#"><img src="/Github.png" alt="" /></a>
          </div>
        </div>
      </div>
  );
}

export default Navbar;