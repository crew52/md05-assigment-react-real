import {Route, Routes} from "react-router";
import UserList from "./pages/UserList/index.jsx";
import UserCreate from "./pages/UserCreate/index.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/users"} element={<UserList/>}></Route>
            <Route path="/users/create" element={<UserCreate/>} />
        </Routes>
    </>
  )
}

export default App
