import {Route, Routes} from "react-router";
import UserList from "./pages/UserList/index.jsx";
import UserCreate from "./pages/UserCreate/index.jsx";
import UserEdit from "./pages/UserEdit/index.jsx";
import UserDetail from "./pages/UserDetail/index.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/users"} element={<UserList/>}></Route>
            <Route path="/users/create" element={<UserCreate/>} />
            <Route path="/users/:uid/edit" element={<UserEdit/>} />
            <Route path="/users/:uid/detail" element={<UserDetail/>} />
        </Routes>
    </>
  )
}

export default App
