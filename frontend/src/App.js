App.js

import Login from "./admin/auth/Login";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./admin/dashboard/Dashboard";
import ViewNews from "./admin/dashboard/components/news/ViewNews"
import AddNews from "./admin/dashboard/components/news/AddNews"
import { ToastContainer } from 'react-toastify';
import Main from "./admin/dashboard/components/main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/administrator" element={<Login />}  />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/view-news" element={<ViewNews />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;