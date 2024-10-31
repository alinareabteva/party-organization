import {NavLink} from "react-router-dom";
import {AppPath} from "../../routes-constants.ts";

const pages = [
  {
    path: AppPath.PARTY_PAGE,
    label: "Create Party"
  },
  {
    path: AppPath.PARTY_LIST_PAGE,
    label: "Party List"
  },
  {
    path: AppPath.OVERVIEW_PAGE,
    label: "Overview"
  },
]

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul>
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