import './App.css'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en';
import {RouterProvider} from "react-router-dom";
import router from "./routes.tsx";

function App() {

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <RouterProvider router={router}/>
      </LocalizationProvider>
    </div>
  )
}

export default App;