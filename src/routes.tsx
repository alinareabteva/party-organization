import {createBrowserRouter} from "react-router-dom";
import Party from "./pages/party/Party.tsx";
import PartyList from "./pages/party-list/PartyList.tsx";
import Overview from "./pages/overview/Overview.tsx";
import Main from "./layout/main/Main.tsx";
import {AppPath} from "./routes-constants.ts";

const router = createBrowserRouter([
  {
    path: AppPath.PARTY_PAGE,
    element: <Main/>,
    children:[
      {
        index: true,
        element: <Party/>
      },
      {
        path: AppPath.PARTY_LIST_PAGE,
        element: <PartyList/>
      },
      {
        path: AppPath.OVERVIEW_PAGE,
        element: <Overview/>
      }
    ]

  },

])

export default router;