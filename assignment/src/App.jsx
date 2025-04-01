import {Route, Routes} from "react-router";
import UserList from "./pages/UserList/index.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/users"} element={<UserList/>}></Route>
        </Routes>
    </>
  )
}

export default App
