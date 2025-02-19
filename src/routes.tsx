import {createBrowserRouter} from "react-router-dom";
import Party from "./pages/party/Party.tsx";
import PartyList from "./pages/party-list/PartyList.tsx";
import Overview from "./pages/overview/Overview.tsx";
import Main from "./layout/main/Main.tsx";
import {AppPath} from "./routes-constants.ts";
import EditParty from "./pages/edit-party/EditParty.tsx";
import NotFound from "./components/base/not-found/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: AppPath.DEFAULT,
    element: <Main/>,
    children:[
      {
        index: true,
        element: <PartyList/>
      },
      {
        path: AppPath.CREATE_PARTY_PAGE,
        element: <Party/>
      },
      {
        path: AppPath.EDIT_PARTY_PAGE,
        element: <EditParty/>
      },
      {
        path: AppPath.OVERVIEW_PAGE,
        element: <Overview/>
      },
      {
        path: '*',
        element: <NotFound title="We don't have that page"/>
      }
    ]

  },

])

export default router;