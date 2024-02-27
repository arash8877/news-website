import Login from "./admin/auth/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/dashboard/Dashboard";
import ViewNews from "./admin/dashboard/components/news/ViewNews";
import AddNews from "./admin/dashboard/components/news/AddNews";
import { ToastContainer } from "react-toastify";
import EditNews from "./admin/dashboard/components/news/EditNews";
import Main from "./admin/dashboard/components/main/Main";
import ViewCategories from "./admin/dashboard/components/category/ViewCategories";
import AddCategory from "./admin/dashboard/components/category/AddCategory";
import EditCategory from "./admin/dashboard/components/category/EditCategory";
import ViewVideo from "./admin/dashboard/components/video/ViewVideo";
import AddVideo from "./admin/dashboard/components/video/AddVideo";
import ViewUsers from "./admin/dashboard/components/user/ViewUsers";
import AddUser from "./admin/dashboard/components/user/AddUser";
import EditUser from "./admin/dashboard/components/user/EditUser";
import UpdateProfile from "./admin/dashboard/components/user/UpdateProfile";
import HomePage from "./pages/HomePage";
// import Main from "./admin/dashboard/components/main/Main";
// import EditNews from "./admin/dashboard/components/news/EditNews";
// import EditUser from "./admin/dashboard/components/users/EditUser";
// import ViewCommentAdmin from "./admin/dashboard/components/comment/ViewCommentAdmin";
// import NotFound from "./components/NotFound/NotFound";
// import CheckAdmin from "./admin/auth/CheckAdmin";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Details from "./pages/Details";
// import { useContext } from "react";
// import { AuthContext } from "./admin/context/context";

function App() {
  // const { userId } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/administrator" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/view-news" element={<ViewNews />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/edit-news/:id" element={<EditNews />} />

        <Route path="/view-category" element={<ViewCategories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />

        <Route path="/view-video" element={<ViewVideo />} />
        <Route path="/add-video" element={<AddVideo />} />

        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
