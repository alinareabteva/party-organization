import NavBar from "../nav-bar/NavBar.tsx";
import {Outlet} from "react-router-dom";
import "./Main.scss"

const Main = () => {
  return (
    <div className="main-layout">
      <NavBar/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
};

export default Main;