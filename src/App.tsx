import './App.css'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en';
import {RouterProvider} from "react-router-dom";
import router from "./routes.tsx";
import {ApplicationContextProvider} from "./context/application-context/ApplicationContext.tsx";

function App() {

  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <ApplicationContextProvider>
          <RouterProvider router={router}/>
        </ApplicationContextProvider>
      </LocalizationProvider>
    </div>
  )
}

export default App;