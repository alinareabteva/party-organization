import './App.css'
import Party from "./party/Party.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en';

function App() {

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Party/>
      </LocalizationProvider>
    </div>
  )
}

export default App;