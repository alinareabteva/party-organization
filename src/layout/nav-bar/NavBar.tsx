import {NavLink} from "react-router-dom";
import {AppPath} from "../../routes-constants.ts";
import "./NavBar.scss"

const pages = [
  {
    path: AppPath.DEFAULT,
    label: "Party List"
  },
  {
    path: AppPath.CREATE_PARTY_PAGE,
    label: "Create Party"
  },
  {
    path: AppPath.OVERVIEW_PAGE,
    label: "Overview"
  },
]

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul className="nav-links">
        {pages.map((page) => (
          <li className="nav-item" key={page.path}>
            <NavLink
              to={page.path}>
              {page.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;