import NavBar from "../nav-bar/NavBar.tsx";
import {Outlet} from "react-router-dom";

const Main = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  );
};

export default Main;